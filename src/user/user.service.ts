import { Injectable } from '@nestjs/common';
// User actual business  logical 
@Injectable()
export class UserService {

    CreateUser(user) {
        // get data from request body  and write them into database
    }

    RemoveUser(user) {
        // Find user with a requested user and remove it from database
    }
    UpdateUser(user) {
        // Update user data in database and a query and return updated data into client
    }
    UserProfile(query) {
        // get user information from database and return it the client
    }
}
