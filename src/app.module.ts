import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: '13245678', 
      database: 'task_manager',  
      autoLoadEntities: true,
      synchronize: true, // продакшені off
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
