import footballImage from "../images/football.jpg";
import bgVideo from "../videos/video.mp4";

import "./Maincontent.css";
const offersData = [
  {
    id: 1,
    title: "Summer Football Camp",
    description: "Join our summer football camp and improve your skills!",
    image: "../images/football.jpg",
  },
  {
    id: 2,
    title: "Gym Membership Discount",
    description: "20% off on all gym memberships this month.",
    image: "../images/football.jpg",
  },
  {
    id: 3,
    title: "Group Training Sessions",
    description: "Get fit with friends and save on group training sessions.",
    image: "../images/football.jpg",
  },
];

const MainContent = () => {
  return (
    <main>
      <div className="flex flex-col items-center max-h-fit ">
        <div className="overlay">
          <video src={bgVideo} autoPlay loop muted />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
