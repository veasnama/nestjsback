import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// User actual business  logical
@Injectable()
export class UserService {
  constructor() {}
  CreateUser(user: any) {
    // get data from request body  and write them into database
    
  }

  async GetUser(userId: any) {
    // try{
    //     let user = await this.prisma.user.findUnique({
    //         where: {id: userId}
    //     });
    //     return user;
    // }catch(error) {
    //     console.log("Error while finding user")
    //     return {error: error};
    // }
    
  }

  RemoveUser(user) {
    // Find user with a requested user and remove it from database
  }

  UpdateUser(user) {
    // Update user data in database and a query and return updated data into client
  }
}
