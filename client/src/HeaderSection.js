import { useContext } from 'react'
import AuthContext from './utils/Context/AuthContext'
import { BrowserRouter as Router, Link } from "react-router-dom";
import authContext from './utils/Context/AuthContext'
import './headerSection.scss'


function Header() {
    const userInfo = useContext(AuthContext)
    if (userInfo) {
        return (
            <div className="class">
    <input id="toggle" type="checkbox"></input>
    <label class="toggle-container" for="toggle">
        <span class="button button-toggle"></span>
    </label>

    <nav class="nav">
        <Link to='/'>
        <a class="nav-item" href="">Home</a>
        </Link>    
        <Link to='/about'>
        <a class="nav-item" href="">About</a>
        </Link >
        <Link to='/login'>
        <a class="nav-item" href="">Login or Sign up!</a>
        </Link>
    </nav>
            <h1 className='h1'>Re-note</h1>
                </div>












            // <header className="class">
                    // <div className="link-container">
                        //     <div>
                            //         <Link className="links" to="/">Home</Link>
            //         </div>
            //         <div>
                            //         <Link className="links" to="/login">login</Link>
            //         </div>
            //         <div>
                            //         <Link className="links" to="/contact">Contact</Link>
            //         </div>
            //         <div>
                            //         <Link className="links" to="/registeruser">Sign Up!</Link>
            //         </div>
            //     </div>
            // </header>
        );

    }
    if (!userInfo) {
        return (
                <header className="mb-auto">
                    <h3 className="float-md-start mb-0">RE/NOTE</h3>
                    <Link to="/">Home</Link>

                    <Link to="/logout">Logout</Link>

                    <Link to="/contact">Contact</Link>
                </header>
        )
    }
}
export default Header;
