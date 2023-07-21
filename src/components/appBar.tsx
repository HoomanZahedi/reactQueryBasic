import React from 'react'
import { Link } from 'react-router-dom'

export const AppBar = () => {
  return (
    <>
        <div className='appBar'>
            <Link className='link' to="/" tabIndex={1}>Home</Link>
            <Link className='link' to="/RQSuperHeroes" tabIndex={2}>RQSuperHeroes</Link>
            <Link className='link' to="/SuperHeroes" tabIndex={3}>SuperHeroes</Link>
            <Link className='link' to="/parallelQueries" tabIndex={4}>Parallel Queries</Link>
            <Link className='link' to="/dependentQuery" tabIndex={5}>Dependent Queries</Link>
        </div>
    </>
  )
}
