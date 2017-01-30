import React from 'react';
import * as itemType from './itemTypes';
import { InputGroup, Delimeter, Image } from '../components/items';
import renderInput from './renderInput';


/**
 * renders react components based on model
 * @param  {object} model
 * @return {array of react-elements}
 */
export default function renderModel(model) {
	let questionsCounter = 0;

	return model.map( (item, i) => {
		const type = item.get('_type');

		switch (type.toLowerCase()) {
			case itemType.QUESTION :
				const index = questionsCounter++;
				const qType = item.get('type');

				return <InputGroup key={i} index={index} model={item}>
									{renderInput(item, index)}
							 </InputGroup>;

			case itemType.DELIMETER :
				return <Delimeter key={i} model={item}/>

			case itemType.IMAGE :
				return <Image key={i} model={item}/>

			default:
				console.error(`Unknown scheme item type: ${type}.`);
		}
	});
}