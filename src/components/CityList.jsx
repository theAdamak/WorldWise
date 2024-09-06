import styles from "./CityList.module.css";
import Spinner from ".Spinner";
import CityItem from ".CityItem";
function CityList(cities, isLoding) {
  if (isLoding) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
