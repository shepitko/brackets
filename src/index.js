const brakets = {
  parenthesisOpen: '(',
  parenthesisClose: ')',
  squareBracketOpen: '[',
  squareBracketClose: ']',
  curlyBracketOpen: '{',
  curlyBracketClose: '}',
  stickOpen: '|',
  stickClose: '|'
}

const openBrakes = [brakets.parenthesisOpen, brakets.squareBracketOpen, brakets.curlyBracketOpen, brakets.stickOpen ];

const removeArrayItemByValue = (array, val) => {
  const index = array.indexOf(val);
  if (index > -1) {
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
}

const check = (str, bracketsConfig) => {
  if(!str || !bracketsConfig || !bracketsConfig.length) return false;
  const result = [];
  const strArray = str.split("");

  strArray.some((str) => {
    const isStickOpen = result.filter(t => t === '|').length === 1;
    const pattern = bracketsConfig.find(config => str === config[0] || str === config[1]); // ['[', ']'']']

    if(!result.length || (openBrakes.includes(str) && !(str === '|' && isStickOpen))) {
      result.push(str);
      return
    }

    if((!openBrakes.includes(str) || (str === '|' && isStickOpen)) && !pattern.includes(result[result.length - 1])) {
      result.push(str);
      return true // abort itterator
    }

    if(str === ')' && result.includes('(')) {
      removeArrayItemByValue(result, '(');
      return
    }

    if(str === ']' && result.includes('[')) {
      removeArrayItemByValue(result, '[');
      return
    }

    if(str === '}' && result.includes('{')) {
      removeArrayItemByValue(result, '{');
      return
    }
    
    if(str === '|' && result.includes('|')) {
      removeArrayItemByValue(result, '|');
      return
    }
  })

  return Boolean(!result.length);
}

const expect = (result, expectedResult) => {
  console.log(result === expectedResult ? 'success' : 'fail');
}


expect(check('()', [['(', ')']]), true);
expect(check('((()))()', [['(', ')']]), true);
expect(check('())(', [['(', ')']]), false);
expect(check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]), true); 
expect(check('[(])', [['(', ')'], ['[', ']']]), false); 
expect(check('()[]', [['(', ')'], ['[', ']']]), true); 
expect(check('[]()(', [['(', ')'], ['[', ']']]), false); 

// special case: opening and closing bracket can be the same :)

expect(check('||', [['|', '|']]), true);
expect(check('|()|', [['(', ')'], ['|', '|']]), true);
expect(check('|(|)', [['(', ')'], ['|', '|']]), false);
expect(check('|()|(||)||', [['(', ')'], ['|', '|']]), true);