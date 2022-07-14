import "./featuredProperties.scss";
import useFetch from "../../hooks/useFetch";
import { IMAGES } from "../../mockData";
import { useNavigate } from "react-router-dom";
import { Loader } from "rsuite";

export default function FeaturedProperties() {
  const navigate = useNavigate();
  const { data, loading, error, reFetch } = useFetch(
    "/hotels?featured=true&limit=4"
  );
  return (
    <div className="fp">
      <>
        {loading ? (
          <div className="loading">
            <Loader size="md" content="Loading..." />
          </div>
        ) : (
          data?.map((item, i) => (
            <div
              key={item.id}
              className="fpItem"
              onClick={() => navigate(`/hotels/${item.id}`)}
            >
              <img src={IMAGES[i]} alt="" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))
        )}
      </>
    </div>
  );
}
