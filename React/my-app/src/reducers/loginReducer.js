export const userDataInitialState = {user: null, token:""}; //, admin:false};

const loginReducer = (userData, action) =>{
    switch(action.type){
        case "LOGIN":
            console.log("logging at the reducer" + action)
            const newUser = {user: { ...action.user}, token:action.token} //, admin:action.user.admin}
            console.log("logging" + newUser);
            localStorage.setItem('userData', JSON.stringify(newUser));
          //  return {user: { ...action.user}, token:action.token, admin:action.user.admin};

            return newUser;
        case "LOGOUT":
            localStorage.setItem('userData', JSON.stringify(userDataInitialState))
            return { user: null, token:"", admin:false};
        default: 
            return {...userData};

    }
}

export default loginReducer;
    

    