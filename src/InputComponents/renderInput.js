import React from 'react';
import * as inputType from './inputTypes';
import InputString from './InputString';

/**
 * returns react input field component of certain type
 * @param  {string} type
 * @param  {object} model [model that assigned to input field]
 * @return {react component}
 */
function getInputByType(type, model) {
	switch (type.toLowerCase()) {
		case inputType.STRING :
		case inputType.INTEGER :
			return <InputString model={model}></InputString>;

		default:
			console.error(`Unknown question type: ${type}.`);
	}
}

/**
 * renders react input components based on question type stored in model
 * @param  {[type]} model [description]
 * @return {[type]}       [description]
 */
export default function renderInput(model) {
	const type = model.type;
	return getInputByType(type, model);
}