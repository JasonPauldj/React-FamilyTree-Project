import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Members } from './members';
import { selectMember } from './selectMember';
import { fetchParents } from './fetchParents';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            members: Members,
            selectMember: selectMember,
            parents: fetchParents
        }),
        applyMiddleware(thunk,logger));

    return store;
}