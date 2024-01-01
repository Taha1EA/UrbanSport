import NavBar from "./compenents/NavBar"
import MainSection from "./compenents/MainSection"
import Schedule from "./compenents/Schedule"
import Price from "./compenents/Price"
import Footer from "./compenents/Footer"
export default function App() {
  return (
    <main className="relastive">
      <NavBar/>
      <section className="mt-28"><MainSection/></section>
      {/* <section><Offres/></section> */}
      <section><Schedule/></section>
      <section><Price/></section>
      {/* <section><MapSection/></section> */}
      <Footer/>
    </main>
  )
}