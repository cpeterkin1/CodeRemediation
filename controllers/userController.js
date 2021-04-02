import userInfo from '../models/UserInfo.js';
import ResponseObject from '../error_handle/ResponseObject.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config.js';

//The controller for User manipulation

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

//Login Capablility

export const login = async (req, res) =>{


    var email = req.body.Email;
    var password = req.body.Password;

    const user = await userInfo.findOne( {Email: email } ).lean();

    if(!user){
       const response = new ResponseObject(404, "Failure", {message: "Invalid Email/Password"});
       res.status(404).json(response);
    }

    if(await bcrypt.compare(password, user.Password)){
        const token = jwt.sign({ firstname: user.FirstName,
        lastname: user.LastName,
        email: user.Email,
        role: user.Role},
        JWT_SECRET,
        {expiresIn: '10m'});

        const response = new ResponseObject(200, "Success", {token: token});
        res.status(200).json(response);
    }
    else{
        const response = new ResponseObject(404, "Failure", {message: "Invalid Email/Password"});
        res.status(404).json(response);
    }
}

// Verify a user's jsonwebtoken --doesn't anything useful yet

export const verifyUser = async (req,res) => {
    const user = new userInfo(req.body)

    return jwt.verify(token, JWT_SECRET)
}


//Gets all users and all of their information (Yes including password)
export const getUsers = async (req, res) =>{
    try{
        const sort = {FirstName: 1};
        const users = await userInfo.find({}, {FirstName: 1, LastName: 1, Email: 1, Role: 1, _id: 0}).sort(sort);
        
        if(!users){
            const response = new ResponseObject(404, "Failure","Users not found!");
            res.status(404).json(response)
        }
        else{
            const response = new ResponseObject(200, "Success",{Users: users});
            res.status(200).json(response);
        }

    }
    catch(err){
        const response = new ResponseObject(500, "Failure", err);
        res.status(500).json(response);
    }
}


//Adds a user to the database
export const createUser = async (req,res) =>{
    const user = req.body;
    console.log(req.body);


    const findUser = await userInfo.findOne({Email: user.Email});
    if(findUser){
        const response = new ResponseObject(400, "Failure","That Email is already in use!")
        res.status(400).json(response);
    }

    //Verify all fields, Just in case.
    //If any are invalid we will spit out an Error 500
    verifyFirstName(user.FirstName, res);
    verifyLastName(user.LastName, res);
    verifyEmail(user.Email, res);
    verifyMobile(user.Mobile, res);
    verifyPassword(user.Password, res);
    verifyRole(user.Role, res);
    //Done Verifying each field

    //Push the new user to the Database
    if(!res.headersSent){
        const newUser = new userInfo({
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Mobile: user.Mobile,
            Password: user.Password,
            Role: user.Role
        });

        try{
            await newUser.save()
            const response = new ResponseObject(200, "Success",`Success! Added ${user.FirstName} ${user.LastName} to the database.`);
            res.status(200).json(response);
        }
        catch(err){
            const response = new ResponseObject(500, "Failure",err);
            res.status(500).json(response);
        }
    }

}



//Gets by specific ID (Email)
export const getUser = async (req, res) =>{
    console.log(req.params);

    try{
        //Get the user from the request parameter
        const user = await userInfo.findOne(req.params);

        //If such a user does not exist send a 404
        if(!user){
            const response = new ResponseObject(404, "Failure",`User with the email: ${req.params.Email} was not found!`)
            res.status(404).json(response);
        }
        else{ 
            //Otherwise Success
            const response = new ResponseObject(200, "Success", {User: user});
            res.status(200).json(response);
        }
    }
    catch(err){
        //Catch any Server side issues
        const response = new ResponseObject(500, "Failure", err);
        res.status(500).json(response);
    }
}



//Finds user with matching email and deletes user from database
export const deleteUser = async (req,res) =>{
    console.log(req.params.Email);
    try{
        //userInfo is the schema I imported, you must import the schema to fiddle with the database
        //findOne() finds one user with your request parameters, in this case there is only one parameter "Email", so it will find a user with the same email
        const user = await userInfo.findOne(req.params);

        //If we do not find such a user, spit out a failure
        //Res = response, use this to complete your function to let the front end know what happened
        //In this case a failure happened
        if(!user){
            const response = new ResponseObject(400, "Failure", `Could not find a user with the email: ${req.params.Email}`);
            res.status(400).json(response);
        }
        else{
            //In this case a Success happened
            await userInfo.deleteOne({Email: req.params.Email});
            const response = new ResponseObject(200, "Success", `Removed user with email: ${req.params.Email}`);
            res.status(200).json(response);
        }
    }
    catch(err){
        const response = new ResponseObject(500, "Failure", err);
        res.status(500).json(response);
    }
}




