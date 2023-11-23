import { IMeta } from "@/interfaces/global";
import { Flex, Pagination } from "antd";

interface IPaginationProps {
  page: number;
  size: number;
  onChange: (page: number, pageSize: number) => void;
  meta: IMeta | undefined;
  pageSizeOptions?: number[];
}

const GEPagination = ({
  page,
  onChange,
  meta,
  size,
  pageSizeOptions,
}: IPaginationProps) => {
  return (
    <Flex
      style={{
        margin: "30px 0",
      }}
      justify="center"
    >
      <Pagination
        current={page}
        onChange={onChange}
        total={meta?.total}
        pageSize={size}
        pageSizeOptions={pageSizeOptions}
        showSizeChanger={true}
      />
    </Flex>
  );
};

export default GEPagination;
