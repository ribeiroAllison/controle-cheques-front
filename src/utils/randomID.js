// CREATE RANDOM ID
export default async function createRandomId() {
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let idArray = [];
  for (let i = 0; i < 5; i++) {
    idArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }

  for (let i = 0; i < 5; i++) {
    idArray.push(Math.floor(Math.random() * 10));
  }
  return idArray.join("");
}
