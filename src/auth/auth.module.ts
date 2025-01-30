import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";

@Module({
    imports: [
        forwardRef(() => UsuarioModule), 
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'}
    })],
    controllers: [],
    providers: [Bcrypt],
    exports: [Bcrypt]
})
export class AuthModule {};