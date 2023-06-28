import React, { useEffect } from "react";
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";
import bill from "../../assets/jk.webp";
import secure from "../../assets/secure-payment.png";
import dashboard from "../../assets/dashboard.png";
import tools from "../../assets/tools.png";
import secure_img from "../../assets/secure.png";

function Reason() {
    const {ref , inView} = useInView();
    const animation = useAnimation();
  
    useEffect(() => {
      if(inView){
          animation.start({
              x:0,
              transition:{
                  duration:2 , type: 'spring'
              }
          })
      }
      if(!inView){
          animation.start({
              x:'-100vw'
          })
      }
    }, [inView])  
  
  return (
    <div ref={ref} className="pt-12 pb-10 xl:pl-20 xl:pr-20 lg:pl-6 lg:pr-6 md:pl-12 md:pr-12 sm:pl-5 sm:pr-5 pl-2 pr-2">
      <div className="flex flex-row w-full justify-center">
        <motion.div animate={animation} className="sm:text-3xl text-2xl text-center font-semibold text-slate-50">
          Why should I use Fund Chain?
        </motion.div>
      </div>
      <div className="mt-7 flex flex-row">
        <img src={bill} className="h-106 md:block hidden lg:w-1/2 w-1/3 p-8" />
        <div className="xl:w-4/5 w-full pl-6">
          <div className="w-full mt-5">
            <div className="flex flex-row">
            <img src={tools} className="h-16 mt-1 w-16" />
              <div className="pl-4">
                <div className="font-semibold sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#b9e8e7] to-[#b1e0ec]">Easy-To-Manage Tools</div>
                <p className="leading-5 text-sm font-semibold text-slate-200">
                  FundMe provides you easy to use tools so that you can start getting funds easily.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-16">
            <div className="flex flex-row">
              <img src={secure} className="h-16 mt-1 w-16" />
              <div className="pl-4">
                <div className="font-semibold sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#b9e8e7] to-[#b1e0ec]">Send ethers with security</div>
                <p className="leading-5 text-sm font-semibold text-slate-200">
                  You can easily fund a campaign by sending ethers. We guarantee complete security of transaction data.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-16">
            <div className="flex flex-row">
              <img src={dashboard} className="h-16 mt-1 w-16" />
              <div className="pl-4">
                <div className="font-semibold sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#b9e8e7] to-[#b1e0ec]">Project Images and Videos</div>
                <p className="leading-5 text-sm font-semibold text-slate-200">
                  You can go through the images and videos related to a project for getting its detailed information.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-16">
            <div className="flex flex-row">
              <img src={secure_img} className="h-16 mt-1 w-16" />
              <div className="pl-4">
                <div className="font-semibold sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#b9e8e7] to-[#b1e0ec]">Withdraw Funds Without Hassle</div>
                <p className="leading-5 text-sm font-semibold text-slate-200">
                  You can use the raised funds for a project easily by getting the support of majority of funders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reason;