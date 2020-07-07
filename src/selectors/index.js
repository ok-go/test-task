export const selectItems = (state, status, tags) => {
    const res = [];
    for (let id of state[status]){
        const item = state.items[id].book;
        if (tags.size > 0) {
            let hasTag = true;
            for (let filter of tags) {
                if (!item.tags.includes(filter)) {
                    hasTag = false;
                    break;
                }
            }
            hasTag && res.push(state.items[id].book);
        } else {
            res.push(state.items[id].book);
        }
    }

    return res;
}
