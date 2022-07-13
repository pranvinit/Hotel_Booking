import "./searchItem.scss";
import { Link } from "react-router-dom";

export default function SearchItem({ item }) {
  return (
    <div className="searchItem">
      <div className="siImg">
        <img src="/assets/images/1.jpg" alt="" />
      </div>
      <div className="siDesc">
        <h2 className="siTitle">{item.name}</h2>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{item.desc}</span>
        <span className="siFeatures">
          Entire studio • 1 bathroomm • 21m² • 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="cancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailText">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item.id}`}>
            <button>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
