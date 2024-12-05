import { Controller, Get, Query, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';  // Оновлений імпорт

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query('completed') completed?: string,
    @Query('priority') priority?: string,
    @Query('date') date?: string,
    @Query('after') after?: string,
    @Query('before') before?: string,
  ): Promise<Task[]> {
    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      return this.tasksService.getTasksByCompletion(isCompleted);
    }

    if (priority) {
      return this.tasksService.getTasksByPriority(priority);
    }

    if (date) {
      return this.tasksService.getTasksByDate(date);
    }

    if (after) {
      return this.tasksService.getTasksAfterDate(after);
    }

    if (before) {
      return this.tasksService.getTasksBeforeDate(before);
    }

    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
  @Body('title') title: string,
  @Body('description') description: string,
  @Body('priority') priority: 'high' | 'medium' | 'low',
  @Body('completed') completed: boolean = false, 
  @Body('createdAt') createdAt: string, 
  ): Promise<Task> {  
   return this.tasksService.createTask(title, description, priority, completed, createdAt);
  }


  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updates: Partial<Task>,
  ): Promise<Task | string> {
    return this.tasksService.updateTask(id, updates);
  }  

    @Delete()
  async deleteAllTasks(): Promise<string> {
    await this.tasksService.deleteAllTasks();
    return 'All tasks have been deleted';
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    const isDeleted = await this.tasksService.deleteTask(id);
    if (isDeleted) {
      return { message: 'Task deleted successfully' };
    }
    return { message: 'Task not found' };
  }
  
  
}
