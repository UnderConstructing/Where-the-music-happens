import { useContext } from 'react'
import AuthContext from './utils/Context/AuthContext'
import { BrowserRouter as Router, Link } from "react-router-dom";
import authContext from './utils/Context/AuthContext'
import './headerSection.scss'


function Header() {
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
                <Link to='/'>
                    <h1 className='h1'>Re-note</h1>
                </Link>
            </div>
        )
}
export default Header;
