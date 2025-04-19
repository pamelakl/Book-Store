export const loginAction = ({token, user}) => ({
    type: "LOGIN",
    user,
    token
})

export const logoutAction = () => ({
    type: "LOGOUT"
});
