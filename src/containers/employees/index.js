import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAssignments } from "../../services/employees/allEmployees";
import {
  sendErrorNotification,
  sendSuccessNotification,
} from "../../services/notifications";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Link,
  styled,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

const Employees = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    } else {
      fetchEmployees();
    }
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await getAllAssignments();
      if (response.success) {
        setAssignments(response.data.assignments);
      }
    } catch (error) {
      sendErrorNotification("Error fetching assignments!");
      console.error("Error fetching assignments:", error);
    }
    setIsLoading(false);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        sendSuccessNotification("Link copied to clipboard!");
      })
      .catch(() => {
        sendErrorNotification("Failed to copy link");
      });
  };

  return (
    <div style={{ margin:'10px 160px' }} className="people-pages">
      <div className="employees-box">
        <div className="table-container" align="center">
          <Paper >
            <TableContainer>
              <Table  sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Company Name</StyledTableCell>
                    <StyledTableCell>Company Link</StyledTableCell>
                    <StyledTableCell align="center">Copy Link</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment._id}>
                      <TableCell>{assignment.company_name}</TableCell>
                      <TableCell>
                        <Link
                          href={assignment.company_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {assignment.company_link}
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <CopyToClipboard text={assignment.company_link}>
                          <StyledButton>
                            Copy
                          </StyledButton>
                        </CopyToClipboard>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Employees;
