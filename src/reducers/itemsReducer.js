import { TO_READ, IN_PROGRESS, DONE, NextStatus } from "../utils/statuses";

const storage = sessionStorage;

const setlist = (state, payload) => {
    const toread = [];
    const inprog = [];
    const done = [];
    const ids = [];

    const items = payload.reduce((res, item) => {
        const statusFromStorage = storage.getItem(item.id);
        const obj = {
            status: statusFromStorage ? statusFromStorage : TO_READ,
            book: item, 
        };
        switch (obj.status) {
            case IN_PROGRESS:
                inprog.push(item.id);
                break;
            case DONE:
                done.push(item.id);
                break;
            case TO_READ:
            default:
                toread.push(item.id);
        }

        res[item.id] = obj;
        ids.push(item.id);

        return res;
    }, {});
    
    return {
        ...state, 
        items,
        ids,
        [TO_READ]: toread,
        [IN_PROGRESS]: inprog,
        [DONE]: done,
    };
}
const movenext = (state, payload) => {
    const item = {...state.items[payload]};
    const old_status = item.status;
    const new_status = NextStatus[item.status];

    item.status = new_status;
    storage.setItem(payload, new_status);

    const old_index = state[old_status].indexOf(item.book.id);
    if (old_index === -1) {
        throw new Error(`try move unexisted book: ${item.book.id}`);
    }
    const old_list = [
        ...state[old_status].slice(0, old_index),
        ...state[old_status].slice(old_index + 1)
    ];

    return {
        ...state,
        items: {
            ...state.items,
            [item.book.id]: item,
        },
        [old_status]: old_list.sort(),
        [new_status]: [...state[new_status], item.book.id].sort(),
    }
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return setlist(state, action.payload)
        case 'MOVE_NEXT':
            return movenext(state, action.payload);
        default:
            return state;
    }
};
