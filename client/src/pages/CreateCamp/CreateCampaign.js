import React , {useEffect} from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CreateCampCom from "./CreateCampCom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CreateCampaign() {
 
  const nav = useNavigate();

  const myUser=useSelector((state)=>
  state.changeUser
  );

  useEffect(() => {
    if (myUser==null) nav("/");
  }, []);

  return (
    <div>
      <Navbar />
      <CreateCampCom />
      <Footer />
    </div>
  );
}

export default CreateCampaign;
