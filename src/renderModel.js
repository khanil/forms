import React from 'react';
import * as itemType from './itemTypes';
import InputGroup from './InputGroup';
import Delimeter from './Delimeter';
import renderInput from './InputComponents/renderInput';

/**
 * renders react components based on model
 * @param  {object} model 
 * @return {array of react-elements}
 */
export default function renderModel(model) {
	return model.map( (item, i) => {
		const type = item._type;

		switch (type.toLowerCase()) {
			case itemType.QUESTION :
				return <InputGroup key={i} model={item}>
									{renderInput(item)}
							 </InputGroup>;

			case itemType.DELIMETER :
				return <Delimeter key={i} model={item}/>

			default:
				console.error(`Unknown scheme item type: ${type}.`);
		}
	});
}