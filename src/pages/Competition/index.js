import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCompetitionSelected } from "../../actions";
import Breadcrumb from "../../components/Breadcrumb";
import Loading from "../../components/Loading";
import styles from "./competition.module.css";

function Competition() {
  const params = useParams();
  const competitionCode = params.competitionCode;

  const [matchesList, setMatchesList] = useState([]);

  const dispatch = useDispatch();
  const competitionDetails = useSelector((state) => state.competitionSelected);

  useEffect(() => {
    fetch(
      `https://api.football-data.org/v2/competitions/${competitionCode}/matches`,
      {
        method: "GET",
        headers: { "X-Auth-Token": process.env.REACT_APP_API_TOKEN },
      }
    )
      .then((resp) => resp.json())
      .then((json) => {
        setMatchesList(json.matches);
        dispatch(updateCompetitionSelected(json.competition));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <div>
      <Breadcrumb />
      <div className="container">
        <h1>{competitionDetails.name}</h1>
        {matchesList?.length === 0 ? <Loading /> : (
          <div className="main">
            {matchesList?.map((match) => (
              <div className={styles.list} key={match.id}>
                <Link to={`/${competitionDetails.code}/${match.id}`}>
                  <div
                    className={styles.match}
                  >{`${match.awayTeam.name} X ${match.homeTeam.name}`}</div>
                </Link>
                <div
                  style={{
                    fontWeight: "bold",
                    color: match.status === "IN_PLAY" ? "green" : "gray",
                  }}
                >
                  {match.status}
                </div>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
}

export default Competition;