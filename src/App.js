import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import SignUp from "./component/router/SignUp";
import Home from "./component/Home-todo.jsx";
import SignIn from "./component/router/signIn"
import PasswordReset from "./component/resetpassword/resetpassword";
import UserDropDown from "./component/account/userdropdown";



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<SignIn/>}/>
          <Route path="Home-todo" element={<Home/>}/>
          <Route path="SignUp" element={<SignUp/>}/>
          <Route path="PasswordReset" element={<PasswordReset/>} />
          <Route path="userdropdown" element={<UserDropDown/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
