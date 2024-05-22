import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Log from "./Composent/regLog/Log";
import Reg from "./Composent/regLog/Reg";

import Layout from "./assets/Layout";
import Register from "./assets/Register";
import Dashboard from './assets/Dashboard'
import AdminEvents from './assets/AdminEvents'
import AdminOrders from "./assets/AdminOrders";
import AdminClients from "./assets/AdminClients";
import PrivateRoutesA from '../src/sousComp/ProtectedRoutesA';
const App = () => {
  return (
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="LogAdmin" element={<Log Admin="true"/>} />
          <Route path="Log" element={<Log Admin="false"/>} />
          <Route path="Reg" element={<Reg />} />
          {/* <Route element={<PrivateRoutes />}>
            <Route path="Main" element={<Main />} >
                <Route  path="accueil" element={<Accueil/>}/>
                <Route path="events" element={<Events/>}/>
                <Route path="ps" element={<Psportif/>}/>
                <Route path="res" element={<ResMatch/>}/>
                <Route path="manage" element={<Accueil/>}/>
            </Route>
          </Route> */}
          <Route element={<PrivateRoutesA />}>
              {/* <Route path="/AdminDash" element={<AdminDash />} /> */}
              <Route path="/Dashboard" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="customers" element={<AdminClients />} />
              </Route>
              <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
  );
};

export default App;