// module for reading and writing file
const fs = require('fs'); 

// Define keywords, operators, and other symbols
const keywords = ['int', 'string', 'char', 'boolean', 'double', 'Main', 'final', 'print', 'If', 'else', 'static', 'void', 'function', 'switch', 'case', 'default', 'break', 'continue', 'for', 'while', 'Array', 'ArrayList', 'Map', 'public', 'private', 'protected', 'abstract', 'interface', 'import', 'inherits', 'implements'];
const operators = ['+', '-', '*', '/', '%', '==', '!=', '>', '<', '>=', '<=', 'and', 'or', 'not', '=', '+=', '-=', '*=', '/=', '%='];
const punctuators = [';', '{', '}', '(', ')', ','];
const lineTerminators = ['\n', '\r\n'];

// Read the input file
const inputFileContent = fs.readFileSync('input.txt', 'utf-8');

// Split input content into lines
const lines = inputFileContent.split(/\r?\n/);

// Token array to store tokens
const tokens = [];

// Function to check if a word is a keyword
function isKeyword(word) {
  return keywords.includes(word);
}

// Function to check if a character is an operator
function isOperator(char) {
  return operators.includes(char);
}

// Function to check if a character is a punctuator
function isPunctuator(char) {
  return punctuators.includes(char);
}

// Process each line
for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
  const line = lines[lineNumber].trim();
  const words = line.split(/\s+/); // Split by spaces

  for (const word of words) {
    if (isKeyword(word)) {
      tokens.push({ value: word, type: 'keyword', class: 'keyword', line: lineNumber + 1 });
    } else if (isOperator(word)) {
      tokens.push({ value: word, type: 'operator', class: 'operator', line: lineNumber + 1 });
    } else if (isPunctuator(word)) {
      tokens.push({ value: word, type: 'punctuator', class: 'punctuator', line: lineNumber + 1 });
    } else {
      // Handle identifiers, numbers, strings, and other cases
    }
  }
}

// Write tokens to output file
const outputContent = tokens.map(token => `(${token.value} ${token.type}, ${token.class}, Line ${token.line})`).join('\n');
fs.writeFileSync('output.txt', outputContent);

console.log('Lexical analysis completed. Tokens written to output.txt');
