export const userDataInitialState = {user: null, token:"", admin:false};

const loginReducer = (userData, action) =>{
    switch(action.type){
        case "LOGIN":
            const newUser = {user: { ...action.user}, token:action.token, admin:action.user.admin}
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
    

    