import { TaskStatus } from '../task.status-enum';

export class UpdateTaskDto {
  name?: string;
  description?: string;
  status?: TaskStatus;
}
