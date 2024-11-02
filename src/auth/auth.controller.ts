import {
	Controller,
	Post,
	Body,
	UnauthorizedException,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	async register(@Body() createUserDto: CreateUserDto) {
		return this.authService.register(createUserDto);
	}

	@Post('login')
	async login(
		@Body() loginCredentialsDto: LoginCredentialsDto,
	): Promise<{ access_token: string }> {
		try {
			const user =
				await this.authService.validateUser(loginCredentialsDto);
			return this.authService.login(user);
		} catch (error) {
			if (
				error instanceof NotFoundException ||
				error instanceof UnauthorizedException
			) {
				throw error;
			}
			throw new InternalServerErrorException(
				'An unexpected error occurred',
			);
		}
	}
}
