import { TO_READ, IN_PROGRESS, DONE, nextStatus } from "../utils/statuses";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byID: {},
    [TO_READ]: [],
    [IN_PROGRESS]: [],
    [DONE]: [],
}

const setBooksAction = (state, action) => {
    const toread = [];
    const inprog = [];
    const done = [];

    state.byID = action.payload.reduce((res, item) => {
        const obj = {
            status: (state.byID[item.id] && state.byID[item.id].status) || TO_READ,
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

        return res;
    }, {});

    state[TO_READ] = toread;
    state[IN_PROGRESS] = inprog;
    state[DONE] = done;
}
const bookMoveNextAction = (state, action) => {
    const id = action.payload;

    const old_status = state.byID[id].status;
    const new_status = nextStatus[old_status];

    const old_index = state[old_status].indexOf(id);
    if (old_index === -1) {
        throw new Error(`try move unexisted book: ${id}`);
    }

    state.byID[id].status = new_status;
    state[old_status].splice(old_index, 1);
    
    state[new_status].push(id);
}

export const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: setBooksAction,
        bookMoveNext: bookMoveNextAction,
    },
});

export const { setBooks, bookMoveNext } = bookSlice.actions;

export const selectRawBooks = (state, tab) => state.books[tab];
export const selectBooks = (state, tab, tags) => selectRawBooks(state, tab).filter(id => {
    for (let tag of tags) {
        if (!state.books.byID[id].book.tags.includes(tag)) {
            return false;
        }
    }
    return true;
}).map(id => state.books.byID[id].book);
export const selectBooksLength = (state, tab) => selectRawBooks(state, tab).length;

export const preloadBooks = () => {
    const load = (key) => {
        const string = sessionStorage.getItem(key);
        if (string === null || string === 'undefined') {
            return [];
        }
        return JSON.parse(string);
    }

    const toread = load(TO_READ);
    const inprog = load(IN_PROGRESS);
    const done = load(DONE);
    
    const reduce = (arr, status) => {
        return arr.reduce((res, id) => {
            res[id] = { status };
            return res;
        }, {});
    };

    const r = {
        ...initialState,
        byID: {
            ...reduce(toread, TO_READ),
            ...reduce(inprog, IN_PROGRESS),
            ...reduce(done, DONE),
        }
    };

    return r;
}
export const uploadBooks = (state) => {
    sessionStorage.setItem(TO_READ, JSON.stringify(state.books[TO_READ]));
    sessionStorage.setItem(IN_PROGRESS, JSON.stringify(state.books[IN_PROGRESS]));
    sessionStorage.setItem(DONE, JSON.stringify(state.books[DONE]));
}

export default bookSlice.reducer;