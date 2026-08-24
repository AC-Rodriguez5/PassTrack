const { z } = require('zod');


const emailSchema = z.preprocess(
    (value)=> typeof value ==='string' ? value.trim().toLowerCase() : value, z.email('Invalid email address')
);

const registerUserSchema = z.strictObject({
    firstName: z.string().trim().min(1, 'Firstname is required'),
    middleName: z.string().trim().optional().default(''),
    lastName : z.string().trim().min(1, 'LastName is required'),
    email : emailSchema,
    password : z.string().trim().min(8, 'Password must be at least 8 characters')
});

const loginUserSchema = z.strictObject({
    email : emailSchema,
    password : z.string().trim().min(1, 'Password is required')
});

module.exports = { registerUserSchema, loginUserSchema };