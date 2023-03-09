import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../firebase.context";
import { signOutUser } from "../../component/firebase";
import { OpenContext } from "../user.context";



const UserDropDown = () => {
    const {currentUser} = useContext(UserContext);
    const { setIsUserOpen} = useContext(OpenContext);
    const navigate = useNavigate();
    const handleSign = () => {
        navigate("/")
        setIsUserOpen(false)
    }
    
    return (
        <div className="user-container">
            {currentUser ? <span>WELCOME</span> : null}
            {currentUser ? ( <span>{currentUser.displayName}</span>) : null}
            {currentUser ? ( <span>{currentUser.email}</span>) : null}
            {currentUser ? ( <span onClick={signOutUser} className="sign-out">SIGN OUT</span>) : (<span onClick={handleSign} className="nav-links-con">SIGN IN</span>)}
        </div>
    );
}

export default UserDropDown;