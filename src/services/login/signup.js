import { fetchUrl } from "../../utils/fetchUrl";

export const signup = async (id, otp) => {
  const url = process.env.REACT_APP_BASE_URL + "/api/v1/employees/signup";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = { id, otp };
  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    redirect: "follow",
  };
  return await fetchUrl(url, requestOptions);
};

export const register = async (
  name,
  email,
  password,
  phoneNo,
  agent_code,
  accountNo,
  ifsc,
  upiId
) => {
  const url = process.env.REACT_APP_BASE_URL + "/api/employee/signup";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = {
    name,
    email,
    password,
    phoneNo,
    agent_code,
    accountNo,
    ifsc,
    upiId,
  };
  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    redirect: "follow",
  };
  return await fetchUrl(url, requestOptions);
};

export const preSignup = async (
  name,
  email,
  password,
  phoneNo,
  agent_code,
  accountNo,
  ifsc,
  upiId
) => {
  const url =
    process.env.REACT_APP_BASE_URL + "/api/v1/employees/signup/send-otp";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = {
    name,
    email,
    password,
    phoneNo,
    agent_code,
    accountNo,
    ifsc,
    upiId,
  };
  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    redirect: "follow",
  };
  return await fetchUrl(url, requestOptions);
};

export const preSignupResendOTP = async (id) => {
  const url =
    process.env.REACT_APP_BASE_URL + "/api/v1/employees/signup/resend-otp/";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = { method: "GET", headers, redirect: "follow" };
  return await fetchUrl(url + id, requestOptions);
};
