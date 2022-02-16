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
  
  const openBrakes = [brakets.parenthesisOpen, brakets.squareBracketOpen, brakets.curlyBracketOpen, '1', '3', '5', '7', '8' ];
  
  const removeArrayItemByValue = (array, val) => {
    var indices = [];
    var idx = array.indexOf(val);

    while (idx != -1) {
      indices.push(idx);
      idx = array.indexOf(val, idx + 1);
    }
    array.splice(indices[indices.length - 1], 1);
  }


  if(!str || !bracketsConfig || !bracketsConfig.length) return false;
  const result = [];
  const strArray = str.split("");

  strArray.some((str) => {
    const pattern = bracketsConfig.find(config => str === config[0] || str === config[1]); // ['[', ']'']']
    
    if(!pattern.includes(str)) return true; // abort itterator

    const isStickOpen = result.filter(t => t === '|').length % 2;
    const isSevenOpen = result.filter(t => t === '7').length % 2;
    const isEightOpen = result.filter(t => t === '8').length % 2;
    

    if(result[result.length - 1] && !openBrakes.includes(str) && !pattern.includes(result[result.length - 1]) && !((isStickOpen || str === '|') || isSevenOpen || isEightOpen)) {
      result.push(str);
      
      return true; // abort itterator
    }


    if(!result.length || openBrakes.includes(str) || (str === '|' && !isStickOpen)) {
      
      if(str === '8' && result.includes('8')) {
      if(result[result.length - 1] !== '8') return result.push(str);
        removeArrayItemByValue(result, '8');
        return
      }

      if(str === '7' && result.includes('7')){
        if(result[result.length - 1] !== '7') return result.push(str);
        removeArrayItemByValue(result, '7');
        return
      }

      result.push(str);
      return
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
      removeArrayItemByValue(result, '{')
      // removeArrayItemByValue(result, '{');
      return
    }
    
    if(str === '|' && result.includes('|')) {
      if(result[result.length - 1] !== '|') {
        result.push(str);
        return
      }
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

module.exports = check;