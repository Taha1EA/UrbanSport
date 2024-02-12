import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="bg-gray-200 p-4">
        <Route path="/" exact component={Home} />
        {/* home:page d accueil */}
        <Route path="/logReg" component={logReg} />
      </div>
    </Router>
  );
};

export default App
