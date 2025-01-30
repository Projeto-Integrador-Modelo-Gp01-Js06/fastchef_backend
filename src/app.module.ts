import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { AppService } from './app.service';

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
    ProdutoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
