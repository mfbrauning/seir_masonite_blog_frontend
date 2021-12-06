import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import milligram for default styling
import "milligram"
// import browser router and rename it as router
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
)
