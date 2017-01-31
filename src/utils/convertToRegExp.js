const metas = '^$()<[]{}\|>.*+&';

export default function convertToRegExp(pattern, symbol) {
  const chars = pattern.split('');
  const acc = chars.reduce(function(acc, char, i){

    if (metas.indexOf(char) > 0) {
      let addition = acc.counter > 0 ? '(' + `[\\d]` + `{${acc.counter}}` + ')' : ''; 

      return {
        regExp: acc.regExp + addition + '\\' + char,
        counter: 0
      }
    }

    if (char == symbol) {
      return {
        regExp: (i < chars.length - 1) ? acc.regExp : acc.regExp + '(' + `[\\d]` + `{${acc.counter + 1}}` + ')',
        counter: acc.counter + 1
      }
    }

    let addition = acc.counter > 0 ? '(' + `[\\d]` + `{${acc.counter}}` + ')' : ''; 

    return {
      regExp: acc.regExp + addition + char,
      counter: 0
    }
  }, {
    regExp: '',
    counter: 0
  });

  return new RegExp(acc.regExp);
}