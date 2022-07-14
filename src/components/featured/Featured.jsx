import "./featured.scss";
import useFetch from "../../hooks/useFetch";
import { Loader } from "rsuite";

export default function Featured() {
  const { data, loading, error, reFetch } = useFetch(
    "/hotels/countByCity?cities=Mumbai,Pune,Bangalore"
  );

  return (
    <div className="featured">
      {loading ? (
        <div className="loading">
          <Loader size="md" content="Loading..." />
        </div>
      ) : (
        <>
          <div className="featuredItem">
            <img src="/assets/images/mumbai.jpg" alt="" />
            <div className="featuredTitle">
              <span>Mumbai</span>
              <span>{data[0]} properties</span>
            </div>
          </div>
          <div className="featuredItem">
            <img src="/assets/images/pune.jpg" alt="" />
            <div className="featuredTitle">
              <span>Pune</span>
              <span>{data[1]} properties</span>
            </div>
          </div>
          <div className="featuredItem">
            <img src="/assets/images/bangalore.jpg" alt="" />
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
