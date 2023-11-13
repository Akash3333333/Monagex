import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ExpenseForm.css'; // Ensure you have the appropriate CSS file

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

const ExpenseForm = ({ userId }) => {
  const [expenseFormData, setExpenseFormData] = useState({
    amount: 0,
    category: '',
    paymentMethod: '',
    uploadFile:'',
    payee: '',
    note: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormData({ ...expenseFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { date, time } = getCurrentDateTime();

    try {
      const response = await axios.post('http://localhost:5000/api/expense', {
        user: userId,
        ...expenseFormData,
        currentDate: date,
        currentTime: time,
      });

      toast('Expense data submitted successfully', {
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
      console.error('Error submitting expense data:', error);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
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
        label="Select Payment Method"
        type="select"
        id="paymentMethod"
        name="paymentMethod"
        options={['Credit Card', 'Cash','UPI']}
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
      <InputGroup label="Payee" type="text" id="payee" name="payee" onChange={handleInputChange} required />
      <InputGroup label="Note" type="text" id="note" name="note" onChange={handleInputChange} />

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
