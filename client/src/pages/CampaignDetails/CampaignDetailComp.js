import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context";
import Loader from "../../components/Loader";
import { calculateBarPercentage, daysLeft } from "../../utils";
import pic from "../../assets/fundIcon.png";
import CountBox from "../../components/CountBox";
import CustomButton from "../../components/CustomButton";
import CampaignCard from "../../components/CampaignCard";
import { BsTwitter } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import {
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import pic2 from "../../assets/whatsapp.png";
import pic3 from "../../assets/twitter.png";
import pic4 from "../../assets/mail.png";
import Track from "./Track";
import { MdOutlineErrorOutline } from "react-icons/md";

function CampaignDetailComp({ Loading, campaigns }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  const {
    donate,
    getDonations,
    contract,
    abort,
    address,
    deleteProject,
    withdraw,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const deleteCam = async () => {
    window.alert(
      "Project's deadline has been reached. You have to delete the project"
    );
    setIsLoading(true);
    const state_pId = state.pId;
    const data = await deleteProject(state_pId);
    setIsLoading(false);
    navigate("/");
  };

  const goHome = async () => {
    window.alert("Project's deadline has been reached");
    navigate("/");
  };

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  useEffect(() => {
    if (
      remainingDays < 0 &&
      address !== state?.owner &&
      !state?.donators.includes(address)
    ) {
      goHome();
    }
  }, [remainingDays]);

  useEffect(() => {
    if (remainingDays < 0 && address === state?.owner) {
      deleteCam();
    }
  }, [remainingDays]);

  const myUser = useSelector((state) => state.changeUser);

  const [modal, setModal] = useState("N");

  const changeModal = () => {
    setModal("N");
  };

  const handleDonate = async () => {
    if (state.donators.includes(address)) {
      window.alert("You have already funded this project");
      setModal("Y");
      setTimeout(changeModal, 5000);
    } else {
      setIsLoading(true);
      const don = await donate(state.pId, amount, myUser?.username);
      setIsLoading(false);
      navigate("/home");
    }
  };

  const [modal2, setModal2] = useState("N");

  const changeModal2 = () => {
    setModal2("N");
  };

  const handleWithdraw = async () => {
    if (remainingDays >= 0) {
      setModal2("Y");
      setTimeout(changeModal2, 5000);
    } else {
      setIsLoading(true);
      await withdraw(state.pId);
      setIsLoading(false);
      window.alert("Amount has been credited to your Wallet");
      navigate("/home");
    }
  };

  const handleAbort = async () => {
    setIsLoading(true);
    await abort(state.pId);
    setIsLoading(false);
    navigate("/home");
  };

  return (
    <div className=" xl:pl-32 lg:pl-16 sm:pl-8 xl:pr-32 lg:pr-16 sm:pr-8 pl-3 pr-3 pt-8 pb-8 w-full">
      {isLoading && <Loader />}
      <div className="flex lg:flex-row flex-col w-full">
        <div className="lg:w-7/12 w-full">
          <div className="lg:block sm:hidden w-full">
            <img
              src={state.image || pic}
              className="lg:w-full w-full border border-gray-500 rounded-t-sm rounded-b-sm h-72"
            />
            <div className="text-lg text-slate-200 lg:w-full w-full pl-2 pr-2 pt-6 pb-6 flex flex-row justify-center border border-gray-500">
              <h2 className="truncate">{state.title}</h2>
            </div>
            <div className=" text-slate-200 lg:w-full w-full pl-2 pr-2 pt-6 pb-6 flex flex-row justify-center border rounded-b-sm border-gray-500">
              <h3 className="truncate">{state?.tagline}</h3>
            </div>
          </div>
          <div className="lg:hidden hidden w-full sm:flex flex-row">
            <img
              src={state.image || pic}
              className="w-1/2 border border-gray-500 h-48"
            />
            <div className="w-1/2 flex flex-col justify-center h-48 border border-gray-500">
              <div className="h-24 flex flex-col pl-4 pr-4 justify-center text-slate-200">
                <h2 className="truncate">{state.title}</h2>
              </div>
              <div className="h-24 flex pl-4 pr-4 border-t border-gray-500 flex-col justify-center text-slate-200">
                <h3 className="truncate">{state.tagline}</h3>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#19f189]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountRaised
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full lg:mt-0 mt-6 lg:ml-6 flex flex-col p-4 bg-[#272730] rounded-[10px]">
          <p className="font-epilogue fount-medium text-[25px] leading-[30px] text-center text-[#e0e1ea]">
            Fund the campaign
          </p>
          <div className="mt-[25px]">
            <input
              type="number"
              placeholder="ETH 0.1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#7f7f8a] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#7a8191] rounded-[10px]"
            />

            <div className="my-[10px] p-4 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                Back It Because You Believe In It.
              </h4>
              <p className="mt-[10px] font-epilogue font-normal leading-[22px] text-[#808191]">
                We are all in this together. Each and every one of us can make a
                difference.
              </p>
            </div>

            <div className="my-[10px] p-4 mb-4 mt-2 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                Contact the Fundraiser
              </h4>
              <p className="mt-[6px] font-epilogue font-normal leading-[22px] text-[#808191]">
                Head Office Location - {state?.hq_address}
              </p>
              <div className="mt-[12px] w-full flex flex-row ">
                <a href={state.twitter} target="_blank">
                  <BsTwitter className="h-6 w-6 text-white mr-5" />
                </a>
                <a href={state.email} target="_blank">
                  <GrMail className="h-6 w-6 text-white mr-5" />
                </a>
                <a href={state.instagram} target="_blank">
                  <AiFillInstagram className="h-6 w-6 text-white mr-5" />
                </a>
                <a href={state.linkedIn} target="_blank">
                  <AiFillLinkedin className="h-6 w-6 text-white mr-5" />
                </a>
              </div>
            </div>

            <div
              className={`${
                modal === "N" ? "hidden" : ""
              } bg-purple-600 mt-3 mb-3 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}
              // style={{ position: "absolute", top: "4px", right: "4px" }}
            >
              <MdOutlineErrorOutline className="h-8 w-8 animate-bounce" />
              <div className="mt-[3px] ml-3">
                Can't fund. You might already funded this campaign
              </div>
            </div>

            <div
              className={`${
                modal2 === "N" ? "hidden" : ""
              } bg-purple-600 mt-3 mb-3 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}
              // style={{ position: "absolute", top: "4px", right: "4px" }}
            >
              <MdOutlineErrorOutline className="h-8 w-8 animate-bounce" />
              <div className="mt-[3px] ml-3">
                Deadline for this project has not been reached
              </div>
            </div>

            <CustomButton
              btnType="button"
              title="Fund Campaign"
              styles={`w-full bg-[#8c6dfd] ${
                address === state.owner || address === "IDHAR" ? "hidden" : ""
              }`}
              handleClick={handleDonate}
            />

            <CustomButton
              btnType="button"
              title="Withdraw Funds"
              styles={`w-full bg-[#8c6dfd] ${
                address === state.owner &&
                remainingDays < 0 &&
                address !== "IDHAR"
                  ? ""
                  : "hidden"
              }`}
              handleClick={handleWithdraw}
            />

            <CustomButton
              btnType="button"
              title="Abort Project"
              styles={`w-full bg-[#8c6dfd] ${
                address === state.owner &&
                remainingDays >= 0 &&
                address !== "IDHAR"
                  ? ""
                  : "hidden"
              }`}
              handleClick={handleAbort}
            />

            <CustomButton
              btnType="button"
              title="Disapprove Project"
              styles={`w-full bg-[#8c6dfd] ${
                address === "IDHAR" ? "" : "hidden"
              }`}
              handleClick={deleteCam}
            />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:mt-16 mt-8">
        <CountBox title="Days Left" value={remainingDays} />
        <CountBox
          title={`Raised of ${state.target}`}
          value={state.amountRaised}
        />
        <CountBox title="Total Backers" value={state.donators.length} />
        <CountBox title="Campaign Started By" value={state?.owner_name} />
      </div>

      <div className="lg:mt-16 mt-10">
        <h2 className="font-epilogue sm:text-2xl text-xl text-white">
          Story Behind The Campaign
        </h2>
        <p className="text-slate-200 mt-5 fomnt-serif leading-15">
          {state.description}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:mt-16 mt-8">
        <CountBox title="Previously Raised" value={state.prev_Amount_raised} />
        <CountBox title="Country" value={state.country} />
        <CountBox title="Valuation" value={state.valuation} />
        <CountBox title="Minimum Investment" value={state.min_invest} />
      </div>

      <div className="lg:mt-12 mt-6">
        <h2 className="font-epilogue sm:text-2xl text-xl text-white">
          Project Verification Document
        </h2>
        <img
          src={state?.doc || pic}
          className="lg:w-full w-full border border-gray-500 rounded-t-sm rounded-b-sm h-96 mt-5"
        />
      </div>

      <div className="lg:mt-16 mt-10">
        <h2 className="font-epilogue sm:text-2xl text-xl text-white">
          Look Who Have Funded Till Now
        </h2>
        <div className="h-96 w-full border-[3px] overflow-y-scroll rounded border-slate-200 mt-5 pl-2 pr-2 pt-1 pb-1 no-scrollbar">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            {state.donators.map((item, i) => {
              return (
                <div className="p-3 mt-1 mb-1 bg-[#39393a] ml-1 mr-1 rounded">
                  <h3 className="text-white">{state.donators_name[i]}</h3>
                  <p className="text-slate-200">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:mt-16 mt-10">
        <h2 className="font-epilogue sm:text-2xl text-xl text-white">
          Business Plan
        </h2>
        <p className="text-slate-200 mt-5 fomnt-serif leading-15">
          {state.plan}
        </p>
      </div>

      <div className="mt-10 text-white">
        <h2 className="sm:text-2xl text-xl font-epilogue mb-3 text-white">
          Share Campaign On Social Media
        </h2>
        <div className="">
          <WhatsappShareButton
            url={`Check Out And Fund This Campaign Created On Fund Chain - ${window.location.href}`}
          >
            <div className="pl-4 pr-4 pt-2 pb-2 flex border-[2px] rounded-xl sm:ml-0 sm:mr-4 ml-1 mr-1 mt-2">
              <img className="h-14 w-14" src={pic2} alt="" />
              <div className="flex flex-col justify-center">
                <div className="ml-3 text-lg font-serif text-green-300">
                  Share
                </div>
              </div>
            </div>
          </WhatsappShareButton>

          <TwitterShareButton
            url={`Check Out And Fund This Campaign Created On Fund Chain - ${window.location.href}`}
          >
            <div className="pl-4 pr-4 pt-2 pb-2 flex border-[2px] rounded-xl sm:ml-0 sm:mr-4 ml-1 mr-1 mt-2">
              <img className="h-14 w-14" src={pic3} alt="" />
              <div className="flex flex-col justify-center">
                <div className="ml-3 text-lg font-serif text-blue-300">
                  Share
                </div>
              </div>
            </div>
          </TwitterShareButton>

          <EmailShareButton
            url={`Check Out And Fund This Campaign Created On Fund Chain - ${window.location.href}`}
          >
            <div className="pl-4 pr-4 pt-2 pb-2 flex border-[2px] rounded-xl sm:ml-0 sm:mr-4 ml-1 mr-1 mt-2">
              <img className="h-14 w-14" src={pic4} alt="" />
              <div className="flex flex-col justify-center">
                <div className="ml-3 text-lg font-serif text-purple-300">
                  Share
                </div>
              </div>
            </div>
          </EmailShareButton>
        </div>
      </div>

      <div className="lg:mt-10 mt-6">
        <iframe
          className="rounded"
          width="100%"
          height="400px"
          src={state.video}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <div className="lg:mt-10 mt-6 w-full">
        <Track
          pId={state.pId}
          updates={state?.updates}
          owner={state?.owner}
          address={address}
          remainingDays={remainingDays}
        />
      </div>

      <div className="lg:mt-10 mt-6 w-full">
        <Comments pId={state.pId} />
      </div>

      <div className="sm:text-2xl text-xl font-epilogue mt-10 text-white">
        Explore More Campaigns
      </div>
      {!isLoading && campaigns.length === 0 && (
        <p className="font-epilogue font-semibold text-[14px] mt-[20px] leading-[30px] text-[#818183]">
          No Campaigns found.
        </p>
      )}
      <div className="grid xl:grid-cols-4 md:grid-cols-3 pt-4 mt-2 sm:grid-cols-2 grid-cols-1 items-baseline">
        {!Loading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign?.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
}

export default CampaignDetailComp;
