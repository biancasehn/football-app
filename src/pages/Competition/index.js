import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { pick } from "ramda";
import { updateCompetitionSelected, updateErrorMessage } from "../../actions";
import { getMatchesList } from "../../services/api"
import Breadcrumb from "../../components/Breadcrumb";
import Loading from "../../components/Loading";
import styles from "./competition.module.css";

function Competition() {
  const params = useParams();
  const competitionCode = params.competitionCode;

  const [matchesList, setMatchesList] = useState([]);

  const dispatch = useDispatch();
  const { competitionSelected, errorMessage } = useSelector(
    (state) =>
      pick(["competitionSelected", "errorMessage"], state)
  );


  const loadMatchesList = async () => {
    try {
      const result = await getMatchesList(competitionCode);
      dispatch(updateErrorMessage(false));
      setMatchesList(
        result.matches.filter((match) => match.status !== "FINISHED")
      );
      dispatch(updateCompetitionSelected(result.competition));
    } catch (error) {
      if ((error = "TypeError: Failed to fetch")) {
        setTimeout(() => loadMatchesList(), 5000);
        dispatch(updateErrorMessage(true));
      }
    }
  }

  useEffect(() => {
    dispatch(updateErrorMessage(false));
    loadMatchesList()
  }, []);

  return (
    <div>
      <Breadcrumb />
      <div className="container">
        {!!errorMessage && <p>Too many requests. Fetching API...</p>}
        {!matchesList?.length ? (
          <Loading />
        ) : (
          <div>
            <h1>{competitionSelected?.name}</h1>
            <div className="main">
              {matchesList?.map((match) => (
                <div className={styles.listItem} key={match.id}>
                  <Link to={`/${competitionSelected?.code}/${match.id}`}>
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