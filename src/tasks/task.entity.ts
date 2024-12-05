import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['high', 'medium', 'low'], default: 'medium' })  // Поле для пріоритету завдання
  priority: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;  // Автоматичне заповнення дати створення
}
