
export type TFullName = {
    firstName: string;
    lastName: string
}

export type TAddress = {
    street: string;
    city: string;
    country: string
}

export type TOrders = {
    productName: string,
    price: number,
    quantity: number
}

export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: [string, string];
    address: TAddress;
    orders: TOrders[];
}


// //static
// export interface UserModel extends Model<TUser> {
//     getUser(userId: number): Promise<TUser | null>
//   }