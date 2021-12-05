export const updateCompetitionSelected = (competition) => {
    return {
        type: 'UPDATE_COMPETITION_SELECTED',
        payload: competition,
    };
}

export const updateMatchSelected = (match) => {
    return {
        type: 'UPDATE_MATCH_SELECTED',
        payload: match,
    };
}