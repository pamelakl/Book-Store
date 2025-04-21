const apiService = require('../services/api.service');

const SuccessResponse = require('../models/response.model');
const {ok, created, notFound, badRequest} = require('../utils/response.utils');

const getUsers = async (req, res) => {
    const users = await apiService.getUsers();
    ok(res, {users}, 'Retrieved users successfuly');
};

const createUser = async (req, res, next) => {
    const userData = req.body;
    try{
        const user = await apiService.createUser(userData);
        created(res, {user}, 'Added new user successfuly');
    } catch(err) {
        next(err);
    }  
};

const login = async(req, res, next) => {
    const userData = req.body;
    try{
        const user = await apiService.login(userData);
        if(user)
            ok(res, {user}, 'User was logged in successsfully');
        else{
            notFound(res, "User not found");
        }
    }catch(err){
        next(err);
    }
}


const logout = async(req, res, next) => {
    try{
        ok(res, 'User was logged out successsfully', {});
    }catch(err){
        next(err)
    }
}

const changeAccountInfo = async(req, res, next) => {
    try{
        const userId = req.userId;
        const newData = req.body;
        const user = await apiService.changeAccountInfo(userId, newData);

        ok(res, {user}, "Info was changed");
    } catch(error){
        next(error);
    }
}

const deleteAccount = async(req, res, next) => {
    try{
        const userId = req.userId;

        await apiService.deleteAccount(userId);

        ok(res, userId, "Deleted user successfully");
    }catch(error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    createUser,
    login,
    logout,
    changeAccountInfo,
    deleteAccount
}

