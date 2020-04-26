import { TEST_ACTION, ADD_SESSION } from '../actions/TrackerActions';

const INITIAL_STATE = {
  sessions: {}
}

const TrackerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEST_ACTION: {
      return action.payload;
    }
    case ADD_SESSION: {
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [action.payload.date]: state.sessions[action.payload.date] ? [...state.sessions[action.payload.date], action.payload] : [action.payload]
        }
      }
    }
    default:
      return state;
  }
};

export default TrackerReducer;