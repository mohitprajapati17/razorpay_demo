import { useState } from 'react'
import './App.css'
import Payment from './components/Payment'

function App() {
  return (
    <div className="container">
      <header>
        <h1>Razorpay Integration</h1>
        <p>Premium Course Platform</p>
      </header>
      <main>
        <Payment />
      </main>
      <footer>
        &copy; 2026 Razorpay Demo. All rights reserved.
      </footer>
    </div>
  )
}

export default App
