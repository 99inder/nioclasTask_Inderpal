import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='bg-pink-500 text-white h-[3.5rem] flex items-center fixed z-[99] top-0 w-screen'>
      <nav className='max-w-[1440px] w-11/12 mx-auto'>
        <ul className='flex gap-x-9 justify-center text-2xl font-semibold'>
          <li className='relative group'>
            <Link to={"/"}>Home</Link>
            <span className='absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full bg-white transition-all duration-200'></span>
          </li>
          <li className='relative group'>
            <Link to={"/test"}>Test</Link>
            <span className='absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full bg-white transition-all duration-200'></span>
          </li>
          <li className='relative group'>
            <Link to={"/result"}>Result</Link>
            <span className='absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full bg-white transition-all duration-200'></span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar