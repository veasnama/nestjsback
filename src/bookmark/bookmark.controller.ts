import {
  Controller,
  Post,
  Delete,
  Body,
  Patch,
  Param,
  Put,
} from '@nestjs/common';
import { BookMarkDto } from './dto';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Post('/create')
  async create(userId: number, dto: BookMarkDto) {
    const bookmark = await this.bookmarkService.createBookmark(userId, dto);
    return bookmark;
  }
  @Delete('/:id')
  async remove(@Param('id') id: number) {
    const bookmark = await this.bookmarkService.removeBookmark(id);
    return bookmark;
  }
  @Put('/:id')
  async update(@Param('id') id: number, @Body() data: Partial<BookMarkDto>) {
    const bookmark = this.bookmarkService.updateBookmark(id, data);
    return bookmark;
  }
}
