const Event = require('../../models/event');
const User = require('../../models/user')
const { transformEvent } = require('./merge');
  
module.exports = {
    events: async () => {
      try {
        console.log("EVENTS CALLED");
        const events = await Event.find();
        console.log("Events[2]"+events)
        return events.map(event => {
          console.log("Events:  "+transformEvent(event))
          return transformEvent(event);
        });
      } catch (err) {
        throw err;
      }
    },
    createEvent: async (args,req) => {
      if(!req.isAuth){ // check if the user is logged in
        throw new Error('Unauth');
      }
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: req.userId,
      });
      let createdEvent;
      try {
        const result = await event.save();
        createdEvent = transformEvent(result);
        const creator = await User.findById('5c0fbd06c816781c518e4f3e');
  
        if (!creator) {
          throw new Error('User not found.');
        }
        creator.createdEvents.push(event);
        await creator.save();
  
        return createdEvent;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };
  