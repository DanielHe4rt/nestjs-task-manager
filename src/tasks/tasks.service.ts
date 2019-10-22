import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status-enum';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();
    return task;
  }

  async getTaskById(id: number): Promise<Task> {
    const data = await this.taskRepository.findOne(id);

    if (!data) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return data;
  }


  async patchTaskById(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (!TaskStatus[updateTaskDto.status]) {
      delete updateTaskDto.status;
    }

    const data = await this.getTaskById(id);

    const updated = { ...data, ...updateTaskDto };

    return this.taskRepository.save(updated);
  }

  async deleteTaskById(id: number) {
    const data = await this.getTaskById(id);

    return await this.taskRepository.delete(data);
  }
}
