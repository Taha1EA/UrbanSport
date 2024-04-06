import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Log from "./Composent/regLog/Log";
import Reg from "./Composent/regLog/Reg";
import Dashboard from "./assets/dashboardC"

const App = () => {
  return (

      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LogAdmin" element={<Log Admin="true"/>} />
        <Route path="/Log" element={<Log Admin="false"/>} />
        <Route path="/Reg" element={<Reg />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
