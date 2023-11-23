import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const {user: userData} = req.body;
    const result = await userServices.createUserIntoDb(userData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch(error: any){
    res.status(500).json({
        success: false,
        message: error.message || "something went wrong",
        error: error
    })
}
  
};

//get all user
const getAllUsers = async(req : Request, res : Response) =>{
    try{
        const result = await userServices.getAllUsersFromDb()
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })
    }catch (error) {
        res.status(200).json({
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        });
      }
}

//get single user
const getSingleUser = async(req: Request, res: Response) =>{
    try {
        const id = req.params.userId
        const result = await userServices.getSingUserFromDb(id)
        res.status(200).json({
            success: true,
            message: "student is retrieved successfully",
            data: result
        })
        
    } catch (error) {
        res.status(200).json({
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        });
      }
}



export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,

};
