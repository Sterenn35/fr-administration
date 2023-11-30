import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Association } from './associations/association.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
              type: 'sqlite',
              database: 'mydatabase.db',
              entities: [User, Association],
              synchronize: true}),UsersModule, AssociationsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService]
})
export class AppModule {}
