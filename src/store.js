
import { configureStore } from '@reduxjs/toolkit';
import booksReducer, { preloadBooks, uploadBooks } from './reducers/booksReducer';

const store = configureStore({
    reducer: {
        books: booksReducer,
    },
    preloadedState: {
        books: preloadBooks(),
    }
});

window.onbeforeunload = () => {
    uploadBooks(store.getState());
}

export default store;
