
import { use, useState } from 'react';
import { useAddTransaction } from '../../hook/useAddTransaction.js';
import { useGetTransactions } from '../../hook/useGettransactions.js';
import { useGetUserInfo } from '../../hook/useGetUserInfo.js';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { auth } from '../../config/firebase-config.js';


export const ExpenseTracker = () => {
  const { addTransaction, deleteTransaction } = useAddTransaction();
  const { transactions,monthlyTotals,transactionTotals } = useGetTransactions();
  const { name, profilePhoto ,userId} = useGetUserInfo();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("Expenses");
 //   const [transactionTotals, setTransactionTotals] = useState({ balance: 0, income: 0, expenses: 0 });
  const { balance, income, expenses } = transactionTotals;

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (confirmDelete) {
      await deleteTransaction(id);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });
    setDescription("");
    setTransactionAmount("");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          {profilePhoto && (
            <div className="profile">
              <img src={profilePhoto} alt="Profile" className="profile-photo" />
              <button className="sign-out-btn" onClick={signUserOut}>
                sign out
              </button>
            </div>
          )}
        </div>
        <div className="navbar-right">
          <span className="nav-link">Home</span>
          <span className="nav-link">About</span>
        </div>
      </nav>

      <div className="expense-tracker">
        <div className="header">
          <h2>Welcome {name}, to</h2>
          <h1>Expense Tracker</h1>
          <p>Track your expenses and income</p>
        </div>

        <div className="contanier">
          <div className="balance">
            <h3>Your balance</h3>
            {balance >= 0 ? (
              <h2>₹{balance}</h2>
            ) : (
              <h2 style={{ color: "red" }}>-₹{balance * -1}</h2>
            )}
          </div>
          <div>
            <div className="summary">
              <div className="income">
                <h3>Income</h3>
                <p>₹{income}</p>
              </div>
              <div className="expense">
                <h3>Expense</h3>
                <p>₹{expenses}</p>
              </div>
            </div>
          </div>
          <form className="add-transactions" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              min="0"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />

            <div className="radio-group">
              <label htmlFor="expense">
                <input
                  type="radio"
                  id="expense"
                  name="type"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                Debited
              </label>

              <label htmlFor="income">
                <input
                  type="radio"
                  id="income"
                  name="type"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                Credited
              </label>
            </div>

            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType, id, createdAt } = transaction;
              const formattedDate = createdAt?.toDate
                ? createdAt.toDate().toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
    : "Just now";
            return (
              <li key={id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h4>{description}</h4>
                    <p>
                      ₹{transactionAmount} .{" "}
                      <label
                        style={{
                          color: transactionType === "expense" ? "red" : "green",
                        }}
                      >
                        {transactionType}
                      </label>
                       
                    </p>
                         <p className="transaction-date">{formattedDate}</p>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(id)}>
                         <i className="fas fa-trash-alt"></i>
                </button>

                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="monthly-summary">
             <h3>This Month</h3>
             <p>Income: ₹{monthlyTotals.income}</p>
                 <p>Expenses: ₹{monthlyTotals.expenses}</p>
                <p>
              Net Balance:{" "}
            {monthlyTotals.balance >= 0 ? (
      <span style={{ color: "green" }}>₹{monthlyTotals.balance}</span>
    ) : (
      <span style={{ color: "red" }}>-₹{Math.abs(monthlyTotals.balance)}</span>
    )}
  </p>
</div>
        <div className="footer">
            <p>© 2023 Expense Tracker. All rights reserved.</p>
        </div>  
    </>
  );
};