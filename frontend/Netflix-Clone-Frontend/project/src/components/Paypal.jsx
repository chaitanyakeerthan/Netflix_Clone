import React from "react";
import Subscription from "./PaypalButton";
import PaypalButton from "./PaypalButton";

const Paypal = () => {
  

 const userEmail = localStorage.getItem("userEmail");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Netflix Premium Subscription</h1>
      <p>Welcome: {userEmail}</p>

      
      <PaypalButton />
    </div>
  );
};

export default Paypal;
