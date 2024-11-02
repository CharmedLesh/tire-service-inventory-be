import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomProperty {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ default: false })
	required: boolean;

	@Column()
	dataType: 'string' | 'number' | 'boolean' | string[] | number[];
}
