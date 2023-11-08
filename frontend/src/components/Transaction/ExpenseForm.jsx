import React from 'react';
import './ExpenseForm.css';

function ExpenseForm() {
  return (
    <form className="income-form">
      <div className="input-group">
        <label htmlFor="currentDate">Enter Current Date</label>
        <input type="date" id="currentDate" className="form-control" />
      </div>
      <div className="input-group">
        <label htmlFor="amount">Enter Amount</label>
        <input type="number" id="amount" className="form-control" />
      </div>
      <div className="input-group">
        <label htmlFor="category">Choose Category</label>
        <input type="text" id="category" className="form-control" />
      </div>
      <div className="input-group">
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" className="form-control" />
      </div>
      <div className="input-group">
        <label htmlFor="paymentMethod">Select Payment Method</label>
        <input type="text" id="paymentMethod" className="form-control" />
      </div>
      <div className="input-group">
        <label htmlFor="payer">Payer</label>
        <input type="text" id="payer" className="form-control" />
      </div>
      <div className="input-group">
        <label htmlFor="note">Note</label>
        <input type="text" id="note" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default ExpenseForm;
