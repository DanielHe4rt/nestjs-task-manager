import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

  // private tasks: Task[] = [];
  //
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // createTask(createTaskDto: CreateTaskDto) {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //
  //   this.tasks.push(task);
  //   return task;
  // }

  async getTaskById(id: number): Promise<Task> {
    const data = await this.taskRepository.findOne(id);

    if (!data) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return data;
  }


  //
  // patchTaskById(id: string, updateTaskDto: UpdateTaskDto): Task {
  //   if (!TaskStatus[updateTaskDto.status]) {
  //     delete updateTaskDto.status;
  //   }
  //
  //   const data = this.getTaskById(id);
  //   const indexTask = this.tasks.findIndex(task => task.id === data.id);
  //   this.tasks[indexTask] = { ...this.tasks[indexTask], ...updateTaskDto } as Task;
  //   return this.tasks[indexTask];
  // }
  //
  // deleteTaskById(id: string) {
  //   const data = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== data.id);
  //   return true;
  // }
}
