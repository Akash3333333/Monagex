import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TransferForm.css';

const InputGroup = ({ label, type, id, name, options, onChange, required }) => (
  <div className="input-group">
    <label htmlFor={id}>{label}</label>
    {type === 'select' ? (
      <select id={id} name={name} className="form-control" onChange={onChange} required={required}>
        <option value="" disabled>Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        className="form-control"
        onChange={onChange}
        required={required}
      />
    )}
  </div>
);

const getCurrentDateTime = () => {
  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const formattedTime = now.toTimeString().split(' ')[0];
  return { date: formattedDate, time: formattedTime };
};

const TransferForm = () => {
  const [transferFormData, setTransferFormData] = useState({
    amount: 0,
    paymentFrom: '',
    paymentTo: '',
    uploadFile: '',
    note: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferFormData({ ...transferFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { date, time } = getCurrentDateTime();
    const payload = {
      ...transferFormData,
      currentDate: date,
      currentTime: time,
    };

    try {
      const jwt = localStorage.getItem('jwt'); // Retrieve JWT token from localStorage
      const response = await axios.post('https://monagex-backend.vercel.app/api/finance/create-transfer', payload, {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include JWT token in Authorization header
        },
      });

      toast('Transfer data submitted successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Please fill all required fields!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
      } else {
        toast.error('Failed to submit transfer data. Please try again later.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: false,
        });
      }
      console.error('Error submitting transfer data:', error);
    }
  };

  return (
    <form className="transfer-form" onSubmit={handleSubmit}>
      <InputGroup
        label="Enter Amount"
        type="number"
        id="amount"
        name="amount"
        onChange={handleInputChange}
        required
      />
      <InputGroup
        label="Payment From"
        type="text"
        id="paymentFrom"
        name="paymentFrom"
        onChange={handleInputChange}
        required
      />
      <InputGroup
        label="Payment To"
        type="text"
        id="paymentTo"
        name="paymentTo"
        onChange={handleInputChange}
        required
      />
      <InputGroup
        label="Upload File"
        type="file"
        id="uploadFile"
        name="uploadFile"
        onChange={handleInputChange}
      />
      <InputGroup label="Note" type="text" id="note" name="note" onChange={handleInputChange} required />

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default TransferForm;
