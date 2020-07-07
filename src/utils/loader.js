import { useReducer, useEffect } from "react";

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'init': return {
            ...state,
            isLoading: true,
            isError: false,
        };
        case 'error': return {
            ...state,
            isLoading: false,
            isError: true,
        };
        case 'done': return {
            ...state,
            items: action.payload,
            isLoading: false,
            isError: false,
        };
        default:
            throw Error('unknown action type');
    }
}

export const useLoadDataEffect = (filename, setInfo, setResult) => {
    const url = `https://raw.githubusercontent.com/lastw/test-task/master/data/${filename}`;
    const [state, dispatch] = useReducer(dataFetchReducer, {
        items: [],
        isLoading: false,
        isError: false,
    });

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            dispatch({ type: 'init' });
            try {
                const response = await fetch(url).then(response => response.json());
                if (!didCancel) {
                    dispatch({ type: 'done', payload: response.items });
                }
            } catch (err) {
                if (!didCancel) {
                    dispatch({ type: 'error' });
                }
            }
        };

        fetchData();
        return () => { didCancel = true; };
    }, [url]);

    useEffect(
        () => setInfo(state.isError 
            ? 'Error occurred!' 
            : state.isLoading ? 'Loading..'
            : null), 
        [state.isError, state.isLoading, setInfo]
    );

    useEffect(
        () => setResult(state.items),
        [state.items, setResult]
    );
}