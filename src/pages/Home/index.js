import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateErrorMessage } from "../../actions";
import { getCompetitions } from "../../services/api"
import Loading from "../../components/Loading";
import styles from "./home.module.css";

function Home() {
  const [competitionsList, setCompetitionsList] = useState([]);

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errorMessage);

  const loadCompetitions = async () => {
    try {
      const result = await getCompetitions();
      dispatch(updateErrorMessage(false));
      setCompetitionsList(result.competitions);
    } catch (error) {
      if ((error = "TypeError: Failed to fetch")) {
        setTimeout(() => loadCompetitions(), 5000);
        dispatch(updateErrorMessage(true));
      }
    }
  }

  useEffect(() => {
    dispatch(updateErrorMessage(false));
    loadCompetitions()
  }, []);

  return (
    <div className="container">
      <h1>Football Competitions</h1>
      {!!errorMessage && <p>Too many requests. Fetching API...</p>}
      {!competitionsList?.length ? (
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
