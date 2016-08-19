import { Map, List, fromJS } from 'immutable';
import {
  INIT_FORM, FIELD_VALUE_CHANGED,
  ADD_ITEM, REMOVE_ITEM, SWAP_ITEMS,
  ADD_ITEM_FIELD, REMOVE_ITEM_FIELD,
  ADD_ITEM_LIVE, REMOVE_ITEM_LIVE, SWAP_ITEMS_LIVE,
} from '../actions';
import * as itemDefaults from '../utils/itemDefaults';

const initialState = Map({});

export default function forms (forms = initialState, action) {
  switch (action.type) {
    case INIT_FORM: {
      const {
        formKey,
        initialState
      } = action;

      const state = initialState ? fromJS(initialState) : formKey === 'scheme' ? Map() : List();

      return forms.set(action.formKey, state);
    }

    case FIELD_VALUE_CHANGED: {
      const {
        formKey, fieldKey, localPath, value
      } = action;

      let path = [formKey];
      if (localPath !== null)
        path = path.concat(localPath.split('.'));
      path.push(fieldKey);

      return forms.setIn(path, value);
    }

    case ADD_ITEM_FIELD: {
      const {
        formKey, itemIndex, fieldName, defaultValue
      } = action;

      const path = [formKey, 'items', itemIndex, fieldName];
      const value = defaultValue != undefined ? defaultValue : '';
      return forms.setIn(path, value);
    }

    case REMOVE_ITEM_FIELD: {
      const {
        formKey, itemIndex, fieldName
      } = action;

      const path = [formKey, 'items', itemIndex, fieldName];
      return forms.deleteIn(path);
    }

    case ADD_ITEM_LIVE: {
      const {
        previewKey, pos
      } = action;

      console.log(forms.get(previewKey));

      if (forms.get(previewKey).size !== 0)
        forms = forms.updateIn([previewKey], responses => responses.insert(pos));
      //fall down to ADD_ITEM
    }
    case ADD_ITEM: {
      const {
        formKey, pos, itemType
      } = action;

      const path = [formKey, 'items'];
      const item = new Map( itemDefaults.get(itemType) );

      return forms.updateIn(path, items => items.insert(pos, item));
    }

    case REMOVE_ITEM: {
      const {
        formKey, pos, itemType
      } = action;

      if (pos < 0)
        return forms;

      const path = [formKey, 'items'];
      return forms.updateIn(path, items => items.delete(pos));
    }

    case SWAP_ITEMS: {
      const {
        formKey, fPos, sPos
      } = action;

      const items = forms.getIn([formKey, 'items']);
      if (fPos == sPos || fPos < 0 || fPos > items.size - 1 || sPos < 0 || sPos > items.size - 1)
        return forms;
      const path = [formKey, 'items'];
      return forms.updateIn(path, items => {
        const buffer = items.get(fPos);
        return items.set(fPos, items.get(sPos)).set(sPos, buffer);
      });
    }

    default:
      return forms;
  }
}