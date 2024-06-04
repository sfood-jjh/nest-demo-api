import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(payload: { title: string; name: string; content: string }) {
    const { title, name, content } = payload;

    return this.prisma.post.create({
      data: {
        title,
        name,
        content,
      },
    });
  }

  async findAll(payload: { skip?: number; take?: number }) {
    const skip = +(payload?.skip || 0);
    const take = +(payload?.take || 10);

    console.log(skip, take);

    const [count, list] = await this.prisma.$transaction([
      this.prisma.post.count({
        skip,
        take,
      }),
      this.prisma.post.findMany({
        skip,
        take,
      }),
    ]);

    return {
      total: count,
      list,
      skip,
      take,
    };
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(
    id: number,
    payload: { title: string; name: string; content: string },
  ) {
    const { title, name, content } = payload;

    return this.prisma.post.update({
      data: {
        title,
        name,
        content,
      },
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
