import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class LoginPayloadDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@IsString()
	@IsNotEmpty()
	username: string;

	@IsEnum(['admin', 'employee'])
	role: 'admin' | 'employee';
}
