import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_fast_chef',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ProdutoModule,
    CategoriaModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
