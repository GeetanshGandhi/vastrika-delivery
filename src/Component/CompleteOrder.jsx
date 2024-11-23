import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './CompleteOrder.css'
import { toast } from 'react-toastify';

function isInteger(str) {
    const num = parseInt(str, 10);
    return !isNaN(num) && num.toString() === str;
}

export default function CompleteOrder() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [login, setlogin] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem("vastrikaDeliv")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaDeliv"))) 
        }
    },[])

    const [otp, setotp] = useState("")
    const handleOrderCompletion = async()=> {
        if(otp.trim()===""){
            toast.error("Please Enter OTP.");
            return;
        }
        console.log(isInteger(otp))
        if(!isInteger(otp)){
            console.log(otp)
            toast.error("Invalid OTP!");
            return;
        }
        console.log("helo");
        let form = new FormData();
        form.append("orderId", state.orderId);
        form.append("productId", state.productId);
        form.append("empEmail", login.employeeEmail);
        form.append("otp", parseInt(otp));
        const res = await fetch(process.env.REACT_APP_BACKEND+"prodOrd/finish",{
            method: 'POST', body: form
        })
        if(res.ok){
            const reply = await res.text();
            if(reply==="Unauthorized"){
                toast.error("Unauthorized Access!");
                return;
            }
            if(reply==="Invalid"){
                toast.error("Wrong OTP.");
                return;
            }
            else{
                toast.success("Order Completed Successfully!");
                navigate("/order")
            }
        }
        else{
            toast.error("Could not complete your request at the moment! Please try later.");
        }
    }
    return (
    <>
    {
        login === null?
        <p>UnAuthorized Access!</p>
        :
        <div className='super-nonflex-container'>
            <p className="headings">Complete Order</p>
            <p className="address"><b>Delivered at: </b>{state.address}</p>
            <p className="complete-subhead">Complete the order by entering the OTP provided by the Customer:</p>
            <div className="wrapper">
                <input onChange={(e)=>setotp(e.target.value)} placeholder="OTP" id="otp-ip" type="text" className="otp-ip" maxLength={4}/>
            </div>
            <div className="wrapper">
                <button onClick={handleOrderCompletion} className='finish-btn'>Finish</button>
            </div>
            <hr style={{border: "1px solid grey", marginTop:"10px"}}/>
            <p className="complete-subhead">Order Details</p>
            <p className="ord-det"><b>Order Reference No:</b> {state.orderId+"P"+state.productId}</p>
            <p className="ord-det"><b>Customer Name:</b> {state.cName}</p>
            <p className="ord-det"><b>Contact No:</b> {state.phone}</p>
            <p className="ord-det"><b>Payment Method:</b> {state.payMethod}</p>
        </div>
    }
    </>
    )
}
