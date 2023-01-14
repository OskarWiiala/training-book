import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './navPages/Home'
import Book from './navPages/Book'

function App () {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/book" exact element={<Book />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
