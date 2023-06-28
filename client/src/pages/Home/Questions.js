import React, { useState , useEffect } from "react";
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

function Questions() {
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

  const [one , setOne] = useState("Y")
  const [two , setTwo] = useState("N")
  const [three , setThree] = useState("N")
  const [four , setFour] = useState("N") 

  const changeOne = () => {
    if(one==="Y"){
        setOne("N")
    }else{
        setOne("Y")
    }
  }

  const changeTwo = () => {
    if(two==="Y"){
        setTwo("N")
    }else{
        setTwo("Y")
    }
  }

  const changeThree = () => {
    if(three==="Y"){
        setThree("N")
    }else{
        setThree("Y")
    }
  }

  const changeFour = () => {
    if(four==="Y"){
        setFour("N")
    }else{
        setFour("Y")
    }
  }

  return (
    <div ref={ref} className="pt-8 pb-12 xl:pl-44 xl:pr-44 lg:pl-32 lg:pr-32 md:pl-16 md:pr-16 sm:pl-8 sm:pr-8 pl-4 pr-4 text-slate-50 mb-6">
    <div className="flex flex-row w-full justify-center">
      <motion.div animate={animation}  className="mb-5 md:text-3xl sm:text-2xl text-xl font-semibold text-slate-50">Frequently Asked Questions About Crowd Funding</motion.div>  
      </div>
      <div className="mt-3">
        <div className="flex flex-row w-full mb-4 justify-between">
          <h3 className="sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#cae8e7] to-[#b5d3db] text-lg font-semibold">
            Why should we use crowdfunding?
          </h3>
          <button onClick={changeOne} className="text-lg text-slate-200 font-bold">{one==="N"?"+":"-"}</button>
        </div>
        <hr className="font-bold" />
        <h4 className={`mt-3 text-slate-300 ${one==="Y"?"":"hidden"}`}>
           Crowdfunding is one of the most widely used ways for raising funds for a project or a project. 
           Fund Chain provides you a platform where you can publish a project and start receiving funds for your project. 
           We have helped a lot of people in raising funds for projects through this platform.
        </h4>
      </div>
      <div className="mt-4">
        <div className="flex flex-row w-full mb-4 justify-between">
          <h3 className="sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#cae8e7] to-[#b5d3db] text-lg font-semibold">
            How much percentage of the donation goes to project?
          </h3>
          <button onClick={changeTwo} className="text-lg text-slate-200 font-bold">{two==="N"?"+":"-"}</button>
        </div>
        <hr className="font-bold" />
        <h4 className={`mt-3 text-slate-300 ${two==="Y"?"":"hidden"}`}>
        Fund Chain is a platform that is completely non-profit. No extra charges are charged to the funder or the reciever.  
        100% of the donated amount goes to the project creator.
        </h4>
      </div>
      <div className="mt-4">
        <div className="flex flex-row w-full mb-4 justify-between">
          <h3 className="sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#cae8e7] to-[#b5d3db] text-lg font-semibold">
            Is it free to create a project?
          </h3>
          <button onClick={changeThree} className="text-lg text-slate-200 font-bold">{three==="N"?"+":"-"}</button>
        </div>
        <hr className="font-bold" />
        <h4 className={`mt-3 text-slate-300 ${three==="Y"?"":"hidden"}`}>
          Fund Chain is a platform that is completely non-profit. 
          You can create a project and start recieving funds for your project.
        </h4>
      </div>
      <div className="mt-4">
        <div className="flex flex-row w-full mb-4 justify-between">
          <h3 className="sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#cae8e7] to-[#b5d3db] text-lg font-semibold">
            Can we change deadline of a project?
          </h3>
          <button onClick={changeFour} className="text-lg text-slate-200 font-bold">{four==="N"?"+":"-"}</button>
        </div>
        <hr className="font-bold" />
        <h4 className={`mt-3 text-slate-300 ${four==="Y"?"":"hidden"}`}>
          No. You can not change the deadline of a project once the project is published. 
          So, it's advised to decide a good deadline for your project after taking into consideration all important factors.
        </h4>
      </div>
    </div>
  );
}

export default Questions;