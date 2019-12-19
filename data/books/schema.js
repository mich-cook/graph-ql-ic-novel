const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const { authors, books } = require('./bookData.js');

const AuthorType = new GraphQLObjectType({
    "name": "Author",
    "description": "The person that wrote the book",
    "fields": () => ({
      "id": { "type": GraphQLNonNull(GraphQLInt) /* no resolve needed since it can find in object */ },
      "name": { "type": GraphQLNonNull(GraphQLString) },
      "books": {
        "type": new GraphQLList(BookType),
        "resolve": (author) => {
          return books.filter(book => book.authorId === author.id)
        }
      }
    })
});

const BookType = new GraphQLObjectType({
    "name": "Book",
    "description": "This represents a book written by an author",
    "fields": () => ({
      "id": { "type": GraphQLNonNull(GraphQLInt) /* no resolve needed since it can find in object */ },
      "name": { "type": GraphQLNonNull(GraphQLString) },
      "authorId": { "type": GraphQLNonNull(GraphQLInt) },
      "author": {
        "type": AuthorType,
        "resolve": (book) => {
          return authors.find(author => author.id === book.authorId)
        }
      }
    })
});

const RootQueryType = new GraphQLObjectType({
    "name": "Query",
    "description": "Root Query",
    "fields": () => ({
      "book": {
        "type": BookType,
        "description": "Single book response",
        "args": {
          "id": { "type": GraphQLInt }
        },
        "resolve": (parent, args) => books.find(book => book.id === args.id)
      },
      "books": {
        "type": new GraphQLList(BookType),
        "description": "List of all Books",
        "resolve": () => books
      },
      "author": {
        "type": AuthorType,
        "description": "Info on an author",
        "args": { "id": { "type": GraphQLInt }},
        "resolve": (parent, args) => authors.find(author => author.id === args.id)
      },
      "authors": {
        "type": new GraphQLList(AuthorType),
        "description": "List of all authors",
        "resolve": () => authors
      }
    })
});

const RootMutationType = new GraphQLObjectType({
  "name": "Mutation",
  "description": "Root Mutation",
  "fields": () => ({
    "addBook": {
      "type": BookType,
      "description": "adding a book",
      "args": {
        "name": { "type": GraphQLNonNull(GraphQLString) },
        "authorId": { "type": GraphQLNonNull(GraphQLInt) }
      },
      "resolve": (parent, args) => {
        const book = { "id": books.length + 1, "name": args.name, "authorId": args.authorId };
        books.push(book);
        return book;
      } 
    },
    "addAuthor": {
      "type": AuthorType,
      "description": "adding an author",
      "args": {
        "name": { "type": GraphQLNonNull(GraphQLString) }
      },
      "resolve": (parent, args) => {
        const author = { "id": authors.length + 1, "name": args.name };
        authors.push(author);
        return author;
      } 
    },
  })
});

const schema = new GraphQLSchema({
  "query": RootQueryType,
  "mutation": RootMutationType
});

export { schema };
