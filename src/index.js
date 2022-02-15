const check = (str, bracketsConfig) => {
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


  if(!str || !bracketsConfig || !bracketsConfig.length) return false;
  const result = [];
  const strArray = str.split("");

  strArray.some((str) => {
    const pattern = bracketsConfig.find(config => str === config[0] || str === config[1]); // ['[', ']'']']
    
    if(!pattern.includes(str)) return true; // abort itterator

    const isStickOpen = result.filter(t => t === '|').length === 1;
    

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
