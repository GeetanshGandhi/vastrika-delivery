import './App.css';
import { ToastContainer, Slide } from 'react-toastify';
import Login from './Component/Login';
import 'react-toastify/dist/ReactToastify.css';
import { createHashRouter, RouterProvider} from "react-router-dom";
import { useEffect, useState } from 'react';
import Navbar from './Component/Nav';
import PendingOrders from './Component/PendingOrders';
import DeliveringOrders from './Component/DeliveringOrders';
import CompleteOrder from './Component/CompleteOrder';
function App() {
	const [login, setlogin] = useState(null)
	useEffect(() => {
		if (localStorage.getItem("vastrikaDeliv") !== null) {
			setlogin(JSON.parse(localStorage.getItem('vastrikaDeliv')))
		}
	}, [])
	const router = createHashRouter([
		{
			path: "/", element: <>{login === null ? <Login /> : <><Navbar /><PendingOrders/></>}</>
		},
		{
			path: "/order", element: <><Navbar /><DeliveringOrders/></>
		},
		{
			path: "/remainOrder", element: <><Navbar/><PendingOrders/></>
		},
		{
			path: "/complete", element: <><Navbar/><CompleteOrder/></>
		}
	])
	return (
		<div className="App">
			<RouterProvider router={router} />
			<ToastContainer position="top-right"
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="light"
				transition={Slide} />
		</div>
	);
}

export default App;

