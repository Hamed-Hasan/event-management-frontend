import {
  CommentOutlined,
  FileTextOutlined,
  HomeOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  TableOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  DesktopOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { userRole } from "./role";

export const SidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/profile`}>View Profile</Link>,
          key: `/dashboard/profile`,
        },
        {
          label: (
            <Link href={`/dashboard/profile/change-password`}>
              Change password
            </Link>
          ),
          key: `/dashboard/profile/change-password`,
        },
      ],
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: <Link href={`/dashboard/user/bookings`}>View Bookings</Link>,
      key: "/dashboard/user/bookings",
      icon: <ScheduleOutlined />,
    },
    {
      label: <Link href={`/dashboard/user/feedback`}>Feedback</Link>,
      key: "/dashboard/user/feedback",
      icon: <CommentOutlined />,
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: "Manage Users",
      key: `/dashboard/admin/users`,
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/admin/users`}>Users</Link>,
          key: "/dashboard/admin/users",
        },
        {
          label: <Link href={`/dashboard/admin/users/add-user`}>Add User</Link>,
          key: "/dashboard/admin/users/add-user",
        },
      ],
    },
    {
      label: "Manage Events",
      key: `/dashboard/admin/events`,
      icon: <TableOutlined />,
      children: [
        {
          label: (
            <Link href={`/dashboard/admin/events/categories`}>Categories</Link>
          ),
          key: "/dashboard/admin/events/categories",
        },
        {
          label: (
            <Link href={`/dashboard/admin/events/categories/add`}>
              Add Category
            </Link>
          ),
          key: "/dashboard/admin/events/categories/add",
        },
        {
          label: <Link href={`/dashboard/admin/events`}>Events</Link>,
          key: "/dashboard/admin/events",
        },
        {
          label: <Link href={`/dashboard/admin/events/add`}>Add Event</Link>,
          key: "/dashboard/admin/events/add",
        },
      ],
    },
    {
      label: "Manage Bookings",
      key: `/dashboard/admin/bookings`,
      icon: <ScheduleOutlined />,
      children: [
        {
          label: (
            <Link href={`/dashboard/admin/bookings/summary`}>
              Booking Summary
            </Link>
          ),
          key: "/dashboard/admin/bookings/summary",
        },
        {
          label: <Link href={`/dashboard/admin/bookings`}>Bookings</Link>,
          key: "/dashboard/admin/bookings/manage",
        },
      ],
    },
    {
      label: "Contents",
      key: "contents",
      icon: <FileTextOutlined />,
      children: [
        {
          label: "Blog Post",
          key: `/dashboard/admin/blogs`,
          children: [
            {
              label: <Link href={`/dashboard/admin/blogs`}>Blogs</Link>,
              key: `/dashboard/admin/blogs`,
            },
            {
              label: <Link href={`/dashboard/admin/blogs/add`}>Add Blog</Link>,
              key: `/dashboard/admin/blogs/add`,
            },
          ],
        },
        {
          label: "FAQs",
          key: `/dashboard/admin/faq`,
          children: [
            {
              label: <Link href={`/dashboard/admin/faq`}>Manage FAQs</Link>,
              key: "/dashboard/admin/faq",
            },
            {
              label: <Link href={`/dashboard/admin/faq/add`}>Add FAQs</Link>,
              key: "/dashboard/admin/faq/add",
            },
          ],
        },
      ],
    },
    {
      label: <Link href={`/dashboard/admin/feedbacks`}>Feedbacks</Link>,
      key: "/dashboard/admin/feedbacks",
      icon: <CommentOutlined />,
    },
    {
      label: "Pages",
      key: "/dashboard/admin/pages",
      icon: <DesktopOutlined />,
      children: [
        {
          label: <Link href={`/dashboard/admin/pages`}>Manage Pages</Link>,
          key: "/dashboard/admin/pages",
        },
        {
          label: <Link href={`/dashboard/admin/pages/add`}>Add Pages</Link>,
          key: "/dashboard/admin/pages/add",
        },
      ],
    },
    {
      label: "Subscribers",
      key: "/dashboard/admin/subscribers",
      icon: <MailOutlined />,
      children: [
        {
          label: (
            <Link href={`/dashboard/admin/subscribers`}>
              Manage Subscribers
            </Link>
          ),
          key: "/dashboard/admin/subscribers",
        },
        {
          label: (
            <Link href={`/dashboard/admin/subscribers/send`}>Send Email</Link>
          ),
          key: "/dashboard/admin/subscribers/send",
        },
      ],
    },
  ];
  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "Manage Admin",
      icon: <UserSwitchOutlined />,
      key: `/super-admin/manage-admin`,
      children: [
        {
          label: <Link href={`/dashboard/super-admin/admins`}>Admins</Link>,
          key: `/dashboard/super-admin/manage-admin`,
        },
        {
          label: (
            <Link href={`/dashboard/super-admin/add-admin`}>Add Admin</Link>
          ),
          key: `/dashboard/super-admin/add-admin`,
        },
      ],
    },
  ];

  if (role === userRole.SUPER_ADMIN) {
    return superAdminSidebarItems;
  } else if (role === userRole.ADMIN) {
    return adminSidebarItems;
  } else {
    return userSidebarItems;
  }
};
