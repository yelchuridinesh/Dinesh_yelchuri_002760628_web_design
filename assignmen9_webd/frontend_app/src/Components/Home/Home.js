
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from "../Card/Card";

// const imageUrls = [
//     {
//         id: 1,
//         url: "https://globalassets.starbucks.com/assets/f12bc8af498d45ed92c5d6f1dac64062.jpg?impolicy=1by1_wide_topcrop_630",
//         title: "Caffè Americano",
//     },
//     {
//         id: 2,
//         url: "https://fitfoodiefinds.com/wp-content/uploads/2021/09/Chai-Tea-Latte-05sq.jpg",
//         title: "Chai Tea Latte"
//     },
//     {
//         id: 3,
//         url: "https://globalassets.starbucks.com/assets/2d52f16a22fb40ff898be1815ecc952e.jpg?impolicy=1by1_wide_topcrop_630",
//         title: "Chai Tea"
//     },
//     {
//         id: 4,
//         url: "https://globalassets.starbucks.com/assets/e974a448ae8d4c86afc50d86c1c39720.jpg?impolicy=1by1_wide_topcrop_630",
//         title: "Peppermint Hot Chocolate"
//     },
//     {
//         id: 5,
//         url: "https://globalassets.starbucks.com/assets/b23ae2560a594d9985381d01613829d4.jpg?impolicy=1by1_wide_topcrop_630",
//         title: "White Hot Chocolate"
//     },
//     {
//         id: 6,
//         url: "https://globalassets.starbucks.com/assets/ff03ead58dde47c485049baa5f736793.jpg?impolicy=1by1_wide_topcrop_630",
//         title: "Chocolate Cream Cold Brew"
//     },

// ];

export default function Home(){
    return(
        <div>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item me-3">
                <Link to="/home">Home</Link> {"       "}
        </li>
        <li className="nav-item me-3">
                <Link to="/about">About Us</Link>
                {"       "}
        </li>
        <li className="nav-item me-3">
                <Link to="/menu">Menu</Link>
                {"       "}
        </li>
        <li className="nav-item me-3">    
            <Link to="/contact">Contact</Link>
                {"       "}
        </li>
      </ul>
    </div>
    <div class="d-flex align-items-center">
    <Link to="/login">Logout</Link>
                {"       "}
        </div>
  </div>
</nav>
            <div className="container">
                <h1>Welcome to our website!</h1>
                <p>We offer the best food and drinks in town. Check out our menu and contact us for reservations.</p>
            </div>

        </div>
    );
}