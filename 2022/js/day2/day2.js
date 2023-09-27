const { open } = require('node:fs/promises');


async function readFileToString(filePath) {
  const file = await open(filePath);
  const rf = await file.readFile();
  const fileString = rf.toString();
  file.close();

  return fileString
}


async function rockPaperScissors(filePath) {
  const fileString = await readFileToString(filePath);
  const matches = fileString.split('\n')

  // A - rock
  // B - paper
  // C - scissors
  // X - rock / lose
  // Y - paper / draw
  // Z - scissors / win


  const moveChoice = {
    'A X': 3, // lose + sci
    'A Y': 4, // draw + rock
    'A Z': 8, // win + paper
    'B X': 1, // lose + rock 
    'B Y': 5, // draw + paper
    'B Z': 9, // win + sci
    'C X': 2, // lose + paper
    'C Y': 6, // draw + sci
    'C Z': 7, // win + rock
  }


  let myScore = 0;

  for (const match of matches) {
    myScore += moveChoice[match] 
  }

  console.log(myScore)
}

rockPaperScissors('./day2-input.txt')



// async function rockPaperScissors(filePath) {
//   const fileString = await readFileToString(filePath);
//   const matches = fileString.split('\n')

//   const movePoints = {
//     'X': 1,
//     'Y': 2,
//     'Z': 3,
//   }

//   const matchPoints = {
//     'A X': 3,
//     'A Y': 6,
//     'A Z': 0,
//     'B X': 0,
//     'B Y': 3,
//     'B Z': 6,
//     'C X': 6,
//     'C Y': 0,
//     'C Z': 3
//   }

//   let myScore = 0;

//   for (const match of matches) {
//     myScore += matchPoints[match] + movePoints[match[2]]
//   }

//   console.log(myScore)
// }