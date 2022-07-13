import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faMountainSun,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../search/Search";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header({ type }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="header">
      <div className={type !== "list" ? "container" : "container listMode"}>
        <div className="list">
          <div className="item active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faMountainSun} />
            <span>Attractions</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="title">Find your next stay</h1>
            <p className="desc">
              Search low prices on hotels, homes and much more...
            </p>
            {!user && (
              <Link to="/login">
                <button className="headerBtn">Sign in / Register</button>
              </Link>
            )}
            <Search />
          </>
        )}
      </div>
    </div>
  );
}
