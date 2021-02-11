
import {  Link } from "react-router-dom";
import './headerSection.scss'


function Header() {
        return (
            <div className="class">
                <input id="toggle" type="checkbox"></input>
                <label className="toggle-container" htmlFor="toggle">
                    <span className="button button-toggle"></span>
                </label>

                <nav className="nav">
                    <Link className="nav-item" to='/'>
                        Home
                    </Link>
                    <Link className="nav-item" to='/about'>
                        About
                    </Link >
                    <Link className="nav-item" to='/login'>
                        Login or Sign up!
                    </Link>
                </nav>
                <Link to='/'>
                    <h1 className='h1'>Re-note</h1>
                </Link>
            </div>
        )
}
export default Header;
