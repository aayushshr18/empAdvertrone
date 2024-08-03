import React, { useState,useEffect } from "react";
import "./get.css";

const GetData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("employee_id");
  const [username, setUsername] = useState("");
  
  const handleGetData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URI}/api/employee/data?userId=${userId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };


  const handleGetUser = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URI}/api/employee/detail?employee_id=${userId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setUsername(result.data.name);
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    handleGetUser()
  }, [])
  

  const handleChangeFlag = async () => {
    if (!data) return;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URI}/api/employee/flag?dataId=${data._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err.message || "Error updating flag");
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${data.number}`;
  };

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(data.number);
    window.location.href = url;
  };

  const getWhatsAppUrl = (phoneNumber) => {
    let message = `Hi ${data.name},  I'm ${username}, from Advertrone Technologies Pvt Ltd.
I received your inquiry for telecalling job, are you interested for work from home based job without any charges or investment?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <div className="Capp">
      <header className="Capp-header">
        <h1>Data Task</h1>
        <div className="form-group">
          <button onClick={handleGetData} className="btn btn-primary">
            {loading ? "Loading..." : "Get Data"}
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {data && (
          <div className="data-display">
            <p>
              <strong>Name:</strong> {data?.name}
            </p>
            <p>
              <strong>Number:</strong> {data?.number}
            </p>
            <button
              style={{
                backgroundColor: "blue",
                color: "white",
                fontWeight: "700",
                margin: "5px",
              }}
              onClick={handleCall}
              className="btn"
            >
              Call
            </button>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                fontWeight: "700",
                margin: "5px",
              }}
              onClick={handleWhatsApp}
              className="btn"
            >
              WhatsApp
            </button>

            <button
              onClick={handleChangeFlag}
              className="btn"
              style={{ backgroundColor: "yellow", margin: "5px" }}
            >
              {data.flag ? "Done" : "Mark as done"}
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default GetData;
