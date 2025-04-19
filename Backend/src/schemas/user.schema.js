const {object, string, number} = require('yup');

const createUserSchema = object({
    body: object({
      //  name: string().required("Name is required"),
        password: string().required("Password is required"),
        email: string().email("Eamil is not valid").required("Email is required"),
    })

});

module.exports = {
    createUserSchema,
}