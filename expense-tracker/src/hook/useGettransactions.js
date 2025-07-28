import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useEffect, useState } from "react";
import { useGetUserInfo } from "./useGetUserInfo";
import { Timestamp } from "firebase/firestore";

export const useGetTransactions = () => {
  const { userId } = useGetUserInfo();
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({ income: 0, expenses: 0, balance: 0 });
  const [monthlyTotals, setMonthlyTotals] = useState({ income: 0, expenses: 0, balance: 0 });

  useEffect(() => {
    const transactionRef = collection(db, "transactions");
    const q = query(transactionRef, where("userId", "==", userId), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setTransactions(docs);
      calculateTotals(docs);
      calculateMonthlyTotals(docs);
    });

    return () => unsubscribe();
  }, [userId]);

  const calculateTotals = (docs) => {
    let income = 0;
    let expenses = 0;

    docs.forEach((transaction) => {
      const amount = Number(transaction.transactionAmount);
      if (transaction.transactionType === "income") {
        income += amount;
      } else {
        expenses += amount;
      }
    });

    setTransactionTotals({ income, expenses, balance: income - expenses });
  };

  const calculateMonthlyTotals = (docs) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let income = 0;
    let expenses = 0;

    docs.forEach((transaction) => {
      const ts = transaction.createdAt?.toDate?.();
      if (ts && ts.getMonth() === currentMonth && ts.getFullYear() === currentYear) {
        const amount = Number(transaction.transactionAmount);
        if (transaction.transactionType === "income") {
          income += amount;
        } else {
          expenses += amount;
        }
      }
    });

    setMonthlyTotals({ income, expenses, balance: income - expenses });
  };

  return { transactions, transactionTotals, monthlyTotals };
};
