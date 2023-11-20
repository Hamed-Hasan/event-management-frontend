"use client";
import { IBlog } from "@/interfaces/global";
import { Button, Card, Grid, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
const { useBreakpoint } = Grid;
interface BlogCardProps {
  blog: IBlog;
  loading?: boolean;
}

const BlogCard = ({ blog, loading }: BlogCardProps) => {
  const screen = useBreakpoint();

  return (
    <Card
      hoverable
      style={{ height: "100%" }}
      cover={
        <Image
          alt={blog?.title || ""}
          src={blog?.image}
          width={400}
          height={300}
        />
      }
      loading={loading}
      actions={[
        <Link key="view" href={`/blogs/${blog.id}`}>
          <Button type="primary">Details</Button>
        </Link>,
      ]}
    >
      <Typography.Title
        style={{
          fontSize: screen.lg ? 20 : 16,
        }}
        level={3}
        type="success"
      >
        {blog?.title}
      </Typography.Title>
    </Card>
  );
};

export default BlogCard;
