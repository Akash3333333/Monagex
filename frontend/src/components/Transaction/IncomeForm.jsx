import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './IncomeForm.css';

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

const IncomeForm = ({ userId }) => {
  const [incomeFormData, setIncomeFormData] = useState({
    amount: 0,
    category: '',
    accountType: '',
    payer: '',
    note: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncomeFormData({ ...incomeFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { date, time } = getCurrentDateTime();
    const payload = {
       user: userId,
      ...incomeFormData,
      currentDate: date,
      currentTime: time,
    };

    console.log('Request Payload:', payload);

    try {
      const response = await axios.post('http://localhost:5000/api/income', {
         user: userId,
        ...incomeFormData,
        currentDate: date,
        currentTime: time,
      });

      toast('Income data submitted successfully', {
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
      console.error('Error submitting income data:', error);
    }
  };

  return (
    <form className="income-form" onSubmit={handleSubmit}>
      <InputGroup
        label="Enter Amount"
        type="number"
        id="amount"
        name="amount"
        onChange={handleInputChange}
        required
      />
      <InputGroup
        label="Enter Category"
        type="text"
        id="category"
        name="category"
        onChange={handleInputChange}
        required
      />
      <InputGroup
        label="Select Account Type"
        type="select"
        id="accountType"
        name="accountType"
        options={['Current', 'Savings']}
        onChange={handleInputChange}
        required
      />
      <InputGroup label="Payer" type="text" id="payer" name="payer" onChange={handleInputChange} required />
      <InputGroup label="Note" type="text" id="note" name="note" onChange={handleInputChange} required />

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default IncomeForm;
