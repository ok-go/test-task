
export const itemsSet = items => ({ type: 'SET_ITEMS', payload: items });
export const itemsMove = id => ({ type: 'MOVE_NEXT', payload: id });
export const tagsSet = tags => ({ type: 'SET_TAGS', payload: tags });
export const tagsClean = () => ({ type: 'CLEAN_TAGS' });
export const tagsRemove = tag => ({ type: 'REMOVE_TAG', payload: tag});
export const tagsAdd = tag => ({ type: 'ADD_TAG', payload: tag });
