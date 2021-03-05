import React, { useState, useEffect } from "react";
import { getSpaceXPrograms } from "../../services/spaceXProgramService";
import styles from "./LaunchProgram.module.scss";
import { useRouter } from "next/router";

const LaunchProgram = ({ query }) => {
  const [programs, setPrograms] = useState([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const programs = await getSpaceXPrograms(router.asPath);
      setPrograms(programs);
    })();
  }, [query]);

  return (
    <div className={styles.container}>
      {programs.map((program) => {
        const {
          flight_number,
          mission_name,
          launch_year,
          links: { mission_patch_small },
          launch_success,
          rocket
        } = program;
        return (
          <div key={flight_number} className={styles.launchItem}>
            <div className={styles.image}>
              <img src={mission_patch_small} />
            </div>
            <h4>{`${mission_name} #${flight_number}`}</h4>
            {program.mission_id.length > 0 ? (
              <div className="mb-05">
                <span className={styles.title}>Mission Ids:</span>
                <ul>
                  {program.mission_id.map((missionId) => {
                    return <li key={missionId}>{missionId}</li>;
                  })}
                </ul>
              </div>
            ) : null}
            <div className="mb-05">
              <span className={styles.title}>Launch Year: </span>
              <span>{launch_year}</span>
            </div>
            <div className="mb-05">
              <span className={styles.title}>Successful Launch: </span>
              <span>{launch_success?.toString()}</span>
            </div>
            <div className="mb-05">
              <span className={styles.title}>Successful Landing: </span>
              {rocket.first_stage.cores[0].land_success ? "true" : "false"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LaunchProgram;
