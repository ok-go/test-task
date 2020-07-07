import React from 'react';

const ListItem = ({children}) => <div className='ListItem'>{children}</div>;
const ListPrefix = ({children}) => <div className='ListItem'>{children}</div>;
const ListPostfix = ({children}) => <div className='ListItem ListPostfix'>{children}</div>;

export default function List(props) {
    const prefix = props.prefix && <ListPrefix>{props.prefix}</ListPrefix>;
    const items = React.Children.map(props.children, child => {
        if (child === null || child === ' ') {
            return;
        }
        return <ListItem>{child}</ListItem>;
    });

    let postfix = props.postfix && <ListPostfix>{props.postfix}</ListPostfix>;
    if (items.length === 0 && !postfix) {
        postfix = <ListPostfix>List is empty</ListPostfix>;
    }

    return (
        <div className='List'>
            {prefix}
            {items}
            {postfix}
        </div>
    );
}
