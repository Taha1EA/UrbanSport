import NavBar from "./compenents/NavBar"
import EventSection from "./compenents/EventSection"
import Schedule from "./compenents/Schedule"
export default function App() {
  return (
    <main className='flex flex-col'>
      <NavBar/>
      <section><EventSection/></section>
       {/* <section><Offres/></section> */}
      <section><Schedule/></section>
      {/* <section><Price/></section> */}
      {/* <section><MapSection/></section> */}
      {/* <Footer/>  */}
    </main>
  )
}