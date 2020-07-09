import React from 'react';
import Tab from './Tab';
import { DONE, IN_PROGRESS, TO_READ } from './utils/statuses';

const Navigation = ({
    selectedTab,
    onTabClick
}) => (
    <header className='Navigation'>
        <Tab 
            tab={TO_READ}
            selected={selectedTab}
            onClick={onTabClick}
        />
        <Tab 
            tab={IN_PROGRESS}
            selected={selectedTab}
            onClick={onTabClick}
        />
        <Tab 
            tab={DONE}
            selected={selectedTab}
            onClick={onTabClick}
        />
    </header>
);

export default Navigation;