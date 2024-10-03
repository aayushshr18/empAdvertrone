import React, { useState } from "react";
import { fetchUrl } from "../../utils/fetchUrl";
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    userId: '', // Assuming this comes from authentication context or input
    poNo: '',
    billingAddress: '',
    invNo: '',
    invDate: '',
    invAmt: '',
    customer: '',
    street: '',
    pinCode: '',
    city: '',
    state: '',
    table1: ['', '', '', '', '', '', '', ''], // Matches table1 array
    webCenterTimeDetails: Array(8).fill(Array(7).fill('')), // Initializes a 7x8 table as described in schema
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTableChange = (rowIndex, colIndex, value) => {
    const updatedTable = formData.webCenterTimeDetails.map((row, rIdx) => 
      rIdx === rowIndex ? row.map((col, cIdx) => cIdx === colIndex ? value : col) : row
    );
    setFormData({ ...formData, webCenterTimeDetails: updatedTable });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = process.env.REACT_APP_BASE_URL + '/api/employee/form';
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const body = JSON.stringify(formData);
      
      const requestOptions = { method: 'POST', headers, body };
      const response = await fetchUrl(url, requestOptions);

      console.log(response);

      if (response) {
        alert("Form submitted successfully!");
        // Optionally reset the form
        setFormData({
          userId: '',
          poNo: '',
          billingAddress: '',
          invNo: '',
          invDate: '',
          invAmt: '',
          customer: '',
          street: '',
          pinCode: '',
          city: '',
          state: '',
          table1: ['', '', '', '', '', '', '', ''],
          webCenterTimeDetails: Array(8).fill(Array(7).fill('')),
        });
      } else {
        alert("Error submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Error in Form Submission:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2>Employee Invoice Form</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Employee Work Details:</legend>

          {/* Employee and Billing Info */}
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              name="userId"
              placeholder="User ID"
              value={formData.userId}
              onChange={handleChange}
              required
            />
            <label>PO Number</label>
            <input
              type="text"
              name="poNo"
              placeholder="PO Number"
              value={formData.poNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="billing-address-group">
  <label>Billing Address</label>

  {/* Street Address 1 and Street Address 2 on the same line */}
  <div className="street-address-group">
    <input
      type="text"
      name="billingAddress"
      placeholder="Street Address 1"
      value={formData.billingAddress}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="street"
      placeholder="Street Address 2"
      value={formData.street}
      onChange={handleChange}
    />
  </div>

  {/* City, State, and Postal Code on the next line */}
  <div className="city-state-zip-group">
    <input
      type="text"
      name="city"
      placeholder="City"
      value={formData.city}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="state"
      placeholder="State / Province"
      value={formData.state}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="pinCode"
      placeholder="Postal / Zip Code"
      value={formData.pinCode}
      onChange={handleChange}
      required
    />
  </div>
</div>

          {/* Invoice Details */}
          <div className="form-group">
            <label>Invoice Number</label>
            <input
              type="text"
              name="invNo"
              placeholder="(000000)"
              value={formData.invNo}
              onChange={handleChange}
              required
            />
            <label>Invoice Amount</label>
            <input
              type="number"
              name="invAmt"
              placeholder="Invoice Amount"
              value={formData.invAmt}
              onChange={handleChange}
              required
            />
            <label>Invoice Date</label>
            <input
              type="date"
              name="invDate"
              value={formData.invDate}
              onChange={handleChange}
              required
            />
            <label>Customer</label>
            <input
              type="text"
              name="customer"
              placeholder="Customer Name"
              value={formData.customer}
              onChange={handleChange}
              required
            />
          </div>

          {/* WebCenter Timecard Table */}
          <div className="timecard-table">
            <h3>WebCenter Timecard Details</h3>
            <table>
              <thead>
                <tr>
                  <th></th>
                  {Array.from({ length: 7 }, (_, i) => <th key={i}>Day {i + 1}</th>)}
                </tr>
              </thead>
              <tbody>
                {formData.webCenterTimeDetails.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{['In', 'Break', 'Lunch Out', 'Lunch In', 'Lunch O2', 'Lunch I2', 'Out', 'Hours'][rowIndex]}</td>
                    {row.map((col, colIndex) => (
                      <td key={colIndex}>
                        <input
                          type="text"
                          value={col}
                          onChange={(e) => handleTableChange(rowIndex, colIndex, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submit Button */}
          <div className="button-container">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
