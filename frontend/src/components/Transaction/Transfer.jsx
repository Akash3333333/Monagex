//transfer.jsx
import TransferForm from "./TransferForm";
import Footer from "../Footer";
import './Transfer.css';
import TransNav from "./TransNav";

function Transfer() {

  return (
    <div className="transfer-container">
      <TransNav />
      <div className="transfer-content">
        <TransferForm />
      </div>
      <Footer />
    </div>
  );
}

export default Transfer;
