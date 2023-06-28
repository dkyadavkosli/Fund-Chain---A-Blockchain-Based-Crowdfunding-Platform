import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProfileCom from "./ProfileCom";
import { useStateContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() { 
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [campaigns1, setCampaigns1] = useState([]);

  const { address, contract, getUserProjects , getInvestmentProjects } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserProjects();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  const fetchInvestCampaigns = async () => {
    setIsLoading(true);
    const data = await getInvestmentProjects(address);
    setCampaigns1(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchInvestCampaigns();
  }, [address, contract]);

  const nav = useNavigate();

  const myUser=useSelector((state)=>
  state.changeUser
  );

  useEffect(() => {
    if (myUser==null) nav("/");
  }, []);
  return (
    <div className="bg-gradient-to-r from-[#00040f] to-[#00040f] min-h-screen">
      <Navbar />
      <ProfileCom
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
        campaigns1={campaigns1}
      />
      <Footer />
    </div>
  );
}

export default Profile;
