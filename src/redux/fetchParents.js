import * as ActionTypes from './ActionTypes';
import { MEMBERS } from '../shared/members';


export const fetchParents = (state = {
    father: null,
    mother: null
}, action) => {

    switch (action.type) {
        case ActionTypes.FETCH_PARENTS:
            return { ...state, father: action.payload.father, mother: action.payload.mother }
        default:
            return state
    }
}