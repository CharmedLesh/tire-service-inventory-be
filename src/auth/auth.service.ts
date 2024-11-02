import {
	Injectable,
	UnauthorizedException,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LoginPayloadDto } from './dto/login-payload.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(
		loginCredentialsDto: LoginCredentialsDto,
	): Promise<LoginPayloadDto> {
		const { username, password } = loginCredentialsDto;

		const user = await this.usersService.getUserByUsername(username);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		const isPasswordValid = await user.validatePassword(password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Incorrect password');
		}

		return {
			id: user.id,
			username,
			role: user.role,
		};
	}

	async login(user: LoginPayloadDto): Promise<{ access_token: string }> {
		const { id, username, role } = user;
		const payload = {
			username,
			sub: id,
			role,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async register(userData: CreateUserDto) {
		return this.usersService.createUser(userData);
	}
}
