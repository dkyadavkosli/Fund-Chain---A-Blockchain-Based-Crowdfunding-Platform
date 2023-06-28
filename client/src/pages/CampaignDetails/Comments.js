import React, { useRef, useState , useEffect } from "react";
import pic from "../../assets/fundIcon.png";
import axios from "axios"
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Comments(pId) {

  const desc = useRef();

  const myUser=useSelector((state)=>
  state.changeUser
  );

  const nav = useNavigate();

  const [coms, setComs] = useState();

  const getComs = async () => {
    try {
      const res = await axios.get("/api/comment/project/" + pId?.pId);
      setComs(res.data);
    } catch (err) {
      window.alert("Oops!! Something went wrong.");
    }
  };

  useEffect(() => {
    getComs();
  }, [pId?.pId])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
      const project = {
        user_name: myUser?.username ? myUser?.username : "User",
        project_id:pId?.pId,
        desc: desc.current.value
      };
      try {
        await axios.post("/api/comment/create", project);
        window.alert("Added Your Comment")
        nav("/home")
      } catch (err) {
        window.alert("OOps!! Something went wrong")
      }
  };

  return (
    <div className="text-white w-full mt-4">
      <h2 className="font-epilogue sm:text-2xl text-xl text-white">
        Post A Comment
      </h2>
      <div className="w-full mt-3">
        <textarea
        ref={desc}                                                                                                                                                                                                                                                                                                                                
          required
          rows={2}
          placeholder="Add a Comment"
          className="py-[15px] sm:px-[25px] px-[15px] w-full outline-none border-[1px] border-[#8e8e9e] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#a1a7b5] rounded-[10px] sm:min-w-[300px]"                                    
        />                                                                    
      </div>
      <div className="mt-2">
      <div onClick={handleSubmit} className="py-[5px] px-[5px] bg-purple-700 max-w-[160px] text-center text-white border-[3px] rounded cursor-pointer">Post Comment</div>
      </div>
      <h2 className="font-epilogue sm:text-2xl text-xl text-white mt-8">
        See What Investors Have To Say
      </h2>
      <div className="h-96 w-full border-[3px] overflow-y-scroll rounded border-slate-200 mt-5 lg:pl-16 lg:pr-16 md:pl-12 md:pr-12 sm:pl-8 sm:pr-8 pl-5 pr-5 pt-1 pb-1 no-scrollbar">
        <div className="grid grid-cols-1">
          {coms?.map((item, i) => {
            return (
              <div className="p-3 mt-1 mb-1 bg-[#39393a] ml-1 mr-1  rounded flex flex-row">
                <img
                  src={pic}
                  alt="money"
                  className="w-[50px] h-[50px] object-contain"
                />
                <div className="ml-6 pt-[6px]">
                <h2 className="text-white text-lg">{item?.user_name}</h2>
                <p className="text-slate-200">
                  {item?.desc}
                </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Comments;
