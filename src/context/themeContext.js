import {createContext, useState} from 'react';

const themeContext = createContext();

function ThemeContextProvider(props){
    const [theme, setTheme] = useState('light');
    
    const changeTheme = () => setTheme(prevTheme => prevTheme === 'light'? 'dark' : 'light');

    return(
        <themeContext.Provider value={{theme, changeTheme}}>
            {props.children}
        </themeContext.Provider>
    )
}

export {themeContext, ThemeContextProvider}