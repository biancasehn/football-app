import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateMatchSelected, updateErrorMessage } from "../../actions";
import Breadcrumb from "../../components/Breadcrumb";
import Loading from "../../components/Loading";
import styles from "./match.module.css";

function Match() {
  const params = useParams();
  const matchId = params.matchId;

  const dispatch = useDispatch();
  const competitionDetails = useSelector((state) => state.competitionSelected);
  const matchDetails = useSelector((state) => state.matchSelected);
  const errorMessage = useSelector((state) => state.errorMessage);

  useEffect(() => {
    function fetchAPI() {
      fetch(`https://api.football-data.org/v2/matches/${matchId}`, {
        method: "GET",
        headers: { "X-Auth-Token": process.env.REACT_APP_API_TOKEN },
      })
        .then((resp) => resp.json())
        .then((json) => {
          dispatch(updateErrorMessage(false));
          dispatch(updateMatchSelected(json));
        })
        .catch((err) => {
          if (err = "TypeError: Failed to fetch") {
            setTimeout(() => fetchAPI(), 5000);
            dispatch(updateErrorMessage(true));
          }
        });
    }
    fetchAPI();
  }, [dispatch]);

  return (
    <div>
      <Breadcrumb />
      <div className="container">
        {errorMessage && <p>Too many requests. Fetching API...</p>}
        {matchDetails.match === undefined ? (
          <Loading />
        ) : (
          <div>
            <h1>
              {competitionDetails.name
                ? competitionDetails.name
                : matchDetails?.match?.competition?.name}
            </h1>
            <div className="main">
              <div className={styles.score}>
                <div
                  className={styles.teamScore}
                  style={{ justifyContent: "flex-end" }}
                >
                  <h2>{`${matchDetails?.head2head?.homeTeam.name}`}</h2>
                  {matchDetails?.match?.score?.fullTime?.homeTeam !== null && (
                    <h2
                      className={styles.goals}
                    >{`${matchDetails?.match?.score?.fullTime?.homeTeam}`}</h2>
                  )}
                </div>
                X
                <div
                  className={styles.teamScore}
                  style={{ justifyContent: "flex-start" }}
                >
                  {matchDetails?.match?.score?.fullTime?.awayTeam !== null && (
                    <h2
                      className={styles.goals}
                    >{`${matchDetails?.match?.score?.fullTime?.awayTeam}`}</h2>
                  )}
                  <h2>{`${matchDetails?.head2head?.awayTeam.name}`}</h2>
                </div>
              </div>
              {matchDetails?.match?.status === "IN_PLAY" ? (
                <div className={styles.inPlayDetails}>
                  <h3>
                    {matchDetails?.match?.score.halfTime.homeTeam === null
                      ? "First half"
                      : "Second half"}
                  </h3>
                  <h3>in Play</h3>
                </div>
              ) : (
                <h3>{matchDetails?.match?.status}</h3>
              )}
              <p>
                {String(new Date(matchDetails?.match?.utcDate)).slice(0, 21)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Match;
