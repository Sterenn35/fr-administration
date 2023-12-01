import { Module } from "@nestjs/common";
import { AssociationsController } from "./associations.controller";
import { AssociationsService } from "./associations.service";
import { UsersModule } from "src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { Association } from "./association.entity";


@Module({
    imports: [UsersModule,TypeOrmModule.forFeature([Association])],
    controllers: [AssociationsController],
    providers: [AssociationsService],
    exports: [AssociationsService]
})
export class AssociationsModule{}