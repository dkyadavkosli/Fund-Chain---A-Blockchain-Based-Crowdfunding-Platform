import React, { useState, useEffect, useRef } from "react";
import pic from "../../assets/fundIcon.png";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Loader from "../../components/Loader";
import { useStateContext } from "../../context";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CampaignFactory from "../../artifacts/contracts/CrowdFunding.sol/CrowdFunding.json";
import { useAddress } from "@thirdweb-dev/react";
import {RiArrowDropDownLine} from "react-icons/ri"
import { useStorageUpload } from '@thirdweb-dev/react';

const CreateCampCom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const address = useAddress();
  const Category = useRef();

  const { getUserProjects } =  useStateContext(); 
  

  const [category1 , setCategory1] = useState(0)

  const [category , setCategory] = useState()

  const getCategory1 = () => {
    if(category1 === 0){
        setCategory1(1)
    }else{
        setCategory1(0)
    }
  }

  const getSetCategory = (cat) => {
    setCategory(cat);
    setCategory1(0);
  }

  const [form, setForm] = useState({
    owner_name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
    visible: "0",
    tagline: "",
    amountRaised: "0",
    video: "",
    country: "",
    ho_address: "",
    prev_amount_raised: "",
    valuation: "",
    min_invest: "",
    plan: "",
    twitter: "",
    mail: "",
    instagram: "",
    linkedIn: "",
    doc:""
  });

  const { ref, inView } = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        scale: 1,
        transition: {
          duration: 1.5,
          type: "spring",
        },
      });
    }
    if (!inView) {
      animation.start({
        scale: 0.1,
      });
    }
  }, [inView]);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await getUserProjects();

    if(data?.length !== 0){
      window.alert("You already have an active campaign")
    }else{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    setIsLoading(true);

    const contract = new ethers.Contract(
      "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      CampaignFactory.abi,
      signer
    );

    const campaignData = await contract.createProject(
      [form.owner_name,  form.video[0], form.tagline, form.title, form.description, form.image[0], form.country, form.ho_address, form.plan, form.twitter, form.mail,form.instagram, form.linkedIn, form.doc[0]],
      [form.target,  new Date(form.deadline).getTime(), form.amountRaised, form.visible, form.prev_amount_raised, form.valuation, form.min_invest],
      address, category
    );

    await campaignData.wait();

    setIsLoading(false);
    navigate("/");
    }
  };

  const [file,setFile] = useState();

  const [file1,setFile1] = useState();

  const [file2,setFile2] = useState();

  const {mutateAsync : upload} = useStorageUpload();

  const uploadFiles = async (e) =>{
    setIsLoading(true);
    const uploadUrl = await upload({
        data : [file],
        options: {
            uploadWithGatewayUrl:true,
            uploadWithoutDirectory:true
        }
    })
    setIsLoading(false);
    setForm({ ...form, image: uploadUrl });
  }   

  const uploadFiles1 = async (e) =>{
    setIsLoading(true);
    const uploadUrl = await upload({
        data : [file1],
        options: {
            uploadWithGatewayUrl:true,
            uploadWithoutDirectory:true
        }
    })
    setIsLoading(false);
    setForm({ ...form, video: uploadUrl });
  }   

  const uploadFiles2 = async (e) =>{
    setIsLoading(true);
    const uploadUrl = await upload({
        data : [file2],
        options: {
            uploadWithGatewayUrl:true,
            uploadWithoutDirectory:true
        }
    })
    setIsLoading(false);
    setForm({ ...form, doc: uploadUrl });
  }

  return (
    <div
      ref={ref}
      className="bg-[#00040f] flex justify-center items-center flex-col xl:pl-32 lg:pl-24 md:pl-16 sm:pl-12 pl-4 xl:pr-32 lg:pr-24 md:pr-16 sm:pr-12 pr-4 :pt-8 pt-5 md:pb-10 pb-7"
    >
      {isLoading && <Loader />}
      <div className="flex flex-row w-full mt-4 justify-center">
        <motion.div
          animate={animation} 
          className="sm:text-3xl text-2xl text-white font-semibold cursor-pointer"
        >
          CREATE YOUR CAMPAIGN
        </motion.div>
      </div>
      <div className="flex flex-row w-full mb-6 justify-center">
        <p className="mt-2 text-slate-300 font-semibold">
          Get started with raising funds for your cause. Make sure that you
          provide all necessary details.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[16px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="Enter your name"
            inputType="text"
            value={form.owner_name}
            handleChange={(e) => handleFormFieldChange("owner_name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full sm:flex hidden justify-start items-center p-4 bg-gradient-to-r from-[#303236] to-[#272b34] h-[120px] rounded-[10px]">
          <img
            src={pic}
            alt="money"
            className="w-[60px] h-[60px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <div className="flex flex-wrap gap-[40px]">
        <div className="flex-1 w-full flex flex-col">
        <h3 className="font-epilogue font-medium text-[14px] leading-[22px] text-[#d2d2d7] mb-[10px]">
          Campaign Image *
        </h3>
        <div className="pt-[14px] pb-[12px] flex flex-row justify-between sm:px-[25px] px-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-white text-[14px] rounded-[10px] sm:min-w-[300px]">
        <input
          onChange={(e)=>{
            if(e.target.files){
                setFile(e.target.files[0]);
            }
          }}
          type='file'
          step="0.1"
          className="outline-none bg-transparent cursor-pointer font-epilogue text-white text-[14px] placeholder:text-[#999eac]"
        />
        <div onClick={uploadFiles} className="py-[5px] px-[5px] bg-purple-700 text-white border-[1px] rounded cursor-pointer">IPFS Upload</div>
        </div>

    </div>
    <div className="flex-1 w-full flex flex-col">
        <h3 className="font-epilogue font-medium text-[14px] leading-[22px] text-[#d2d2d7] mb-[10px]">
          Campaign Video *
        </h3>
        <div className="pt-[14px] pb-[12px] flex flex-row justify-between sm:px-[25px] px-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-white text-[14px] rounded-[10px] sm:min-w-[300px]">
        <input
          onChange={(e)=>{
            if(e.target.files){
                setFile1(e.target.files[0]);
            }
          }}
          type='file'
          step="0.1"
          className="outline-none bg-transparent font-epilogue cursor-pointer text-white text-[14px] placeholder:text-[#999eac]"
        />
        <div onClick={uploadFiles1} className="py-[5px] px-[5px] bg-purple-700 text-white border-[1px] rounded cursor-pointer">IPFS Upload</div>
        </div>

    </div>
        </div>

        <div className='flex flex-col'>
       <div className='flex flex-col justify-center w-full mb-0.5'>
          <h3 className='font-epilogue font-medium text-[14px] leading-[22px] text-[#d2d2d7] mb-[10px]">'>Category *</h3>
        </div>
          <div className='flex flex-row w-full mt-2'>
            <input type="text" onChange={()=>{}} ref={Category} defaultValue={category} value={category} className={`bg-gradient-to-r from-[#00040f] to-[#00040f] py-[15px] sm:px-[25px] px-[15px] outline-none border-t-[1px] border-b-[1px] border-l-[1px] border-[#8e8e9e] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#a1a7b5] ${category1 === 0 ? "rounded-l-[10px]" : ""} sm:min-w-[300px] w-full hover:border-gray-500`} placeholder="Select Category"/>
            <RiArrowDropDownLine onClick={getCategory1} className={`cursor-pointer border-t-[1px] border-b-[1px] ${category1 === 0 ? "rounded-r-[10px]" : ""} border-r-[1px] border-[#8e8e9e] h-14 w-14 text-white`}/>
          </div>
          <div className={`flex ${category1 === 0 ? "hidden" : ""} flex-row`}>
            <div className='w-full border-2 border-cyan-900 pl-2 pt-1 pb-1'>
                <div>
                <h4 onClick={()=>getSetCategory("TECHNOLOGY")} className='text-slate-200 cursor-pointer'>TECHNOLOGY</h4>
                </div>
                <div className='pt-1'>
                <h4 onClick={()=>getSetCategory("PRODUCT")} className='text-slate-200 cursor-pointer'>PRODUCT</h4>
                </div>
                <div>
                <h4 onClick={()=>getSetCategory("SERVICES")} className='text-slate-200 cursor-pointer'>SERVICES</h4>
                </div>
                <div className='pt-1'>
                <h4 onClick={()=>getSetCategory("OTHER")} className='text-slate-200 cursor-pointer'>OTHER</h4>
                </div>
            </div>
        </div>
      </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Country *"
            placeholder="Enter which country business is mainly based"
            inputType="text"
            value={form.country}
            handleChange={(e) => handleFormFieldChange("country", e)}
          />
          <FormField
            labelName="Headoffice address *"
            placeholder="Place address of headOffice"
            inputType="text"
            value={form.ho_address}
            handleChange={(e) => handleFormFieldChange("ho_address", e)}
          />
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Previously Raised Amount *"
            placeholder="Enter any previously raised amount"
            inputType="text"
            value={form.prev_amount_raised}
            handleChange={(e) => handleFormFieldChange("prev_amount_raised", e)}
          />
          <FormField
            labelName="Valuation *"
            placeholder="Enter current valuation of your company"
            inputType="text"
            value={form.valuation}
            handleChange={(e) => handleFormFieldChange("valuation", e)}
          />
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Minimum Investment *"
            placeholder="Enter minimum investment amount"
            inputType="text"
            value={form.min_invest}
            handleChange={(e) => handleFormFieldChange("min_invest", e)}
          />
          <FormField
            labelName="Campaign Tagline *"
            placeholder="Enter a good tagline for your campaign"
            inputType="text"
            value={form.tagline}
            handleChange={(e) => handleFormFieldChange("tagline", e)}
          />
        </div>

        <div className="flex-1 w-full flex flex-col">
        <h3 className="font-epilogue font-medium text-[14px] leading-[22px] text-[#d2d2d7] mb-[10px]">
          Any Legal image For Verification *
        </h3>
        <div className="pt-[14px] pb-[12px] flex flex-row justify-between sm:px-[25px] px-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-white text-[14px] rounded-[10px] sm:min-w-[300px]">
        <input
          onChange={(e)=>{
            if(e.target.files){
                setFile2(e.target.files[0]);
            }
          }}
          placeholder="Upload An Image To Verify Project Is Legit"
          type='file'
          step="0.1"
          className="outline-none bg-transparent font-epilogue cursor-pointer text-white text-[14px] placeholder:text-[#999eac]"
        />
        <div onClick={uploadFiles2} className="py-[5px] px-[5px] bg-purple-700 text-white border-[1px] rounded cursor-pointer">IPFS Upload</div>
        </div>

    </div>
    

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Twitter *"
            placeholder="Enter your twitter account"
            inputType="text"
            value={form.twitter}
            handleChange={(e) => handleFormFieldChange("twitter", e)}
          />
          <FormField
            labelName="Facebook *"
            placeholder="Enter your E-mail"
            inputType="text"
            value={form.mail}
            handleChange={(e) => handleFormFieldChange("mail", e)}
          />
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Instagram *"
            placeholder="Enter your Instagram account"
            inputType="text"
            value={form.instagram}
            handleChange={(e) => handleFormFieldChange("instagram", e)}
          />
          <FormField
            labelName="LinkedIn *"
            placeholder="Enter your LinkedIn account Address"
            inputType="text"
            value={form.linkedIn}
            handleChange={(e) => handleFormFieldChange("linkedIn", e)}
          />
        </div>

        <FormField
          labelName="Business Plan *"
          placeholder="Write your Business Plan"
          isTextArea
          value={form.plan}
          handleChange={(e) => handleFormFieldChange("plan", e)}
        />

        <div className="flex justify-center items-center mt-[20px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-gradient-to-r from-slate-600 to-slate-500"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampCom;
