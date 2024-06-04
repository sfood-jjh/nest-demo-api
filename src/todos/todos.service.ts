import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(payload: { content: string }) {
    const { content } = payload;
    return this.prisma.todo.create({ data: { content } });
  }

  findAll() {
    return this.prisma.todo.findMany();
  }

  update(id: number, payload: { checked: boolean }) {
    const { checked = false } = payload;

    return this.prisma.todo.update({ data: { checked }, where: { id } });
  }

  remove(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
