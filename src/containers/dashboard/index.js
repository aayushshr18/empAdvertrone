// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import MetaTags from '../../components/meta-tags';
// import { mapDashboardData } from '../../data/dashboardData.js';
// import MainSection from './main-section.js';
// import TopSection from './top-section.js';
// import './styles.scss';
// import Loader from '../../components/loader';
// import { getAllEmployees } from '../../services/employees/allEmployees';

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(mapDashboardData());
//   const [isLoading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const syncDashboard = async () => {
//     setLoading(true);
//     const response = await getAllEmployees();
//     setDashboardData(mapDashboardData({}, response.body.data));
//     setLoading(false);
//   };

//   useEffect(() => {
//     if(!localStorage.getItem('authToken'))
//     {
//       navigate("/login");
//     }
//   }, []);

//   return ( isLoading ? <h3>Loading...</h3> :
//     <div className='dashboard-page'>
//       <div className="dasboard-container">
//       <div className="dasboard-one">
//         <div className="dasboard-small1">
//             <h4>Today Earning</h4>
//             <span>12345</span>

//         </div>
//         <div className="dasboard-small2">
//             <h4>Last week Earning</h4>
//             <span>55654</span>

//         </div>
//       </div>

//       <div className="dasboard-two" style={{marginTop:"30px"}}>
//         <div className="dasboard-small1">
//             <h3>AVILABLE  BALANCE </h3>
//             <span>889546</span>

//             </div>
//           <div className="dasboard-small2">
//             <h3> TOTAL EARNING </h3>
//             <span>7789564</span>

//             </div>

//       </div>
//     </div>

//     </div>
//   )
// }

// export default Dashboard

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaTags from "../../components/meta-tags";
import MainSection from "./main-section.js";
import TopSection from "./top-section.js";
import "./styles.scss";
import Loader from "../../components/loader";
import { getDashboardData } from "../../services/transaction/transaction";
// import { getEmployeeData } from "../../services/transaction/transaction";
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const employee_id = localStorage.getItem("employee_id");
      const response = await getDashboardData(employee_id);
      console.log(response);
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      // Handle error or show error notification
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      // navigate("/login");
    } else {
      fetchDashboardData();
    }
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="dashboard-page">
      <div className="dasboard-container">
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <div
            className="dasboard-small1"
            style={{
              color: "white",
              backgroundColor: "darkmagenta",
              borderRadius: "2%",
              padding: "20px",
              textAlign: "center",
            }}
            onClick={() => navigate("/employees")}
          >
            <h4>Today Earning</h4>
            <h2>{dashboardData.dailyEarnings}</h2>
          </div>
          <div
            className="dasboard-small2"
            style={{
              color: "white",
              backgroundColor: "blueviolet",
              borderRadius: "2%",
              padding: "20px",
              textAlign: "center",
            }}
            onClick={() => navigate("/tasks")}
          >
            <h4>Last week Earning</h4>
            <h2>{dashboardData.weeklyEarnings}</h2>
          </div>
          <div
            className="dasboard-small1"
            style={{
              color: "white",
              backgroundColor: "darkgoldenrod",
              padding: "20px",
              textAlign: "center",
              borderRadius: "2%",
            }}
          >
            <h3>AVAILABLE BALANCE</h3>
            <h2>{dashboardData.accessibleBalance}</h2>
          </div>
          <div
            className="dasboard-small2"
            style={{
              color: "white",
              backgroundColor: "darkolivegreen",
              padding: "20px",
              textAlign: "center",
              borderRadius: "2%",
            }}
            onClick={() => navigate("/departments")}
          >
            <h3>TOTAL EARNING</h3>
            <h2>{dashboardData.balance}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
