import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'

const Loading = () => {
  const navigate = useNavigate()
  const { fetchUser, setToken, axios } = useAppContext()
  const { getToken, isSignedIn, isLoaded } = useAuth()
  const { user, isLoaded: isUserLoaded } = useUser()

  
  useEffect(() => {
    const fetchUserAndToken = async () => {
      // Wait for Clerk to load
      if (!isLoaded || !isUserLoaded) return
      
      // If user is not signed in, redirect to home (which will show SignIn)
      if (!isSignedIn || !user) {
        console.log('User not signed in, redirecting to home');
        navigate('/');
        return;
      }

      console.log('Loading user:', user)

      try {
        // 1️⃣ Send user details to backend
        const url = '/api/user/login'
        const clerkId = user.id
        const email = user.primaryEmailAddress?.emailAddress || ''
        const firstName = user.firstName || ''
        const lastName = user.lastName || ''
        const profileImage = user.profileImageUrl || ''
        
        console.log('Clerk user:')
        const { data } = await axios.post(url, {
          clerkId,
          email,
          firstName,
          lastName,
          profileImage,
        })

        // 2️⃣ If backend confirms success, fetch Clerk JWT
        if (data.success) {
          const freshToken = await getToken({ template: "seven_day_token" })
          setToken(freshToken)
          localStorage.setItem('prismtoken', freshToken)
          console.log('Stored token:', freshToken)
        }

        // 3️⃣ Fetch additional user info if needed
        // fetchUser()
      } catch (err) {
        console.error('Error logging in user or fetching token:', err)
      } finally {
        // 4️⃣ Wait at least 5 seconds before navigating
        setTimeout(() => {
          navigate('/')
        }, 3000)
      }
    }

    fetchUserAndToken()
  }, [isLoaded, isUserLoaded, isSignedIn, user, navigate])

  return (
    <div className='bg-gradient-to-b from-[#3249B0] to-[#352372] backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl'>
      <div className='w-10 h-10 rounded-full border-3 border-white border-t-transparent animate-spin' />
    </div>
  )
}

export default Loading
