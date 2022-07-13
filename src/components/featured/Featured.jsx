import "./featured.scss";
import useFetch from "../../hooks/useFetch";

export default function Featured() {
  const { data, loading, error, reFetch } = useFetch(
    "/hotels/countByCity?cities=Mumbai,Pune,Bangalore"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src="/assets/images/1.jpg" alt="" />
            <div className="featuredTitle">
              <span>Mumbai</span>
              <span>{data[0]} properties</span>
            </div>
          </div>
          <div className="featuredItem">
            <img src="/assets/images/2.jpg" alt="" />
            <div className="featuredTitle">
              <span>Pune</span>
              <span>{data[1]} properties</span>
            </div>
          </div>
          <div className="featuredItem">
            <img src="/assets/images/3.jpg" alt="" />
            <div className="featuredTitle">
              <span>Bangalore</span>
              <span>{data[2]} properties</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
