import React from 'react';
import * as inputType from './inputTypes';
import {
	InputString,
	InputInteger,
	InputFloat,
	InputFinancial,
	InputSelect,
	InputDatetime,
	InputOptions,
	InputImage
} from '../components/inputs';

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
			return <InputInteger model={model}></InputInteger>;
		case inputType.FLOAT :
			return <InputFloat model={model}></InputFloat>;
		case inputType.FINANCIAL :
			return <InputFinancial model={model}></InputFinancial>;

		case inputType.SELECT :
			return <InputSelect model={model}></InputSelect>;

		case inputType.DATETIME:
			return <InputDatetime model={model}></InputDatetime>;
		case inputType.TIME:
			return <InputDatetime model={model} mode={'time'}></InputDatetime>;
		case inputType.DATE:
			return <InputDatetime model={model} mode={'date'}></InputDatetime>;

		case inputType.OPTIONS:
			return <InputOptions model={model}></InputOptions>
		case inputType.IMAGE:
			return <InputImage model={model}></InputImage>

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