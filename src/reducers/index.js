import { isIterable } from "../utils/common";
import { reducer } from "./itemsReducer";

export const tagsReducer = (state, action) => {
    switch (action.type) {
        case 'CLEAN_TAGS':
            return new Set();
        case 'SET_TAGS':
            return new Set(isIterable(action.payload) ? action.payload : []);
        case 'ADD_TAG':
            return (new Set(state)).add(action.payload);
        case 'REMOVE_TAG':
            const n = new Set(state);
            n.delete(action.payload);
            return n;
        default:
            return state;
    }
};

export const itemsReducer = reducer;
