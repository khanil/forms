import { combineReducers } from 'redux';
import {
	INIT_FORM, FIELD_VALUE_CHANGED,
	ADD_ITEM, REMOVE_ITEM, SWAP_ITEMS,
	ADD_ITEM_FIELD, REMOVE_ITEM_FIELD
} from '../actions';
import * as nestedObject from '../utils/nestedObject';
import * as itemDefaults from '../utils/itemDefaults';

const scheme = {
	title: 'Моя форма',
	items: [
		{
			_id: '1232',
			_type: 'question',
			title: 'Первый вопрос',
			type: 'datetime',
		},
		{
			_id: '1234',
			_type: 'question',
			title: 'Второй вопрос',
			type: 'integer',
		},
		{
			_id: '1235',
			_type: 'delimeter',
			title: 'Разделитель тут',
		},
		{
			_id: '1236',
			_type: 'question',
			title: 'Третий вопрос',
			type: 'select',
			options: [
				'1',
				'2',
				'3',
				'4'
			]
		},
		{
			_id: '1237',
			_type: 'question',
			title: 'Четвертый вопрос',
			type: 'integer',
		}
	]
}

const initialState = {
	forms: {
		scheme: scheme
	}
}

export default function forms (state = {}, action) {
	switch (action.type) {
		case INIT_FORM: {
			const initialState = action.initialState ? action.initialState : [];

			return Object.assign({}, state, {
				forms: Object.assign({}, state.forms, { [action.formKey]: initialState })
			});
		}

		case FIELD_VALUE_CHANGED: {
			const {
				formKey, fieldKey, localPath, value
			} = action;

			let path = ['forms', formKey];
			if (localPath !== null)
				path = path.concat(localPath.split('.'));

			const newState = nestedObject.setProperty(state, path, fieldKey, value);
			return newState;
		}

		case ADD_ITEM: {
			const {
				formKey, pos, itemType
			} = action;

			const items = state.forms[formKey].items;
			const itemsCopy = items.slice();
			const newItem = Object.assign({}, itemDefaults[itemType.toUpperCase()], { _id: Date.now() });

			itemsCopy.splice(pos, 0, newItem);

			const newState = nestedObject.setProperty(state, ['forms', formKey], 'items', itemsCopy);
			console.log(itemsCopy);
			return newState;
		}

		case REMOVE_ITEM: {
			const {
				formKey, pos, itemType
			} = action;

			const items = state.forms[formKey].items;
			const itemsCopy = items.slice();

			itemsCopy.splice(pos, 1);

			const newState = nestedObject.setProperty(state, ['forms', formKey], 'items', itemsCopy);
			console.log(itemsCopy);
			return newState;
		}

		case SWAP_ITEMS: {
			const {
				formKey, fPos, sPos
			} = action;

			const items = state.forms[formKey].items;
			if (fPos == sPos || fPos < 0 || fPos > items.length - 1 || sPos < 0 || sPos > items.length - 1) return state;
			const itemsCopy = items.slice();

			const helper = itemsCopy[sPos];
			itemsCopy[sPos] = itemsCopy[fPos];
			itemsCopy[fPos] = helper;

			const newState = nestedObject.setProperty(state, ['forms', formKey], 'items', itemsCopy);
			console.log(itemsCopy);
			return newState;
		}

		case ADD_ITEM_FIELD: {
			const {
				formKey,
				itemIndex,
				fieldName
			} = action;

			const newState = nestedObject.setProperty(state, ['forms', formKey, 'items', itemIndex], fieldName, '');
			return newState;
		}

		case REMOVE_ITEM_FIELD: {
			const {
				formKey,
				itemIndex,
				fieldName
			} = action;

			const newState = nestedObject.removeProperty(state, ['forms', formKey, 'items', itemIndex], fieldName);
			return newState;
		}

		default:
			return state;
	}
}