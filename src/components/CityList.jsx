import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";

// eslint-disable-next-line react/prop-types
function CityList({ cities, isLoading }) {
  console.log(cities);
  if (isLoading) return <Spinner />;
  // eslint-disable-next-line react/prop-types
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem cities={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
