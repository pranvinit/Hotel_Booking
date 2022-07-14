import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "rsuite";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.scss";

export default function Reserve({ setOpen, hotelId }) {
  const { data, loading, error, reFetch } = useFetch(
    `/hotels/${hotelId}/rooms`
  );

  const { dates } = useContext(SearchContext);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate.setHours(0, 0, 0, 0));
    const end = new Date(endDate.setHours(0, 0, 0, 0));

    const date = new Date(start.getTime());
    const list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const dateRange = getDatesInRange(dates[0], dates[1]);

  const isAvailable = (roomNumber) => {
    const isFound = JSON.parse(roomNumber.unavailableDates).some((date) =>
      dateRange.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const [selectedRooms, setSelectedRooms] = useState([]);

  const handleSelect = ({ target }) => {
    const { value, checked } = target;
    setSelectedRooms((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.patch(`/rooms/${roomId}/availability`, {
            dates: dateRange,
          });

          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      {loading ? (
        <div className="loading">
          <Loader size="md" content="Loading..." />
        </div>
      ) : (
        <div className="rContainer">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpen(false)}
          />

          <span>Select your rooms:</span>
          {data.map((item) => (
            <div key={item.id} className="rItem">
              <div className="rItemInfo">
                <span className="title">{item.title}</span>
                <span className="desc">{item.desc}</span>
                <span className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </span>
                <span className="rPrice">${item.price}</span>
              </div>
              <div className="rSelectRoom">
                {item.roomNumbers.map((roomNumber) => (
                  <div key={roomNumber.id} className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber.id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleReserve}>Reserve Now!</button>
        </div>
      )}
    </div>
  );
}
