import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./breadcrumb.module.css";
import { pick } from "ramda";
import { useSelector, useDispatch } from "react-redux";

function Breadcrumb() {
  // const params = useParams();

  const { competitionSelected, matchSelected} = useSelector(
    (state) =>
      pick(["competitionSelected", "matchSelected"], state)
  );

  // const [competitionCode, setCompetitionCode] = useState("");
  // const [matchId, setMatchId] = useState("");

  // useEffect(() => {
  //   setCompetitionCode(params.competitionCode);
  //   setMatchId(params.matchId);
  // }, [params]);
  
  return (
    <div className={styles.breadcrumb}>
      <Link to="/">
        <span className={styles.link}>Home</span>
      </Link>
      <span> > </span>
      {/* {matchSelected === undefined ? ( */}
        {!matchSelected?.match ? (
        <span className={styles.nonLink}>League</span>
      ) : (
        <>
          <Link to={`/${competitionSelected.code}`}>
            <span className={styles.link}>League</span>
          </Link>
          <span> > </span>
          <span className={styles.nonLink}>Match</span>
        </>
      )}
      {/* {matchId === undefined ? (
        <span className={styles.nonLink}>League</span>
      ) : (
        <>
          <Link to={`/${competitionCode}`}>
            <span className={styles.link}>League</span>
          </Link>
          <span> > </span>
          <span className={styles.nonLink}>Match</span>
        </>
      )} */}
    </div>
  );
}

export default Breadcrumb;
