import mongoose from 'mongoose';

// Mongo connection (in case there is more than one)
const contactConnection = mongoose.createConnection('mongodb://localhost/contacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const contactSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    company: { type: String }
});

const Contacts = contactConnection.model('contacts', contactSchema);

export { Contacts };
