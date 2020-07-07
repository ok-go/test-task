import React from 'react';

const Tag = ({ name, onClick }) => (
    <div className='Tag' onClick={onClick}>#{name}</div>
);

const TagList = ({tags, onTagClick }) => (
    <div className='tags'>
        {tags.map(tag => 
            <Tag 
                key={tag} 
                name={tag} 
                onClick={() => onTagClick(tag)}/>)}
    </div>
)

export default TagList;