import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "/src/Home"
import Log from "/src/Composent/regLog/Log.jsx"
import Reg from "/src/Composent/regLog/Reg.jsx"
const App = () => {
  return (
    <Router>
      <Routes >
        <Route  path="/" Component={Home} />
        <Route path="/Reg" element={<Reg />} />
        <Route path="/Log" element={<Log Admin="false"/>} />
        <Route path="/LogAdmin" element={<Log Admin="true"/>} />
      </Routes >
    </Router>
  );
};

export default App
