import React, { Component, PropTypes } from 'react';
import { renderModel, itemTypes, inputTypes } from '../utils';
import { List, fromJS } from 'immutable';
import * as typeValidations from '../utils/validations';
import { bindFunctions } from '../utils';
import FormHeader from './FormHeader';
import CComponent from './CComponent';

/**
 * Presentational component that renders input fields based on provided scheme
 * @param {object} scheme
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 * @param {string} path util passed in setFieldValue and getFieldValue func
 */
export default class FormComponent extends CComponent {

    constructor(props) {
        super(props);

        this.state = {
            model: List([])
        }

        bindFunctions.call(this, ['checkFormValidity']);
    }

    componentWillMount() {
        //model is the improved scheme that has properties to control the input fields
        const model = this.buildModel(this.props.scheme);
        this.setState({
            model: model
        });
        // console.log(`FormComponent #${this.props.id}. Just created.`);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.scheme.get('items') === nextProps.scheme.get('items')) {

            if (this.props.path !== nextProps.path) {
                // console.log(`FormComponent #${this.props.id}. Supplied path changed.`);
            }

            // console.log(`FormComponent #${this.props.id}. Nothing changed.`);
            return;
        }

        const items = this.props.scheme.get('items');
        const nextItems = nextProps.scheme.get('items');
        const equal = nextItems.equals(items);
        const updated = !equal;

        if (updated) {
            // console.log(`FormComponent #${this.props.id}. Scheme items changed, rebuild model...`);
            const newModel = this.updateModel(items, nextItems, this.state.model);
            // console.log('New model:');
            // console.log(newModel.toJS());

            this.setState({
                model: newModel
            });
        }
    }

    /**
     * builds model based on provided scheme
     * @param  {object} scheme
     * @return {object}
     */
    buildModel(scheme) {
        //next available index of responses array (or object)
        let availableRKey = 0;

        return scheme.get('items').map((item, i) => {
            if (item.get('_type') === itemTypes.QUESTION) {
                const needRKey = (item.get('name') === undefined);

                return this.buildQModel(item, i, needRKey ? availableRKey++ : null);
            }

            return item;
        });
    }

    /**
     * builds model for question item based on item scheme
     * @param  {object} scheme question scheme
     * @return {object}
     */
    buildQModel(qScheme, index, respKey) {
        const localPath = (this.props.path !== undefined) ? this.props.path : null;

        const scheme = qScheme.toObject();
        const _responseKey = scheme.name ? scheme.name : respKey;
        const value = this.props.getFieldValue(localPath, _responseKey);
        const {valid, error} = checkValidity(value);
        const pristine = true;
        const disabled = this.props.disabled;

        function changeHandler() {
            //check if argument is event object
            const value = ( arguments[0].target !== undefined )
                ? arguments[0].target.value
                : arguments[0];

            //responses store local path may change in time, so we need always referense its value from props
            const localPath = (this.props.path !== undefined) ? this.props.path : null;

            this.props.setFieldValue(localPath, _responseKey, value);

            const valid = checkValidity(value);

            this.setState(({model}) => ({
                model: model.mergeIn([index], {
                    value,
                    pristine: false,
                    ...valid
                })
            }));
        }

        function checkValidity(value) {
            // console.log(`is value list? -${List.isList(value)}`);
            // console.log(value);

            const type = scheme.type;
            let validations = [];

            if (type === inputTypes.OPTIONS) {
                validations.push(typeValidations.noEmptyOptions);
            } else {
                const typeValidateFn = typeValidations['is' + type[0].toUpperCase() + type.slice(1)];

                if (typeValidateFn)
                    validations.push(typeValidateFn);
            }

            if (scheme.required !== 'true') {
                if (typeValidations.notEmpty(value).valid === false) {
                    return {
                        valid: true,
                        error: ''
                    }
                } else {
                    const valid = typeValidations.composeValidators(...validations)(value);
                    if (!valid.error)
                        valid.error = '';
                    return valid;
                }
            } else {
                validations = [typeValidations.notEmpty].concat(validations);

                const valid = typeValidations.composeValidators(...validations)(value);
                if (!valid.error)
                    valid.error = '';
                return valid;
            }
        }

        const model = Object.assign({
            _responseKey,
            value,
            valid,
            error,
            pristine,
            disabled,
            changeHandler: changeHandler.bind(this)
        }, scheme);

        return fromJS(model);
    }

    checkFormValidity() {
        //check validity of all items with type = question
        const isFormValid = this.state.model.every((item) => (item.get('valid') || item.get('_type') != itemTypes.QUESTION));

        //make all fields touched
        const newModel = this.state.model.map((item) => (item.set('pristine', false)));
        this.setState({
            model: newModel
        });

        return isFormValid;
    }

    updateModel(oldScheme, newScheme, model) {
        const localPath = (this.props.path !== undefined) ? this.props.path : null;
        //next available index of responses array (or object)
        let availableRKey = 0;

        return newScheme.map((item, i) => {
            if (item.get('_type') === itemTypes.QUESTION) {
                const needRKey = (item.get('name') === undefined);
                //check if this item was added in previous model state
                //and attach to new model all old behaviour properties
                let pos;
                const wasAdded = oldScheme.some((oldItem, i) => {
                    if (oldItem === item || oldItem.get('_id') === item.get('_id')) {
                        pos = i;
                        return true;
                    }
                });

                const newQModel = this.buildQModel(item, i, needRKey ? availableRKey++ : null);

                // console.log(`items was added? -${wasAdded}`);

                if (wasAdded)
                    return newQModel.set('pristine', model.getIn([pos, 'pristine']));

                return newQModel;
            }

            return item;
        });
    }

    render() {
        const model = this.state.model;
        const title = this.props.scheme.get('title');
        const description = this.props.scheme.get('description');
        const formHeader = title ? <FormHeader title={title} description={description} /> : null;

        return (
            <div className='super-form'>
                {formHeader}

                {renderModel(model)}
            </div>
        )
    }
}

FormComponent.propTypes = {
    scheme: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    path: PropTypes.string
}