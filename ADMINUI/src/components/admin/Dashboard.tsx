import { Row, Tabs } from "antd";
import Analytics from "./Analytics";
import NotificationList from "./NotificationList";
import OptStatus from "./OptStatus";
import "./styles/dashboard.css";
import  { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/createStore";
import axios from "axios";
import { CustomerActions } from "../../redux/Customer";

const { TabPane } = Tabs;

const getCustomers = async () => {
  try {
    const response = await axios.get(`https://alb.dev.notifications.vinlocity.io/customers`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// const getAnalytics = async () => {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_API}/analytics`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
// const getAnalytics = async () => {
//   return data;
// };
const Dashboard: FC = () => {
  const dispatch = useDispatch();

  const { allCustomers, analytics } = useSelector(
    (state: RootState) => state.Customer
  );

  useEffect(() => {
    if (allCustomers.length <= 0) {
      getCustomers().then((result) => {
        //console.log(result.Items);
        dispatch(CustomerActions.setAllCustomers(result.Items));
        dispatch(CustomerActions.setFilterdCustomers(result.Items));
      });
    }
    
    // if (analytics.length <= 0) {
    //   getAnalytics().then((result) => {
    //    // console.log(result.Items);
    //     dispatch(CustomerActions.setAnalyitcs(result.Items));
    //     dispatch(CustomerActions.setFilterdAnalytics(result.Items));
    //   });
    // }
  });

  return (
    <Row className="dashboard-wrapper">
      <Tabs defaultActiveKey="1">
        <TabPane tab="View All Notifications" key="1">
          <NotificationList />
        </TabPane>
        <TabPane tab="Opt in / Opt out Status" key="2">
          <OptStatus />
        </TabPane>
        <TabPane tab="Analytics" key="3">
          <Analytics />
        </TabPane>
      </Tabs>
    </Row>
  );
};
export default Dashboard;
