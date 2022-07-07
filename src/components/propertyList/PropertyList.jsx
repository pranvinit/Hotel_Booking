import "./propertyList.scss";

export default function PropertyList() {
  return (
    <div className="pList">
      <div className="pListItem">
        <img src="/assets/images/4.jpg" alt="" />
        <div className="pListTitles">
          <span>Hotels</span>
          <span>233 Hotels</span>
        </div>
      </div>
      <div className="pListItem">
        <img src="/assets/images/5.jpg" alt="" />
        <div className="pListTitles">
          <span>Apartments</span>
          <span>532 Apartments</span>
        </div>
      </div>
      <div className="pListItem">
        <img src="/assets/images/6.jpg" alt="" />
        <div className="pListTitles">
          <span>Resorts</span>
          <span>177 Resorts</span>
        </div>
      </div>
      <div className="pListItem">
        <img src="/assets/images/7.jpg" alt="" />
        <div className="pListTitles">
          <span>Villas</span>
          <span>466 Villas</span>
        </div>
      </div>
    </div>
  );
}
