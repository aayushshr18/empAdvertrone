import { getLocalStorageKey } from "../../utils/localStorage";
import { fetchUrl } from "../../utils/fetchUrl";

export const withdrawRequest = async (amount, employee_id) => {
  const url =
    process.env.REACT_APP_BASE_URL + "/api/transaction/employee/withdraw";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers,
    redirect: "follow",
    body: JSON.stringify({ amount, employee_id }), // Pass assignmentData as the request body
  };
  const response = await fetchUrl(url, requestOptions);
  return response;
};

export const getAllBoards = async () => {
  const token = getLocalStorageKey("token");
  const url = process.env.REACT_APP_BASE_URL + "/api/v1/task-board/boards";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);

  const requestOptions = { method: "GET", headers, redirect: "follow" };
  return await fetchUrl(url, requestOptions);
};

export const createBoard = async (details) => {
  const token = getLocalStorageKey("token");
  const url = process.env.REACT_APP_BASE_URL + "/api/v1/task-board/boards";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);

  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(details),
    redirect: "follow",
  };
  return await fetchUrl(url, requestOptions);
};

export const getBoardById = async (id) => {
  const token = getLocalStorageKey("token");
  const url = process.env.REACT_APP_BASE_URL + "/api/v1/task-board/boards";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);

  const params = "/" + id;

  const requestOptions = { method: "GET", headers, redirect: "follow" };
  return await fetchUrl(url + params, requestOptions);
};

export const deleteBoardById = async (id) => {
  const token = getLocalStorageKey("token");
  const url = process.env.REACT_APP_BASE_URL + "/api/v1/task-board/boards";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);

  const params = "/" + id;

  const requestOptions = { method: "DELETE", headers, redirect: "follow" };
  return await fetchUrl(url + params, requestOptions);
};

export const updateBoardById = async (id, details) => {
  const token = getLocalStorageKey("token");
  const url = process.env.REACT_APP_BASE_URL + "/api/v1/task-board/boards";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);

  const params = "/" + id;

  const requestOptions = {
    method: "PUT",
    headers,
    body: JSON.stringify(details),
    redirect: "follow",
  };
  return await fetchUrl(url + params, requestOptions);
};
