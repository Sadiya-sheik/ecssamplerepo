import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { CustomerActions } from "../redux/Customer";
import axios from "axios";

const getCustomer = (customerId: any, dispatch: any) => {
  //console.log(customerId);
  axios
    .get(`${process.env.REACT_APP_API}/customer`, {
      params: {
        search: customerId,
      },
    })
    .then((response) => {
      //console.log(response.data.Items);
      dispatch(CustomerActions.setFilterdCustomers(response.data.Items));
    });
};
// const getAnalytics=(customerId: any, dispatch: any)=>{
  
//   axios
//   .get(`${process.env.REACT_APP_API}/customer`, {
//     params: {
//       search: customerId,
//     },
//   })
//   .then((response) => {    
//     console.log(response.data.Items);
//     //dispatch(CustomerActions.setFilterdAnalytics(response.data.Items));
//   });
// }
const SearchBox = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Input
        size="large"
        placeholder="search"
        prefix={<SearchOutlined />}
        onChange={(e) => {
          console.log("searched text", e.target.value);
          if (e.target.value && e.target.value!=="") {
            // if user enters some data then find based on that data
            getCustomer(e.target.value, dispatch);
            //getAnalytics(e.target.value, dispatch);
          } else {
            // if user clear the search field the we need to display total data
            dispatch(CustomerActions.resetFilterdCustomers());
          }
        }}
      />
    </>
  );
};
export default SearchBox;
