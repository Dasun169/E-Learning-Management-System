import "./css files/home_page_inside.css";

import Header from "../header/Header.jsx";
import HomePageInsideBody from "./home_page_inside_body.jsx";
import Footer from "../footer/Footer.jsx";

const HomePageInside = () => {
  return (
    <div className="home-page-inside-container">
      <Header />
      <HomePageInsideBody /> 
      <Footer />
    </div>
  
  );
};
export default HomePageInside;