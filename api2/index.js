import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema as friendsSchema  } from './data/friendsAndAliens/schema';
import { schema as contactsSchema } from './data/contacts/schema';

const PORT = 5001
const app = express();

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`Graphql (lynda version) is listening on port ${PORT}`);
});

app.use('/graphql/friends', graphqlHTTP({
    schema: friendsSchema,
    graphiql: true
}));

app.use('/graphql/contacts', graphqlHTTP({
    schema: contactsSchema,
    graphiql: true
}));

app.listen(PORT, () => console.log(`Running lynda flavor of server on port localhost:${PORT}`));
