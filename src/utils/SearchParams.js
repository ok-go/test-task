import { TO_READ, IN_PROGRESS, DONE } from "./statuses";

function swapKeyValue(obj) {
    const n = {};
    Object.entries(obj).forEach(([key, val]) => n[val] = key);
    
    return n;
}

const PARAM_TAB = 'tab';
const PARAM_TAGS = 'tags';

const TAB_VALUE_TOREAD = 'toread';
const TAB_VALUE_INPROGRESS = 'inprogress';
const TAB_VALUE_DONE = 'done';

const tabToStatus = {
    [TAB_VALUE_TOREAD]: TO_READ,
    [TAB_VALUE_INPROGRESS]: IN_PROGRESS,
    [TAB_VALUE_DONE]: DONE,
};
const statusToTab = swapKeyValue(tabToStatus);

class SearchParams {
    constructor(url) {
        this.params = new URLSearchParams(url);
    }

    set = (key, value) => {
        switch (key) {
            case PARAM_TAB: 
                this.setTab(value);
                break;
            case PARAM_TAGS:
                this.setTags(value);
                break;
            default:
                this.params.set(key, value);

        }
        return this;
    }
    get = (key) => {
        switch (key) {
            case PARAM_TAB: return this.getTab();
            case PARAM_TAGS: return this.getTags();
            default: return this.params.get(key);
        }
    };

    getTab = () => {
        return tabToStatus[this.params.get(PARAM_TAB)] ?? null;
    }

    setTab = (status) => {
        const tab = statusToTab[status];
        if (tab) {
            this.params.set(PARAM_TAB, tab);
        }

        return this;
    }

    getTags = () => {
        const tags = this.params.get(PARAM_TAGS);

        return tags ? new Set(tags.split(',')) : null;
    }

    setTags = (tags) => {
        const tags_str = [...tags].join(',');
        if (tags_str !== '') {
            this.params.set(PARAM_TAGS, tags_str);
        } else {
            this.params.delete(PARAM_TAGS);
        }

        return this;
    }

    deleteTags = () => {
        this.params.delete(PARAM_TAGS);

        return this;
    }

    toString = () => {
        return '?' + this.params.toString();
    }
}

export default SearchParams;