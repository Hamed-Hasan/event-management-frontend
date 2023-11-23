import type { CollapseProps } from "antd";
import { Collapse } from "antd";

interface IItem {
  key: string;
  label: string;
  children: React.ReactNode;
}

interface GEAccordionProps {
  items: IItem[];
}

const GEAccordion = ({ items }: GEAccordionProps) => (
  <Collapse
    defaultActiveKey={items?.length ? items[0].key : undefined}
    bordered={false}
    expandIconPosition="end"
    accordion
    items={items}
  />
);

export default GEAccordion;
