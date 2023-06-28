import React from "react";
import { daysLeft } from "../utils";
import pic from "../assets/Disasters.webp";

const FundCard = ({title,target,image,deadline,handleClick,amountRaised,visible}) => {
  const remainingDays = daysLeft(deadline);
  return (
    <div
      className={`ml-1 mr-1 ${
        visible?._hex === "0x00" ? "" : "hidden"
      } hover:scale-105 rounded-[6px] pt-1 pl-1 pr-1 mb-3 bg-gradient-to-r from-[#40c4cb] to-[#8bdee2]  hover:from-[#02e7fc] hover:to-[#55eff5] cursor-pointer`}  onClick={handleClick}
    >
      <img
        src={image || pic}
        alt="fund"
        className="w-full h-[258px] object-cover rounded-[6px]"
      />

      <div className="flex flex-col w-full p-4">
        <div className="flex flex-row w-full justify-center">
          <p className="font-epilogue font-semibold text-[16px] text-slate-800 sm:truncate">
            {title}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#35363b] leading-[22px]">
            {amountRaised}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#16161a] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#35363b] leading-[22px]">
            {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#16161a] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FundCard;
