import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'



const Credits = () => {

  const [plans , setPlans] = useState([])
  const [loading , setLoading] = useState(true)
  const {axios , token}= useAppContext();

  const fetchPlans = async()=>{
    try {
      const {data} = await axios.get('/api/credit/plans',{headers:{Authorization:token}});
      if(data.success){
        setPlans(data.plans);
      }else{
        toast.error(data.message  || 'Failed to fetch plans');
      }
      
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
    
  }

  const purchasePlan = async(planId)=>{
    try {
      const {data} = await axios.post('/api/credit/purchase',{planId},{headers:{Authorization:token}});
      
      
      if(data.success){
        window.location.href = data.url;
      }else{
        toast.error("data.message");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{fetchPlans()},[])

  if(loading) return <Loading/>

  return (
    <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h2 className='text-3xl font-semibold text-center mb-15 xl:mt-30 text-gray-800 dark:text-white'>Credit Plans</h2>

      <div className='flex flex-wrap justify-center gap-15'>
        {
          plans.map((plan)=>(
            <div className={` rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${plan._id === 'pro' ? "bg-[#352380] scale-115 p-8 border-transparent animate-glow" : "bg-transparent border border-[#352380]"}`}>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-white mb-2 '>{plan.name}</h3>
                <p className='text-2xl font-bond text-purple-300 mb-4'>${plan.price}
                  <span className='text-base font-normal text-purple-200'>{''}/ {plan.credits} credits</span>
                </p>
                <ul className='list-disc lis-inside text-sm text-gray-100 ml-4'>
                  {plan.features.map((feature,index)=>(
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button onClick={()=>toast.promise(purchasePlan(plan._id),{loading:'Processing...'})} className={`mt-6 font-medium py-2 rounded transition-colors cursor-pointer ${plan._id === 'pro'? 'bg-black text-gray-200': 'bg-gray-200 text-black'}`}>Buy Now</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Credits
