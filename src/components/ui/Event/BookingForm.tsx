import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormRangePicker from "@/components/Forms/FormRangePicker";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IBookingConfirm, IEvent, IUser, IUserInfo } from "@/interfaces/global";
import { bookEventSchema } from "@/schemas/events";
import { CreditCardOutlined, ScheduleOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { CountdownProps } from "antd";
import { Button, Col, Grid, Row, Statistic, Typography, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookingStepperForm from "./BookingStepperForm";
import CheckoutForm from "./CheckoutForm";

const { Countdown } = Statistic;

const { useBreakpoint } = Grid;

interface IBookingFormProps {
  event: IEvent;
  user: IUserInfo;
  id: string | string[] | undefined;
}

const appearance = {
  variables: {
    fontFamily: "Montserrat, sans-serif",
    fontWeightNormal: "500",
    borderRadius: "6px",
    colorPrimary: "#3BA27A",
    colorBackground: "#fff",
    colorText: "#1F3C4A",
    colorDanger: "#F14947",
    colorWarning: "#F1C40F",
    colorSuccess: "#3BA27A",
    gridRowSpacing: "20px",
  },
};

const BookingForm = ({ event, user, id }: IBookingFormProps) => {
  const screen = useBreakpoint();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [adults, setAdults] = useState<number>(1);
  const [childrens, setChildrens] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(event?.price || 0);
  const [tax, setTax] = useState<number>(0);
  const [daysBooked, setDaysBooked] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<IUser>();
  const [startDate, setStartDate] = useState<Dayjs>();
  const [endDate, setEndDate] = useState<Dayjs>();
  const [isProceedToPayment, setIsProceedToPayment] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<Partial<IBookingConfirm>>();
  const [clientSecret, setClientSecret] = useState<string>("");

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = async () => {
    setIsLoading(true);
    await axiosInstance.delete(`/bookings/${bookingData?.bookingId}`);
    setCurrent(current - 1);
    setIsLoading(false);
  };

  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const result = (await axiosInstance.get(`/user/${user?.id}`))
        ?.data as IApiResponse;
      setUserInfo(result?.data);
    };
    loadUser();
  }, [user?.id]);

  useEffect(() => {
    if (event) {
      const amount = adults * event?.price + (childrens * event?.price) / 2;

      const totalAmount = amount * daysBooked;

      const amountWithTax = (totalAmount + totalAmount * 0.1).toFixed(2);
      setTax(+totalAmount * 0.1);

      setTotalAmount(+amountWithTax);
    }
  }, [adults, childrens, event, totalAmount, daysBooked]);

  const defaultValues = {
    startDate: startDate,
    endDate: endDate,
    email: userInfo?.email,
    contactNo: userInfo?.contactNo,
    totalAmount: totalAmount,
    adults: adults,
    childrens: childrens,
    daysBooked: daysBooked,
  };

  const onFinish: CountdownProps["onFinish"] = () => {
    message.info("Event has ended");
  };

  const handleAdults = (value: any) => {
    setAdults(value);
  };
  const handleChildren = (value: any) => {
    setChildrens(value);
  };

  const handleDateChange = (dates: any, dateStrings: any) => {
    if (dates) {
      const startDate = dates[0];
      const endDate = dates[1];

      setStartDate(startDate);
      setEndDate(endDate);

      const diff = endDate.diff(startDate, "days");
      setDaysBooked(diff);
    }
  };

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const options = {
    clientSecret,
    appearance,
  };

  const handleBookEvent = async (data: any) => {
    setIsLoading(true);
    if (user?.id && id) {
      data.userId = user.id;
      data.eventId = id;

      const result = await axiosInstance.post("/bookings", data);
      const response = result?.data;

      if (response?.statusCode === 200) {
        const { id, totalAmount, email } = response?.data;
        const res = await axiosInstance.post(
          "bookings/create-payment-intents",
          {
            amount: totalAmount * 100,
            currency: "usd",
            email: email,
          }
        );
        if (res?.data?.statusCode === 200) {
          const { clientSecret, paymentId, currency, amount } = res?.data?.data;
          setClientSecret(clientSecret);

          next();
          setBookingData({
            amount,
            email,
            userId: user?.id,
            bookingId: response?.data?.id,
            paymentId,
            currency,
          });
          setIsLoading(false);
        } else {
          await axiosInstance.delete(`/bookings/${response?.data?.id}`);
          setIsLoading(false);
        }
      }
      // @ts-ignore
      else if (!result?.success) {
        setIsLoading(false);
        message.error(
          // @ts-ignore
          result?.message || "Something went wrong try again later"
        );
      }
    } else {
      message.error("You have to login for booking.");
    }
  };

  const steps = [
    {
      title: "Booking Details",
      content: (
        <div>
          <div
            style={{
              margin: "20px 0",
            }}
          >
            <Row gutter={[16, 16]}></Row>
          </div>
          <Form
            submitHandler={handleBookEvent}
            resolver={yupResolver(bookEventSchema)}
            defaultValues={defaultValues}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={24}>
                <Countdown
                  title="Event Ends In"
                  value={event?.endDate}
                  format="DD day HH hr"
                  onFinish={onFinish}
                />
              </Col>
              <Col xs={24} md={24}>
                <Typography.Title
                  style={{
                    fontSize: screen.lg ? 24 : 20,
                  }}
                  level={4}
                >
                  Who is attending?
                </Typography.Title>
                <Row gutter={[10, 10]}>
                  <Col xs={24} md={12}>
                    <Typography.Title
                      style={{
                        fontSize: screen.lg ? 20 : 18,
                      }}
                      level={5}
                    >
                      Adults (12+)
                    </Typography.Title>
                    <Typography.Paragraph
                      style={{
                        fontSize: screen.lg ? 16 : 14,
                      }}
                      strong
                      type="secondary"
                    >
                      ${event?.price} / person
                    </Typography.Paragraph>
                    <FormInput
                      type="number"
                      name="adults"
                      size="large"
                      min={1}
                      onChange={handleAdults}
                      styleProp={{
                        width: "100%",
                      }}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Typography.Title
                      style={{
                        fontSize: screen.lg ? 20 : 18,
                      }}
                      level={5}
                    >
                      Children&apos;s (0-12)
                    </Typography.Title>
                    <Typography.Paragraph
                      style={{
                        fontSize: screen.lg ? 16 : 14,
                      }}
                      strong
                      type="secondary"
                    >
                      ${event?.price / 2} / kid
                    </Typography.Paragraph>
                    <FormInput
                      type="number"
                      name="childrens"
                      size="large"
                      min={0}
                      onChange={handleChildren}
                      styleProp={{
                        width: "100%",
                      }}
                    />
                  </Col>
                </Row>
              </Col>

              <Col xs={24} md={12}>
                <FormInput
                  type="email"
                  name="email"
                  size="large"
                  placeholder="example@gmail.com"
                  label="Email"
                />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  type="text"
                  name="contactNo"
                  size="large"
                  placeholder="01784569875"
                  label="Contact Number"
                />
              </Col>
              <Col xs={24} md={24}>
                <FormRangePicker
                  name={["startDate", "endDate"]}
                  label="Select Date Range"
                  size="large"
                  startDate={dayjs(event.startDate)}
                  endDate={dayjs(event.endDate)}
                  onChange={handleDateChange}
                  isShowtime={true}
                />
              </Col>
            </Row>
            <div
              style={{
                margin: "20px 0",
              }}
            >
              <Typography.Paragraph
                style={{
                  fontSize: screen.lg ? 16 : 14,
                  marginBottom: 0,
                }}
                type="secondary"
              >
                Adults x {adults} = ${adults * event?.price}
              </Typography.Paragraph>
              <Typography.Paragraph
                style={{
                  fontSize: screen.lg ? 16 : 14,
                  marginBottom: 0,
                }}
                type="secondary"
              >
                Children x {childrens} = ${(childrens * event?.price) / 2}
              </Typography.Paragraph>

              <Typography.Paragraph
                style={{
                  fontSize: screen.lg ? 16 : 14,
                  marginBottom: 0,
                }}
                type="secondary"
              >
                Tax = ${tax}
              </Typography.Paragraph>

              <Typography.Title
                style={{
                  fontSize: screen.lg ? 18 : 16,
                }}
                type="success"
                level={4}
              >
                Total = ${totalAmount}
              </Typography.Title>
            </div>
            <div
              style={{
                marginTop: 20,
              }}
            >
              <Button
                style={{
                  width: "100%",
                }}
                size="large"
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Proceed to Payment
              </Button>
            </div>
          </Form>
        </div>
      ),
      icon: <ScheduleOutlined />,
    },
    {
      title: "Payment",
      content: (
        <div>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm bookingInfo={bookingData} prev={prev} />
          </Elements>
        </div>
      ),
      icon: <CreditCardOutlined />,
    },
  ];
  return (
    <div className="">
      <BookingStepperForm steps={steps} current={current} prev={prev} />
    </div>
  );
};

export default BookingForm;
