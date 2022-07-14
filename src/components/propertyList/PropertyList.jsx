import "./propertyList.scss";
import useFetch from "../../hooks/useFetch";
import { IMAGES } from "../../mockData";
import { useNavigate } from "react-router-dom";
import { Loader } from "rsuite";

export default function PropertyList() {
  const { data, loading, error, reFetch } = useFetch("/hotels/countByType");

  const navigate = useNavigate();
  return (
    <div className="pList">
      {loading ? (
        <div className="loading">
          <Loader size="md" content="Loading..." />
        </div>
      ) : (
        <>
          {data?.map((item, i) => (
            <div
              key={i}
              className="pListItem"
              onClick={() => navigate("/hotels")}
            >
              <img src={IMAGES[i]} alt="" />
              <div className="pListTitles">
                <span>{data[i]?.type}</span>
                <span>
                  {data[i]?.count} {data[i]?.type}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
