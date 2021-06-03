import { Table, Tag } from "antd";
import Column from "antd/lib/table/Column";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/createStore";
import { Customer } from "./types/Customer";

const OptStatus = () => {
  
  const { filterdCustomers } = useSelector(
    (state: RootState) => state.Customer
  );
  return (
    <Table dataSource={filterdCustomers} pagination={{ defaultPageSize: 7 }}>
      <Column
        title="Dealer / Customer Name"
        dataIndex="dealerName"
        key="dealerName"
      />
      <Column
        title="Order #"
        dataIndex="orderId"
        key="orderId"
        sorter={(a :Customer, b:Customer) =>
          parseInt(a.orderId.replace("AS", "")) -
          parseInt(b.orderId.replace("AS", ""))
        }
        sortDirections={["descend", "ascend"]}
      />
      <Column
        title="Order Status"
        dataIndex="orderStatus"
        key="orderStatus"
        render={(orderStatus) => (
          <>
            {orderStatus.map((tag:string) => {
              let color =
                tag.toLowerCase() === "active"
                  ? "blue"
                  : tag.toLowerCase() === "dispatched"
                  ? "purple"
                  : tag.toLowerCase() === "delivered"
                  ? "green"
                  : tag.toLowerCase() === "order error!"
                  ? "red"
                  : tag.toLowerCase() === "confirmed"
                  ? "chocolate"
                  : tag.toLowerCase() === "enroute"
                  ? "orange"
                  : "yellow";

              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        )}
      />
      <Column title="Opt In/ Opt Out" dataIndex="optStatus" key="optStatus" />
      {/* <Column
        title="Estimated Arrival"
        dataIndex="estimatedArrival"
        key="estimatedArrival"
      /> */}
      <Column title="Last Updated" dataIndex="updated_at" key="updated_at" />
    </Table>
   
  );
};
export default OptStatus;
