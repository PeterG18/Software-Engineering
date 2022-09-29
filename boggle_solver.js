/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 exports.findAllSolutions = function(grid, dictionary) {
  let solutions = new Set();

  //check for empty input
  if (grid==null || dictionary==null){
    return [];
  }
  //check if grid is NxN
  for (let i=0; i<grid.length; i++){
    if (grid[i].length!=grid.length){
      return [];
    }
  }
  // convert everything to lowercase and check if no invalid ch in grid.
  for (let i=0; i<grid.length; i++){
    for (let j=0; j<grid.length;j++){
      
      let valid = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","v","w","x","y","z","qu","st","u","t"];
      if (!valid.includes(grid[i][j].toLowerCase())){
        return [];
      }

    }
  }
  for (let i=0; i<dictionary.length; i++){
    let w=dictionary[i];
    dictionary[i]=w.toLowerCase();
  } 
 // start hash map
 var dict={};
 for (let i=0;i<dictionary.length;i++){
   dict[dictionary[i]]=1;
   for (let index=1;index<dictionary[i].length;index++){
     if (dictionary[i].substr(0,index)in dict){
       if (dict[dictionary[i].substr(0,index)]==1){
         dict[dictionary[i].substr(0,index)]=1;
       }
     }
      else{
        dict[dictionary[i].substr(0,index)]=0;
       }
   }
 }
 
 // building the words
 for (let i=0; i<grid.length; i++){
   for (let j=0; j<grid.length; j++){
     let pos_word="";
     let used={};
     finder(pos_word,i,j,grid,used,dict,solutions);
   }
 }
  let result = []
  solutions.forEach(function(el,ind){
    result.push(el)
  });

  return Array.from(result.sort());
}
finder= function(pos_word, y, x, grid, used, dict, solutions){
  let matrix = [[-1,-1],[-1,0],[-1,1],[0,1],[0,-1],[1,-1],[1,0],[1,1]];
  //base case: y or x out of bounds or ch was already visited.
  if(y<0||x<0||y>=grid.length||x>=grid.length||used[[y,x]]==1){
    return;
  }
  // add ch to pos_word
  pos_word+=grid[y][x].toLowerCase();
  // check if word is prefix.
  if (dict[pos_word]!=undefined){
    used[[y,x]]=1;
    //check if word is in dict.
    if (dict[pos_word]==1){
        if (pos_word.length>=3){
            solutions.add(pos_word); 
        }
    }
    // look for next let recursively
    for (let i=0;i<8;i++){
      finder(pos_word,y+matrix[i][0],x+matrix[i][1], grid, used, dict, solutions)
    }
    
  // else unmark visited
  used[[y,x]]=0;
  }
}


var grid = [['T', 'W', 'Y', 'R'],
            ['E', 'N', 'P', 'H'],
            ['G', 'Z', 'Qu', 'R'],
            ['St', 'N', 'T', 'A']];
var dictionary = ['atn','art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat', //art,net,new,newt,pry,qua,quart,quartz,rat,tar,went,wet,quar
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',//'ten','went','wet', 'egg', 'net','new','newt','pry','qua','quar','quart','quartz','tar','art' 
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];//[ 'St', 'E', 'Z', 'N', 'N' ]

console.log(exports.findAllSolutions(grid, dictionary));

//   //check for empty input
//   if (grid==null || dictionary==null){
//     return [];
//   }
//   //check if grid is NxN
//   for (let i=0; i<grid.length; i++){
//     if (grid[i].length!=grid.length){
//       return [];
//     }
//   }
//   // check if no invalid ch in grid.
//   for (let i=0; i<grid.length; i++){
//     for (let j=0; j<grid.length;j++){
//       let valid = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","V","W","X","Y","Z","Qu","St","U","T"];
//       if (!valid.includes(grid[i][j])){
//         return [];
//       }

//     }
//   }
  
//     grid.forEach(function(tile, index){
//       let position = [0,0]
//       tile.forEach(function(tile_let, tile_index){

//           position = [tile_index,index]
//           dictionary.forEach(function(word, dict_index){
//             let prev_char = "";
//             let pos_word = "";
//             let letter_found = false;
//             let used = {};
            
            
//             if(tile_let.slice(0,1).toLowerCase() === word.slice(0,1)){
              
//               for (let char of word){
//                 // console.log([tile.indexOf(char),position[1]],position,'hereeeeeeeeee')
//                 if(tile_let.slice(0,1).toLowerCase() === char){
//                   if (letter_found===false){
//                   pos_word+= char
//                   letter_found = true
//                   }
//                 }
//                 else if (char==='q' || char==='s'){
//                   pos_word+=char
//                 }else if(char==='t' && prev_char==='s'){
//                   pos_word+=char
//                 }else if(char==='u' && prev_char==='q'){
//                   pos_word+=char
//                 }else{
                
//                  if(position[1] === grid.length - 1 && position[0] == tile.length -1){ //first character has index of furthest bottom right
            
