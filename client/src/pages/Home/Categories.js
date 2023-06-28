import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import technology from "../../assets/technology.png";
import service from "../../assets/service.png";
import product from "../../assets/product.png";
import other from "../../assets/other.png";
import { changeCategory } from "../../actions/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Categories() {
  const { ref, inView } = useInView();
  const animation = useAnimation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTech = () => {
    dispatch(changeCategory("TECHNOLOGY"));
    navigate("/all");
  };

  const getService = () => {
    dispatch(changeCategory("SERVICE"));
    navigate("/all");
  };

  const getProduct = () => {
    dispatch(changeCategory("PRODUCT"));
    navigate("/all");
  };

  const getOther = () => {
    dispatch(changeCategory("OTHER"));
    navigate("/all");
  };
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          duration: 2,
          type: "spring",
        },
      });
    }
    if (!inView) {
      animation.start({
        x: "-100vw",
      });
    }
  }, [inView]);
  return (
    <div
      ref={ref}
      className="md:pt-12 sm:pt-6 md:pb-14 sm:pb-6 pt-5 pb-5 text-slate-100 xl:pl-36 xl:pr-36 lg:pl-16 lg:pr-16 md:pl-8 md:pr-8 sm:pl-2 sm:pr-2 pl-2 pr-2 mb-4"
    >
      <div className="flex flex-row w-full justify-center">
        <motion.div
          animate={animation}
          className="mb-5 md:text-3xl sm:text-2xl text-xl font-semibold text-slate-50"
        >
          EXPLORE WHAT'S YOUR CHOICE
        </motion.div>
      </div>
      <div className="mt-4 pl-6 pr-6 grid md:grid-cols-4 wq:grid-cols-2 items-baseline">
        <div
          onClick={getTech}
          className="cursor-pointer pt-10 pb-10 md:mt-0 mt-2 ml-2 mr-2 rounded-md border bg-[#292c2d] hover:bg-[#15e7f3] border-slate-200 shadow-lg shadow-slate-500"
        >
          <div className="flex flex-row justify-center w-full">
            <img src={technology} className="h-16 mt-1 w-16" />
          </div>
          <div className="flex flex-row text-slate-100 mt-3 justify-center">
            <h3>TECHNOLOGY</h3>
          </div>
        </div>
        <div
          onClick={getProduct}
          className="cursor-pointer pt-10 pb-10 md:mt-0 mt-2 ml-2 mr-2 rounded-md border bg-[#292c2d] hover:bg-[#15e7f3] border-slate-200 shadow-lg shadow-slate-500"
        >
          <div className="flex flex-row justify-center w-full">
            <img src={product} className="h-16 mt-1 w-16" />
          </div>
          <div className="flex flex-row text-slate-100 mt-3 justify-center">
            <h3>PRODUCT</h3>
          </div>
        </div>
        <div
          onClick={getService}
          className="cursor-pointer pt-10 pb-10 md:mt-0 mt-2 ml-2 mr-2 rounded-md border bg-[#292c2d] hover:bg-[#15e7f3] border-slate-200 shadow-lg shadow-slate-500"
        >
          <div className="flex flex-row justify-center w-full">
            <img src={service} className="h-16 mt-1 w-16" />
          </div>
          <div className="flex flex-row text-slate-100 mt-3 justify-center">
            <h3>SERVICES</h3>
          </div>
        </div>
        <div
          onClick={getOther}
          className="cursor-pointer pt-10 pb-10 md:mt-0 mt-2 ml-2 mr-2 rounded-md border bg-[#292c2d] hover:bg-[#15e7f3] border-slate-200 shadow-lg shadow-slate-500"
        >
          <div className="flex flex-row justify-center w-full">
            <img src={other} className="h-16 mt-1 w-16" />
          </div>
          <div className="flex flex-row text-slate-100 mt-3 justify-center">
            <h3>OTHERS</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
