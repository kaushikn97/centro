export const TEST_ACTION = 'TEST_ACTION';
export const ADD_SESSION = 'ADD_SESSION';

export const testAction = (payload) => {
    return {
        type: TEST_ACTION,
        payload
    }
}

export const addSession = (payload) => {
    return {
        type: ADD_SESSION,
        payload
    }
}