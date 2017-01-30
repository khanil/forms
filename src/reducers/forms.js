import { Map, List, fromJS } from 'immutable';
import {
  INIT_FORM, FIELD_VALUE_CHANGED,
  ADD_ITEM, REMOVE_ITEM, SWAP_ITEMS,
  ADD_ITEM_FIELD, REMOVE_ITEM_FIELD,
  ADD_ITEM_LIVE, REMOVE_ITEM_LIVE, SWAP_ITEMS_LIVE,
} from '../actions';
import * as itemDefaults from '../utils/itemDefaults';

const initialState = Map({});

function prepareInitialState(initialState) {
  let state = fromJS(initialState);
  //form init
  if ( List.isList(initialState) )
    return state;
  //form generator init
  state = state.update('items', items => {
    const first = items.get(0);
    let i = 0;
    const N = 0;
    while (i < N) {
      i++;
      items = items.push(first);
    }
    return items;
  });

  return state.update('items', items => items.map(item => item.set('_id', Math.random())));
}

export default function forms (forms = initialState, action) {
  switch (action.type) {
    case INIT_FORM: {
      const {
        formKey,
        initialState
      } = action;

      const state = initialState ? prepareInitialState(initialState) : formKey === 'scheme' ? Map() : List();

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
        formKey, previewKey, pos
      } = action;

      if (forms.get(previewKey).size !== 0) {
        //push in end
        if (pos < 0)
          forms = forms.updateIn([previewKey], responses => responses.push(null));
        else
          forms = forms.updateIn([previewKey], responses => responses.insert(pos, null));
      }
      //fall down to ADD_ITEM
    }
    case ADD_ITEM: {
      const {
        formKey, pos, itemType, scheme
      } = action;

      //if scheme provided, new item will have this scheme
      const item = scheme === undefined ? new Map( itemDefaults.get(itemType) ) : scheme.set('_id', Math.random());

      const path = [formKey, 'items'];
      //push in end
      if (pos < 0) {
        return forms.updateIn(path, items => items.push(item));
      }
      return forms.updateIn(path, items => items.insert(pos, item));
    }

    case REMOVE_ITEM_LIVE: {
      const {
        previewKey, pos
      } = action;

      if (forms.get(previewKey).size !== 0)
        forms = forms.updateIn([previewKey], responses => responses.delete(pos));
      //fall down to REMOVE_ITEM
    }
    case REMOVE_ITEM: {
      const {
        formKey, pos
      } = action;

      if (pos < 0)
        return forms;

      const path = [formKey, 'items'];
      return forms.updateIn(path, items => items.delete(pos));
    }

    case SWAP_ITEMS_LIVE: {
      const {
        previewKey, fPos, sPos
      } = action;

      if (forms.get(previewKey).size !== 0)
        forms = forms.update(previewKey, responses => {
          const buffer = responses.get(fPos);
          return responses.set(fPos, responses.get(sPos)).set(sPos, buffer);
        });
      //fall down to SWAP_ITEMS
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