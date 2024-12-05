import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTasksByCompletion(completed: boolean): Promise<Task[]> {
    return this.taskRepository.find({ where: { completed } }); 
  }

  async getTasksByPriority(priority: string): Promise<Task[]> {
    return this.taskRepository.find({ where: { priority } }); // Фільтруємо за пріоритетом
  }

  // Видалення всіх завдань
  async deleteAllTasks(): Promise<void> {
    await this.taskRepository.delete({});
  }
  
  async createTask(
    title: string,
    description: string,
    priority: 'high' | 'medium' | 'low',
    completed: boolean,
    createdAt: string,
  ): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.priority = priority;
    task.completed = completed;  // Ось тут ми використовуємо значення completed
    task.createdAt = new Date(createdAt);
    return this.taskRepository.save(task);
  }
  

  async getTasksByDate(date: string): Promise<Task[]> {
    const filterDate = new Date(date);
    return this.taskRepository.find({
      where: {
        createdAt: filterDate,
      },
    });
  }

  async getTasksAfterDate(date: string): Promise<Task[]> {
    const filterDate = new Date(date);
    return this.taskRepository.find({
      where: {
        createdAt: MoreThan(filterDate),
      },
    });
  }

  async getTasksBeforeDate(date: string): Promise<Task[]> {
    const filterDate = new Date(date);
    return this.taskRepository.find({
      where: {
        createdAt: LessThan(filterDate),
      },
    });
  }
  
  async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      return null;
    }
    await this.taskRepository.update(id, updates);
    return this.taskRepository.findOne({ where: { id } });
  }
  
  async deleteTask(id: string): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected > 0;
  }
  
}
