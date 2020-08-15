import * as actions from '../actions/queryTool';

const initialState = {
    rawResults: [],
    userInput: `SELECT name, count(1)
    FROM film_category join category on category.category_id = film_category.category_id 
    GROUP BY name 
    ORDER BY count DESC 
    LIMIT 10`,
}

function setRawResults(state, rawResults) {
    return {
        ...state,
        rawResults
    };
};

function setUserInput(state, userInput) {
    console.log('here is userInput', userInput)
    return {
        ...state,
        userInput
    };
};

export default function query(state = initialState, action) {
    switch (action.type) {
        case actions.SET_RAW_RESULTS:
            return setRawResults(state, action.rawResults);
        case actions.SET_USER_QUERY:
            return setUserInput(state, action.queryInput);
        default:
            return state
    }
}