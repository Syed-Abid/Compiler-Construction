
const fs = require('fs');

class Lexer {
  constructor(inputFilePath, outputFilePath) {
    this.inputFilePath = inputFilePath;
    this.outputFilePath = outputFilePath;
    this.classification = {
      'DT': ['int', 'char', 'double'],
      'IF': ['if'],
      'WHILE': ['while'],
      'DO': ['do'],
      'ELSE': ['else'],
      'FOR': ['for'],
      'SWITCH': ['switch'],
      'CASE': ['case'],
      'DEFAULT': ['default'],
      'CB': ['continue', 'break'],
      'RETURN': ['return'],
      'VOID': ['void'],
      'MAIN': ['main'],
      'ABSTRACT': ['abstract'],
      'BOOLEAN': ['boolean'],
      'STRING': ['string'],
      'CLASS': ['class'],
      'NEW': ['new'],
      'ACCESS_MODIFIER': ['private', 'public', 'protected'],
      'STATIC': ['static'],
      'FINAL': ['final'],
      'PRINT': ['print'],
      'EXTENDS': ['extends'],
      'IMPLEMENTS': ['implements'],
      'INTERFACE': ['interface'],
      'IMPORT': ['import'],
      'FUNCTION': ['function'],
      'ARRAY': ['Array', 'ArrayList'],
      'MAP': ['Map'],
      'INHERIT': ['inherits'],
      'THIS': ['this'],
      'SEMI_COLON': [';'],
      'LEFT_BRACE': ['{'],
      'RIGHT_BRACE': ['}'],
      'COMMA': [','],
      'BACKSLASH': ['/'],
      '/$_CLASS': ['/$'],
      '$/_CLASS': ['$/'],
      'LEFT_PARENTHESIS': ['('],
      'RIGHT_PARENTHESIS': [')'],
      'COLON': [':'],
      'LEFT_BRACKER': ['['],
      'RIGHT_BRACKER': [']'],
      'DOUBLE_QUOTES': ['"'],
      "SINGLE_QUOTES": ["'"],
      'DOUBLE_BLACKSLASH': ['\\'],
      'DOT': ['.'],
      '*_CLASS': ['*', '/', '%'],
      '+_CLASS': ['+', '-'],
      '<_CLASS': ['<', '>', '<=', '>=', '!=', '=='],
      'AND_CLASS': ['&&'],
      'OR_CLASS': ['||'],
      'NOT_CLASS': ['!'],
      'INC_DEC': ['++', '--'],
      '=_CLASS': ['='],
      'ASSIGN_OP': ['+=', '-=', '*=', '/=', '%='],
      'CATCH': ['catch'],        
      'THROW': ['throw'],        
      'THROWS': ['throws'],      
      'FINALLY': ['finally'],    
      'INVALID': ['INVALID'],
    };
    this.tokens = [];
    this.reservedWords = new Set([
      'Main', 'final', 'print', 'If', 'else', 'static', 'void', 'int', 'char', 'string', 'double', 'boolean', 'new',
      'function', 'switch', 'case', 'default', 'break', 'continue', 'for', 'while', 'Array', 'ArrayList', 'Map',
      'public', 'private', 'protected', 'abstract', 'interface', 'import', 'inherits', 'implements', 'this'
    ]);
  }

  getClassPart(word) {

    for (const classPart in this.classification) {
      if (this.classification[classPart].includes(word)) {
        return classPart;
      }
    }
    
    if (this.reservedWords.has(word)) {
      return word.toUpperCase();
    }

    // Check if the token is an identifier based on the rules
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(word)) {
      return 'IDENTIFIER';
    }

    return 'INVALID';
  }
 



// \s+: This matches one or more whitespace characters, including spaces, tabs, and newlines.
// ;: This matches the semicolon character.
// ,: This matches the comma character.
// \(: This matches the opening parenthesis character.
// \): This matches the closing parenthesis character.
// {: This matches the opening curly brace character.
// }: This matches the closing curly brace character.
// \]: This matches the closing square bracket character.
// \[: This matches the opening square bracket character.
// ": This matches the double quotation mark character.
// ': This matches the single quotation mark character.
// \.: This matches the period character.
// \s*: This matches zero or more whitespace characters (spaces, tabs).
  tokenize() {
    const inputFileContent = fs.readFileSync(this.inputFilePath, 'utf-8');
    const lines = inputFileContent.split(/\r?\n/);

    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
      const line = lines[lineNumber].trim();
      const tokensInLine = line.split(/(\s+|;|,|\(|\)|{|}|\[|\]|"|'|\.\s*)/);
      console.log("tokensInLine" , tokensInLine , "\n");
      console.log();

      for (const token of tokensInLine) {
        const cleanedToken = token.trim();
        if (cleanedToken === '') {
          continue;
        }
        let classPart = this.getClassPart(cleanedToken);

        if (!isNaN(cleanedToken)) { // Check if the token is a number
          if (Number.isInteger(parseFloat(cleanedToken))) {
            classPart = 'INTEGER';
          } else {
            classPart = 'DOUBLE';
          }
        // } else if (cleanedToken.startsWith('"') && cleanedToken.endsWith('"')) {
        //   classPart = 'STRING';
        // } else if (cleanedToken.startsWith("'") && cleanedToken.endsWith("'")) {
        //   classPart = 'CHAR';
        } else if (['true', 'false'].includes(cleanedToken.toLowerCase())) {
          classPart = 'BOOLEAN';
        }
        this.tokens.push({ value: cleanedToken, class: classPart, line: lineNumber + 1 });
      }
    }

    console.log("Tokens : " , this.tokens);
  }

// Token : ( value part , class part , lineNo)
  writeTokensToFile() {
    const outputContent = this.tokens.map(token => `( ${token.value} , ${token.class}, LineNo: ${token.line})`).join('\n');
    fs.writeFileSync(this.outputFilePath, outputContent);
    console.log('Lexical analysis completed. Tokens written to', this.outputFilePath);
  }
}

// Usage
const lexer = new Lexer('input.txt', 'output.txt');
lexer.tokenize();

lexer.writeTokensToFile();
