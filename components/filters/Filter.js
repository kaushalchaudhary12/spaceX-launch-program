import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./Filter.module.scss";
import { years, launch, landing } from "../../utils/constants";

const Filter = (props) => {
  const router = useRouter();

  useEffect(() => {
    let { query: queryArray } = router;
    const {
      query: { launch_success, land_success, launch_year }
    } = router;

    if (launch_success || land_success || launch_year) {
      const queryArrayKeys = Object.keys(queryArray);
      const queryArrayValues = Object.values(queryArray);
      queryArrayKeys.forEach((query, index) => {
        mapFiltersArray(query, queryArrayValues[index]);
      });
    }
  }, []);

  const [launchSuccessArray, setLaunchSuccessArray] = useState(launch);
  const [landSuccessArray, setLandSuccessArray] = useState(landing);
  const [launchYearsArray, setLaunchYearsArray] = useState(years);

  const filterHandler = (filter, value, isActive) => {
    let query = { ...router.query };
    query = mapFiltersArray(filter, value, isActive, query);
    router.push({ query });
  };

  const updateIsActive = (value, isActive) => {
    return (item) => {
      item.value == value && !isActive ? (item.isActive = true) : (item.isActive = false);
      return item;
    };
  };

  const mapFiltersArray = (filterType, value, isActive, query) => {
    if (filterType === "launch_year") {
      const updateData = years.map(updateIsActive(value, isActive));
      setLaunchYearsArray(updateData);
      query ? (!isActive ? (query.launch_year = value) : delete query["launch_year"]) : null;
    } else if (filterType === "launch_success") {
      const updateData = launchSuccessArray.map(updateIsActive(value, isActive));
      setLaunchSuccessArray(updateData);
      query ? (!isActive ? (query.launch_success = value === "true") : delete query["launch_success"]) : null;
    } else if (filterType === "land_success") {
      const updateData = landSuccessArray.map(updateIsActive(value, isActive));
      setLandSuccessArray(updateData);
      query ? (!isActive ? (query.land_success = value === "true") : delete query["land_success"]) : null;
    }

    return query ? query : {};
  };

  if (!props.query) {
    return null;
  }

  return (
    <div className={styles.filters}>
      <span className={styles.filtersTitle}>Filters</span>
      <span className={styles.filtersHeading}>Successful Year</span>
      <div className={styles.filtersContainer}>
        {launchYearsArray.map(({ value, id, isActive }) => {
          return (
            <div
              onClick={() => filterHandler("launch_year", value.toString(), isActive)}
              key={id}
              className={isActive ? `${styles.active}` : ""}
            >
              {value}
            </div>
          );
        })}
      </div>
      <span className={styles.filtersHeading}>Successful Launch</span>
      <div className={styles.filtersContainer}>
        {launchSuccessArray.map(({ value, id, isActive }) => {
          return (
            <div
              onClick={() => filterHandler("launch_success", value, isActive)}
              key={id}
              className={isActive ? `${styles.active}` : ""}
            >
              {value}
            </div>
          );
        })}
      </div>
      <span className={styles.filtersHeading}>Successful Landing</span>
      <div className={styles.filtersContainer}>
        {landSuccessArray.map(({ value, id, isActive }) => {
          return (
            <div
              onClick={() => filterHandler("land_success", value, isActive)}
              key={id}
              className={isActive ? `${styles.active}` : ""}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
