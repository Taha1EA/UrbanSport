import MainContent from "./assets/Maincontent.jsx";
import Footer from "./assets/Footer.jsx";
import Offers from "./assets/Offers.jsx";
import Events from "./assets/Event.jsx";
import Tab from "./sousComp/tabReservation"
import Navbar from "./assets/Navbar.jsx";
import Class from "../src/Composent/ClientsCom/ClassS.jsx";
function Home() {
  return (
    <div>
      <Navbar/>
      <MainContent/>
      <Offers />
      <Tab/>
      <Class />
      <Events />
      <Footer />
    </div>
  );
}

export default Home;

