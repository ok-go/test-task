import React from 'react';
import TagList from './TagList';

function Filters({ filters, clear, onTagClick }) {
    return (
        <div className='Filters'>
            <span>Filtered by tags: </span>
            <TagList tags={filters} onTagClick={onTagClick}/>
            <span>(<span className='clear-btn' onClick={clear}>clear</span>)</span>
        </div>
    );
}

export default Filters;