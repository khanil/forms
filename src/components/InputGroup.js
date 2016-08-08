import React, { Component, PropTypes } from 'react';
// import renderInput from './InputComponents/renderInput';
import InputNumber from './inputs/InputNumber';

export default class InputGroup extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			model
		} =  this.props;

		const vClass = (model._valid == undefined) ? '' : (model._valid) ? 'has-success' : 'has-error';
		console.log(vClass);

		return (
			<div className={`form-group ${vClass}`}>
				{
					model.title 
					? <label className='control-label'>{model.title}</label>
					: null
				}
				
				{this.props.children}

			</div>
		);
	}
}

InputGroup.propTypes = {
  model: PropTypes.object.isRequired
}