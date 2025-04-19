const {object, string, number} = require('yup');

const loginRequestSchema = object({
    body: object({
        email: string().email("Email is not valid").required("Email is required"),
        password: string().required("Password is required"),
        
    })

});

module.exports = {
    loginRequestSchema,
}