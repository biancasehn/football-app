import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import styles from "./home.module.css";

function Home() {
  const [competitionsList, setCompetitionsList] = useState([]);

  useEffect(() => {
    function fetchAPI() {
    console.log("entrou na fetch api")

      fetch("https://api.football-data.org/v2/competitions/?plan=TIER_ONE", {
        method: "get",
        headers: { "X-Auth-Token": process.env.REACT_APP_API_TOKEN },
      })
        .then((response) => response.json())
        .then((json) => setCompetitionsList(json.competitions))
        .catch(() => setTimeout(() => fetchAPI(), 5000));
    }
    console.log("depois")
    fetchAPI();
  }, [setCompetitionsList]);

  return (
    <div className="container">
      <h1>Football Competitions</h1>
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
