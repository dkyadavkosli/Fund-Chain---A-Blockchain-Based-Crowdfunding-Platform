import React , {useEffect} from "react";
import FundCard from "../../components/FundCard";
import { motion ,useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function NatureList({ name, isLoading, campaigns }) {

  const {ref , inView} = useInView();
  const animation = useAnimation();
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  useEffect(() => {
    if(inView){
        animation.start({
            scale:1,
            transition:{
                duration:1.5 , type:"spring"
            }
        })
    }
    if(!inView){
        animation.start({
            scale:0.1
        })
    }
  }, [inView])

  const animation1 = useAnimation();

  useEffect(() => {
    if(inView){
        animation1.start({
            x:0,
            transition:{
                duration:2  , type:"spring"
            }
        })
    }
    if(!inView){
        animation1.start({
            x:'-100vw'
        })
    }
  }, [inView])

  return (
    <div ref={ref} className="pt-12 pb-12 xl:pl-36 xl:pr-36 lg:pl-20 lg:pr-20 md:pl-16 md:pr-16 sm:pl-8 sm:pr-8 pl-8 pr-8">
      <div className="flex flex-row w-full justify-center">
        <motion.div animate={animation1}
          className="sm:text-3xl text-2xl text-white font-semibold"
        >
          {name} CAMPAIGNS 
        </motion.div>
      </div>
      <div className="flex flex-row w-full justify-center">
      <div className="mt-2 text-slate-300 font-semibold text-center">View the fundraising projects that are most active right now</div>
      </div>
      {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-center text-[14px] mt-[20px] leading-[30px] text-[#818183]">
            No Campaigns found.
          </p>
        )}
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-10 items-baseline">
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign?.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
}

export default NatureList;
