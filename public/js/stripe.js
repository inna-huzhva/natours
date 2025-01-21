import axios from "axios";
import { showAlert } from "./alerts";

export const bookTour = async (tourID) => {
  const stripe = Stripe(
    "pk_test_51QiEoGF3kllnT3vXAKa5tsPir5r8OMGz9MaNg65ndhodwMu3oYBUKkqk9taxWgzaSC4daa0CDCv86dAEAXzdLaQs00SCSIcVcm"
  );

  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
