import React from 'react';
import { statusLabel } from './utils/statuses';
import { useSelector } from 'react-redux';
import { selectBooksLength } from './reducers/booksReducer';

const TabLabel = ({ tab, isChecked }) => {
    const count = useSelector(state => selectBooksLength(state, tab));
    const name = statusLabel[tab];
    
    const bold = isChecked ? 'bold' : '';
    const className = `TabLabel ${bold}`;

    return (
        <span className={className}>{name} ({count})</span>
    );
}

const Tab = ({ tab, selected, onClick }) => {
    const isChecked = tab === selected;
    
    const className = `Tab ${isChecked ? 'selected' : ''}`;

    return (
        <div className={className} onClick={() => onClick(tab)}>
          <TabLabel tab={tab} isChecked={isChecked}/>
        </div>
    );
}

export default Tab;