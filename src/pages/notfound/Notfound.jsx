import "./notfound.scss";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfoundBox">
        <img src="/assets/noLink.svg" className="notfoundImg" alt="no link" />
        <span className="notfoundTextTitle">This Page Isn't Available</span>
        <span className="notfoundText">
          The link may be broken, or the page may have been removed
        </span>
        <Link to="/" className="no-dec">
          <button className="nofoundHomeButton">Go Back To Home</button>
        </Link>
      </div>
    </div>
  );
}
