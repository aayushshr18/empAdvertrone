/* eslint-disable react-hooks/exhaustive-deps */
import WelcomePage from "./welcome-page";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  withdrawRequest,
  getEmployeeData,
} from "../../services/transaction/transaction";
import {
  sendErrorNotification,
  sendSuccessNotification,
} from "../../services/notifications";
import Loader from "../../components/loader";
import { Button, TextField, Typography, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  // Your custom styling here
  background: "#2a2185",
  color: "#e0e01c",
}));

const Task = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  // const [agentId, setAgentId] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [balance, setBalance] = useState(0); // State to manage the balance
  const navigate = useNavigate();

  const fetchEmployeeData = async (employeeId) => {
    try {
      const response = await getEmployeeData(employeeId);
      console.log(response);
      if (response.success) {
        localStorage.setItem(
          "accessibleBalance",
          response.data.accessibleBalance
        );
        setIsLoading(false);
      } else {
        sendErrorNotification(response.message);
      }
    } catch (error) {
      sendErrorNotification("Failed to fetch employee data:", error);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    } else {
      const employeeId = localStorage.getItem("employee_id");
      fetchEmployeeData(employeeId);
    }
  }, []);

  const handleWithdraw = async () => {
    try {
      const response = await withdrawRequest(
        withdrawAmount,
        localStorage.getItem("employee_id")
      );
      if (response.success) {
        sendSuccessNotification("Withdraw request added successfully!");

        // Update balance after successful withdrawal
        const currentBalance = Number(
          localStorage.getItem("accessibleBalance")
        );
        const withdrawnAmount = Number(withdrawAmount);
        // const updatedBalance = currentBalance - withdrawnAmount;
        const updatedBalance = currentBalance;

        localStorage.setItem("accessibleBalance", updatedBalance);
        setBalance(updatedBalance); // Update the balance in state

        // Update accessibleBalance after withdrawal
        const updatedAccessibleBalance = updatedBalance; // Assuming the entire balance is now accessible
        localStorage.setItem("accessibleBalance", updatedAccessibleBalance);

        setWithdrawAmount("");
      } else {
        sendErrorNotification(response.message);
      }
    } catch (error) {
      sendErrorNotification("Failed to initiate withdrawal request!");
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setWithdrawAmount(value);

    const accessibleBalance = localStorage.getItem("accessibleBalance");
    setIsButtonDisabled(Number(value) > Number(accessibleBalance));
  };


  return isLoading ? (
    <Loader />
  ) : (
    <div className="task-container">
      <div className="task-box-one">
        <h1>AMOUNT</h1>

        <h3> ALLOW ONLY AVAILABLE BALANCE</h3>
        <span>{localStorage.getItem("accessibleBalance")}</span>
        <h3>WITHDRAWAL</h3>
        <TextField
          type="number"
          value={withdrawAmount}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />

        <StyledButton
          variant="contained"
          disabled={isButtonDisabled}
          onClick={handleWithdraw}
        >
          Withdraw
        </StyledButton>
      </div>
    </div>
  );
};

export default Task;
