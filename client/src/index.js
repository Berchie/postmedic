import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import axios from "axios";

// const defaultQueryFn = async ({ queryKey }) => {
//   const { data } = await axios.get(`http://localhost:5000${queryKey[0]}`);
//   return data;
// };

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       queryFn: defaultQueryFn,
//     },
//   },
// });

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
