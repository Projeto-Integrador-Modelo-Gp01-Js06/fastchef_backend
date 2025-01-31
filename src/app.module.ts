import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
TypeOrmModule.forRootAsync({
	useClass: ProdService,
    imports: [ConfigModule],
}),
    ProdutoModule,
    CategoriaModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
