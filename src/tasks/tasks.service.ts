import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const data = this.tasks.find(task => task.id === id);

    if (!data) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return data;
  }

  patchTaskById(id: string, updateTaskDto: UpdateTaskDto): Task {
    if (!TaskStatus[updateTaskDto.status]) {
      delete updateTaskDto.status;
    }

    const data = this.getTaskById(id);
    const indexTask = this.tasks.findIndex(task => task.id === data.id);
    this.tasks[indexTask] = { ...this.tasks[indexTask], ...updateTaskDto } as Task;
    return this.tasks[indexTask];
  }

  deleteTaskById(id: string) {
    const data = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== data.id);
    return true;
  }
}
