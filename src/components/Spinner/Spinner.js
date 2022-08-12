import React from 'react'
import Loader from '../../img/rainbow.gif'

const Spinner = () => {
  return (
    <>
        <h2>Spinner</h2>
        <img src={Loader} alt="Loading..." className='d-block m-auto' style={{width: '200px'}} />
    </>
  )
}

export default Spinner;