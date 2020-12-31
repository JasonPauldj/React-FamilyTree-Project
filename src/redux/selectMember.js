import * as ActionTypes from './ActionTypes';

export const selectMember = (state ={
    selected_member : null
} ,action) => {

    switch(action.type)
    {
        case ActionTypes.SELECT_MEMBER : {
           return {...state,selected_member : action.payload}
        };
        default :
        return state;
    }
}