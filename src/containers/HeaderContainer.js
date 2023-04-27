import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../features/themeSlice';
import { useState } from 'react';

function HeaderContainer() {

    const theme = useSelector((state) => state.theme);
    
    const [currentThemeValue, setCurrentThemeValue] = useState('dark');
    
    const dispatch = useDispatch();
    
    const changeThemeHandler = (event) => {
      event.preventDefault();
      currentThemeValue === 'light' ? setCurrentThemeValue('dark') : setCurrentThemeValue('light');
      dispatch(changeTheme(currentThemeValue));
    };

    return (
        <> 
            <Header changeThemeHandler={changeThemeHandler} theme={theme} currentThemeValue={currentThemeValue} />
        </>
    )
}

export default HeaderContainer;