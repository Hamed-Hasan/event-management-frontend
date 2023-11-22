"use client";
import Form from "@/components/Forms/Form";
import FormMultiSelectField, {
  SelectOptions,
} from "@/components/Forms/FormMultiSelectField";
import ActionBar from "@/components/ui/ActionBar";
import GEDashboardBreadCrumb from "@/components/ui/GEDashboardBreadCrumb";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IUser } from "@/interfaces/global";
import { Button, Flex, Grid, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { useBreakpoint } = Grid;

const AddAdmin = () => {
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>();

  const screen = useBreakpoint();

  const router = useRouter();

  useEffect(() => {
    const loadAdmin = async () => {
      setIsUsersLoading(true);
      const res = (await axiosInstance.get("/user/get-all"))
        ?.data as IApiResponse;
      setUsers(res?.data);
      setIsUsersLoading(false);
    };
    loadAdmin();
  }, []);

  const adminOptions: SelectOptions[] = [];

  if (users?.length) {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      adminOptions.push({
        label: `${user.firstName} ${user.lastName} - ${user.email}`,
        value: user.email,
      });
    }
  }

  interface IMakeAdminData {
    users: string[];
  }

  const handleMakeAdmin = async (data: IMakeAdminData) => {
    if (data?.users) {
      setIsLoading(true);

      const adminEmails = data?.users.map((admin: string) => {
        return {
          email: admin,
        };
      });

      const adminData = {
        users: adminEmails,
      };

      const result = await axiosInstance.post("/admin/make-admin", adminData);

      const response = result?.data;
      if (response?.statusCode === 200) {
        message.success(response.message);
        setIsLoading(false);
        router.push("/dashboard/super-admin/admins");
      }
      // @ts-ignore
      else if (!result?.success) {
        setIsLoading(false);
        message.error(
          // @ts-ignore
          result?.message || "Something went wrong try again later"
        );
      }
    }
  };

  return (
    <div>
      <GEDashboardBreadCrumb
        items={[
          {
            label: "Admins",
            link: "/dashboard/super-admin/admins",
          },
        ]}
      />
      <ActionBar title="Make Admin" />
      <div className="container">
        <Form submitHandler={handleMakeAdmin}>
          <Flex
            style={{
              width: screen.lg ? "50%" : "100%",
              margin: "auto",
              marginTop: 20,
              padding: 20,
              border: "1px solid #EDF4ED",
              borderRadius: 10,
              boxShadow: "5px 5px 40px 0px rgba(0,0,0,0.1)",
            }}
            vertical
            justify="center"
            // align="center"
            gap={6}
          >
            <FormMultiSelectField
              name="users"
              options={adminOptions}
              label="Select Admin"
              placeholder="Email searchable"
              isLoading={isUsersLoading}
            />

            <Button
              loading={isLoading}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Make Admin
            </Button>
          </Flex>
        </Form>
      </div>
    </div>
  );
};

export default AddAdmin;
