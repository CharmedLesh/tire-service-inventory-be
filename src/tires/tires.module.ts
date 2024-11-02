import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiresService } from './tires.service';
import { TiresController } from './tires.controller';
import { Tire } from './tire.entity';

@Module({
	providers: [TiresService],
	controllers: [TiresController],
	imports: [TypeOrmModule.forFeature([Tire])],
})
export class TiresModule {}
