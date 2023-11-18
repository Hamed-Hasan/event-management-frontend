"use client";
import { Card, Grid, Typography } from "antd";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect, useRef } from "react";

interface CounterProps {
  target: number;
  label: string;
  icon?: StaticImageData;
}

const { useBreakpoint } = Grid;

const ScrollCount = ({ target, label, icon }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const increment = useRef<NodeJS.Timeout | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);

  const screen = useBreakpoint();

  const countUp = () => {
    if (countRef.current < target) {
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        countRef.current = newCount;
        return newCount;
      });
    } else if (increment.current) {
      clearInterval(increment.current);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          increment.current = setInterval(countUp, 20);
        } else if (increment.current) {
          clearInterval(increment.current);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (increment.current) {
        clearInterval(increment.current);
      }
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <Card
      style={{
        textAlign: "center",
      }}
      ref={counterRef}
    >
      {icon && (
        <Image
          style={{
            marginBottom: 10,
          }}
          src={icon}
          alt="icon"
          width={32}
          height={32}
        />
      )}
      <Typography.Title
        style={{
          textAlign: "center",
          fontSize: screen.lg ? 28 : 24,
          color: "#1F3C4A",
        }}
        level={2}
      >
        {count}+
      </Typography.Title>
      <Typography.Title
        style={{
          textAlign: "center",
          fontSize: screen.lg ? 24 : 18,
          color: "#1F3C4A",
        }}
        level={3}
      >
        {label}
      </Typography.Title>
    </Card>
  );
};

export default ScrollCount;
