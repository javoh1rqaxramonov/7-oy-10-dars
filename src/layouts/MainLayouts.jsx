import React from 'react'
import Header from '../components/Header'

function MainLayouts({children}) {
  return (
    <div className='container mx-auto'>
        <Header></Header>
        {children}
    </div>
  )
}

export default MainLayouts