//UPDATE User
export const updateUser = async (req, res) =>{
    //Grab the id, and request body. then try to find the user
    const {id} = req.params;
    const modifyUser = req.body;
    const user = await userInfo.findOne(req.params);
    console.log(user);
    console.log(modifyUser);

    //If no user exists send error or if request body is empty for some reason
    if(!user){
        const response = new ResponseObject(404, "Failure", `User with email ${id} could not be found`)
        res.status(404).json(response);
    }
    else if(JSON.stringify(req.body) === "{}" || !req.body){
        const response = new ResponseObject(400, "Failure", `Request is empty!`)
        res.status(400).json(response);
    }
    else{
        //Starts by checking every possible change, starting with firstname and ending with role
        if(modifyUser.Firstname){
            try{
                await userInfo.updateOne({Email: user.Email},
                    {$set: {FirstName: modifyUser.Firstname}})
            }
            catch(err){
                const response = new ResponseObject(500, "Failure", 
                {Statement: "Failed to update the First Name",
                Error: err});
                res.status(500).json(response);
            }
        }
    
        if(modifyUser.Lastname){
            console.log(true);
            try{
                await userInfo.updateOne({Email: user.Email},
                    {$set: {LastName: modifyUser.Lastname}})
            }
            catch(err){
                const response = new ResponseObject(500, "Failure", 
                {Statement: "Failed to update the Last Name",
                Error: err});
                res.status(500).json(response);
            }
        }
    
        if(modifyUser.Email){
            try{
                const findUser = await userInfo.findOne({Email: Email});
                if(findUser){
                    const response = new ResponseObject(400, "Failure","That Email is already in use!")
                    res.status(400).json(response);
                }
                else{
                    await userInfo.updateOne({Email: user.Email},
                        {$set: {Email: modifyUser.Email}})
                }
            }
            catch(err){
                const response = new ResponseObject(500, "Failure", 
                {Statement: "Failed to update the Email",
                Error: err});
                res.status(500).json(response);
            }
        }
    
        /*if(Mobile){
            try{
                await userInfo.updateOne({Email: user.Email},
                    {$set: {Mobile: Mobile}})
            }
            catch(err){
                const response = new ResponseObject(500, "Failure", 
                {Statement: "Failed to update the Mobile",
                Error: err});
                res.status(500).json(response);
            }
        }
    
        if(Password){
            try{
                await userInfo.updateOne({Email: user.Email},
                    {$set: {Password: Password}})
            }
            catch(err){
                const response = new ResponseObject(500, "Failure", 
                {Statement: "Failed to update the Password",
                Error: err});
                res.status(500).json(response);
            }
        }*/
    
        if(modifyUser.Role){
            try{
                await userInfo.updateOne({Email: user.Email},
                    {$set: {Role: modifyUser.Role}})
            }
            catch(err){
                const response = new ResponseObject(500, "Failure", 
                {Statement: "Failed to update the Role",
                Error: err});
                res.status(500).json(response);
            }
        }
        //End of checking each possiblity
    }

    //If no errors then we send a confirmation that the user has been updated
    if(!res.headersSent){
        const response = new ResponseObject(200, "Success", `User with email ${user.Email} has been updated`);
        res.status(200).json(response);
    }

}




//We do not check if res has sent a header in this case because Res could not have sent anything yet.
function verifyFirstName(firstName, res){
    if(!firstName && !res.headersSent){
        const response = new ResponseObject(400, "Failure","First Name was empty in the request!")
        res.status(400).json(response);
    }

}

//Below does check if res has sent because it is now possible
function verifyLastName(lastName, res){
    if(!lastName && !res.headersSent){
        const response = new ResponseObject(400, "Failure","Last Name was empty in the request!")
        res.status(400).json(response);
    }
}

function verifyEmail(email, res){
    if(!email && !res.headersSent){
        const response = new ResponseObject(400, "Failure","Email was empty in the request!")
        res.status(400).json(response);
    }

}

function verifyMobile(mobile, res){
    if(!mobile && !res.headersSent){
        const response = new ResponseObject(400, "Failure","Mobile was empty in the request!")
        res.status(400).json(response);
    }

}

function verifyPassword(password, res){
    if(!password && !res.headersSent){
        const response = new ResponseObject(400, "Failure","Password was empty in the request!")
        res.status(400).json(response);
    }

}

function verifyRole(role, res){
    if(!role && !res.headersSent){
        const response = new ResponseObject(400, "Failure","Role was empty in the request!")
        res.status(400).json(response);
    }

}