import { useContext } from "react";
import { themeContext } from "../context/themeContext";

export default function Navbar(){
    const {theme, changeTheme} = useContext(themeContext);
    const isLightMode = theme === 'light'
    const oppositeTheme = isLightMode? 'Dark' : 'Light';
    const themeIcon = isLightMode? 'fa-moon' : 'fa-sun';
    
    return(
        <header className={theme}>
            <nav className="container">
                <h1>Where in the world?</h1>
                <div className="theme-selector" onClick={changeTheme}>
                    <i className={`fa-regular ${themeIcon}`}></i>
                    <span>{oppositeTheme} mode</span>
                </div>
            </nav>
        </header>
    )
}