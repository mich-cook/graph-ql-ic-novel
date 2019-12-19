import express from 'express';
import graphqlHTTP from 'express-graphql';

// schema/resolver/connector technique
import { schema as friendsSchema  } from './data/friendsAndAliens/schema';
import { schema as contactsSchema } from './data/contacts/schema';

// clump definition technique
// does not persist yet
import { schema as booksSchema } from './data/books/schema';

const PORT = 5001
const app = express();

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`Graphql is listening on port ${PORT}`);
});

app.use('/graphql/friends', graphqlHTTP({
    schema: friendsSchema,
    graphiql: true
}));

app.use('/graphql/contacts', graphqlHTTP({
    schema: contactsSchema,
    graphiql: true
}));

app.use('/graphql/books', graphqlHTTP({
    schema: booksSchema,
    graphiql: true
}));

app.listen(PORT, () => console.log(`Running graphql server on localhost:${PORT}`));
