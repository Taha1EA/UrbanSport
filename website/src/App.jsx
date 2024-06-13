import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoutes from '../src/sousComp/ProtectedRoutes';
import PrivateRoutesA from '../src/sousComp/ProtectedRoutesA';
import Home from "./Home";
import Log from "./Composent/regLog/Log";
import Reg from "./Composent/regLog/Reg"
import Main from "./sousComp/ClientMain"
import Accueil from "./Composent/ClientsCom/accueil";
import Psportif from "./Composent/ClientsCom/Psportif";
import ResMatch from "./Composent/ClientsCom/ResMatch";
import Settings from "./Composent/ClientsCom/Settings";
import UpdateP from "./Composent/ClientsCom/UpdateP";
import UpdatePhoto from "./Composent/ClientsCom/UpdatePhoto";
import Delete from "./Composent/ClientsCom/Delete";
import ForgotPass from "./assets/ForgotPass";
import Layout from "./assets/Layout";
import Dashboard from './assets/Dashboard'
import AdminEvents from './assets/AdminEvents'
import CompleteRegistration from './assets/AdditionalInfo'
import AdminOrders from "./assets/AdminOrders";
import TabRes from "./assets/TabResAdmin";
import ShowRes from "./assets/ShowRes";
import AdminClients from "./assets/AdminClients";
import VerifyEmail from './assets/VerifyEmail';
import ClassTab from  './assets/adminTabClass'
import ResetPass from "./assets/ChangePass"
import About from "./assets/About" 
const App = () => {
  return (
    
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="aboutUs" element={<About />} />
          <Route path="LogAdmin" element={<Log Admin="true"/>} />
          <Route path="Log" element={<Log Admin="false"/>} />
          <Route path="Reg" element={<Reg />} />
          <Route path="forgot" element={<ForgotPass />} />
          <Route path="ChangePass" element={<ResetPass/>} />
          <Route path="complete-registration" element={<CompleteRegistration />} />
          <Route path="VerifyEmail" element={<VerifyEmail />} />
          <Route element={<PrivateRoutes />}>
            <Route path="Main" element={<Main />} >
                <Route  path="accueil" element={<Accueil/>}/>
                <Route path="ps" element={<Psportif/>}/>
                <Route path="res" element={<ResMatch/>}/>
                <Route path="settings" element={<Settings/>}>
                  <Route path="updatePassword" element={<UpdateP/>}/>
                  <Route path="updatePhoto" element={<UpdatePhoto/>}/>
                  <Route path="Delete" element={<Delete/>}/>
                </Route>
            </Route>
          </Route>
          <Route element={<PrivateRoutesA />}>
                <Route path="/Dashboard" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="Ordermatch" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminClients />} />
                  <Route path="ClientClasses" element={<ClassTab />} />
                  <Route path="TabRes" element={<TabRes />} />
                  <Route path="ShowRes" element={<ShowRes />} />
                </Route>
              </Route>
        </Routes>
      </Router>
  );
};

export default App;
