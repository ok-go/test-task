import React, { useState, useCallback } from 'react';
import './App.css';
import Book from './Book';
import List from './List';
import Filters from './Filters';
import Navigation from './Navigation';
import { useQueryState } from './utils/Query';
import { TO_READ } from './utils/statuses';
import { useLoadDataEffect } from './utils/loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooks, setBooks, bookMoveNext } from './reducers/booksReducer';

const App = () => {
    const [info, setInfo] = useState(null);

    const [tab, setTab] = useQueryState(TO_READ, 'tab');
    const [tags, setTags] = useQueryState(new Set(), 'tags');

    const books = useSelector(state => selectBooks(state, tab, tags));
    const dispatch = useDispatch();

    useLoadDataEffect(
        '10-items.json', 
        setInfo,
        useCallback(items => {
            dispatch(setBooks(items));
        }, [dispatch])
    );

    const filters = tags.size > 0 
        && <Filters 
            key='filters' 
            filters={tags} 
            clear={() => setTags(new Set())} 
            onTagClick={(tag) => setTags(tags => {
                const next = new Set(tags);
                tags.delete(tag);
                return next;
            })} />;

    return (
        <div className='App'>
            <Navigation
                selectedTab={tab}
                onTabClick={setTab}
            />
            <List prefix={filters} postfix={info}>
                {books.map(book => 
                    <Book 
                        key={book.id} 
                        info={book} 
                        status={tab} 
                        addFilter={tag => setTags(tags => {
                            const next = new Set(tags);
                            return next.add(tag);
                        })}
                        moveNext={id => dispatch(bookMoveNext(id))}
                    />)}
            </List>
        </div>
    );
};

export default App;
