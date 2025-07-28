import {auth, provider} from '../../config/firebase-config';
import {signInWithPopup} from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import{useGetUserInfo} from '../../hook/useGetUserInfo';
import './style.css';

export const Auth = () => {
    const navigate = useNavigate();
    const {isAuth} = useGetUserInfo();
    const signInWithGoogle = async() => {
        const result = await signInWithPopup(auth, provider);
        const authInfo = {
            userId: result.user.uid,
            name: result.user.displayName,
            profilePhoto: result.user.photoURL,
            isAuth: true,
        };
        const user = result.user;
        console.log(user);    
        localStorage.setItem("auth",JSON.stringify(authInfo));
        navigate('/expense-tracker');
        // You can also redirect to the expense tracker page or handle the user object as needed
    };
      if (isAuth) {
           return <Navigate to="/expense-tracker"  />;
        };
    
    return (
 <div className="auth-container">
  {/* Header + Animated Title */}
  <div className="auth-header">
    <div className="login-tab-label animated-title">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Finance Icon"
        className="finance-icon"
      />
      Expense Tracker
    </div>
  </div>

  {/* Hero Section */}
  <div className="hero-section">
    <div className="hero-text">
      <h1 className="auth-heading">Welcome to Expense Tracker</h1>
      <p className="subheading">Smartly manage your money with ease</p>
    </div>

    <div className="hero-image-container">
      <img
        className="finance-illustration"
        src="https://happay.com/blog/wp-content/uploads/sites/12/2022/08/what-is-expense-management.png"
        alt="Finance Illustration"
      />
    </div>
  </div>

  {/* Login Card */}
  <div className="login-page">
    <p>Sign in with Google</p>
    <button className="login-With-google-button" onClick={signInWithGoogle}>
      <img
        src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRLOiuW8UxRuAbQntCB7RB6Aoh7t2UcN_JHT9RGeSR-6nJ27N6odevUewJOpDGOyCfYehTOCU9kR7sNPJc3ckgFHQblfaCYFeYWoMEfQA"
        alt="Google Logo"
      />
      Sign in with Google to continue
    </button>
  </div>

  {/* Footer */}
  <footer className="footer">
    © {new Date().getFullYear()} Expense Tracker. All rights reserved.
  </footer>
</div>

);

};