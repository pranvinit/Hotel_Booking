import "./search.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPerson } from "@fortawesome/free-solid-svg-icons";

import "rsuite/dist/rsuite.min.css";
import { DateRangePicker } from "rsuite";
const { beforeToday } = DateRangePicker;

export default function Search() {
  const [date, setDate] = useState([new Date(), new Date()]);

  const [destination, setDestination] = useState("");

  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOptions = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="search">
      <div className="item">
        <FontAwesomeIcon icon={faBed} className="icon" />
        <input
          type="text"
          className="searchInput"
          placeholder="Where are you going?"
          value={destination}
          onChange={({ target }) => setDestination(target.value)}
        />
      </div>
      <div className="item">
        <DateRangePicker
          className="date"
          value={date}
          onChange={setDate}
          character=" to "
          format="MM-dd-yyyy"
          disabledDate={beforeToday(false)}
        />
      </div>
      <div className="item">
        <FontAwesomeIcon icon={faPerson} className="icon" />
        <span
          onClick={() => setShowOptions(!showOptions)}
          className="searchText"
        >{`${options.adult} adult • ${options.children} children • ${options.room} room`}</span>
        {showOptions && (
          <div className="options">
            <div className="optionItem">
              <span className="text">Adult</span>
              <div className="optionsContainer">
                <button
                  onClick={() => handleOptions("adult", "d")}
                  className="counter"
                  disabled={options.adult <= 1}
                >
                  -
                </button>
                <span className="count">{options.adult}</span>
                <button
                  onClick={() => handleOptions("adult", "i")}
                  className="counter"
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span className="text">Children</span>
              <div className="optionsContainer">
                <button
                  onClick={() => handleOptions("children", "d")}
                  className="counter"
                  disabled={options.children <= 0}
                >
                  -
                </button>
                <span className="count">{options.children}</span>
                <button
                  onClick={() => handleOptions("children", "i")}
                  className="counter"
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span className="text">Room</span>
              <div className="optionsContainer">
                <button
                  onClick={() => handleOptions("room", "d")}
                  className="counter"
                  disabled={options.room <= 1}
                >
                  -
                </button>
                <span className="count">{options.room}</span>
                <button
                  onClick={() => handleOptions("room", "i")}
                  className="counter"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="item">
        <button className="searchBtn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
