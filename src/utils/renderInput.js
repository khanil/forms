import React from 'react';
import * as inputType from './inputTypes';
import InputString from '../components/inputs/InputString';
import InputNumber from '../components/inputs/InputNumber';
import InputSelect from '../components/inputs/InputSelect';
import InputDatetime from '../components/inputs/InputDatetime';
import InputOption from '../components/inputs/InputOption';

/**
 * returns react input field component of certain type
 * @param  {string} type
 * @param  {object} model [model that assigned to input field]
 * @return {react component}
 */
function getInputByType(type, model, index) {
	switch (type.toLowerCase()) {
		case inputType.STRING :
		case inputType.PARAGRAPH :
			return <InputString model={model}></InputString>;

		case inputType.INTEGER :
		case inputType.FLOAT :
		case inputType.FINANCIAL :
			return <InputNumber model={model}></InputNumber>;

		case inputType.SELECT :
			return <InputSelect model={model}></InputSelect>;

		case inputType.DATETIME:
			return <InputDatetime model={model}></InputDatetime>;
		case inputType.TIME:
			return <InputDatetime model={model} date={false}></InputDatetime>;
		case inputType.DATE:
			return <InputDatetime model={model} time={false}></InputDatetime>;

		default:
			console.error(`Unknown question type: ${type}`);
	}
}

/**
 * renders react input components based on question type stored in model
 * @param  {[type]} model [description]
 * @return {[type]}       [description]
 */
export default function renderInput(model, index) {
	const type = model.type;
	return getInputByType(type, model, index);
}