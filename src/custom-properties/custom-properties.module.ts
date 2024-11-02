import { Module } from '@nestjs/common';
import { CustomPropertiesService } from './custom-properties.service';
import { CustomPropertiesController } from './custom-properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomProperty } from './custom-property.entity';

@Module({
	providers: [CustomPropertiesService],
	controllers: [CustomPropertiesController],
	imports: [TypeOrmModule.forFeature([CustomProperty])],
})
export class CustomPropertiesModule {}
