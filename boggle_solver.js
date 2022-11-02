exports.findAllSolutions = function(grid, dictionary) {
  const solutions = new Set();

  // check for empty input
  if (grid==null || dictionary==null) {
    return [];// if input is empty return empty list
  }
  // check if grid is NxN
  for (let i=0; i<grid.length; i++) {
    if (grid[i].length!=grid.length) {
      return [];
    }
  }
  // convert everything to lowercase and check if no invalid ch in grid.
  for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid.length; j++) {
      const valid = ['a', 'b', 'c', 'd', 'e',
        'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'r', 'v', 'w', 'x', 'y', 'z', 'q',
        'st', 'u', 't'];
      if (!valid.includes(grid[i][j].toLowerCase())) {
        return [];
      }
    }
  }
  for (let i=0; i<dictionary.length; i++) {
    const word=dictionary[i];
    dictionary[i]=word.toLowerCase();
  }
  // start hash map
  const dict={};
  for (let i=0; i<dictionary.length; i++) {
    dict[dictionary[i]]=1;
    for (let index=1; index<dictionary[i].length; index++) {
      if (dictionary[i].substr(0, index)in dict) {
        if (dict[dictionary[i].substr(0, index)]==1) {
          dict[dictionary[i].substr(0, index)]=1;
        }
      } else {
        dict[dictionary[i].substr(0, index)]=0;
      }
    }
  }
  // building the words
  for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid.length; j++) {
      const possibleWord='';
      const used={};
      finder(possibleWord, i, j, grid, used, dict, solutions);
    }
  }
  const result = [];
  solutions.forEach(function(el, ind) {
    result.push(el);
  });

  return Array.from(result.sort());
};
finder= function(possibleWord, y, x, grid, used, dict, solutions) {
  const matrix = [[-1, -1], [-1, 0], [-1, 1],
    [0, 1], [0, -1], [1, -1], [1, 0], [1, 1]];
  // base case: y or x out of bounds or ch was already visited.
  if (y<0||x<0||y>=grid.length||x>=grid.length||used[[y, x]]==1) {
    return;
  }
  // add ch to possibleWord
  possibleWord+=grid[y][x].toLowerCase();
  // check if word is prefix.
  if (dict[possibleWord]!=undefined) {
    used[[y, x]]=1;
    // check if word is in dict.
    if (dict[possibleWord]==1) {
      if (possibleWord.length>=3) {
        solutions.add(possibleWord);
      }
    }
    // look for next let recursively
    for (let i=0; i<8; i++) {
      finder(possibleWord, y+matrix[i][0],
          x+matrix[i][1], grid, used, dict, solutions);
    }

    // else unmark visited
    used[[y, x]]=0;
  }
};

const grid = [['T', 'W', 'Y', 'R'],
  ['E', 'N', 'P', 'H'],
  ['G', 'Z', 'Qu', 'R'],
  ['St', 'N', 'T', 'A']];
const dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
  'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
  'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log(exports.findAllSolutions(grid, dictionary));

