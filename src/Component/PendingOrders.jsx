import { useNavigate } from 'react-router-dom';
import './Order.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function PendingOrders() {
    const navigate = useNavigate();
    // State to hold the list of orders
    const [orders, setOrders] = useState([]);
    const [login, setlogin] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem("vastrikaDeliv")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaDeliv")));
            fetch(process.env.REACT_APP_BACKEND+"prodOrd/getByDestCity",{
                method: 'POST',
                body: JSON.parse(localStorage.getItem("vastrikaDeliv")).city,
                headers: {"content-type":"application/json"}
            }).then((res)=>res.json()).then((data)=>setOrders(data))
        }
    },[])
    // Function to handle when "Accepted button" button is clicked
    const handleDelivery = async(orderId, productId) => {
        let form = new FormData();
        form.append("orderId", orderId)
        form.append("productId", productId)
        form.append("devemp", login.employeeEmail)
        const res = await fetch(process.env.REACT_APP_BACKEND+"prodOrd/acceptOrderByDevemp",{
            method: 'POST', body: form
        })
        if(res.ok){
            const reply = await res.text();
            if(reply === "Success"){
                setOrders(orders.filter(order => order.orderId !== orderId));
                toast.success("Order Accepted!");
                navigate("/order")
            }
            else toast.error("Could not accept order.");
        }
        else toast.error("Could not accept order.");
    };
    
    return (
        <div className="super-nonflex-container">
            <p className="headings">Pending Orders</p>
             <div className="ticket-container">
            {
                orders && orders!==null && orders.length!==0?
                orders.map((element, index) => {
                    return <div key={index} className="ticket">
                    <div className="ticket-header">
                        <h4>Order #{element.orderId+"P"+element.productId}</h4>
                        <button onClick={() => handleDelivery(element.orderId, element.productId)} className="accept-btn">Accept</button>
                    </div>
                    <div className="ticket-body">
                        <p><strong>Customer Name:</strong> {element.cName}</p>
                        <p><strong>Address:</strong> {element.address}</p>
                        <p><strong>Phone:</strong> {element.phone}</p>
                        <p><strong>Payment Method:</strong> {element.payMethod}</p>
                        {
                            element.payMethod==="Cash on Delivery" &&
                            <p><strong>Amount to collect:</strong> Rs. {element.amount}/-</p>
                        }
                    </div>
                   </div>
                })
                : <p>No orders</p>
            }
        </div>
        </div>
    );
}
