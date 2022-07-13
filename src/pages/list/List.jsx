import "./list.scss";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";

import { useLocation } from "react-router-dom";

import "rsuite/dist/rsuite.min.css";
import { DateRangePicker } from "rsuite";
const { beforeToday } = DateRangePicker;

export default function List() {
  const { state } = useLocation();

  const [destination, setDestination] = useState(state.destination);
  const [date, setDate] = useState(state.date);
  const [options, setOptions] = useState(state.options);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}`
  );

  return (
    <div className="list">
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h2 className="title">Search</h2>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check-in Date</label>
              <DateRangePicker
                className="date"
                value={date}
                onChange={setDate}
                character=" to "
                format="MM-dd-yyyy"
                disabledDate={beforeToday(false)}
              />
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min Price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    step="10"
                    min="0"
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max Price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    step="10"
                    min="0"
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min="1"
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min="0"
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min="1"
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading please wait"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item.id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
