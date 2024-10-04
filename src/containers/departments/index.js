/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addLead,
  getAllCompanies,
} from "../../services/departments/departments";
import { sendErrorNotification } from "../../services/notifications";
import {
  Table,
  TableCell,
  Checkbox,
  TableHead,
  TableRow,
  TableBody,
  styled,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  Select,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // Your custom styling here
  background: "#2a2185",
  color: "#e0e01c",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  // Your custom styling here
  background: "#2a2185",
  color: "#e0e01c",
}));

const Departments = () => {
  const navigate = useNavigate();
  const [selectedCompanies, setSelectedCompanies] = useState([]);
 
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const empId = localStorage.getItem("employee_id");
  const agentCode = localStorage.getItem("agent_code");
  const [newLeads, setNewLeads] = useState({
    company_name: "",
    name: "",
    mob_no: "",
    date: "",
    employee_id: localStorage.getItem("employee_id"),
    referred_agent_id: "",
  });
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      const response = await getAllCompanies();
      if (response.success) {
        setCompanies(response.data.assignments);
      }
    } catch (error) {
      sendErrorNotification("Error fetching companies!");
      console.error("Error fetching companies:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeads({ ...newLeads, [name]: value });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const currentDate = new Date();

        // Update the newLeads object with the current date
        const updatedNewLeads = {
          ...newLeads,
          company_name:selectedCompanies,
          date: currentDate,
        };
        console.log(updatedNewLeads);
        const response = await addLead(updatedNewLeads);
        setError(JSON.stringify(response));
        if (response.success) {
          setLeads(response.data.lead);

          // Reset the form fields after adding a lead
          setNewLeads({
            company_name: [],
            name: "",
            mob_no: "",
            employee_id: localStorage.getItem("employee_id"),
            referred_agent_id: "",
            date: "",
          });
        }
      } catch (error) {
        sendErrorNotification("Error adding lead!");
        console.error("Error adding lead:", error);
      }

      setIsLoading(false);
    },
    [
      addLead,
      newLeads,
      leads,
      setLeads,
      setNewLeads,
      empId,
      sendErrorNotification,
    ]
  );

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
    fetchCompanies();
  }, []);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Adjust the date format as needed
    return formattedDate;
  };

  return (
    <div
      className="departments-page"
      style={{ marginLeft: "80px", marginRight: "20px" }}
    >
      <div className="departments-container">
        <div className="departments-small-box">
          <div
            style={{
              marginLeft: "200px",
              marginTop: "20px",
              width: "150px",
              textAlign: "center",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ padding: "1px 6px" }}>
                    AGENT CODE SELF
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ padding: "1px 6px" }}>
                    {agentCode}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/* <div>
        <button className='button'>Button</button>
      </div> */}
        </div>

        <div className="departments-small-box1">
          <div className="depart">
            <div align="center" style={{ padding: "15px 80px" }}>
              <form onSubmit={handleSubmit}>
                <h2>Add Lead</h2>
                <FormControl fullWidth style={{ marginBottom: "20px",display:"flex",flexDirection:"column" }}>
                  <InputLabel>Company Name:</InputLabel>
                  <Select
              multiple
              value={selectedCompanies}
              onChange={(e) => setSelectedCompanies(e.target.value)}
              renderValue={(selected) => selected.join(", ")}
              style={{ marginTop: "50px", display: "flex", flexDirection: "row" }}
            >
              {companies.map((company) => (
                <MenuItem key={company.company_name} value={company.company_name}>
                  {company.company_name}
                </MenuItem>
              ))}
            </Select>
                </FormControl>
      
                <div style={{ display: "flex", gap: "10px" }}>
                  <TextField
                    id="referred_agent_id"
                    name="referred_agent_id"
                    label="Agent Code:"
                    value={newLeads.referred_agent_id}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="name"
                    name="name"
                    label="Name:"
                    value={newLeads.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="mob_no"
                    name="mob_no"
                    label="Mob_No:"
                    value={newLeads.mob_no}
                    onChange={handleInputChange}
                  />
                  <StyledButton
                    type="submit"
                    variant="contained"
                    style={{ width: "300px" }}
                    disabled={isLoading}
                  >
                    ADD
                  </StyledButton>
                </div>
              </form>
              <hr style={{ margin: "15px 0px" }} />
              <h2>Added Lead:</h2>
              <Table align="center" border="2">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ padding: "1px 5px" }}>
                      Company Name
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: "1px 5px" }}>
                      Name
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: "1px 5px" }}>
                      Mob_No
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: "1px 5px" }}>
                      Status
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: "1px 5px" }}>
                      Agent_Code
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: "1px 5px" }}>
                      Date
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={leads._id}>
                    <TableCell style={{ padding: "1px 5px" }}>
                    {leads.company_name?.join(', ')}
                    </TableCell>
                    <TableCell style={{ padding: "1px 5px" }}>
                      {leads.name}
                    </TableCell>
                    <TableCell style={{ padding: "1px 5px" }}>
                      {leads.mob_no}
                    </TableCell>
                    <TableCell style={{ padding: "1px 5px" }}>
                      {leads.status}
                    </TableCell>
                    <TableCell style={{ padding: "1px 5px" }}>
                      {leads.referred_agent_id}
                    </TableCell>
                    <TableCell style={{ padding: "1px 5px" }}>
                      {getCurrentDate()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>


              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
