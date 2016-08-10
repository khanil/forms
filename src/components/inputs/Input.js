import React, { Component, PropTypes } from 'react';
import { notEmpty, composeValidators } from '../../utils/validations';
import equal from 'deep-equal';

export default class Input extends Component {

	constructor(props, validateFn) {
		super(props);

		this.validateFn = validateFn;
		this.changeHandler = this.changeHandler.bind(this);
		this.checkValidity = this.checkValidity.bind(this);
		this.applyChanges = this.applyChanges.bind(this);
	}

	// componentWillReceiveProps(nextProps) {
	// 	console.log('Input');
	// 	const isEqual = equal(this.props.model, nextProps.model);
	// 	console.log('Old props: ');
	// 	console.log(this.props.model);
	// 	console.log('New props: ');
	// 	console.log(nextProps.model);
	// 	if (!isEqual) {
	// 		this.checkValidity(nextProps.model.value.trim());
	// 	}
	// }

	changeHandler() {
		//check if argument is event object
		const value = ( typeof(arguments[0]) === 'object' )
			? arguments[0].target.value
			: arguments[0];

		if (this.props.model.validate == 'true' && this.validateFn) {
			this.checkValidity(value.trim());
			this.applyChanges(value);
		} else {
			this.applyChanges(value);
		}
	}

	/**
	 * supply new input field value to model
	 * @param  {string} value
	 */
	applyChanges(value) {
		this.props.model.value = value;
	}

	/**
	 * checks the validity of input field value
	 * @param  {[type]} value [description]
	 */
	checkValidity(value) {
		let validate = this.validateFn(value);

		if (this.props.model.required === 'true') {
			validate = composeValidators(notEmpty, this.validateFn)(value);
		}

		if (validate === true) {
			this.props.model._valid = true;
			delete this.props.model._error;
		}
		else
		{
			this.props.model._valid = false;
			this.props.model._error = validate.message;
		}
	}

	// changeHandlerWithValidation(value) {
	// 	const isValid = this.validateFn(value);

	// 	// console.log(`validateFn: ${isValid}`);
	// 	// console.log(this.props.model);

	// 	this.props.model._valid = isValid;
	// 	// console.log(this.props.model);
	// 	this.applyChanges(value);
	// }

	render() {
		const {
			model
		} =  this.props;

		return (
			<input type="text" className="form-control" value={model.value} onChange={this.changeHandler}/>
		);
	}
}

Input.propTypes = {
	model: PropTypes.object.isRequired,
	validateFn: PropTypes.func
}

if (!String.prototype.trim) {
	(function() {
		// Вырезаем BOM и неразрывный пробел
		String.prototype.trim = function() {
			return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		};
	})();
}
