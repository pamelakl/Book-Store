export const userDataInitialState = {user: null, token:""}; 

const loginReducer = (userData, action) =>{
    switch(action.type){
        case "LOGIN":
            const newUser = {user: { ...action.user}, token:action.token} 
            localStorage.setItem('userData', JSON.stringify(newUser));

            return newUser;
        case "LOGOUT":
            localStorage.setItem('userData', JSON.stringify(userDataInitialState))
            return { user: null, token:"", admin:false};
        default: 
            return {...userData};

    }
}

export default loginReducer;
    

    