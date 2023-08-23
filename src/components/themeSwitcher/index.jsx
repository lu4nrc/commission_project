import { Moon, Sun } from '@phosphor-icons/react';
import React, { useState, useEffect } from 'react';

function ThemeSwitcher({theme, setTheme}) {
 ;

  const  toggleDarkMode = () =>  {
    setTheme(theme === 'dark' ? 'light': 'dark');
  }

  useEffect(() => {
    if (window.matchMedia('prefer-color-schema: dark').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button type="button" onClick={toggleDarkMode}>
      {theme === 'light' ? <Moon size={24} /> : <Sun size={24} color='white'/>}
    </button>
  );
}

export default ThemeSwitcher;
