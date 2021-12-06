import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateErrorMessage } from "../../actions";
import Loading from "../../components/Loading";
import styles from "./home.module.css";

function Home() {
  const [competitionsList, setCompetitionsList] = useState([]);

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errorMessage);

  useEffect(() => {
    function fetchAPI() {
      fetch("https://api.football-data.org/v2/competitions/?plan=TIER_ONE", {
        method: "get",
        headers: { "X-Auth-Token": process.env.REACT_APP_API_TOKEN },
      })
        .then((response) => response.json())
        .then((json) => {
          dispatch(updateErrorMessage(false));
          setCompetitionsList(json.competitions);
        })
        .catch((err) => {
          if ((err = "TypeError: Failed to fetch")) {
            dispatch(updateErrorMessage(true));
            setTimeout(() => fetchAPI(), 5000);
          }
        });
    }

    fetchAPI();
  }, [setCompetitionsList]);

  return (
    <div className="container">
      <h1>Football Competitions</h1>
      {errorMessage === true && <p>Too many requests. Fetching API...</p>}
      {competitionsList.length === 0 ? (
        <Loading />
      ) : (
        <div className="main">
          <div className={styles.grid}>
            {competitionsList.map((competition) => {
              return (
                <Link to={competition.code} key={competition.id}>
                  <div className={styles.card}>
                    {competition.emblemUrl || competition.area.ensignUrl ? (
                      <img
                        className={styles.img}
                        src={
                          competition.emblemUrl
                            ? competition.emblemUrl
                            : competition.area.ensignUrl
                        }
                        alt={`${competition.name} flag`}
                      />
                    ) : (
                      ""
                    )}
                    <p>{competition.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
