import React , {useEffect , useState} from "react";
import pic from "../assets/fundIcon.png";
import { daysLeft } from "../utils";
import { BsSuitHeart } from "react-icons/bs";
import axios from 'axios'
import { useStateContext } from "../context"; 
import { MdOutlineErrorOutline } from "react-icons/md";

const CampaignCard = ({owner,title,description,target,deadline,amountRaised,image,handleClick,visible,yes,id,hi}) => {
  const remainingDays = daysLeft(deadline);
  const { address } = useStateContext();

  const [fav, setFav] = useState();

  const [modal, setModal] = useState("N");

  const changeModal = () => {
    setModal("N");
  };

  const getPets = async () => {
    try {
      const res = await axios.get("/api/favourite/user/" + address);
      let temp = res.data;
      let arr = [];
      for(var i = 0; i<temp.length;i++){
          arr.push(temp[i].project_id);
      }
      setFav(arr);
    } catch (err) {
      window.alert("Oops!! Something went wrong.");
    }
  };

  useEffect(() => {
    getPets();
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
      const project = {
        user_id: address,
        project_id:id, 
      };
      try {
        await axios.post("/api/favourite/create", project);
        setModal("Y");
        setTimeout(changeModal, 5000);
      } catch (err) {
        window.alert("OOps!! Something went wrong")
      }
  };

  return (
    <div
      className={`ml-1 mr-1 ${
        visible?._hex === "0x00" ? "" : "hidden"
      } hover:scale-105 rounded-[12px] mb-3 bg-[#292c2d] cursor-pointer`}
    >
      <BsSuitHeart onClick={handleSubmit} className={`bg-white p-2 h-10 w-10 rounded-3xl ${address===owner?"hidden":""} ${yes==="Y"?"":"hidden"} ${fav?.includes(id) ? "hidden" : ""} cursor-pointer text-purple-800`} style={{ position: "absolute", top: "10px" , right:"10px" }}/>
      <img
        src={image || pic}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-t-[15px]"
        onClick={handleClick}
      />

      <div className="flex flex-col p-4" onClick={handleClick}>
        <div className="block">
          <div className="flex flex-row w-full justify-center">
          <p className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </p>
          </div>
          <div className="flex flex-row w-full justify-center">
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
          </div>
        </div> 

        <div
          className={`${
            modal === "N" ? "hidden" : ""
          } bg-purple-600 mt-3 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}
          // style={{ position: "absolute", top: "4px", right: "4px" }}
        >
          <MdOutlineErrorOutline className="h-8 w-8 animate-bounce" />
          <div className="mt-[3px] ml-3">Added To Favourites</div>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountRaised}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={pic} alt="user" className="w-1/2 h-1/2 object-contain"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
