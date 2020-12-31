import * as ActionTypes from './ActionTypes';

export const initialState = {
    "id" : 0,
	 "name" : "Darivemula Joshua Vinaya Kumar Paul",
	 "dob" : "1960-02-25",
	 "isDarivemula" : true,
	 "fatherid" : 0,
	 "motherid" : 0
}

export const Members = (state = { 
        members : [],
        isLoading : true
} , action ) => {

    switch(action.type){
        case ActionTypes.FETCH_MEMBERS :
        return {...state,members : action.payload, isLoading : false};
        case ActionTypes.GET_MEMBERS :
        return {...state, members : action.payload, isLoading : false};
        case ActionTypes.ADD_MEMBER :
        return {...state,members : [...state.members,action.payload]};
        case ActionTypes.UPDATE_MEMBER :
            {
        var newMembersArray= state.members.map((member)=> {
            if(member.id !== action.payload.id)
            {
                return member;
            }
            else{
                console.log("in else" + action.payload.id)
            return {...member,...action.payload}
            }
        })
        return {...state, members : newMembersArray}
        
    }
        default :
        return state
    }
}