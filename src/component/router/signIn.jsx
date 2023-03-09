import { createGoogleUserAuth, signInUserwithEandP } from "../../component/firebase";
import { useEffect, useState } from "react";
import { UserContext } from "../../component/firebase.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



const defaultformfield = {
    email: "",
    password: ""
}

const SignIn = () => {
    const [formfield, setFormfield] = useState(defaultformfield)
    const { email, password } = formfield;
    const [showPassword, setShowpassword] = useState(false);
    const [error, setError] = useState(false)

    const { currentUser } = useContext(UserContext);

    const resetForm = () => {
        setFormfield(defaultformfield)
    }

    const handleOnchange = (event) => {
        const { name, value } = event.target;
        setFormfield({ ...formfield, [name]: value })
    }
    const logUser = async () => {
        await createGoogleUserAuth();

    }


    const handleOnsubmit = async (event) => {
        event.preventDefault();


        try {
            await signInUserwithEandP(email, password)
            resetForm()
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    setError("incorrect password for email");
                    break
                case "auth/user-not-found":
                    setError("user not found!");
                    break;
                default:
                    console.log(error)
            }

        }
    }

    const handleClick = () => {
        setShowpassword(!showPassword)
    }
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/SignUp")
    }
    useEffect(() => {
        if (currentUser) {
            navigate("/Home-todo")
        }

    }, [currentUser, navigate])

    const handleResetPasword = () => {
        navigate("/PasswordReset")
    }
    return (
        <div className="handle-signin-container">
            <h1>TASKLY</h1>
            <img src="https://i.ibb.co/0CS73ZJ/pexels-polina-kovaleva-5717411.jpg" alt="" />
            <div className="sign-in-container">
                <h3>Login to your account</h3>
                <form onSubmit={handleOnsubmit}>

                    <input required type="email" onChange={handleOnchange} name="email" value={email} placeholder="Email" />
                    <input required type={showPassword ? "text" : "password"} onChange={handleOnchange} name="password" value={password} placeholder="Password" />
                    <div className="pass-container">
                        <div className="pass">
                        <input type="checkbox" onClick={handleClick} />
                        <p>{showPassword ? "hide password" : "show password"}</p>
                        </div>
                    <p onClick={handleResetPasword}>Forgot password ?</p>
                    </div>

                    <p style={{ color: "brown" }}>{error}</p>
                    <div className="sign-in-btn">
                        <button type="submit">Login</button>
                        <div className="google-logo">
                            <img src="https://i.ibb.co/G9wDj64/download-removebg-preview.png" alt="" />
                            <button onClick={logUser}>Login with Google</button>
                        </div>
                    </div>
                    <p onClick={handleNavigate}>Not registered ? Create Account</p>
                </form>
            </div>
        </div>
    );
}

export default SignIn;