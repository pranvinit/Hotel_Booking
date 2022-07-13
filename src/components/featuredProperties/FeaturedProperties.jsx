import "./featuredProperties.scss";
import useFetch from "../../hooks/useFetch";
import { IMAGES } from "../../mockData";

export default function FeaturedProperties() {
  const { data, loading, error, reFetch } = useFetch(
    "/hotels?featured=true&limit=4"
  );

  return (
    <div className="fp">
      <>
        {loading
          ? "Loading please wait"
          : data?.map((item, i) => (
              <div key={item.id} className="fpItem">
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
            ))}
      </>
    </div>
  );
}
