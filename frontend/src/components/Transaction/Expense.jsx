import ExpenseForm from "./ExpenseForm";
import Footer from "../Footer";
import './Expense.css';
import TransNav from "./TransNav";

function Expense() {
  return (
    <div className="expense-container">
      <TransNav />
      <div className="expense-content">
        <ExpenseForm />
      </div>
      <Footer />
    </div>
  );
}

export default Expense;
