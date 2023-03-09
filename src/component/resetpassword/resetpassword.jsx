import React, { useState } from "react";
import { resetPassWord } from "../../component/firebase";
import { useNavigate } from "react-router-dom";


const defaultformField = {
  email: ""
}
const PasswordReset = () => {
  const [formFeild, setFormField] = useState(defaultformField);
  const [error, setError]= useState(false)
  const { email } = formFeild
  const navigate = useNavigate()

  const resetForm = () => {
    setFormField(defaultformField)
  }

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formFeild, [name]: value })
  }

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    try {
      await resetPassWord(email);
      resetForm()
      setError("Password reset email sent, reset your password and login again");
      setTimeout(() => {
        navigate("/SignIn")
      }, 6000);
    } catch (error) {
      if(error.code === "auth/user-not-found"){
        setTimeout(() => {
          setError("No user associated with this Email")
          
        }, 3000);
      }
    }
  };

  return (
    <div className="handle-signin-container">

    <div className="sign-in-container">
    <form onSubmit={handlePasswordReset} className="reset-password">
      <p>Enter the Eamil Associated with your account</p>
      <input required type="email" onChange={handleOnchange} value={email} name="email" placeholder="Email"/>
      <p style={{color:"red"}}>{error}</p>
      <button type="submit">Reset Password</button>
    </form>
    </div>
    </div>
  );
};

export default PasswordReset;