import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import '../Styles/PaypalButton.css'
import { toast } from "react-toastify";


const PaypalButton = () => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "ATK3smQhudRD9ZlvHZsJ8UMLFiioW9oSj1QA4cjd7z8cpBGesVi079cZ3VBgYE3izxafbCr6OYqyH4QL",
        vault: true,          
        intent: "subscription"
      }}
    >
      <div className="paypal-button-container">
        <PayPalButtons
          className="paypal-button"

          createSubscription={(data, actions) => {
            return actions.subscription.create({
              plan_id: "P-6C685994JK847754VNFTETKI"
            });
          }}

          onApprove={(data, actions) => {
            toast.success("Subscription Successful! ID: " + data.subscriptionID);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
