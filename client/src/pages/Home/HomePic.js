import React from "react";
import robot from "../../assets/robot.png"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Homepic() {

  const nav = useNavigate();

  const navigates = () => {
    nav('/all')
  }

  return (
    <div
      id="mid"
      className="sm:h-120 h-115 font-serif w-full flex flex-row justify-start bg-no-repeat bg-cover bg-[#00040f]"
    >
      <div className={`text-white h-full flex flex-col justify-center xl:pl-24 lg:pl-14 md:pl-20 sm:pl-20 pl-4 xl:pr-16 lg:pr-3 md:pr-12 pr-3 lg:w-1/2 md:w-3/4 sm:w-11/12`}>
        <motion.div
          initial={{ x: "-10vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="text-slate-400 xl:text-6xl md:text-6xl sm:text-5xl text-4xl sm:font-medium"
        >
          Raise Funds For
        </motion.div>
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="xl:text-6xl md:text-6xl sm:text-5xl text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#93f1f0] to-[#4bb2ce] wq:pt-1 sm:mt-6 mt-3 font-medium w-full"
        >
          Your Campaign
        </motion.div>
        <motion.div
          initial={{ x: "-10vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="text-slate-400 xl:text-6xl md:text-6xl sm:text-5xl text-4xl w-full wq:pt-1 pt-2 sm:mt-6 mt-3 font-medium"
        >
          With Ease
        </motion.div>
        <h3 className="sm:mt-8 mt-3 xl:text-2xl lg:mr-3 md:mr-8 sm:mr-0 mr-3 text-xl text-slate-50">
          If You Are Up For A Good Cause And Want Funding, You Landed At The
          Right Platform.
        </h3>
        <div className="sm:mt-4 mt-1">
          <button onClick={navigates} className="text-white bg-gradient-to-r cursor-pointer from-[#567081] to-[#50c4e7] rounded sm:mt-2 mt-4 pt-3 pb-3 sm:text-xl pl-3 pr-3">
            EXPLORE MORE
          </button>
        </div>
      </div>
      
      <div className=" bg-[#00040f] text-slate-50 lg:flex font-serif w-1/2 pt-8 hidden flex-col justify-center">
        <img className="h-full w-full bg-[#00040f]" src={robot} alt=""/>
      </div>

    </div>
  );
}

export default Homepic;
