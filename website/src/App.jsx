import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./assets/Navbar.jsx";
import DashboardC from "./assets/dashboardC.jsx";
import Log from "./Composent/regLog/Log.jsx"; 
import Reg from "./Composent/regLog/Reg.jsx"; 

const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
           <Route path="/" element={Home} />
           <Route path="/cd" element={<DashboardC />} />
           <Route path="/Reg" element={<Reg />} />
           <Route path="/Log" element={<Log Admin="false" />} />
           <Route path="/LogAdmin" element={<Log Admin="true" />} />
         </Routes>
       </Router>
    </div>
  );
};

export default App;