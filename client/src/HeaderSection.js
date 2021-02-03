import {useContext} from 'react'
import AuthContext from './utils/Context/AuthContext'
import { BrowserRouter as Router, Link } from "react-router-dom";
import authContext from './utils/Context/AuthContext'
import './headerSection.scss'


function Header() {
    const userInfo = useContext(AuthContext)
    if (userInfo) {
        return (
            <header className="class">
            <div className="title-profile">
                {/* <!-- Select the text in the preview and type in your own --> */}
                <h1 className="text" data-text="Re-Note"></h1>
                <div className="gradient"></div>
                <div className="spotlight"></div>
            </div>
            <div className="link-container">
                <div>
                    <Link className="links" to="/">Home</Link>
                    </div>
                    <div>
                    <Link className="links" to="/login">login</Link>
                    </div>
                    <div>
                    <Link className="links" to="/contact">Contact</Link>
                    </div>
                    <div>
                    <Link className="links" to="/registeruser">Sign Up!</Link>
                    </div>
                </div>
            </header>
        );

    }
    if (!userInfo){
        return (
        <header className="mb-auto">
        <h3 className="float-md-start mb-0">RE/NOTE</h3>
            <Link to="/">Home</Link>

            <Link to="/logout">Logout</Link>

            <Link to="/contact">Contact</Link>
    </header>
    )}
}
export default Header;
