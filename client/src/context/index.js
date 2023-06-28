import React, { useContext, createContext } from "react";
import { ethers } from "ethers";
import projectFactory from "../artifacts/contracts/CrowdFunding.sol/CrowdFunding.json";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

// 0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

  const address = useAddress();
  const connect = useMetamask();

  const delProject = async (toDelete) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.deleteProject([toDelete]);
  };

  const getBalance = async (_id) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_ADDRESS,
      projectFactory.abi,
      signer
    );

    const projectData = await contract.getBalance(_id);
    return projectData;
  };

  const getProjects = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.getProjects();

    const AllProjects = projectData.map((project, i) => ({
      owner: project.owner,
      title: project.stringArray[3],
      description: project.stringArray[4],
      target: ethers.utils.formatEther(project.intArray[0].toString()),
      deadline: project.intArray[1].toNumber(),
      amountRaised: ethers.utils.formatEther(project.intArray[2].toString()),
      image: project.stringArray[5],
      visible: project.intArray[3],
      video: project.stringArray[1],
      tagline: project.stringArray[2],
      owner_name: project.stringArray[0],
      country: project.stringArray[6],
      hq_address: project.stringArray[7],
      plan: project.stringArray[8],
      twitter: project.stringArray[9],
      email: project.stringArray[10],
      instagram: project.stringArray[11],
      linkedIn: project.stringArray[12],
      category: project.category,
      prev_Amount_raised: ethers.utils.formatEther(project.intArray[4].toString()),
      valuation : ethers.utils.formatEther(project.intArray[5].toString()),
      min_invest: ethers.utils.formatEther(project.intArray[6].toString()),
      hi:project.intArray[6],
      donators: project.donators,
      donators_name: project.donators_name,
      doc:project.stringArray[13],
      updates:project.updates,
      pId: i,
    }));


    const needProjects = AllProjects.filter(
      (project) => project.visible?._hex === "0x00"
    );

    return needProjects;
  };

  const getUserProjects = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.getProjects();

    const AllProjects = projectData.map((project, i) => ({
      owner: project.owner,
      title: project.stringArray[3],
      description: project.stringArray[4],
      target: ethers.utils.formatEther(project.intArray[0].toString()),
      deadline: project.intArray[1].toNumber(),
      amountRaised: ethers.utils.formatEther(project.intArray[2].toString()),
      image: project.stringArray[5],
      visible: project.intArray[3],
      video: project.stringArray[1],
      tagline: project.stringArray[2],
      owner_name: project.stringArray[0],
      country: project.stringArray[6],
      hq_address: project.stringArray[7],
      plan: project.stringArray[8],
      twitter: project.stringArray[9],
      email: project.stringArray[10],
      instagram: project.stringArray[11],
      linkedIn: project.stringArray[12],
      category: project.category,
      prev_Amount_raised: ethers.utils.formatEther(project.intArray[4].toString()),
      valuation : ethers.utils.formatEther(project.intArray[5].toString()),
      min_invest: ethers.utils.formatEther(project.intArray[6].toString()),
      donators: project.donators,
      donators_name: project.donators_name,
      doc:project.stringArray[13],
      updates:project.updates,
      pId: i,
    }));

    const needProjects = AllProjects.filter(
      (project) => project.visible?._hex === "0x00"
    );

    const Projects = needProjects.filter(
      (project) => project.owner === address
    );

    return Projects;
  };

  const getActiveProjects = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.getProjects();

    const AllProjects = projectData.map((project, i) => ({
      owner: project.owner,
      title: project.stringArray[3],
      description: project.stringArray[4],
      target: ethers.utils.formatEther(project.intArray[0].toString()),
      deadline: project.intArray[1].toNumber(),
      amountRaised: ethers.utils.formatEther(project.intArray[2].toString()),
      image: project.stringArray[5],
      visible: project.intArray[3],
      video: project.stringArray[1],
      tagline: project.stringArray[2],
      owner_name: project.stringArray[0],
      country: project.stringArray[6],
      hq_address: project.stringArray[7],
      plan: project.stringArray[8],
      twitter: project.stringArray[9],
      email: project.stringArray[10],
      instagram: project.stringArray[11],
      linkedIn: project.stringArray[12],
      category: project.category,
      prev_Amount_raised: ethers.utils.formatEther(project.intArray[4].toString()),
      valuation : ethers.utils.formatEther(project.intArray[5].toString()),
      min_invest: ethers.utils.formatEther(project.intArray[6].toString()),
      donators: project.donators,
      donators_name: project.donators_name,
      doc:project.stringArray[13],
      updates:project.updates,
      pId: i,
    }));

    const needProjects = AllProjects.filter(
      (project) => project.visible?._hex === "0x00"
    );

    return needProjects;
  };

  const getSearchProjects = async (search) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.getProjects();

    const AllProjects = projectData.map((project, i) => ({
      owner: project.owner,
      title: project.stringArray[3],
      description: project.stringArray[4],
      target: ethers.utils.formatEther(project.intArray[0].toString()),
      deadline: project.intArray[1].toNumber(),
      amountRaised: ethers.utils.formatEther(project.intArray[2].toString()),
      image: project.stringArray[5],
      visible: project.intArray[3],
      video: project.stringArray[1],
      tagline: project.stringArray[2],
      owner_name: project.stringArray[0],
      country: project.stringArray[6],
      hq_address: project.stringArray[7],
      plan: project.stringArray[8],
      twitter: project.stringArray[9],
      email: project.stringArray[10],
      instagram: project.stringArray[11],
      linkedIn: project.stringArray[12],
      category: project.category,
      prev_Amount_raised: ethers.utils.formatEther(project.intArray[4].toString()),
      valuation : ethers.utils.formatEther(project.intArray[5].toString()),
      min_invest: ethers.utils.formatEther(project.intArray[6].toString()),
      donators: project.donators,
      donators_name: project.donators_name,
      doc:project.stringArray[13],
      updates:project.updates,
      pId: i,
    }));

    const Projects = AllProjects.filter(
      (project) => project.title === search
    );


    return Projects;
  };

  const getInvestmentProjects = async (_investment) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.getProjects();

    const AllProjects = projectData.map((project, i) => ({
      owner: project.owner,
      title: project.stringArray[3],
      description: project.stringArray[4],
      target: ethers.utils.formatEther(project.intArray[0].toString()),
      deadline: project.intArray[1].toNumber(),
      amountRaised: ethers.utils.formatEther(project.intArray[2].toString()),
      image: project.stringArray[5],
      visible: project.intArray[3],
      video: project.stringArray[1],
      tagline: project.stringArray[2],
      owner_name: project.stringArray[0],
      country: project.stringArray[6],
      hq_address: project.stringArray[7],
      plan: project.stringArray[8],
      twitter: project.stringArray[9],
      email: project.stringArray[10],
      instagram: project.stringArray[11],
      linkedIn: project.stringArray[12],
      category: project.category,
      prev_Amount_raised: ethers.utils.formatEther(project.intArray[4].toString()),
      valuation : ethers.utils.formatEther(project.intArray[5].toString()),
      min_invest: ethers.utils.formatEther(project.intArray[6].toString()),
      donators: project.donators,
      donators_name: project.donators_name,
      doc:project.stringArray[13],
      updates:project.updates,
      pId: i,
    }));

    const Projects = AllProjects.filter(
      (project) => project.donators.includes(_investment)
    );


    return Projects;
  };

  const getCategoryProjects = async (_category) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.getProjects();

    const AllProjects = projectData.map((project, i) => ({
      owner: project.owner,
      title: project.stringArray[3],
      description: project.stringArray[4],
      target: ethers.utils.formatEther(project.intArray[0].toString()),
      deadline: project.intArray[1].toNumber(),
      amountRaised: ethers.utils.formatEther(project.intArray[2].toString()),
      image: project.stringArray[5],
      visible: project.intArray[3],
      video: project.stringArray[1],
      tagline: project.stringArray[2],
      owner_name: project.stringArray[0],
      country: project.stringArray[6],
      hq_address: project.stringArray[7],
      plan: project.stringArray[8],
      twitter: project.stringArray[9],
      email: project.stringArray[10],
      instagram: project.stringArray[11],
      linkedIn: project.stringArray[12],
      category: project.category,
      prev_Amount_raised: ethers.utils.formatEther(project.intArray[4].toString()),
      valuation : ethers.utils.formatEther(project.intArray[5].toString()),
      min_invest: ethers.utils.formatEther(project.intArray[6].toString()),
      donators: project.donators,
      donators_name: project.donators_name,
      doc:project.stringArray[13],
      updates:project.updates,
      pId: i,
    }));

    const Projects = AllProjects.filter(
      (project) => project.category === _category
    );


    return Projects;
  };

  const getFavouriteProjects = async (_favs) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.getProjects();

    const AllProjects = projectData.map((project, i) => ({
      owner: project.owner,
      title: project.stringArray[3],
      description: project.stringArray[4],
      target: ethers.utils.formatEther(project.intArray[0].toString()),
      deadline: project.intArray[1].toNumber(),
      amountRaised: ethers.utils.formatEther(project.intArray[2].toString()),
      image: project.stringArray[5],
      visible: project.intArray[3],
      video: project.stringArray[1],
      tagline: project.stringArray[2],
      owner_name: project.stringArray[0],
      country: project.stringArray[6],
      hq_address: project.stringArray[7],
      plan: project.stringArray[8],
      twitter: project.stringArray[9],
      email: project.stringArray[10],
      instagram: project.stringArray[11],
      linkedIn: project.stringArray[12],
      category: project.category,
      prev_Amount_raised: ethers.utils.formatEther(project.intArray[4].toString()),
      valuation : ethers.utils.formatEther(project.intArray[5].toString()),
      min_invest: ethers.utils.formatEther(project.intArray[6].toString()),
      donators: project.donators,
      donators_name: project.donators_name,
      doc:project.stringArray[13],
      updates:project.updates,
      pId: i,
    }));

    const Projects = AllProjects.filter(
      (project) => _favs.includes(project.pId)
    );


    return Projects;
  };

  const donate = async (pId, amount, _name) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
    "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.InvestInProject(pId, _name, { value: ethers.utils.parseEther(amount)});
    return projectData;
  };

  const withdraw = async (pId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
    "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.withdraw(pId);
  };

  const getDonations = async (pId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const donations = await contract.getDonators(pId);
    const n = donations.length;

    const AllDonations = [];

    for (let i = 0; i < n; i++) {
      AllDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[i].toString()),
      });
    }

    return AllDonations;
  };

  const abort = async (pId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
    "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    await contract.abortProject(pId);
  };

  const contract = "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4";

  const makeUpdate = async (pId, _update, _date) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
    "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.makeUpdate(pId, _update, _date);
  };

  const makeResponse = async (pId, pId1, _add, _vote) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
    "0x621c945d1De2424dF87788DCC67E59d9dE6cF7c4",
      projectFactory.abi,
      signer
    );

    const projectData = await contract.makeResponse(pId, pId1, _add, _vote);
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        getProjects,
        getUserProjects,
        getActiveProjects,
        donate,
        getDonations,
        getBalance,
        getInvestmentProjects,
        deleteProject: delProject,
        getSearchProjects,
        getCategoryProjects,
        abort,
        getFavouriteProjects,
        withdraw,
        makeUpdate,
        makeResponse
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
