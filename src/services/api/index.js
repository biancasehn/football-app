import { API_URL } from "../../constants/api";


export const getCompetitions = async () => {
    const fetchResult = await fetch(`${API_URL}/competitions/?plan=TIER_ONE`, {
        method: "GET",
        headers: { "X-Auth-Token": process.env.REACT_APP_API_TOKEN },
    });
    const result = await fetchResult.json();
  
    return result;
};

  export const getMatchesList = async (competitionCode = "") => {
      const fetchResult = await fetch(`${API_URL}/competitions/${competitionCode}/matches`, {
          method: "GET",
          headers: { "X-Auth-Token": process.env.REACT_APP_API_TOKEN },
        });
        const result = await fetchResult.json();
        
    return result;
};

export const getMatch = async (matchId = 0) => {
  const fetchResult = await fetch(`${API_URL}/matches/${matchId}`, {
    method: "GET",
    headers: { "X-Auth-Token": process.env.REACT_APP_API_TOKEN },
  });
  const result = await fetchResult.json();

  return result;
};