import './Nav.css'
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
    const navigate = useNavigate();
    const doLogout = ()=> {
        localStorage.removeItem("vastrikaDeliv");
        navigate("/");
        window.location.reload();
    }
    return (
        <nav>
            <Link to="/" className="nav-left-wrapper">
                <img id="nav-logo" src={require("./logo.webp")} alt="logo" />
                <h1 className="title-bigletter">V</h1>
                <div style={{padding:"0"}}>
                    <h1 className="title">astrika</h1>
                    <h2 className="punchline">Threads of Tradition</h2>
                </div>
            </Link>
            <div className="btn-wrapper">     
                <button className='nav-buttons' onClick={()=>{
                    navigate('/remainOrder')
                }}>Pending Orders</button>
                <button className='nav-buttons' onClick={()=>{
                    navigate('/order')
                }}>Currently Delivering</button>
            </div>
            <div className="logout-wrapper">
                <button className="logout-btn" onClick={doLogout}>Log out</button>
            </div>
        </nav>
    )
}
