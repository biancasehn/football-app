import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { pick } from "ramda";
import { updateMatchSelected, updateErrorMessage } from "../../actions";
import { getMatch } from "../../services/api"
import Breadcrumb from "../../components/Breadcrumb";
import Loading from "../../components/Loading";
import styles from "./match.module.css";

function Match() {
  const params = useParams();
  const matchId = params.matchId;

  const dispatch = useDispatch();
  const { competitionSelected, matchSelected, errorMessage } = useSelector(
    (state) =>
      pick(["competitionSelected", "matchSelected", "errorMessage"], state)
  );

  const loadMatch = async () => {
    try {
      const result = await getMatch(matchId);
      dispatch(updateErrorMessage(false));
      dispatch(updateMatchSelected(result));
    } catch (error) {
      if ((error = "TypeError: Failed to fetch")) {
        setTimeout(() => loadMatch(), 5000);
        dispatch(updateErrorMessage(true));
      }
    }
  }

  useEffect(() => {
    dispatch(updateErrorMessage(false));
    loadMatch()
  }, []);

  return (
    <div>
      <Breadcrumb />
      <div className="container">
        {!!errorMessage && <p>Too many requests. Fetching API...</p>}
          {!matchSelected ? (

          <Loading />
        ) : (
          <div>
            <h1>
              {competitionSelected?.name
                ? competitionSelected.name
                : matchSelected.match.competition.name}
            </h1>
            <div className="main">
              <div className={styles.score}>
                <div
                  className={styles.teamScore}
                  style={{ justifyContent: "flex-end" }}
                >
                  <h2>{`${matchSelected.head2head.homeTeam.name}`}</h2>
                  {matchSelected.match.score.fullTime.homeTeam !== null && (
                    <h2
                      className={styles.goals}
                    >{`${matchSelected.match.score.fullTime.homeTeam}`}</h2>
                  )}
                </div>
                X
                <div
                  className={styles.teamScore}
                  style={{ justifyContent: "flex-start" }}
                >
                  {matchSelected.match.score.fullTime.awayTeam !== null && (
                    <h2
                      className={styles.goals}
                    >{`${matchSelected.match.score.fullTime.awayTeam}`}</h2>
                  )}
                  <h2>{`${matchSelected.head2head.awayTeam.name}`}</h2>
                </div>
              </div>
              {matchSelected.match.status === "IN_PLAY" ? (
                <div className={styles.inPlayDetails}>
                  <h3>
                    {matchSelected.match.score.halfTime.homeTeam === null
                      ? "First half"
                      : "Second half"}
                  </h3>
                  <h3>in Play</h3>
                </div>
              ) : (
                <h3>{matchSelected.match.status}</h3>
              )}
              <p>
                {String(new Date(matchSelected.match.utcDate)).slice(0, 21)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Match;
