import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './users/user.entity';
import { Association } from './associations/association.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.entity';
import { MinutesModule } from './minutes/minutes.module';

@Module({
  imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'mydatabase.db',
          entities: [User, Association, Role],
          synchronize: true,
        }),
        UsersModule, AssociationsModule, AuthModule, RolesModule, MinutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
