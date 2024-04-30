import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Log from "./Composent/regLog/Log";
import Reg from "./Composent/regLog/Reg";
import Dashboard from "./assets/dashboardC"
import Main from "./sousComp/ClientMain"
import AdminDash from "./sousComp/AdminDash"
import Accueil from "./Composent/ClientsCom/accueil";
import Events from "./Composent/ClientsCom/Cevents";
import Psportif from "./Composent/ClientsCom/Psportif";
import ResMatch from "./Composent/ClientsCom/ResMatch";
const App = () => {
  return (
    
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="LogAdmin" element={<Log Admin="true"/>} />
        <Route path="Log" element={<Log Admin="false"/>} />
        <Route path="Reg" element={<Reg />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Main" element={<Main />} >
            <Route  path="accueil" element={<Accueil/>}/>
            <Route path="events" element={<Events/>}/>
            <Route path="ps" element={<Psportif/>}/>
            <Route path="res" element={<ResMatch/>}/>
            <Route path="manage" element={<Accueil/>}/>
        </Route>
        <Route path="/AdminDash" element={<AdminDash />} />
      </Routes>
    </Router>
  );
};

export default App;
