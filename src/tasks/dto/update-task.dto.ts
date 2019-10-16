import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  name?: string;
  description?: string;
  status?: TaskStatus;
}
