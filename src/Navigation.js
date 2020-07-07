import React from 'react';
import Tab from './Tab';
import { DONE, IN_PROGRESS, TO_READ } from './utils/statuses';

const Navigation = ({
    selectedTab,
    getSize,
    onTabClick
}) => (
    <header className='Navigation'>
        <Tab 
            name='To read'
            count={getSize(TO_READ)}
            isChecked={selectedTab === TO_READ}
            onClick={() => onTabClick(TO_READ)}
        />
        <Tab 
            name='In progress'
            count={getSize(IN_PROGRESS)}
            isChecked={selectedTab === IN_PROGRESS}
            onClick={() => onTabClick(IN_PROGRESS)}
        />
        <Tab 
            name='Done'
            count={getSize(DONE)}
            isChecked={selectedTab === DONE}
            onClick={() => onTabClick(DONE)}
        />
    </header>
);

export default Navigation;