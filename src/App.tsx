import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Todos from './components/Todos';
import DarkTheme from './images/icon-moon.svg';
import LightTheme from './images/icon-sun.svg';
import bgDesktopLight from './images/bg-desktop-light.jpg';
import bgDesktopDark from './images/bg-desktop-dark.jpg';
import bgMobileLight from './images/bg-mobile-light.jpg';
import bgMobileDark from './images/bg-mobile-dark.jpg';

export interface Istate {
  todos: {
    text: string,
    completed: boolean
  }[]
}

export const ThemeContext = createContext<null | {}>(null)

function App() {

  const [todos, setTodos] = useState<Istate['todos']>([])
  const [task, setTask] = useState('')
  const [theme, setTheme] = useState('light');
  const [width, setWidth] = useState(window.innerWidth);
  const mobileBreakPoint = 768;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value)
  }
  const handleClick = (): void => {
    if (!task) {
      alert('enter your task')
      return
    }
    setTodos([...todos, { text: task, completed: false }])
    setTask('')
  }
  const toggleTheme = () => {
    setTheme((curr) => (
      curr === 'light' ? 'dark' : 'light'
    ))
  };

  // method to update the width size
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme} className='App'>
        {theme === 'light' ?
          width <= mobileBreakPoint ?
            <img src={bgMobileLight} alt='' className='bg-img' />
            : <img src={bgDesktopLight} alt='' className='bg-img' />
          : width > mobileBreakPoint ? <img src={bgDesktopDark} alt='' className='bg-img' />
            : <img src={bgMobileDark} alt='' className='bg-img' />
        }
        <div className='my-todo'>
          <div className='header-todo'>
            <h1>Todo</h1>
            {theme === 'light' ?
              <img src={DarkTheme} alt='light Theme' onClick={toggleTheme} className='theme' />
              : <img src={LightTheme} alt='dark Theme' onClick={toggleTheme} className='theme' />
            }
          </div>
          <div className='form'>
            <div className='circle' onClick={handleClick}></div>
            <input type='text' placeholder='Add tasks' className='add-task' onChange={handleChange} value={task} onKeyPress={(e) => e.key === 'Enter' && handleClick()} />          </div>
          <Todos todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
