import User from '../schemas/user.js';
import crudRepository from './crudRepository.js';


const userRepository = {
    // CRUD methods using crudRepository
    ...crudRepository(User),

    // Additional method
    getUserByUsername : async (username)=>{
        const user = await User.findOne({ username});
        return user;
    },

    getUserByEmail : async (email)=>{
        const user = await User.findOne({ email });
        return user;
    }
}

export default userRepository;
