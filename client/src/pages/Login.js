import React, { useRef , useEffect } from "react";
import Navbar from "../components/Navbar";
import { AiFillUnlock } from "react-icons/ai";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { changeUser } from "../actions/index";
import { useDispatch } from "react-redux";

function Login() {
  const email = useRef();
  const password = useRef();

  const myVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };

  const history = useNavigate();
  const dispatch = useDispatch();

  const curr = JSON.parse(localStorage.getItem("funduser"));

  const hi = () => {
    if (curr !== null) {
      dispatch(changeUser(curr));
      history("/home");
    }
  };

  useEffect(() => {
    hi();
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const res = await axios.post("/api/entry/login", user);
      dispatch(changeUser(res.data));
      localStorage.removeItem('funduser');
      localStorage.setItem('funduser', JSON.stringify(res.data))
      history("/home");
    } catch (err) {
      window.alert("Invalid credentials");
      window.location.reload();
    }
  };

  return (
    <motion.div
      className="min-h-[750px] bg-[#242528]"
      variants={myVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Navbar hide="yes" />
      <div className="md:h-44 h-32 w-full flex flex-col justify-center bg-[#00040f] xl:pl-52 lg:pl-36 md:pl-24 sm:pl-12 pr-4 pl-4 bg-no-repeat bg-cover">
        <motion.div
          initial={{ x: "-10vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="md:text-2xl sm:text-lg  text-slate-200 font-semibold"
        >
          CONTINUE YOUR JOURNEY
        </motion.div>
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="xl:text-5xl md:text-4xl sm:text-3xl text-white text-2xl font-semibold"
        >
          LOGIN YOUR ACCOUNT
        </motion.div>
        <motion.div
          initial={{ x: "-10vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="md:text-2xl sm:text-lg  text-slate-200 font-semibold"
        >
          AND FUND YOUR FAVOURITE PROJECTS
        </motion.div>
      </div>
      <div className="xl:pl-52 xl:pr-52 lg:pl-36 lg:pr-36 md:pl-24 md:pr-24 sm:pl-12 sm:pr-12 pl-4 pr-4 pt-6 pb-6 flex w-full bg-[#242528] flex-row">
        <div className="md:w-2/3 w-full border-2 border-[#84eaf6] p-3">
          <div className="w-full pb-3">
            <AiFillUnlock className="w-full text-white h-44" />
          </div>
          <form method="POST">
            <div className="flex sm:flex-row flex-col">
              <div className="flex flex-col justify-center w-1/4 mr-1">
                <h2 className=" text-white">EMAIL</h2>
              </div>
              <div className="flex flex-row sm:mt-0 mt-1 sm:w-3/4 w-full">
                <input
                  type="email"
                  ref={email}
                  required
                  className="w-full h-8 bg-slate-100 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500"
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col mt-6 ">
              <div className="flex flex-col justify-center w-1/4 mr-1">
                <h2 className=" text-white">PASSWORD</h2>
              </div>
              <div className="flex flex-row sm:w-3/4 w-full sm:mt-0 mt-1">
                <input
                  type="password"
                  ref={password}
                  required
                  className="w-full h-8 bg-slate-100 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500"
                />
              </div>
            </div>
            <div className="w-full mt-6 flex flex-row justify-center">
              <button
                onClick={handleClick}
                type="submit"
                className="text-lg pt-2 w-1/2 rounded pb-2  border-white bg-gradient-to-r from-sky-600 to-sky-400 text-white"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
