import React, { useState } from "react";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { Input } from "baseui/input";
import "../styles/Stripe.css";

const stripePromise = loadStripe(
  //testing key
  "pk_test_51HRjLwFVMZF5LB9VNvATyd16ffbxIT8guyDocDaI2FDbkOKzKSoY0erbTsZJODy0qnFl1lQTIEos6IJF9Bus6DWi00qChjPiVA"
);

export default function Stripe(props) {
  const [dollaValue, setValue] = useState("");

 
  const handleClick = async (event) => {
    // needs validation for no amount
    const chargeAmount = parseInt(event) * 100;
    const user_id = props.user.id;
    const project_id = props.project.id;
    const token = Cookies.get("jwt");
    const stripe = await stripePromise;
    const response = await fetch("http://localhost:3001/api/v1/charges", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chargeAmount, user_id, project_id }),
    });
    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  const { isStripeShowing, toggle } = props;

  return (
    <Modal
      onClose={() => toggle()}
      closeable
      isOpen={isStripeShowing}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Sponsor the Idea</ModalHeader>
      <ModalBody>
        Enter the amount you would like to sponsor
        <Input
          startEnhancer="$"
          placeholder="Enter amount you'd like to sponsor"
          value={dollaValue}
          onChange={(event) => setValue(event.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary} onClick={() => toggle()}>
          Cancel
        </ModalButton>
        <ModalButton onClick={() => handleClick(dollaValue)}>
          Sponsor
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
