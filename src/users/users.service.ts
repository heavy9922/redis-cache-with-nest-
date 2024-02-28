import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import { sleep } from 'src/sleep';

@Injectable()
export class UsersService {
  private  users = [
    {
      id:1,
      name: 'John 1',
      lastname:'perez'
    },
    {
      id:2,
      name: 'John 2',
      lastname:'perez'
    },
    {
      id:3,
      name: 'John 3',
      lastname:'perez'
    },
    {
      id:4,
      name: 'John 4',
      lastname:'perez'
    },
  ]

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const usersCacheKey = 'users';
    const cachedUsers = await this.cacheManager.get(usersCacheKey);

    if (cachedUsers) {
      return cachedUsers;
    }

    await  sleep(5000)
    await this.cacheManager.set(usersCacheKey, this.users, 1000 * 10);
    return this.users
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
