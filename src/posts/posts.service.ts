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

  async findAll(payload: {
    skip?: number;
    take?: number;
    title?: string;
    name?: string;
    content?: string;
  }) {
    const { skip, take, title, name, content } = payload;

    const pagination = {
      skip: +(skip || 0),
      take: +(take || 10),
    };

    const where = {
      title: title ? { contains: title } : undefined,
      name: name ? { contains: name } : undefined,
      content: content ? { contains: content } : undefined,
    };

    const [count, list] = await this.prisma.$transaction([
      this.prisma.post.count({
        where: {
          ...where,
        },
        ...pagination,
      }),
      this.prisma.post.findMany({
        where: {
          ...where,
        },
        ...pagination,
      }),
    ]);

    return {
      total: count,
      list,
      ...pagination,
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
