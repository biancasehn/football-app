import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./breadcrumb.module.css";

function Breadcrumb() {
  const params = useParams();

  const [competitionCode, setCompetitionCode] = useState("");
  const [matchId, setMatchId] = useState("");

  useEffect(() => {
    setCompetitionCode(params.competitionCode);
    setMatchId(params.matchId);
  }, [params]);

  return (
    <div className={styles.breadcrumb}>
      <Link to="/"><span className={styles.link}>Home</span></Link>
      <span> > </span>
      {matchId === undefined ? (
        <span className={styles.nonLink}>League</span>
      ) : (
        <>
          <Link to={`/${competitionCode}`}><span className={styles.link}>League</span></Link>
          <span> > </span>
          <span className={styles.nonLink}>Match</span>
        </>
      )}
    </div>
  );
}

export default Breadcrumb;
