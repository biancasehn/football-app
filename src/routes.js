import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import Competition from "./pages/Competition";
import Match from "./pages/Match";

function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/:competitionCode"} element={<Competition />} />
          <Route path={"/:competitionCode/:matchId"} element={<Match />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
