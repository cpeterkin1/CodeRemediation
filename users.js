import express from 'express';
import {createUser, getUsers, getUser, deleteUser, updateUser, login} from '../controllers/userController.js'

const router = express.Router();


//Gets all users and all of their information (Yes including password)
router.get('/', getUsers);

//Adds a user to the array database
router.post('/', createUser);

//Login
router.post('/authenticate', login);

//Gets by specific ID, for now it finds users by their first name, will need work
router.get('/:Email', getUser);

//Finds user with matching email and deletes user from database
router.delete('/:Email', deleteUser);

//UPDATE User
router.patch('/:Email', updateUser);

export default router;