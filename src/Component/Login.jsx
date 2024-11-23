import React, { useState } from 'react'
import './Login1.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Login() {
    const navigate = useNavigate();
    const [creds, setcreds] = useState({
        employeeEmail: '', password: ''
    })
    const [togglepass, settogglepass] = useState(false);
    const handleTogglePassword = () => {
        settogglepass(!togglepass);
    }
    const handleFieldChange = (e, field) => {
        setcreds({ ...creds, [field]: e.target.value });
    }
    const doLogin = async () => {
        if (creds.employeeEmail.trim() === "") {
            toast.error("Enter a valid Email");
            return;
        }
        if (creds.password.trim() === "") {
            toast.error("Enter password.");
            return;
        }
        const res = await fetch(process.env.REACT_APP_BACKEND + "deliveryEmployee/login", {
            method: 'POST',
            body: JSON.stringify(creds),
            headers: { "content-type": "application/json" }
        })
        if (res.ok) {
            const reply = await res.text();
            console.log(reply);
            if (reply === "NotFound") {
                toast.error("User does not exists.");
                return;
            }
            else {
                localStorage.setItem("vastrikaDeliv", reply);
                toast.success("Login Successful, Please wait...");
                    navigate("/remainOrder")
            }
        }
        else if (res.status === 401) {
            toast.error("Invalid user name or password.");
            return;
        }
        else toast.error("Could not log in. Please try again later.")
    }
    return (
        <div className='super-flex-container'>
            <div className="login-container">
                <h2 className="login-head">Login</h2>
                <div className="mail-container">
                    <p className="ip-head">Email ID</p>
                    <input placeholder="Email ID" required type="text" className='ip-input'
                        onChange={(e) => (handleFieldChange(e, "employeeEmail"))} />
                </div>
                <div className="pw-container">
                    <p className="ip-head">Password</p>
                    <input placeholder="Password" required className="ip-input" type={togglepass ? "text" : "password"}
                        onChange={(e) => (handleFieldChange(e, "password"))} />
                </div>
                <div className="wrapper">
                    <p className="toggle-pass" onClick={handleTogglePassword}>
                        {togglepass ? "Hide Password" : "Show Password"}
                    </p>
                </div>
                <div className="wrapper">
                    <button className="login-btn" onClick={doLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}
