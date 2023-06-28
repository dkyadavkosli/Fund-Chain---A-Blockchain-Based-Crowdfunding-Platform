import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import HomeList from "./HomeList";
import HomePic from "./HomePic";
import Journey from "./Journey";
import Questions from "./Questions";
import { useStateContext } from "../../context";
import { useSelector, useDispatch } from 'react-redux';
import {changeTotal , changeCategory} from "../../actions/index"
import Reason from "./Reason";
import { daysLeft } from "../../utils";
import OldList from "./OldList";
import Categories from "./Categories";
import { useNavigate } from "react-router-dom";


function HomePage() {  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [campaigns1, setCampaigns1] = useState([]);

  const { address, contract, getProjects , getActiveProjects } = useStateContext();

  const dispatch = useDispatch()

  const nav = useNavigate();

  const myUser=useSelector((state)=>
  state.changeUser
  );

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getProjects();
    data.sort((a,b)=>b.amountRaised - a.amountRaised) // to get funds with most funds
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  const fetchCampaigns1 = async () => {
    setIsLoading(true);
    const data = await getProjects();
    data.sort((a,b)=>daysLeft(a.deadline) - daysLeft(b.deadline))  // to get funds with most funds
    setCampaigns1(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns1();
    dispatch(changeCategory(null));
  }, [address, contract]);

  const fetchActiveCampaigns = async () => {
    setIsLoading(true);
    const data = await getActiveProjects();
    dispatch(changeTotal(data?.length))
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchActiveCampaigns();
  }, [address, contract]);

  useEffect(() => {
    if (myUser==null) nav("/");
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#00040f] to-[#00040f] ">
      <Navbar yes="yes" />
      <HomePic />
      <Journey />
      <HomeList name="MOST FUNDED" title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns.slice(0,4)} />
      <OldList name="CLOSING SOON" title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns1.slice(0,4)} />
      <Reason/>
      <Categories/>
      <Questions/>
      <Footer />
    </div>
  );
}

export default HomePage;
