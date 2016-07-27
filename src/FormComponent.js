import React, { Component, PropTypes } from 'react';
import renderModel from './renderModel';

/**
 * Presentational component that renders input fields based on provided scheme
 * @param {object} scheme
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 */
export default class FormComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			model: []
		};

		//model is the improved scheme that has properties to control the input fields
		this.state.model = this.buildModel(this.props.scheme);
	}

	/**
	 * builds model from scheme
	 * @param  {object}  scheme
	 * @return {object}
	 */
	buildModel(scheme) {
		//copying scheme to solo object
		const model = scheme.items.map( (item, i) => (Object.assign({}, item)));

		//define responses object location relative to root store object
		const localPath = (this.props.path !== undefined) ? this.props.path : null;

		let nextAvailableResponsesKey = 0;
		for (let key in model) {
			let item = model[key];

			if (item._type === 'question') {
				//questions must contain special properties that handle input fields behavior
				const inputContainer = item;

				//set pointer to element in responses object, where the value of input field will be stored
				inputContainer._responseKey = (inputContainer.name) ? inputContainer.name : nextAvailableResponsesKey;
				nextAvailableResponsesKey++;

				//dynamic changing value of field
				Object.defineProperty(inputContainer, "value", { 
					get: () => ( this.props.getFieldValue(localPath, inputContainer._responseKey) ),
					set: (value) => { this.props.setFieldValue(localPath, inputContainer._responseKey, value) }
				});

				//is value belongs to input type and passes validation rule
				inputContainer._valid = true;
			}
		}

		console.log('Builded model: ');
		console.log(model);
		return model;
	}

	render() {

		const model = this.state.model;
		const formTitle = this.props.scheme.title;

		return (
			<form action="" method="POST" role="form">
				<legend>{formTitle}</legend>

				{renderModel(model)}

			</form>
		)
	}
}

FormComponent.propTypes = {
  scheme: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  getFieldValue: PropTypes.func
}