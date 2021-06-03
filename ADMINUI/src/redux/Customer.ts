import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IAnalytics {
  customerName: String;
  updated_at: String;
  created_at: String;
  dateTime: String;
  responseTime: String;
  deviceType: [];
  orderStatus: Array<String>;
  orderId: String;
  _id: Number;
  region: String;
}
interface ICustomer {
  customerName: String;
  dateTime: String;
  created_at: String;
  responseTime: String;
  deviceType: String;
  orderStatus: [String];
  orderId: String;
  message: String;
  updated_at: String;
  notificationStatus: String;
  optStatus: String;
  region: String;
  estimatedArrival: String;
  messageStatus: String;
  customerId: String;
  Count: Number;
  ScannedCount: Number;
}

export interface ICustomerState {
  analytics: Array<ICustomer>;
  filterdAnalytics: Array<ICustomer>;
  allCustomers: Array<ICustomer>;
  filterdCustomers: Array<ICustomer>;
}

const initialState: ICustomerState = {
  analytics: [],
  allCustomers: [],
  filterdCustomers: [],
  filterdAnalytics:[]
};

const CustomersSlice = createSlice({
  name: "OrderDetails",
  initialState: initialState,
  reducers: {
    setAnalyitcs: (state, action: PayloadAction<Array<ICustomer>>) => {
      state.analytics = action.payload;
    },
    setFilterdAnalytics: (state, action: PayloadAction<Array<ICustomer>>) => {
      state.filterdAnalytics = action.payload;
    },
    resetFilterdAnalytics: (state) => {
      state.filterdAnalytics = state.analytics;
    },
    setAllCustomers: (state, action: PayloadAction<Array<ICustomer>>) => {
      state.allCustomers = action.payload;
    },
    setFilterdCustomers: (state, action: PayloadAction<Array<ICustomer>>) => {           
      state.filterdCustomers = action.payload;
    },
    resetFilterdCustomers: (state) => {
      state.filterdCustomers = state.allCustomers;
    },
    
  },
});

const CustomerReducer = CustomersSlice.reducer;
const CustomerActions = CustomersSlice.actions;
export { CustomerReducer, CustomerActions };
