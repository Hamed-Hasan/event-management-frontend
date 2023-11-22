import Form from "@/components/Forms/Form";
import { SelectOptions } from "@/components/Forms/FormMultiSelectField";
import FormSelectField from "@/components/Forms/FormSelectField";
import { eventStatusOptions } from "@/constants/global";
import { Button, Col, Drawer, Row } from "antd";

interface EventDrawerProps {
  open: boolean;
  onClose: () => void;
  handleFilter: (data: any) => void;
  locationOptions: SelectOptions[];
}

const EventFilterDrawer = ({
  onClose,
  open,
  handleFilter,
  locationOptions,
}: EventDrawerProps) => {
  const sortByOptions: SelectOptions[] = [
    {
      label: "Start Date",
      value: "startDate",
    },
    {
      label: "End Date",
      value: "endDate",
    },
    {
      label: "Price",
      value: "price",
    },
    {
      label: "Title",
      value: "title",
    },
  ];

  const sortOrderOptions: SelectOptions[] = [
    {
      label: "Ascending",
      value: "asc",
    },
    {
      label: "Descending",
      value: "desc",
    },
  ];

  return (
    <>
      <Drawer
        title="Events Filter"
        placement="left"
        onClose={onClose}
        open={open}
      >
        <Form submitHandler={handleFilter}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <FormSelectField
                name="location"
                label="Location"
                placeholder="Select Location"
                options={locationOptions}
              />
            </Col>

            <Col xs={24}>
              <FormSelectField
                name="status"
                label="Status"
                options={eventStatusOptions.slice(0, 2)}
                placeholder="Select Status"
              />
            </Col>
            <Col xs={24}>
              <FormSelectField
                name="sortBy"
                label="Sort By"
                placeholder="Select Sort By"
                options={sortByOptions}
              />
            </Col>
            <Col xs={24}>
              <FormSelectField
                name="sortOrder"
                label="Sort Order"
                placeholder="Select Sort Order"
                options={sortOrderOptions}
              />
            </Col>

            <Col xs={24}>
              <Button type="primary" htmlType="submit">
                Apply Filters
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EventFilterDrawer;
