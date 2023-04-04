import Card from "../Card/Card";
import Home from "../Home/Home";


const imageUrls = [
    {
        id: 1,
        url: "https://globalassets.starbucks.com/assets/f12bc8af498d45ed92c5d6f1dac64062.jpg?impolicy=1by1_wide_topcrop_630",
        title: "Caffè Americano",
    },
    {
        id: 2,
        url: "https://fitfoodiefinds.com/wp-content/uploads/2021/09/Chai-Tea-Latte-05sq.jpg",
        title: "Chai Tea Latte"
    },
    {
        id: 3,
        url: "https://globalassets.starbucks.com/assets/2d52f16a22fb40ff898be1815ecc952e.jpg?impolicy=1by1_wide_topcrop_630",
        title: "Chai Tea"
    },
    {
        id: 4,
        url: "https://globalassets.starbucks.com/assets/e974a448ae8d4c86afc50d86c1c39720.jpg?impolicy=1by1_wide_topcrop_630",
        title: "Peppermint Hot Chocolate"
    },
    {
        id: 5,
        url: "https://globalassets.starbucks.com/assets/b23ae2560a594d9985381d01613829d4.jpg?impolicy=1by1_wide_topcrop_630",
        title: "White Hot Chocolate"
    },
    {
        id: 6,
        url: "https://globalassets.starbucks.com/assets/ff03ead58dde47c485049baa5f736793.jpg?impolicy=1by1_wide_topcrop_630",
        title: "Chocolate Cream Cold Brew"
    },

];

export default function Menu(){
    return(
        <div>
    <Home/>
      {imageUrls.map(imageUrl => (<Card
        key = {imageUrl.id}
        src = {imageUrl.url}
        title = {imageUrl.title}
        description = {imageUrl.description}
      />))}
            
        </div>
    );
}