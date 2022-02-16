module.exports = function check(str, bracketsConfig) {
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
  
  const openBrakes = [brakets.parenthesisOpen, brakets.squareBracketOpen, brakets.curlyBracketOpen, brakets.stickOpen, '1', '3', '5', '7', '8' ];
  
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
    const isSevenOpen = result.filter(t => t === '7').length === 1;
    const isEightOpen = result.filter(t => t === '8').length === 1;
    

    if(!result.length || (openBrakes.includes(str) && !(str === '|' && isStickOpen))) {
      
      if(str === '8' && result.includes('8')) {
        removeArrayItemByValue(result, '8');
        return
      }

      if(str === '7' && result.includes('7')){
        removeArrayItemByValue(result, '7');
        return
      }

      result.push(str);
      return
    }

    if((!openBrakes.includes(str) || (str === '|' && isStickOpen) || (str === '7' && isSevenOpen) || (str === '8' && isEightOpen)) && !pattern.includes(result[result.length - 1])) {
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
    
    if(str === '2' && result.includes('1')) {
      removeArrayItemByValue(result, '1');
      return
    }

    if(str === '4' && result.includes('3')) {
      removeArrayItemByValue(result, '3');
      return
    }

    if(str === '6' && result.includes('5')) {
      removeArrayItemByValue(result, '5');
      return
    }

  })

  return Boolean(!result.length);
}
