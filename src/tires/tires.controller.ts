import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TiresService } from './tires.service';
import { Tire } from './tire.entity';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('tires')
export class TiresController {
	constructor(private readonly tiresService: TiresService) {}

	@Post()
	create(@Body() createTireDto: Partial<Tire>): Promise<Tire> {
		return this.tiresService.createTire(createTireDto);
	}

	@Get()
	findAll(@Query() query): Promise<Tire[]> {
		const filters = {};
		const order = {};

		if (query.status) {
			filters['status'] = query.status;
		}

		if (query.manufacturer) {
			filters['manufacturer'] = query.manufacturer;
		}

		if (query.manufacturer) {
			filters['size'] = query.size;
		}

		if (query.manufacturer) {
			filters['season'] = query.season;
		}

		if (query.sortBy) {
			order[query.sortBy] = query.order === 'DESC' ? 'DESC' : 'ASC';
		}

		const options = {
			where: filters,
			order,
		};

		return this.tiresService.getAllTires(options);
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Tire> {
		return this.tiresService.getTireById(id);
	}

	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() updateTireDto: Partial<Tire>,
	): Promise<Tire> {
		return this.tiresService.updateTireById(id, updateTireDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.tiresService.removeTireById(id);
	}
}
