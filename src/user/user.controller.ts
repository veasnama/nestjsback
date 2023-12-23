import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {

    constructor(private Userservice: UserService) {

    }
    @Post('/create')
    CreateUser(@Body() body : Request) {
        this.CreateUser(body)
    }
    @Post('/remove')
    RemoveUser(@Body() body : Request) {
        this.RemoveUser(body)
    }
    @Post('/update')
    UpdateUser(@Body() body: Request) {
        this.UpdateUser(body)
    }
    @Get('/profile')
    UserProfile(@Query() query: Request) {
        this.UserProfile(query)
    }
}
