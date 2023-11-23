import { z } from "zod";

const FullNameValidationSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

const AddressValidationSchema = z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
});

const UserValidationSchema = z.object({
    userId: z.number(),
    username: z.string().min(1),
    password: z.string().min(1),
    fullName: FullNameValidationSchema,
    age: z.number().min(1),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.tuple([z.string(), z.string().min(1)]),
    address: AddressValidationSchema,
});

export default UserValidationSchema;