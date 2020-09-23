import React, { useState} from "react"; 
// import React, { useEffect} from "react";  
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/Stripe.css";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51HRjLwFVMZF5LB9VNvATyd16ffbxIT8guyDocDaI2FDbkOKzKSoY0erbTsZJODy0qnFl1lQTIEos6IJF9Bus6DWi00qChjPiVA"
);

const ProductDisplay = ({ handleClick }) => {
  const [dollaValue, setValue] = useState("");
  return (
    <section>
      <div className="product">
        <img
          src={require("./money_emoji.png")}
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Sponsor Amount</h3>
          <input
            type="number"
            min="1"
            step="any"
            required
            value={dollaValue}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
      </div>
      <button id="checkout-button" role="link" onClick={() => handleClick(dollaValue)}>
        Checkout
      </button>
    </section>
  );
};

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

export default function Stripe(props) {
//   // const [message, setMessage] = useState("");
//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);
//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }
//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

  const handleClick = async (event) => {
    // needs validation for no amount
    const chargeAmount = parseInt(event) * 100
    const userId = props.user.user.id
    const projectId = props.project.id
    const token = Cookies.get("jwt");
    const stripe = await stripePromise;
    const response = await fetch("http://localhost:3001/api/v1/charges", {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({chargeAmount,userId, projectId})
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
  const { isStripeShowing } = props;
  
  return isStripeShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="stripe-modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="stripe-modal">
              <div className="stripe-modal-header">
                <button
                  type="button"
                  className="stripe-modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => props.toggle()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <ProductDisplay handleClick={handleClick} />
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
}

// message ? (
//     <Message message={message} />
//   ) : (
//
//   );
