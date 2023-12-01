import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsService } from './associations.service';
import { Repository } from 'typeorm/repository/Repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AssociationsController } from './associations.controller';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
findOne: jest.fn(entity => entity),
}));

describe('AssociationsController', () => {
let controller: AssociationsController;
let service: AssociationsService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [AssociationsController],
    providers: [AssociationsService, {provide: getRepositoryToken(Association), useFactory: repositoryMockFactory}]
  }).compile();
  service = module.get<AssociationsService>(AssociationsService);
  controller = module.get<AssociationsController>(AssociationsController);
});

describe('getAll', () => {
  it('should return an array of associations', async () => {
    const expected = Promise.all([{ 
        id: 0,
        name: 'Assoc1',
        users: []
    }]);
    jest.spyOn(service, 'getAll').mockImplementation(() => expected);
    expect(await controller.getAll()).toBe(await expected);
  });
});

describe('getById', () => {
  it('should return a single association, with the provided id', async () => {
    const user: User = {
      id: 0,
      lastname: 'Doe',
      firstname: 'John',
      age: 23,
      password: 'hola'
    }
    const expected = await Promise.all([{ 
      id: 0, 
      name: 'Assoc1',
      users:[user]
    }]);
    jest.spyOn(service, 'getById').mockImplementation(id => {
      return Promise.resolve(expected[id]);
    });
    expect(await controller.getById({id: 0})).toBe(expected[0]);
  })
});

describe('create', () => {
  it('should return a single association, the one that has been created', async () => {
    const user: User = {
      id: 0,
      lastname: 'Doe',
      firstname: 'John',
      age: 23,
      password: 'hola'
    }
    const expected = await Promise.all([{ 
      id: 0, 
      name: 'Assoc1',
      users:[user]
    }]);
    jest.spyOn(service, 'create').mockImplementation( () => { return Promise.resolve(expected[0])});
    expect(await controller.create({name:'Assoc1', idUsers:[0]})).toBe(await expected[0]);
  })
});

});