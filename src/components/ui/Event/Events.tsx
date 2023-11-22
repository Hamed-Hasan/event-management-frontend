"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SelectOptions } from "@/components/Forms/FormMultiSelectField";
import EventCard from "@/components/ui/Card/EventCard";
import EventFilterDrawer from "@/components/ui/Event/EventFilterDrawer";
import GEBreadCrumb from "@/components/ui/GEBreadCrumb";
import GEPagination from "@/components/ui/Pagination";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IEvent, IMeta, IQuery } from "@/interfaces/global";
import {
  FilterOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Empty,
  PaginationProps,
  Row,
  Spin,
  Typography,
} from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Events = () => {
  const searchParam = useSearchParams();
  const searchQuery = searchParam.get("query");
  const router = useRouter();

  const [query, setQuery] = useState<IQuery>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(9);
  const [events, setEvents] = useState<IEvent[]>();
  const [meta, setMeta] = useState<IMeta>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationOptions, setLocationOptions] = useState<SelectOptions[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

  const showFilterDrawer = () => {
    setFilterDrawerOpen(true);
  };

  const onFilterClose = () => {
    setFilterDrawerOpen(false);
  };

  useEffect(() => {
    if (searchQuery?.length) {
      setQuery({
        query: searchQuery,
        page,
        limit: size,
      });
    } else {
      setQuery({
        page,
        limit: size,
      });
    }
  }, [page, size, searchQuery]);

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      const res = (
        await axiosInstance.get("/events", {
          params: query,
        })
      )?.data as IApiResponse;
      setEvents(res?.data);
      setMeta(res?.meta);
      setIsLoading(false);
    };
    loadEvents();
  }, [query]);

  useEffect(() => {
    const options: SelectOptions[] = [];
    if (events?.length) {
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        options.push({
          label: event.location,
          value: event.location,
        });
      }
      setLocationOptions(options);
    }
  }, [events]);

  const handleSearch = (data: any) => {
    if (data?.query) {
      setQuery({
        query: data?.query,
      });
    }
  };

  function handleFilter(data: { [key: string]: string }) {
    const query: { [key: string]: string } = {};
    for (const key in data) {
      if (data[key]) {
        query[key] = data[key];
      }
    }
    setQuery(query);
    setFilterDrawerOpen(false);
  }

  const resetFilters = () => {
    setQuery({});
    if (searchQuery) {
      router.push("/events");
    }
  };

  const onChange: PaginationProps["onChange"] = (
    page: number,
    pageSize: number
  ) => {
    setPage(page);
    setSize(pageSize);
  };

  if (isLoading || events?.length === 0) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <GEBreadCrumb
        title="Event"
        items={[
          {
            label: "Events",
          },
        ]}
      />
      <div className="container">
        <div>
          <EventFilterDrawer
            onClose={onFilterClose}
            open={filterDrawerOpen}
            handleFilter={handleFilter}
            locationOptions={locationOptions}
          />
        </div>
        <Row
          style={{
            margin: "30px 0",
          }}
          gutter={[16, 16]}
          align="middle"
          justify="center"
        >
          <Col xs={24} md={16}>
            <div>
              <Form submitHandler={handleSearch}>
                <FormInput
                  name="query"
                  type="search"
                  size="large"
                  placeholder="Eco friendly wedding"
                  suffix={
                    <Button type="primary" htmlType="submit">
                      <SearchOutlined />
                    </Button>
                  }
                />
              </Form>
            </div>
          </Col>
          <Col xs={24} md={4}>
            <div>
              <Button
                style={{
                  width: "100%",
                  marginTop: -10,
                }}
                type="primary"
                size="large"
                icon={<FilterOutlined />}
                onClick={showFilterDrawer}
              >
                Filter
              </Button>
            </div>
          </Col>
          <Col xs={24} md={4}>
            {(!!query?.query ||
              !!query?.location ||
              !!query?.status ||
              !!query?.sortBy ||
              !!query?.sortOrder) && (
              <Button
                style={{
                  width: "100%",
                }}
                type="dashed"
                onClick={resetFilters}
                size="large"
                icon={<ReloadOutlined />}
              >
                Reset Filter
              </Button>
            )}
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {events?.map((event) => (
            <Col key={event.id} xs={24} sm={12} lg={8}>
              <EventCard event={event} loading={isLoading} />
            </Col>
          ))}
          {events?.length === 0 && (
            <Col xs={24}>
              <Empty
                description={
                  <Typography.Title
                    style={{
                      textAlign: "center",
                    }}
                    level={4}
                    type="danger"
                  >
                    No Events found! Try again later
                  </Typography.Title>
                }
              />
            </Col>
          )}
        </Row>

        {events && events?.length > 0 && (
          <div>
            <GEPagination
              onChange={onChange}
              meta={meta}
              page={page}
              size={size}
              pageSizeOptions={[10, 20, 30]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
