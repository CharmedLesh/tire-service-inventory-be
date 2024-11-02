import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsEnum(['admin', 'employee'])
	role: 'admin' | 'employee';
}
