import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCompetitionSelected, updateErrorMessage } from "../../actions";
import Breadcrumb from "../../components/Breadcrumb";
import Loading from "../../components/Loading";
import styles from "./competition.module.css";

function Competition() {
  const params = useParams();
  const competitionCode = params.competitionCode;

  const [matchesList, setMatchesList] = useState([]);

  const dispatch = useDispatch();
  const competitionDetails = useSelector((state) => state.competitionSelected);
  const errorMessage = useSelector((state) => state.errorMessage);

  useEffect(() => {
    dispatch(updateErrorMessage(false));
    function fetchAPI() {
      fetch(
        `https://api.football-data.org/v2/competitions/${competitionCode}/matches`,
        {
          method: "GET",
          headers: { "X-Auth-Token": process.env.REACT_APP_API_TOKEN },
        }
      )
        .then((resp) => resp.json())
        .then((json) => {
          dispatch(updateErrorMessage(false));
          setMatchesList(
            json.matches.filter((match) => match.status !== "FINISHED")
          );
          dispatch(updateCompetitionSelected(json.competition));
        })
        .catch((err) => {
          if ((err = "TypeError: Failed to fetch")) {
            dispatch(updateErrorMessage(true));
            setTimeout(() => fetchAPI(), 20000);
          }
        });
    }
    fetchAPI();
  }, [dispatch]);

  return (
    <div>
      <Breadcrumb />
      <div className="container">
        {errorMessage === true && <p>Too many requests. Fetching API...</p>}
        {matchesList?.length === 0 ? (
          <Loading />
        ) : (
          <div>
            <h1>{competitionDetails.name}</h1>
            <div className="main">
              {matchesList?.map((match) => (
                <div className={styles.listItem} key={match.id}>
                  <Link to={`/${competitionDetails.code}/${match.id}`}>
                    <div className={styles.match}>
                      {`${match.awayTeam.name} X ${match.homeTeam.name}`}
                    </div>
                  </Link>
                  {match.status === "IN_PLAY" ? (
                    <div style={{ fontWeight: "bold", color: "green" }}>
                      IN PLAY
                    </div>
                  ) : (
                    <>
                      <div style={{ color: "gray" }}>{match.status}</div>
                      <div>{String(new Date(match.utcDate)).slice(0, 15)}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Competition;