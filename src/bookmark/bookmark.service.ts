import { BadRequestException, Injectable } from '@nestjs/common';
import { BookMarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookmark(userId: number, dto: BookMarkDto) {
    const notemark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return notemark;
  }
  async removeBookmark(id: number): Promise<boolean> {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id },
    });
    if (!bookmark) {
      return false;
    }
    await this.prisma.bookmark.delete({ where: { id } });

    return true;
  }

  async updateBookmark(
    id: number,
    data: Partial<BookMarkDto>,
  ): Promise<BookMarkDto | null> {
    const existingBookmark = await this.prisma.bookmark.findUnique({
      where: { id },
    });
    if (!existingBookmark) {
      return null;
    }
    await this.prisma.bookmark.update({
      where: { id },
      data,
    });
  }
}
