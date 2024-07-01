import IncomeForm from "./IncomeForm";
import Footer from "../Footer";
import './income.css';
import TransNav from "./TransNav";

const Income = () => {
 
  return (
    <div className="income-container">
      <TransNav />
      <div className="income-content">
        <IncomeForm/>
      </div>
      <Footer />
    </div>
  );
};

export default Income;
