import React from 'react';
import { TO_READ, IN_PROGRESS, DONE } from './utils/statuses';
import TagList from './TagList';

const Author = ({ name='unknown author' }) => (
    <div className='author'>{ name }</div>
);

const Title = ({ title='unknown title' }) => (
    <div className='title'>{ title }</div>
);

const mapStatusToProps = {
    [TO_READ]: {label: 'start reading', icon: '\u2794'},
    [IN_PROGRESS]: {label: 'finish reading', icon: '\u2794'},
    [DONE]: {label: 'return in \u00abto read\u00bb', icon: '\u2936'},
};
const MoveNextButton = ({ onClick, label, icon }) => (
    <div className='next-state-btn'
        onClick={onClick}>
        <span className='label'>{label}</span>
        <span>{icon}</span>
    </div>
);

const Book = ({ info, status, addFilter, moveNext }) => {
    return (
        <div className='Book'>
            <Author name={info.author}/>
            <div className='title-block'>
                <Title title={info.title}/>
                <MoveNextButton {...mapStatusToProps[status]} onClick={() => moveNext(info.id)}/>
            </div>
            {info.description && <div className='description'>{info.description}</div>}
            <TagList tags={info.tags} onTagClick={addFilter}/>
        </div>
    );
}

export default Book;