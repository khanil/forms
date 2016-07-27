import React, { Component, PropTypes } from 'react';
//import renderInput from './InputComponents/renderInput';

export default class InputGroup extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			model
		} =  this.props;

		const vClass = model._valid ? 'has-success' : 'has-error';

		return (
			<div className={`form-group ${vClass}`}>
				<label className='control-label'>{model.title}</label>
				
				{this.props.children}

			</div>
		);
	}
}

InputGroup.propTypes = {
  model: PropTypes.object.isRequired
}