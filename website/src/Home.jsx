import MainContent from "./assets/Maincontent.jsx";
import Footer from "./assets/Footer.jsx";
import Offers from "./assets/Offers.jsx";
import Events from "./assets/Event.jsx";
import Tab from "./sousComp/tabReservation"
import Navbar from "./assets/Navbar.jsx";
function Home() {
  return (
    <div>
      <Navbar/>
      <MainContent/>
     <div className="pt-4">  <Offers  /></div>
      <Tab/>
      <Events />
      <Footer />
    </div>
  );
}

export default Home;

