'use client'

import React, { useEffect, useState } from 'react';
import '../app/styles/layout/Header.css';
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa6";
import Input from './Input';


export const Header = () => {

  //themes

  const [theme, setTheme] = useState("light");

  // Salva o tema no localStorage para persistência
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme; // Aplica a classe no <html>
    localStorage.setItem("theme", theme); // Salva o tema
  }, [theme]);

  return (
    <header>
      <div className="container_header">
        <div className="theme_content">
          <FaSun className={ theme ===  'light'? 'icon active': 'icon' }  onClick={() => setTheme("light")} />
          <BsFillMoonStarsFill className={ theme ===  'dark'? 'icon active': 'icon' } onClick={() => setTheme("dark")} />
        </div>
        <h2 className='title_header'>Ciência genética</h2>
        <Input />
      </div>
    </header>
  )
}
