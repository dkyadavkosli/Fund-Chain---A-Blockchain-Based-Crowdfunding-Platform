import React, { useState , useEffect } from "react";
import CampaignCard from "../../components/CampaignCard";
import loader from "../../assets/loader.svg";
import { useNavigate } from "react-router-dom";
import pic from "../../assets/fundIcon.png";
import axios from 'axios'
import { useStateContext } from "../../context"; 

function ProfileCom({ isLoading, campaigns, campaigns1 }) {
  const navigate = useNavigate();

  const [favCamp, setFavCamp] = useState();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  const [type, setType] = useState("Campaigns");

  const myInvestment = () => {
    setType("Investments");
  };
  const myCampaign = () => {
    setType("Campaigns");
  };
  const myFavourite = () => {
    setType("Favourites");
  };

  const { address , getFavouriteProjects } = useStateContext();

  const getFavs = async () => {
    try {
      const res = await axios.get("/api/favourite/user/" + address);
      let temp = res.data;
      let arr = [];
      for(var i = 0; i<temp.length;i++){
          arr.push(temp[i]?.project_id);
      }
      const camps = await getFavouriteProjects(arr);
      setFavCamp(camps);
    } catch (err) {
      window.alert("Oops!! Something went wrong.");
    }
  };

  useEffect(() => {
    getFavs();
  }, [])

  return (
    <div className="bg-[#00040f] min-h-[640px] xl:pl-32 lg:pl-24 sm:pl-12 lg:pr-32 xl:pr-32 pt-4 sm:pr-12 pl-3 pr-3">
      <div className="w-full sm:flex hidden justify-start items-center p-4 bg-gradient-to-r from-[#303236] to-[#272b34] h-[120px] rounded-[10px]">
        <img
          src={pic}
          alt="money"
          className="w-[60px] h-[60px] object-contain"
        />
        <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
          {type === "Campaigns"
            ? "ALL ACTIVE PROJECTS CREATED BY YOU"
            : type === "Investments"
            ? "ALL PROJECTS YOU HAVE INVESTED IN"
            : "ALL PROJECTS YOU SHOWED INTEREST IN"}
        </h4>
      </div>

      <div className="w-full flex justify-start items-center sm:p-4 p-1 h-[120px] rounded-[10px]">
        <button
          onClick={myCampaign}
          className={`sm:p-3 p-1 text-slate-100 md:pl-16 sm:pl-8 md:pr-16 sm:pr-8 wq:pl-8 wq:pr-8 pl-3 pr-3 sm:text-base text-sm border-0 ${
            type === "Campaigns" ? "border-b-2" : ""
          } border-white`}
        >
          MY CAMPAIGNS
        </button>
        <button
          onClick={myInvestment}
          className={`sm:p-3 p-1 text-slate-100 md:pl-16 sm:pl-8 md:pr-16 sm:pr-8 wq:pl-8 wq:pr-8 pl-3 pr-3 sm:text-base text-sm border-0 ${
            type === "Investments" ? "border-b-2" : ""
          } border-white`}
        >
          MY INVESTMENTS
        </button>
        <button
          onClick={myFavourite}
          className={`sm:p-3 p-1 text-slate-100 md:pl-16 sm:pl-8 md:pr-16 sm:pr-8 wq:pl-8 wq:pr-8 pl-3 pr-3 sm:text-base text-sm border-0 ${
            type === "Favourites" ? "border-b-2" : ""
          } border-white`}
        >
          MY FAVOURITES
        </button>
      </div>

      <div className="flex flex-wrap gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] mt-[20px] object-contain"
          />
        )}

        {!isLoading && campaigns?.length === 0 && campaigns1?.length === 0 && favCamp?.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] mt-[20px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}
      </div>
      {type === "Campaigns" ? (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 pt-4 pb-4 sm:grid-cols-2 grid-cols-1 items-baseline">
          {!isLoading &&
            campaigns?.length > 0 &&
            campaigns?.map((campaign) => (
              <CampaignCard
                key={campaign?.pId}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))}
        </div>
      ) : type === "Investments" ? (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 pt-4 pb-4 sm:grid-cols-2 grid-cols-1 items-baseline">
          {!isLoading &&
            campaigns1?.length > 0 &&
            campaigns1?.map((campaign) => (
              <CampaignCard
                key={campaign?.pId}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))}
        </div>
      ) : (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 pt-4 pb-4 sm:grid-cols-2 grid-cols-1 items-baseline">
          {!isLoading &&
            favCamp?.length > 0 &&
            favCamp?.map((campaign) => (
              <CampaignCard
                key={campaign?.pId}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default ProfileCom;
