import HeroX from "../images/arrire.jpg";
import "../assets/Maincontent.css";


const AboutUp = () => {
  return (
    <main>
      <div className="flex flex-row items-center h-screen ">
        <div style={{ backgroundImage: `url(${HeroX})` }} className='bg-fixed w-full h-full  bg-center bg-cover duration-700 flex items-end justify-center p-8'>
          <h1 className=" flex text-6xl  text-white justify-start items-center ">About Us:</h1>
    
        </div>
      </div>
    </main>
  );
};

export default AboutUp;
