import "./searchItem.scss";

export default function SearchItem() {
  return (
    <div className="searchItem">
      <div className="siImg">
        <img src="/assets/images/1.jpg" alt="" />
      </div>
      <div className="siDesc">
        <h2 className="siTitle">Tower Street Apartments</h2>
        <span className="siDistance">500m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroomm • 21m² • 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="cancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>9.1</button>
        </div>
        <div className="siDetailText">
          <span className="siPrice">$120</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button>See availability</button>
        </div>
      </div>
    </div>
  );
}
