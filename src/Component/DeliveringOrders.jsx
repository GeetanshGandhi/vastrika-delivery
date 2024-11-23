import { useNavigate } from 'react-router-dom';
import './Order.css';
import { useEffect, useState } from 'react';

export default function DeliveringOrders() {
    const navigate = useNavigate();
    // const [login, setlogin] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem("vastrikaDeliv")!==null){
            // setlogin(JSON.parse(localStorage.getItem("vastrikaDeliv")));
            let form = new FormData();
            form.append("city", JSON.parse(localStorage.getItem("vastrikaDeliv")).city);
            form.append("emp", JSON.parse(localStorage.getItem("vastrikaDeliv")).employeeEmail);
            fetch(process.env.REACT_APP_BACKEND+"prodOrd/getByDestAndStatAndEmp",{
                method: 'POST',
                body: form
            }).then((res)=>res.json()).then((data)=>setOrders(data))
        }
    },[])
    // State to hold the list of orders
    const [orders, setOrders] = useState([]);

    // Generate the items using map() and return each order as a ticket
    const items = orders.map((element, index) => (
         (
            <OrderItem
                key={index}  // Ensure each item has a unique key
                orderId={element.orderId}
                productId={element.productId}
                cName={element.cName}
                address={element.address}
                phone={element.phone}
                payMethod={element.payMethod}
                amount={element.amount}
                element={element}
            />
        )
    ));

    // Component to display each order as a ticket-style card
    function OrderItem(props) {
        return (
            <div className="ticket">
                <div className="ticket-header">
                    <h4>Order #{props.orderId+"P"+props.productId}</h4>
                    <button onClick={() => navigate("/complete", {state:props.element})} className="delivered-btn">
                        Finish
                    </button>
                </div>
                <div className="ticket-body">
                    <p><strong>Customer Name:</strong> {props.cName}</p>
                    <p><strong>Address:</strong> {props.address}</p>
                    <p><strong>Contact No:</strong> {props.phone}</p>
                    <p><strong>Payment Method:</strong> {props.payMethod}</p>
                    {
                        props.payMethod==="Cash on Delivery" &&
                        <p><strong>Amount to collect:</strong> Rs. {props.amount}/-</p>
                    }
                </div>
            </div>
        );
    }

    return (
        <div className='super-nonflex-container'>
            {
                !orders || orders===null || orders.length===0? <p>~No orders to deliver~</p>
                : <p className='headings'>You are delivering: </p>
            }
            <div className="ticket-container">
                {items}
            </div>
        </div>
    );
}
