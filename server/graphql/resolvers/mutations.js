const { User } = require("../../models/user");

module.exports = {
  Mutation: {
    auth: (parent, args, context, info) => {
      return true;
    },
    signUp: async (parent, args, context, info) => {
      try{
        const user=new User({
            email:args.fields.email,
            password: args.fields.password
        })
        const getToken=await user.generateToken()
        if(!getToken){
          throw err
        }

        return {...getToken._doc}
      }
      catch(err){
          throw err
      }
    },
  },
};
