import * as ActionTypes from './ActionTypes';
import { MEMBERS } from '../shared/members'
import { baseUrl } from '../shared/baseUrl';


/*export const fetchMembers = () => ({
    type: ActionTypes.FETCH_MEMBERS,
    payload: MEMBERS
}) */

export const fetchMembers = () => (dispatch) => {

    fetch(baseUrl + 'members').then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('There was an error' + response.status + response.statusText)
            throw error;
        }
    },
        error => {
            throw error
        }).then((response) => response.json()).then(response => dispatch(getMembers(response))).catch(error => alert(error.message))
}

export const getMembers = (members) => ({
    type: ActionTypes.GET_MEMBERS,
    payload: members
})


export const selectMember = (member) => {
    return ({
        type: ActionTypes.SELECT_MEMBER,
        payload: member
    })
}

export const fetchParents = (member) => {
    var father = MEMBERS[member.fatherid];
    var mother = MEMBERS[member.motherid];
    return ({
        type: ActionTypes.FETCH_PARENTS,
        payload: {
            father: father,
            mother: mother
        }

    })
}

export const postMember = (member, membertype) => (dispatch, getState) => {
    fetch(baseUrl + 'members', {
        method: "POST",
        body: JSON.stringify(member),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('There was an error ' + response.status + ' ' + response.statusText);
            throw error;
        }
    }, error => {
        throw error;
    }).then(response => response.json()).then(response => {
        dispatch(addMember(response));

        switch (membertype) {
            case "partner":
                {
                    console.log("in case partner");
                    var updateMember = getState().members.members.filter((mem) => mem.id == member.partnerid)[0];
                    updateMember = { ...updateMember, partnerid: response.id };
                    dispatch(putMember(updateMember));

                    var children = [];
                    if (updateMember.gender == "M") {
                        children = getState().members.members.filter((mem) => mem.fatherid == updateMember.id);
                        if (children.length > 0) {
                            children.forEach(element => {
                                var oldMember = { ...element, motherid: response.id };
                                dispatch(putMember(oldMember));
                            });
                        }
                    }
                    else {
                        children = getState().members.members.filter((mem) => mem.motherid == updateMember.id);
                        if (children.length > 0) {
                            children.forEach(element => {
                                var oldMember = { ...element, fatherid: response.id };
                                dispatch(putMember(oldMember));
                            });
                        }
                    }
                }
        }
    }).catch(error => alert('error in post ' + error.message));


    /* var children = [];
     if (partner.gender == "M") {
         children = getState().members.members.filter((mem) => mem.fatherid == partner.id);
         if (children.length > 0) {
             children.forEach(element => {
                 var oldMember = { ...element, motherid : response.id};
                 dispatch(putMember(oldMember));
             });
         }
     }
     else {
         children = getState().members.members.filter((mem) => mem.motherid == partner.id);
         if (children.length > 0) {
             children.forEach(element => {
                 var oldMember = { ...element, fatherid : response.id };
                 dispatch(putMember(oldMember));
             });
         }
     }*/
}


export const addMember = (member) => ({
    type: ActionTypes.ADD_MEMBER,
    payload: member
})


export const putMember = (mem) => (dispatch) => {
    fetch(baseUrl + 'members/' + mem.id, {
        method: "PUT",
        body: JSON.stringify(mem),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error("There was an error" + response.status + " " + response.statusText);
            throw error;
        }
    }).then(response => response.json()).then(json => dispatch(updateMember(json))).catch(error => alert('error in put ' + error.message));
}

export const updateMember = (member) => ({
    type: ActionTypes.UPDATE_MEMBER,
    payload: member
});