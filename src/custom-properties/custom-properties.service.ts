import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomProperty } from './custom-property.entity';
import { Repository } from 'typeorm';

type ID = string;

@Injectable()
export class CustomPropertiesService {
	constructor(
		@InjectRepository(CustomProperty)
		private customPropertyRepository: Repository<CustomProperty>,
	) {}

	createCustomProperty(
		propertyData: Partial<CustomProperty>,
	): Promise<CustomProperty> {
		const property = this.customPropertyRepository.create(propertyData);
		return this.customPropertyRepository.save(property);
	}

	getAllCustomProperties(): Promise<CustomProperty[]> {
		return this.customPropertyRepository.find();
	}

	getCustomPropertyById(id: ID): Promise<CustomProperty> {
		return this.customPropertyRepository.findOneBy({ id });
	}

	async updateCustomPropertyById(
		id: ID,
		updateData: Partial<CustomProperty>,
	): Promise<CustomProperty> {
		await this.customPropertyRepository.update(id, updateData);
		return this.customPropertyRepository.findOneBy({ id });
	}

	async removeCustomPropertyById(id: ID): Promise<void> {
		await this.customPropertyRepository.delete(id);
	}
}
