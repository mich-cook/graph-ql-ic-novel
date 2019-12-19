const authors = [
  { "id": 1, "name": "Rowling" },
  { "id": 2, "name": "Tolkien" },
  { "id": 3, "name": "Weeks" }
];

const books = [
  { "id": 1, "name": "Secret Chamber", "authorId": 1 },
  { "id": 2, "name": "Azkaban Prisoner", "authorId": 1 },
  { "id": 3, "name": "Fire Goblet", "authorId": 1 },
  { "id": 4, "name": "Ring Fellowship", "authorId": 2 },
  { "id": 5, "name": "Two Towers", "authorId": 2 },
  { "id": 6, "name": "King's Return", "authorId": 2 },
  { "id": 7, "name": "Shadows Way", "authorId": 3 },
  { "id": 8, "name": "Beyond Shadows", "authorId": 3 }
];

// until we hook up webpack/babel, etc.
// export this way instead of export const blahblah
module.exports = { books, authors };
