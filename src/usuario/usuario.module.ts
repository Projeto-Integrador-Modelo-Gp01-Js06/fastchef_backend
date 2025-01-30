import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { UsuarioService } from "./services/usuario.service";
import { UsuarioController } from "./controllers/usuario.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports:[TypeOrmModule.forFeature([Usuario]), 
    forwardRef(() => AuthModule)],
    exports:[UsuarioService],
    providers:[UsuarioService],
    controllers:[UsuarioController],
    
})

export class UsuarioModule {}
