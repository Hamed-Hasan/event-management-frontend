"use client";
import Form from "@/components/Forms/Form";
import FormInput from "../Forms/FormInput";
import { Button, Grid, Input, Typography, message } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendMessageSchema } from "@/schemas/global";
import { useEffect, useState } from "react";
import axiosInstance from "@/helpers/axios/axiosInstance";

const { useBreakpoint } = Grid;

const Message = () => {
  const screen = useBreakpoint();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(true);

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
  }, []);

  useEffect(() => {
    if (userAnswer) {
      if (userAnswer === num1 + num2) {
        setIsWrong(false);
      } else {
        setIsWrong(true);
      }
    }
  }, [userAnswer, num1, num2]);

  const handleMessageSend = async (data: any) => {
    setIsLoading(true);
    setUserAnswer(null);

    const result = await axiosInstance.post("/mail", data);

    const response = result?.data;
    if (response?.statusCode === 200 && response?.data?.sent) {
      message.success(response.message);
      setIsLoading(false);
    }
    // @ts-ignore
    else if (!result?.success) {
      setIsLoading(false);
      // @ts-ignore
      message.error(result?.message || "Something went wrong try again later");
    }
  };
  return (
    <>
      <Typography.Title
        style={{
          fontSize: screen.lg ? 24 : 20,
          marginBottom: 20,
        }}
        level={2}
        type="success"
      >
        Send us a message
      </Typography.Title>
      <Form
        submitHandler={handleMessageSend}
        resolver={yupResolver(sendMessageSchema)}
      >
        <FormInput
          name="name"
          type="text"
          label="Your Name"
          placeholder="John Doe"
          size="large"
        />
        <FormInput
          name="email"
          type="email"
          label="Your Email"
          placeholder="example@gmail.com"
          size="large"
        />
        <FormInput
          name="phone"
          type="text"
          label="Your Phone"
          placeholder="+1 234 567 8901"
          size="large"
        />
        <FormInput
          name="source"
          type="text"
          label="Where did you hear about us?"
          placeholder="Google, Facebook, etc."
          size="large"
        />
        <FormInput
          name="message"
          type="text-area"
          label="Your Message"
          placeholder="Your Message"
          rows={4}
        />
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <p
            style={{
              marginBottom: 5,
            }}
          >
            What is {num1} + {num2}?
          </p>
          <Input
            name="arithmeticAnswer"
            type="number"
            onChange={(e) => setUserAnswer(Number(e.target.value))}
            value={userAnswer || ""}
          />
        </div>
        <Button
          disabled={isWrong}
          loading={isLoading}
          type="primary"
          htmlType="submit"
        >
          Send Message
        </Button>
      </Form>
    </>
  );
};

export default Message;
