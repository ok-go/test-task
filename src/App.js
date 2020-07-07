import React, { useState, useReducer, useCallback } from 'react';
import './App.css';
import Book from './Book';
import List from './List';
import Filters from './Filters';
import Navigation from './Navigation';
import { useQueryState, useQueryReducer } from './utils/Query';
import { TO_READ, IN_PROGRESS, DONE } from './utils/statuses';
import { itemsSet, tagsSet, tagsClean, tagsRemove, itemsMove, tagsAdd } from './actions';
import { useLoadDataEffect } from './utils/loader';
import { tagsReducer, itemsReducer } from './reducers';
import { selectItems } from './selectors';

const initialItems = {
    items: {},
    ids: [],
    [TO_READ]: [],
    [IN_PROGRESS]: [],
    [DONE]: [],
}

const App = () => {
    const [state, dispatchItems] = useReducer(itemsReducer, initialItems);
    const [tags, dispatchTags] = useQueryReducer(new Set(), 'tags', tagsReducer, tagsSet);
    const [tab, setTab] = useQueryState(TO_READ, 'tab');
    const [info, setInfo] = useState(null);
    
    useLoadDataEffect(
        '10-items.json', 
        setInfo,
        useCallback((items) => dispatchItems(itemsSet(items)), [])
    );

    const items = selectItems(state, tab, tags);
    const filters = tags.size > 0 
        && <Filters 
            key='filters' 
            filters={[...tags]} 
            clear={() => dispatchTags(tagsClean())} 
            onTagClick={(tag) => dispatchTags(tagsRemove(tag))} />;

    return (
        <div className='App'>
            <Navigation
                selectedTab={tab}
                getSize={tab => state[tab].length}
                onTabClick={setTab}
            />
            <List prefix={filters} postfix={info}>
                { items.map(book => 
                    <Book 
                        key={book.id} 
                        info={book} 
                        status={tab} 
                        addFilter={(tag) => dispatchTags(tagsAdd(tag))}
                        moveNext={(id) => dispatchItems(itemsMove(id))}
                    />)}
            </List>
        </div>
    );
};

export default App;
