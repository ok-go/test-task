import SearchParams from "./SearchParams";
import { useState, useEffect, useReducer, useCallback } from "react";
import { isIterable } from "./common";

const usePopstateEffect = (key, setter) => (
    useEffect(() => {
        const handler = () => {
            const state = JSON.parse(window.history.state);
            setter(state[key]);
        };
        window.addEventListener('popstate', handler, true);
        return () => window.removeEventListener('popstate', handler);
    }, [key, setter])
);

const useUpdateQueryEffect = (query, value) => {
    useEffect(() => {
        const sp = (new SearchParams(window.location.search)).set(query, value);
        const state = JSON.stringify({
            ...JSON.parse(window.history.state ?? '{}'),
            [query]: isIterable(value) && typeof value === 'object' ? [...value] : value,
        });

        if (window.history.state === null || JSON.parse(window.history.state)[query] === undefined) {
            window.history.replaceState(state, '', sp.toString());
        } else if (state !== window.history.state) {
            window.history.pushState(state, '', sp.toString());
        }
    }, [query, value]);
}

export const useQueryState = (initialState, query) => {
    const searchParams = new SearchParams(window.location.search);
    const [state, setState] = useState(searchParams.get(query) ?? initialState);

    usePopstateEffect(query, setState);
    useUpdateQueryEffect(query, state);

    return [state, setState];
};

export const useQueryReducer = (initialState, query, reducer, setterAction) => {
    const searchParams = new SearchParams(window.location.search);
    const [state, dispatch] = useReducer(reducer, searchParams.get(query) ?? initialState);

    usePopstateEffect(query, useCallback((value) => dispatch(setterAction(value)), [setterAction]));
    useUpdateQueryEffect(query, state);

    return [state, dispatch];
};