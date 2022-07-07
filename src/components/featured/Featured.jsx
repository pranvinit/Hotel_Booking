import "./featured.scss";

export default function Featured() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="/assets/images/1.jpg" alt="" />
        <div className="featuredTitle">
          <span>Dublin</span>
          <span>123 properties</span>
        </div>
      </div>
      <div className="featuredItem">
        <img src="/assets/images/2.jpg" alt="" />
        <div className="featuredTitle">
          <span>Austin</span>
          <span>235 properties</span>
        </div>
      </div>
      <div className="featuredItem">
        <img src="/assets/images/3.jpg" alt="" />
        <div className="featuredTitle">
          <span>Reno</span>
          <span>532 properties</span>
        </div>
      </div>
    </div>
  );
}
