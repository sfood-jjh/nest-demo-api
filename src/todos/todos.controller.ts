import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() payload: { content: string }) {
    return this.todosService.create(payload);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: { checked: boolean }) {
    return this.todosService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
