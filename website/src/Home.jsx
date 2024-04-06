import MainContent from "./assets/Maincontent.jsx";
import Footer from "./assets/Footer.jsx";
import Offers from "./assets/Offers.jsx";
import Events from "./assets/Event.jsx";
import Tab from "./sousComp/tabReservation"
function Home() {
  return (
    <div>
      <MainContent/>
      <Tab/>
      <Offers />
      <Events />
      <Footer />
    </div>
  );
}

export default Home;

