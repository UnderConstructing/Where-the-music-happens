import {useContext} from 'react'
import AuthContext from './utils/Context/AuthContext'
import { BrowserRouter as Router, Link } from "react-router-dom";
import authContext from './utils/Context/AuthContext'


function Header() {
    const userInfo = useContext(AuthContext)
    if (userInfo) {
        return (
            <header className="class">
                <h3 className="float-md-start mb-0">RE/NOTE</h3>
                    <Link to="/">Home</Link>

                    <Link to="/login">login</Link>

                    <Link to="/contact">Contact</Link>

                    <Link to="/registeruser">Sign Up!</Link>

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
