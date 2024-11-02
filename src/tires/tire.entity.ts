import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tire {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ default: 'available' })
	status: string;

	@Column()
	manufacturer: string;

	@Column()
	type: 'P' | 'LT' | 'ST';

	@Column()
	sectionWidth: number;

	@Column()
	aspectRatio: number;

	@Column()
	construction: 'R' | 'D';

	@Column()
	rimDiameter: number;

	@Column()
	loadRating: number;

	@Column()
	speedRating: number;

	@Column()
	season: 'winter' | 'summer' | 'all';

	@Column('decimal', { nullable: true })
	purchasePrice: number;

	@Column('decimal', { nullable: true })
	desiredSellingPrice: number;

	@Column('decimal', { nullable: true })
	soldPrice: number;

	@Column('jsonb', { nullable: true })
	customProperties: Record<string, any>;
}
