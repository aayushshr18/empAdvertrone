import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaTags from "../../components/meta-tags";
import { mapProfileData } from "../../data/profileData";
import MainSection from "./main-section";
import "./style.scss";
import { getEmployeeTransactions } from "../../services/transaction/transaction"; // Import your service function
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // Your custom styling here
  background: '#2a2185',
  color:'#e0e01c'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  // Your custom styling here
  background: '#2a2185',
  color:'#e0e01c'
}));

const Profile = () => {
  const navigate = useNavigate();
  const employee = useSelector((state) => state.employee.loggedInEmployee);
  const profileData = mapProfileData(employee);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    } else {
      // Fetch transactions for the employee from the backend
      fetchTransactions();
    }
  }, []);

  const fetchTransactions = async () => {
    try {
      const employee_id = localStorage.getItem("employee_id"); // Get the employee ID from your state
      const response = await getEmployeeTransactions(employee_id); // Fetch transactions
      if (response.success) {
        setTransactions(response.data.transactions);
      } else {
        console.error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  return (
    <div className="withdrual">
      <div className="withdrual-box">
        <h3 style={{ paddingTop: "10px" }}>
          Welcome {localStorage.getItem("employeeEmail")}!
        </h3>
        <div style={{ marginTop: "40px" }} align="center">
          <TableContainer component={Paper}>
            <Table>
              <caption>
                <Typography variant="h6">Withdrawal Status</Typography>
              </caption>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;
