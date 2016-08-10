/**
 * Here is defined standart input value validation functions
 */

/**
 * composes validation functions into one single function
 * @return {func}
 */
export function composeValidators() {
	const fns = arguments;

	return function (value) {
		let result;

		for (let i = 0; i < fns.length; i++) {
			result = fns[i](value);

			if ( typeof(result) === 'object' )
				return result;
		}
		return true;
	}
}

/**
 * checks is value empty
 * @param  {any}  value
 * @return {Boolean}
 */
export function notEmpty(value) {
	return (!value || value.length === 0)
		? {
			message: 'Поле не заполнено'
		}
		: true;
}

/**
 * checks if value type of number
 * @param  {any}  value
 * @return {Boolean}
 */
export function isNumber(value) {
	return (/^\d+$/).test(value)
		? true
		: {
			message: 'В данное поле необходимо ввести число'
		};
};

/**
 * checks if value type of integer
 * @param  {any}  value
 * @return {Boolean}
 */
export function isInteger(value) {
	return (/^[0-9]+$/).test(value)
		? true
		: {
			message: 'В данное поле необходимо ввести целое число'
		};
};

/**
 * checks is value type of float (has decimal fraction)
 * @param  {any}  value
 * @return {Boolean}
 */
export function isFloat(value) {
	return (/^[0-9]+[.,][0-9]+$/).test(value)
		? true
		: {
			message: 'В данное поле необходимо ввести десятичную дробь'
		};
}

/**
 * checks is value type of financial (has two decimal places)
 * @param  {any}  value
 * @return {Boolean}
 */
export function isFinancial(value) {
	return (/^[0-9]+[.,][0-9][0-9]$/).test(value)
		? true
		: {
			message: 'Обязательно две точки после запятой'
		};
}