import React from 'react';

function TabLabel({ name, count, isChecked }) {
    const label = `${name} (${count})`;
    const bold = isChecked ? 'bold' : '';
    const className = `TabLabel ${bold}`
    return (<span className={className}>{label}</span>);
}

function Tab(props) {
    const className = `Tab ${props.isChecked ? 'selected' : ''}`;
    return (
        <div className={className} onClick={props.onClick}>
          <TabLabel name={props.name} count={props.count} isChecked={props.isChecked}/>
        </div>
    );
}

export default Tab;