import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TransferForm.css'; // Ensure you have the appropriate CSS file

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

const TransferForm = ({ userId }) => {
  const [transferFormData, setTransferFormData] = useState({
    amount: 0,
    paymentFrom: '',
    paymentTo: '',
    uploadFile:'',
    note: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferFormData({ ...transferFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { date, time } = getCurrentDateTime();

    try {
      const response = await axios.post('http://localhost:5000/api/transfer', {
        user: userId,
        ...transferFormData,
        currentDate: date,
        currentTime: time,
      });

      toast('Transfer data submitted successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
    } catch (error) {
      toast.error('Please fill all required fields!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: false,
      });
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
        label="From Account"
        type="text"
        id="fromAccount"
        name="fromAccount"
        onChange={handleInputChange}
        required
      />
      <InputGroup
        label="To Account"
        type="text"
        id="toAccount"
        name="toAccount"
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
