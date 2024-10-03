import { fetchUrl } from "../../utils/fetchUrl";

export const withdrawRequest = async (amount, employee_id, agentId) => {
  const url =
    process.env.REACT_APP_BASE_URL + "/api/transaction/employee/withdraw";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers,
    redirect: "follow",
    body: JSON.stringify({ amount, employee_id, agentId }), // Pass assignmentData as the request body
  };
  const response = await fetchUrl(url, requestOptions);
  return response;
};

export const getEmployeeTransactions = async (employee_id) => {
  const url = `${process.env.REACT_APP_BASE_URL}/api/transaction/employee/withdraw?employee_id=${employee_id}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = { method: "GET", headers, redirect: "follow" };
  return await fetchUrl(url, requestOptions);
};

export const getEmployeeData = async (employee_id) => {
  const url = `${process.env.REACT_APP_BASE_URL}/api/employee/detail?employee_id=${employee_id}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = { method: "GET", headers, redirect: "follow" };
  return await fetchUrl(url, requestOptions);
};

export const getDashboardData = async (employee_id) => {
  const url = `${process.env.REACT_APP_BASE_URL}/api/employee/dashboard/${employee_id}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = { method: "GET", headers, redirect: "follow" };
  return await fetchUrl(url, requestOptions);
};