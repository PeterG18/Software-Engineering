const boggle_solver = require('/home/codio/workspace/Boggle_Testing/boggle_solver.js');

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}

  describe('Normal input', () => {

    test('Normal case 3x3', () => {
      // Tests a normal 3x3 grid.
      const grid = [['A', 'B', 'C'],
                    ['D', 'E', 'F'],
                    ['G', 'H', 'I']];
      const dictionary = ['abc', 'abdhi', 'abi'];
      const expected = ['abc', 'abdhi'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });



    test('No solutions', () => {
      // Tests a grid and dictionary with no possible solutions.
      const grid = [['A', 'B', 'C'],
                    ['D', 'E', 'F'],
                    ['G', 'H', 'I']];
      const dictionary = ['alphabet', 'aeroplane', 'dijkstra'];
      const expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });


  });

  describe('Problem contraints', () => {
    test('Only returns words with 3+ characters', () => {
      // Tests that the algorithm only returns words with 3+ characters.
      const grid = [['A', 'B', 'C'],
                    ['D', 'E', 'F'],
                    ['G', 'H', 'I']];
      const dictionary = ['a', 'b', 'c', 'd', 'abc', 'ab', '', 'ghefi'];
      const expected = ['abc', 'ghefi'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Qu tile counts as 2 letters (can\'t skip the \'u\')', () => {
      // Tests that the Qu block tile counts as a single unit.
      const grid = [['Qu', 'E', 'R'],
                    ['A', 'B', 'C'],
                    ['D', 'E', 'F']];
      // The Qu count as one unit, the 'u' cannot be skipped or ignored.
      const dictionary = ['querbe', 'qerbe'];
      const expected = ['querbe'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Word can\'t end in \'q\', but it can begin with q', () => {
      // Tests that no words can end in q, but some can actually start with q.
      const grid = [['I', 'R', 'A', 'Qu'],
                    ['I', 'R', 'A', 'Qu'],
                    ['I', 'R', 'A', 'Qu'],
                    ['I', 'R', 'A', 'Qu']];
      const dictionary = ['iraq', 'iraqu', 'quari', 'quaa'];
      // Since 'iraq' ends with a q, and q's are always accompanied by a u, then
      // 'iraq' or any word ending in 'q', won't appear in a Boggle game.
      const expected = ['iraqu', 'quari', 'quaa'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('The same word can\'t use a block more than once', () => {
      // Tests that a sinbgle word does not recycle any chracters.
      const grid = [['A', 'D', 'E'],
                    ['X', 'X', 'X'],
                    ['X', 'X', 'X']];
      const dictionary = ['ade', 'ada', 'adexx', 'xxxxxx', 'xxxxxxx'];
      const expected = ['ade', 'adexx', 'xxxxxx'];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  describe('Input edge cases', () => {
    test('Grid is 1x1', () => {
      // (Edge case) Since only 1 character words are possible, and these are
      // shorter than 3, then there are no possible solutions.
      const grid = [['A']];
      const dictionary = ['a', 'b', 'c'];
      const expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Grid is 0x0', () => {
      // (Edge case) Tests that the algorithm can correctly return an empty list
      // when given an empty grid.
      const grid = [[]];
      const dictionary = ['hello', 'there', 'general', 'kenobi'];
      const expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Dictionary is empty', () => {
      // (Edge case) Since there are no possible solutiona, it should return an
      // empty list.
      const grid = [['A', 'B', 'C', 'D'],
                    ['E', 'F', 'G', 'H'],
                    ['I', 'J', 'K', 'L'],
                    ['M', 'N', 'O', 'P']];
      const dictionary = [];
      const expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });


describe('Boggle Solver tests suite:', () => {
  describe('Normal input', () => {
    
  });

  
  describe('Problem contraints', () => {
    // Cases such as Qu
 
  });

  
  describe('Input edge cases', () => {

    // Example Test using Jess
    test('Dictionary is empty', () => {
      // (Edge case) Since there are no possible solutiona, it should return an
      // empty list.
      let grid = [['A', 'B', 'C', 'D'],
                    ['E', 'F', 'G', 'H'],
                    ['I', 'J', 'K', 'L'],
                    ['M', 'N', 'O', 'P']];
      let dictionary = [];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
});
