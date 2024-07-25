const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function transform(pointsStructure) {
  let newStructure = {};
  for (let pointValue in pointsStructure) {
    pointsStructure[pointValue].forEach(letter => {
      newStructure[letter.toLowerCase()] = Number(pointValue);
    });
  }
  return newStructure;
}

let newPointStructure = transform(oldPointStructure);

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";
 
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

function initialPrompt() {
  let word = input.question("Let's play some scrabble! Enter a word: ");
  return word;
}

let simpleScorer = function scoreSimple(word) {
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score++;
  }
  return score;
};

let vowelBonusScorer = function scoreVowelBonus(word) {
  let score = 0;
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i].toLowerCase())) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
};

let scrabbleScorer = function(word) {
  word = word.toLowerCase();
  let letterPoints = 0;
 
  for (let i = 0; i < word.length; i++) {
    const pointValue = newPointStructure[word[i]];
    letterPoints += pointValue;
  }
  return letterPoints;
};


const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer
  }
];

function scorerPrompt(word) {
  let algorithmSelection;
  while (true) {
    algorithmSelection = input.question("Which scoring algorithm would you like to use? \n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: ");
    if (['0', '1', '2'].includes(algorithmSelection)) {
      break;
    } else {
      console.log("Invalid input. Please enter 0, 1, or 2.");
    }
  }
  console.log(`Score for '${word}': ${scoringAlgorithms[algorithmSelection].scorerFunction(word)}`);
}

function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};