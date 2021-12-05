import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./breadcrumb.module.css";

function Breadcrumb() {
  const location = useLocation();
  const competitionCode = useSelector(
    (state) => state.competitionSelected.code
  );

  const [pathName, setPathName] = useState("");
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  return (
    <div className={styles.breadcrumb}>
      <Link to="/"><span className={styles.link}>Home</span></Link>
      <span> > </span>
      {pathName.split("/").length < 3 ? (
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
