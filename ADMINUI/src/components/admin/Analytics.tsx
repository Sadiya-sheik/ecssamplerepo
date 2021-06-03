import { Table, Tag } from "antd";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/createStore";


const Analytics = () => {
  const { filterdCustomers } = useSelector((state: RootState) => state.Customer);
  //console.log(filterdCustomers);
  const columns = [
    {
      title:"Dealer / Customer Name",
      dataIndex:'dealerName',
      key:"dealerName"
      
    },
    {
      title:"Region",
      dataIndex:"region",
      key:"region"
    },
    {
      title:"Device Type",
      dataIndex:"deviceType",
      key:"deviceType",                 
      render: (text:string) => <Tag color={text==='Desktop'?'green':'blue'} key={text}>
                              {text.toUpperCase()}
                            </Tag> ,     
    },
    {
      title:"Date/Time",
      dataIndex:"created_at",
      key:"created_at"
    },    
  ];
  return (
    <Table dataSource={filterdCustomers} columns={columns} pagination={{ defaultPageSize: 7 }}></Table>
  );
};
export default Analytics;
