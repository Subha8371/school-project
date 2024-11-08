import Navbar2 from '@/component/Navbar2'
import React from 'react'

export default function layout({children}) {
  return (
    <>
        <Navbar2/>
        {children}
    </>
  )
}
