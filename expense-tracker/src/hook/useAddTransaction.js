import { collection, deleteDoc,doc,addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../config/firebase-config';
import{useGetUserInfo} from './useGetUserInfo'
export const useAddTransaction = () => {
    const transactionCollectionRef = collection(db, "transactions");
    const {userId} = useGetUserInfo();
    const addTransaction = async ({
        description,
        transactionAmount,
        transactionType,
    })  => {
       await addDoc(transactionCollectionRef, {
        userId ,
        description,
        transactionAmount,
        transactionType,
        createdAt: serverTimestamp(),
       });
    };

    const deleteTransaction = async (id) => {
        const transactionDoc = doc(db, "transactions", id);
        await deleteDoc(transactionDoc);
    };
    return {addTransaction,deleteTransaction};
}