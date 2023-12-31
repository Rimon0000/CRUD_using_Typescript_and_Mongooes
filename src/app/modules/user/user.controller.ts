import { Request, Response } from 'express';
import { userServices } from './user.service';
import UserValidationSchema from './user.validation';


const createUser = async (req: Request, res: Response) => {
  try {
    const  userData = req.body;

    //data validation using zod
    const zodParseData = UserValidationSchema.parse(userData)
    const result = await userServices.createUserIntoDb(zodParseData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch(error: any){
    res.status(500).json({
        success: false,
        message:"something went wrong",
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
        const result = await userServices.getSingleUserFromDb(id)
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
            description: error.message || 'User not found!',
          },
        });
      }
}

//delete single user
const deleteSingleUser = async(req: Request, res: Response) =>{
  try {
      const id = req.params.userId
      const result = await userServices.deleteSingleUserFromDb(id)
      res.status(200).json({
          success: true,
          message: "User deleted successfully!",
          data: null
      })
  } catch (error) {
      res.status(200).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: error.message || 'User not found!',
        },
      });
    }
}

//update
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    //data validation using zod
    const zodParseData = UserValidationSchema.parse(userData)

    const userId = zodParseData.userId

    const result = await userServices.updateSingleUserFromDb(userId, zodParseData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message || 'User not found!',
      },
    });
  }
};


//put/create order 
const putOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const userId = req.params.userId
    
    const result = await userServices.putOrderIntoDb(userId, orderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Order not found',
      error: {
        code: 404,
        description: error.message || 'User not found!',
      },
    });
  }
};

//get all orders for single user
const getAllOrders = async(req : Request, res : Response) =>{
  try{
      const id = req.params.userId
      const result = await userServices.getAllOrdersFromDb(id)
      res.status(200).json({
          success: true,
          message: "Orders fetched successfully!",
          data: result
      })
  }catch (error) {
      res.status(200).json({
        success: false,
        message: 'Orders not found',
        error: {
          code: 404,
          description: error.message || 'User not found!',
        },
      });
    }
}

//get all orders and calculated total price
const calculateAllOrdersPrice = async(req : Request, res : Response) =>{
  try{
    const id = req.params.userId
      const result = await userServices.calculateOrdersPriceFromDb(id)
      res.status(200).json({
          success: true,
          message: "Total price calculated successfully!",
          data: result
      })
  }catch (error) {
      res.status(200).json({
        success: false,
        message: 'Orders not found',
        error: {
          code: 404,
          description: error.message || 'User not found!',
        },
      });
    }
}


export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  putOrder,
  getAllOrders,
  calculateAllOrdersPrice
};
