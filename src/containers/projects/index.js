import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaTags from "../../components/meta-tags";
import "./style.scss";
import MainSection from "./main-section";
import Loader from "../../components/loader";
import { getAllLeads } from "../../services/departments/departments";
import { getEmployeeDetailsById } from "../../services/employees/employee-details";
import { getEmployeeData } from "../../services/transaction/transaction";
import TablePagination from "@mui/material/TablePagination";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  styled,
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

const Projects = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [lo, setLo] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [groupedLeads, setGroupedLeads] = useState({});
  const [arrayL, setArrayL] = useState([]);
  

  const fetchProjectsData1 = async () => {
    setLoading(true);
    const response = await getEmployeeData(localStorage.getItem("employee_id"));
    setLo(response.data);
    setArrayL(response.data.referred_agent_id?.reverse());
    setLoading(false);
  };
  const fetchProjectsData = async () => {
    setLoading(true);
    const response = await getAllLeads(localStorage.getItem("employee_id"));
    if (response.success) {
      setLeads(response.data.leads);

      // Group leads by employee_id
      const grouped = {};
      response.data.leads.forEach((lead) => {
        if (!grouped[lead?.referred_agent_id]) {
          grouped[lead?.referred_agent_id] = [];
        }
        grouped[lead?.referred_agent_id].push(lead);
      });
      setGroupedLeads(grouped);
    }
    setLoading(false);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
    fetchProjectsData();
    fetchProjectsData1();
  }, []);

  const handleViewDetails = (employeeId) => {
    console.log(employeeId, "employeeId");
    const selectedEmployee = groupedLeads[employeeId];
    setSelectedEmployeeId(employeeId);
    setSelectedEmployeeData(selectedEmployee);
  };

  const handleCloseDetails = () => {
    setSelectedEmployeeId("");
    setSelectedEmployeeData(null);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="projects-page">
      <h2>Leads Status</h2>
            
      <div className="projects-container">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Agent Code</StyledTableCell>

                <StyledTableCell>Balance</StyledTableCell>
                <StyledTableCell>View Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {   arrayL?.slice(page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage).map((agent, index) => (
                  <TableRow key={index}>
                    <TableCell>{agent.id}</TableCell>
                    <TableCell>{agent.amount}</TableCell>
                    <TableCell>
                      <StyledButton type="button" onClick={() => handleViewDetails(agent.id)}>
                        View
                      </StyledButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={lo?.referred_agent_id?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      
        </TableContainer>

        {/* Display grouped leads */}
        {selectedEmployeeData && (
          <div className="details-tab">
            <h3>Agent Code: {selectedEmployeeId}</h3>
            {selectedEmployeeData.map((lead) => (
              <div key={lead._id}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <StyledTableCell>Company Name:</StyledTableCell>
                        <TableCell>{lead.company_name?.join(', ')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell>Name:</StyledTableCell>
                        <TableCell>{lead.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell>Status:</StyledTableCell>
                        <TableCell>{lead.status}</TableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell>Mobile:</StyledTableCell>
                        <TableCell>{lead.mob_no}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ))}
            <StyledButton onClick={handleCloseDetails}>Close</StyledButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
