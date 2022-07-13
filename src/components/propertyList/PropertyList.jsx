import "./propertyList.scss";
import useFetch from "../../hooks/useFetch";
import { IMAGES } from "../../mockData";

export default function PropertyList() {
  const { data, loading, error, reFetch } = useFetch("/hotels/countByType");

  return (
    <div className="pList">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data?.map((item, i) => (
            <div key={i} className="pListItem">
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
