import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

type ID = string;

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	async createUser(userData: Partial<User>): Promise<User> {
		const user = this.usersRepository.create(userData);
		return this.usersRepository.save(user);
	}

	async getUserByUsername(username: string): Promise<User | undefined> {
		return this.usersRepository.findOneBy({ username });
	}

	async getUserById(id: ID): Promise<User | undefined> {
		return this.usersRepository.findOneBy({ id });
	}
}
