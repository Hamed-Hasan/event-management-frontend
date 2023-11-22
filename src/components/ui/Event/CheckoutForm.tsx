import axiosInstance from "@/helpers/axios/axiosInstance";
import { IBooking, IBookingConfirm } from "@/interfaces/global";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  IbanElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, Typography, message } from "antd";
import Link from "next/link";
import { useState } from "react";

interface ICheckoutFormProps {
  bookingInfo: Partial<IBookingConfirm> | undefined;
  prev: () => void;
}

const CheckoutForm = ({ bookingInfo, prev }: ICheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");

  if (!bookingInfo) {
    return null;
  }

  const { amount, email, currency, paymentId, userId, bookingId } = bookingInfo;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setProcessing(true);

    if (elements == null) {
      message.info("elements is null");
      setProcessing(false);
      return;
    }

    if (!stripe || !elements) {
      message.info("stripe or elements is null");
      setProcessing(false);
      return;
    }

    const bookingData = {
      amount,
      currency,
      paymentId,
      userId,
      bookingId,
    };

    const book = await axiosInstance.post("/bookings/confirm", bookingData);

    const response = book?.data;
    if (response?.statusCode === 200) {
      message.success(response.message);

      const result = await stripe.confirmPayment({
        elements,

        confirmParams: {
          return_url: `${window?.location?.origin}/events/booking/confirm`,
          payment_method_data: {
            billing_details: {
              email,
            },
          },
        },
      });

      if (result.error) {
        await axiosInstance.delete(`/bookings/${bookingId}`);
        setProcessing(false);
        message.error(result.error.message || "Something went wrong");
      } else {
        setProcessing(false);
      }
    }
    // @ts-ignore
    else if (!book?.success) {
      setProcessing(false);
      prev();
      message.error(
        // @ts-ignore
        book?.message || "Something went wrong try again later"
      );
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography.Text
        style={{
          fontSize: 14,
          marginBottom: 16,
          display: "inline-block",
        }}
        type="secondary"
      >
        Use Stripe test{" "}
        <Link href="https://stripe.com/docs/testing" target="_blank">
          Cards
        </Link>{" "}
      </Typography.Text>

      <PaymentElement />

      <Button
        style={{
          marginTop: 16,
          width: "100%",
        }}
        loading={processing}
        type="primary"
        htmlType="submit"
        disabled={!stripe || !elements}
        size="large"
      >
        Pay & Book Now (${amount})
      </Button>
      {errorMessage && (
        <Typography.Paragraph
          style={{
            fontSize: 14,
          }}
          type="danger"
        >
          {errorMessage}
        </Typography.Paragraph>
      )}
    </form>
  );
};

export default CheckoutForm;
