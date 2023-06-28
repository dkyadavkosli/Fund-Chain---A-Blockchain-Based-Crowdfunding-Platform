import React , {useEffect} from "react";
import { FiSearch } from "react-icons/fi";
import { MdMessage } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

function Journey() {
  const {ref , inView} = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if(inView){
        animation.start({
            scale:1,
            transition:{
                duration:0.8
            }
        })
    }
    if(!inView){
        animation.start({
            scale:0.1
        })
    }
  }, [inView])

  return (
    <motion.div ref={ref}  animate={animation}
    className="md:pt-16 sm:pt-6 md:pb-14 sm:pb-6 pt-5 pb-5 text-slate-100 xl:pl-28 xl:pr-28 lg:pl-16 lg:pr-16 md:pl-8 md:pr-8 sm:pl-0 sm:pr-0 pl-2 pr-2">
      <motion.div className="flex flex-row w-full justify-center">
        <motion.div
          className="sm:text-3xl wq:text-2xl text-xl font-bold"
        >
          Ready To Start?
        </motion.div>
      </motion.div>
      <div className="flex flex-row w-full lg:text-base text-sm justify-center ml-2 mt-2">
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="sm:text-2xl lg:w-3/4 md:w-4/5 text-slate-300 w-11/12 wq:text-lg wq:font-normal font-semibold text-center"
        >
          You are only a few steps away from getting started with raising funds
          for your campaign.
        </motion.div>
      </div>
      <div className="flex sm:flex-row flex-col wr:mt-4">
        <div className="sm:w-1/3 w-full mt-5 md:pl-4 md:pr-4 sm:pl-2 sm:pr-2 pl-4 pr-4">
          <div className="flex flex-row justify-center">
            <FiSearch className="text-[#93f1f0] h-16 w-16" />
          </div>
          <div className="flex flex-row mt-1 justify-center">
            <h2 className="font-bold wq:text-lg text-center">Connect Your Wallet</h2>
          </div>
          <div className="flex flex-row text-slate-300 font-semibold text-sm justify-center">
            <h3 className="text-center">Connect your metamask wallet with our website</h3>
          </div>
        </div>
        <div className="sm:w-1/3 w-full mt-5 md:pl-4 md:pr-4 sm:pl-2 sm:pr-2 pl-4 pr-4">
          <div className="flex flex-row justify-center">
            <MdMessage className="text-[#93f1f0] h-16 w-16" />
          </div>
          <div className="flex flex-row mt-1 justify-center">
            <h2 className="font-bold wq:text-lg text-center">Start A Campaign</h2>
          </div>
          <div className="flex flex-row text-slate-300 font-semibold text-sm justify-center">
            <h3 className="text-center">Simply start a campaign by entering necessary details</h3>
          </div>
        </div>
        <div className="sm:w-1/3 w-full mt-5 md:pl-4 md:pr-4 sm:pl-2 sm:pr-2 pl-4 pr-4">
          <div className="flex flex-row justify-center">
            <AiOutlineShoppingCart className="text-[#93f1f0] h-16 w-16" />
          </div>
          <div className="flex flex-row mt-1 justify-center">
            <h2 className="font-bold wq:text-lg text-center">Start Recieving Funds</h2>
          </div>
          <div className="flex flex-row text-slate-300 font-semibold text-sm justify-center">
            <h3 className="text-center">Now you are all set to recieve funds</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Journey;