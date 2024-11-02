import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
} from '@nestjs/common';
import { CustomPropertiesService } from './custom-properties.service';
import { CustomProperty } from './custom-property.entity';

type ID = string;

@Controller('custom-properties')
export class CustomPropertiesController {
	constructor(
		private readonly customPropertiesService: CustomPropertiesService,
	) {}

	@Post()
	create(
		@Body() propertyData: Partial<CustomProperty>,
	): Promise<CustomProperty> {
		return this.customPropertiesService.createCustomProperty(propertyData);
	}

	@Get()
	findAll(): Promise<CustomProperty[]> {
		return this.customPropertiesService.getAllCustomProperties();
	}

	@Get(':id')
	findOne(@Param('id') id: ID): Promise<CustomProperty> {
		return this.customPropertiesService.getCustomPropertyById(id);
	}

	@Put(':id')
	update(
		@Param('id') id: ID,
		@Body() updateData: Partial<CustomProperty>,
	): Promise<CustomProperty> {
		return this.customPropertiesService.updateCustomPropertyById(
			id,
			updateData,
		);
	}

	@Delete(':id')
	remove(@Param('id') id: ID): Promise<void> {
		return this.customPropertiesService.removeCustomPropertyById(id);
	}
}
