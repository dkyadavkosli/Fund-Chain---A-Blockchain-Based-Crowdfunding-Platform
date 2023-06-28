import React, { useRef } from "react";
import pic from "../../assets/fundIcon.png";
import { useStateContext } from "../../context";
import { useNavigate } from "react-router-dom";

function Track({updates , address, owner, pId, remainingDays}) {
  const { makeUpdate , makeResponse } = useStateContext();

  const desc = useRef();
  const _date = useRef();

  const nav = useNavigate();

  const handleSubmit = async () => {
    if(remainingDays>0){
      window.alert("Deadline has not been reached")
    }else{
    try{
    const data = await makeUpdate(pId, desc.current.value, new Date(_date.current.value).getTime());
    nav("/");
    }catch(e){
      window.alert("Not enough Amount Collected")
    }
  }
  };

  const handleResponse = async (vote) => {
    if(address === owner){
        window.alert("You are the owner. You can't vote")
    }else if(updates[0]?.voters?.includes(address)){
      window.alert('You already responded to this request')
    }else if(updates[0]?.voters?.includes(address)){
      window.alert('You already responded to this request')
    }
    else{
    const data = await makeResponse(pId, 0, address, vote);
    nav("/");
    }
  };

  return (
    <div className="text-white w-full mt-4">
      <h2 className={`font-epilogue sm:text-2xl ${address===owner ? "":"hidden"} text-xl text-white`}>
        Post An Update
      </h2>
      <div className={`flex mt-4 gap-[40px] ${address===owner ? "":"hidden"}`}>
          <input ref={_date} type="date" className="w-full outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#999eac] rounded-[10px] py-[15px] sm:px-[25px] px-[15px]" placeholder="Enter end date of update"/>
      </div>
      <div className={`w-full mt-3 ${address===owner ? "":"hidden"}`}>
        <textarea
        ref={desc}                                                                                                                                                                                                                                                                                                                                
          required
          rows={2}
          placeholder="Add a Comment"
          className="py-[15px] sm:px-[25px] px-[15px] w-full outline-none border-[1px] border-[#8e8e9e] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#a1a7b5] rounded-[10px] sm:min-w-[300px]"                                    
        />                                                                    
      </div>
      <div className={`mt-2 ${address===owner ? "":"hidden"}`}>
      <div onClick={handleSubmit} className="py-[5px] px-[6px] bg-purple-700 max-w-[120px] text-white text-center border-[3px] rounded cursor-pointer">Post Update</div>
      </div>
      <h2 className="font-epilogue sm:text-2xl text-xl text-white mt-8">
        Track The Progress
      </h2>
      <div className="h-96 w-full border-[3px] overflow-y-scroll rounded border-slate-200 mt-5 lg:pl-16 lg:pr-16 md:pl-12 md:pr-12 sm:pl-8 sm:pr-8 pl-5 pr-5 pt-1 pb-1 no-scrollbar">
        <div className="grid grid-cols-1">
          {updates?.map((item, i) => {
            return (
              <div className="p-3 mt-1 mb-1 bg-[#39393a] ml-1 mr-1 rounded flex flex-row">
                <img
                  src={pic}
                  alt="money"
                  className="w-[50px] h-[50px] object-contain"
                />
                <div className="ml-6 pt-[6px]">
                <h3 className="text-white text-lg">Admin</h3>
                <p className="text-slate-300">
                  {item?.update}
                </p>
                <div className="flex gap-[15px] mt-3">
                  <div onClick={()=>handleResponse(1)} className="pt-2 pb-2 pl-3 pr-3 bg-blue-600 font-serif rounded text-white text-sm cursor-pointer">Allow</div>
                  <div onClick={()=>handleResponse(0)} className="pt-2 pb-2 pl-3 pr-3 bg-purple-600 font-serif rounded text-white text-sm cursor-pointer">Deny</div>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Track;
