import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>map</h1>
      <h1>
        position : {lat}, {lng}
      </h1>

      <button
        onClick={() => {
          setSearchParams({ lat: 0, lng: 0 });
        }}
      >
        new pos
      </button>
    </div>
  );
}

export default Map;
