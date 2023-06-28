import React, { useState , useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { useSelector, useDispatch } from 'react-redux';
import { changeSearch} from "../actions/index"

function Navbar(props) {
  const [hi, setHi] = useState("N");

  const myTotal=useSelector((state)=> 
  state.changeTotal
  );

  const myUser=useSelector((state)=> 
  state.changeUser
  );

  const changeHi = () => { 
    if (hi === "Y") {
      setHi("N");
    } else {
      setHi("Y");
    }
  };
  const navigate = useNavigate();

  const { connect, address } = useStateContext();

  const search = useRef();

  const dispatch = useDispatch();

  const Search = () => {
    dispatch(changeSearch(search.current.value));
    navigate("/all")
  }

  const logInOut = () =>{
    localStorage.removeItem('funduser');
    navigate("/");
  }

  return (
    <div className="sticky top-0 z-50">
      <div
        className={`xl:pl-24  lg:pl-16 md:pl-4 xl:pr-24 lg:pr-16 md:pr-4 pr-3 pt-2 pb-2 flex flex-row ${
          props?.yes === "no" ? "bg-gradient-to-r from-[#00040f] to-[#00040f]" : "bg-gradient-to-r from-[#0b0b0b] to-[#191b1e]"
        } w-full bg-slate-600 border border-[#4bdaf3]`}
      >
        <div className="md:hidden flex flex-row ml-4 mr-2 mb-1 mt-1">
          <GiHamburgerMenu
            className="h-8 w-8 mt-0.5 p-1 bg-transparent text-white cursor-pointer"
            onClick={changeHi}
          />
        </div>
        <div
          className={`w-1/4 ${
            props?.yes === "no" ? "md:text-white" : "md:text-white"
          } md:block hidden text-white font-semibold lg:pl-4 pl-1 pt-2 pb-2 md:text-xl text-lg font-sans`}
          id="title"
        >
          FUND CHAIN
        </div>
        <div className={`md:w-3/4 w-full flex flex-row justify-end ${props?.hide === "yes"?"hidden":""}`}>
          <Link to="/profile" className={`mr-4 pt-0.5`}>
            <CgProfile className="h-8 mt-1 w-8 md:text-white text-white" />
          </Link>
          <Link to="/home" className={`mr-4 lg:block hidden pt-0.5`}>
            <AiFillHome className="h-8 mt-1 w-8 text-white" />
          </Link>
          <div className="lg:flex sm:flex hidden flex-row max-w-[458px] py-2 pl-4 pr-2 h-[44px] border border-white mr-4 bg-slate-800 rounded-[100px]">
            <input ref={search}
              type="text"
              placeholder="Search for campaigns"
              className="flex lg:w-72 w-56 font-epilogue font-normal text-[14px] placeholder:text-[#bfc8de] text-white bg-transparent outline-none"
            />

            <div className="w-[30px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer" onClick={Search}>
              <FiSearch className="w-[15px] h-[15px] text-white object-contain" />
            </div>
          </div>
          <div className="flex flex-row">
            <div
              onClick={() => {
                if (address) navigate("/create-campaign");
                else connect();
              }}
            >
              <div className="text-white bg-gradient-to-r from-[#567081] to-[#50c4e7] cursor-pointer pt-2 pb-2 mt-0.5 sm:text-base text-sm pl-3 pr-3 rounded">
                {address ? "CREATE A CAMPAIGN" : "CONNECT"}
              </div>
            </div>
          </div>
        </div>
        <div className={`md:w-3/4 w-full flex flex-row justify-end ${props?.hide === "yes"?"":"hidden"}`}>
          <div className={`flex flex-col justify-center ${myUser===null?"":"hidden"}`}>
          <Link to="/" className="text-white text-lg">Login</Link>
          </div>

          <div className={`flex flex-col justify-center ${myUser!==null?"":"hidden"}`}>
          <div onClick={logInOut} className="text-white cursor-pointer font-semibold">Logout</div>
          </div>

          <div className="flex flex-col justify-center ml-12">
          <Link to="/register" className="text-white text-lg">Register</Link>
          </div>
        </div>
      </div>
   
      <div
        className={`flex-row hidden  bg-gradient-to-r from-[#0e0e0e] to-[#1c1c1c] w-full ${
          props?.yes === "yes" ? "sm:flex" : "sm:hidden"
        } pt-2 pb-2 justify-center 2xl:pl-44 xl:pl-32 lg:pl-24 md:pl-6 2xl:pr-44 xl:pr-32 lg:pr-24 md:pr-6`}
      >
        <div className={`flex flex-col justify-center ${myUser===null?"":"hidden"}`}>
          <Link to="/" className="text-white text-lg">Login</Link>
          </div>

          <div className={`flex flex-col justify-center ${myUser!==null?"":"hidden"}`}>
          <div onClick={logInOut} className="text-white cursor-pointer font-semibold">Logout</div>
          </div>
        <Link to="/all" className="text-slate-800 ml-10 bg-gradient-to-r font-medium cursor-pointer from-slate-400 to-slate-200 pt-2 pb-2 sm:text-base text-sm pl-3 pr-3 rounded">
            ACTIVE CAMPAIGNS - {myTotal}
        </Link>
        <div className="flex flex-col justify-center ml-10">
        <Link to="/register" className="text-sm font-semibold pb-0.5 text-white pt-0.5">
          Register
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
