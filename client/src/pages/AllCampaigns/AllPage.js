import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CampaignsList from "./CampaignsList";
import { useStateContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AllPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { getProjects } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setCampaigns(data);
    setIsLoading(false);
  };


  useEffect(() => {
    fetchCampaigns();
  }, []);

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
      <CampaignsList
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
      <Footer />
    </div>
  );
}

export default AllPage;
