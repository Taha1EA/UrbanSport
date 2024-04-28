import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Log from "./Composent/regLog/Log";
import Reg from "./Composent/regLog/Reg";

import Layout from "./assets/Layout";
import Register from "./assets/Register";
import Dashboard from './assets/Dashboard'
import Products from './assets/Products'


const App = () => {
  return (
    
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LogAdmin" element={<Log Admin="true"/>} />
        <Route path="/Log" element={<Log Admin="false"/>} />
        <Route path="/Reg" element={<Reg />} />

          <Route path="/Dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
           <Route path="products" element={<Products />} />
                </Route>
                <Route path="/register" element={<Register />} />
            </Routes>
    </Router>
  );
};

export default App;
