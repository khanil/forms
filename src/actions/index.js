import makeActionCreator from '../utils/makeActionCreator';

export const INIT_FORM = 'INIT_FORM';
export const FIELD_VALUE_CHANGED = 'FIELD_VALUE_CHANGED';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SWAP_ITEMS = 'SWAP_ITEMS';
export const ADD_ITEM_FIELD = 'ADD_ITEM_FIELD';
export const REMOVE_ITEM_FIELD = 'REMOVE_ITEM_FIELD';

export const initForm = makeActionCreator(INIT_FORM, 'formKey', 'initialState');
export const handleUserInput = makeActionCreator(FIELD_VALUE_CHANGED, 'formKey', 'fieldKey', 'localPath', 'value');
export const addItem = makeActionCreator(ADD_ITEM, 'formKey', 'pos', 'itemType');
export const removeItem = makeActionCreator(REMOVE_ITEM, 'formKey', 'pos', 'itemType');
export const swapItems = makeActionCreator(SWAP_ITEMS, 'formKey', 'fPos', 'sPos');
export const addItemField = makeActionCreator(ADD_ITEM_FIELD, 'formKey', 'itemIndex', 'fieldName');
export const removeItemField = makeActionCreator(REMOVE_ITEM_FIELD, 'formKey', 'itemIndex', 'fieldName');