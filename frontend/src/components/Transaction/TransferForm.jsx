import React from 'react';
import './TransferForm.css'; // Import your responsive CSS file

function TransferForm() {
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
        <label htmlFor="paymentfrom">From</label>
        <input type="text" id="paymentfrom" className="form-control" />
      </div>
      <div className="input-group">
        <label htmlFor="paymentTo">To</label>
        <input type="text" id="paymentTo" className="form-control" />
      </div>
      <div className="input-group">
        <label htmlFor="uploadfile">Upload File</label>
        <input type="file" id="uploadfile" className="form-control" />
      </div>
      <div className="input-group">
        <label htmlFor="note">Note</label>
        <input type="text" id="note" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default TransferForm;
