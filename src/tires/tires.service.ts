import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Tire } from './tire.entity';

type ID = string;

@Injectable()
export class TiresService {
	constructor(
		@InjectRepository(Tire)
		private tireRepository: Repository<Tire>,
	) {}

	createTire(tireData: Partial<Tire>): Promise<Tire> {
		const tire = this.tireRepository.create(tireData);
		return this.tireRepository.save(tire);
	}

	getAllTires(options?: FindManyOptions<Tire>): Promise<Tire[]> {
		return this.tireRepository.find(options);
	}

	getTireById(id: ID): Promise<Tire> {
		return this.tireRepository.findOneBy({ id });
	}

	async updateTireById(id: ID, updateData: Partial<Tire>): Promise<Tire> {
		await this.tireRepository.update(id, updateData);
		return this.tireRepository.findOneBy({ id });
	}

	async removeTireById(id: ID): Promise<void> {
		await this.tireRepository.delete(id);
	}
}