//             const pos_position = [grid[position[1]-1][position[0]],grid[position[1]-1][position[0]-1],grid[position[1]][position[0]-1]]
//             console.log("first character has index of furthest bottom right", tile, char,pos_word, pos_position.includes(char.toUpperCase()), pos_position,[tile.indexOf(char),position[1]],position,'hereeeeeeeeee')
//             if(pos_position.includes(char.toUpperCase()) === true){
//               pos_word += char;
//               letter_found = true
//             }
//           }else if(position[1] === 0 && position[0] ==tile.length -1){//first character has index of furthest top right
//           console.log("first character has index of furthest top right", tile, char)
//               const pos_position = [grid[position[1]+1][position[0]],grid[position[1]+1][position[0]-1],grid[position[1]][position[0]-1]]
//             if(pos_position.includes(char.toUpperCase()) === true){
//               pos_word += char;
//               letter_found = true
//           }
          
//           }else if(position[1] === 0 && position[0] == 0){//first character has index of furthest top left
//           console.log("first character has index of furthest top left", tile, char)
//               const pos_position = [grid[position[1]+1][position[0]],grid[position[1]+1][position[0]+1],grid[position[1]][position[0]+1]]
//             if(pos_position.includes(char.toUpperCase()) === true){
//               pos_word += char;
//               letter_found = true
//           }
          
//           }else if(position[1] === grid.length -1 && position[0] === 0){//first character has index of furthest bottom left
//           console.log("first character has index of furthest bottom left", tile, char,)
//               const pos_position = [grid[position[1]-1][position[0]],grid[position[1]-1][position[0]+1],grid[position[1]][position[0]+1]]
//             if(pos_position.includes(char.toUpperCase()) === true){
//               pos_word += char;
//               letter_found = true
//           }
          
//           }else if(position[1] === 0){//first character has index of which is on top edge
//           console.log("first character has index of which is on top edge", tile, char)
//               const pos_position = [grid[position[1]+1][position[0]],grid[position[1]+1][position[0]-1],grid[position[1]+1][position[0]+1],grid[position[1]][position[0]-1],grid[position[1]][position[0]+1]]
//             if(pos_position.includes(char.toUpperCase()) === true){
//               pos_word += char;
//               letter_found = true
//           }

//           }else if(position[1] === grid.length -1){//first character has index of which is on bottom edge
//           console.log("first character has index of which is on bottom edge", tile, char)
//               const pos_position = [grid[position[1]-1][position[0]],grid[position[1]-1][position[0]-1],grid[position[1]-1][position[0]+1],grid[position[1]][position[0]-1],grid[position[1]][position[0]+1]]
//             if(pos_position.includes(char.toUpperCase()) === true){
//               pos_word += char;
//               letter_found = true
//           }

//           }else if(position[0] === 0){//first character has index of which is on furthest left side
          
//               const pos_position = [grid[position[1]+1][position[0]],grid[position[1]-1][position[0]],grid[position[1]][position[0]+1],grid[position[1]+1][position[0]+1],grid[position[1]-1][position[0]+1]]
//               console.log("first character has index of which is on furthest left side", tile, char,pos_word,word,position,grid[position[1]+1][position[0]],pos_position)
//             if(pos_position.includes(char.toUpperCase()) === true){
//               pos_word += char;
//               letter_found = true
//           }

//           }else if(position[0] === tile.length -1){//first character has index of which is on furthest right side
//           console.log("first character has index of which is on furthest right side", tile, char)
//               const pos_position = [grid[position[1]+1][position[0]],grid[position[1]-1][position[0]],grid[position[1]][position[0]-1],grid[position[1]+1][position[0]-1],grid[position[1]-1]][position[0]-1]
              
//             if(pos_position.includes(char.toUpperCase()) === true){
//               pos_word += char;
//               letter_found = true
//           }

//           }else if(position[0] > 0 || position[0] < tile.length -1){//first character has no edge cases
//           console.log("first character has no edge cases", tile, char)
//               const pos_position = [grid[position[1]+1][position[0]],grid[position[1]-1][position[0]],grid[position[1]][position[0]-1],grid[position[1]][position[0]+1],grid[position[1]-1][position[0]-1], grid[position[1]-1][position[0]+1],grid[position[1]+1][position[0]+1], grid[position[1]+1][position[0]-1]]
//               console.log("first character has no edge cases", tile, char,pos_position)
//             if(pos_position.includes(char.toUpperCase()) === true){
//               pos_word += char;
//               letter_found = true
//           }

          
//           }else{
            
//           }//end of
//               }
//           if(dictionary.includes(pos_word) === true){
//             solutions.add(pos_word)
//             console.log(pos_word,"includes")
//           }
//           console.log("word loop", position,tile, char, index,tile_index, pos_word,word)
//           prev_char = char
//               }
              
//             }
          
            
//           });
          
          
        
        
        


//   });

// });
//   console.log(dict,solutions)
//   return solutions;
