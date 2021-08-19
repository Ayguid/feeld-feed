export const wordOccurrances = (str) => {
  //find word unique count for a given string
  let words = str.split(/[ ,]+/); //separamos por espacios, no sacamos aca los numeros por si la persona usa numer2 como parte de una p4al4bra
  let wordCounts = {};
  //the "_" + allows it to process words like constructor that are already properties of the object.
  //You may want to write words[i].toLowerCase() to count case-insensitively.
  for (let i = 0; i < words.length; i++) {
    // wordCounts["_" + words[i].toLowerCase()]
    if (isNaN(words[i]) && words[i].length >= 2) {
      //ignoramos los numeros sueltos y las palabras con menos de dos letras
      wordCounts[words[i].toLowerCase()] =
        (wordCounts[words[i].toLowerCase()] || 0) + 1; //  wordCounts["_" + words[i].toLowerCase()]
    }
  }
  return Object.entries(wordCounts)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {}); //ordenamos el objeto de palabras por valor desc
};


