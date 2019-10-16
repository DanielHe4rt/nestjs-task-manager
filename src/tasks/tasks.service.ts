import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [1,2,3,4];

  getAllTasks() {
    return this.tasks;
  }
}
