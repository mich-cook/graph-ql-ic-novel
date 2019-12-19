import mongoose from 'mongoose';
import { Friends, Aliens } from './connectors';


// resolver map
export const resolvers = {
  Query: {
    getFriends: () => { /*(root) => {
      return new Promise((resolve, object) => {
        Friends.find('', (err, friend) => {
          if (err) reject(err)
          else resolve(friend)
        });
      });
    },
*/
      return Friends.find();
    },
  
    getOneFriend: (root, { id }) => {
// console.log(`${mongoose.promise}`);
// console.log(`${mongoose.Promise}`);
      return new Promise((resolve, object) => {
// console.log(`getting a friend with id ${id}`);
// console.log(`${Friends}`);
// console.log(`${Friends.findById}`);
        Friends.findById(id, (err, friend) => {
// console.log(`got this err: ${err}`);
// console.log(`got this friend: ${friend}`);
          if (err) reject(err)
          else resolve(friend)
//            return friend;
        });
      });
      // when we were just storing them in an array
      // return new Friend(id, friendDatabase[id]);
    },
/*
    getOneFriend: (root, { id }) => {
        return new Promise((resolve, object) => {
          Friends.findById(id, (err, friend) => {
            if (err) reject(err)
            else resolve(friend)
          });
        })
    },
*/
    getAliens: () => {
      return Aliens.findAll();
    }
  },
  Mutation: {
    createFriend: (root, {input}) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        sex: input.sex,
        language: input.language,
        email: input.email,
        contacts: input.contacts
      });

      newFriend.id = newFriend._id;

      return new Promise((resolve, object) => {
        newFriend.save((err) => {
          if (err) reject(err)
          else resolve(newFriend)
        });
      });

    },
    updateFriend: (root, {input}) => {
      return new Promise((resolve, object) => {
        Friends.findOneAndUpdate({ _id: input.id }, input, { new: true }, (err, friend) => {
          if (err) reject(err)
          else resolve(friend)
        });
      });
    },
    deleteFriend: (root, { id }) => {
      return new Promise((resolve, object) => {
        Friends.deleteOne({ _id: id}, (err) => {
          if (err) reject(err)
          else resolve(`User ${id} successfully deleted.`)
        });
      });
    }
  }


};
