import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP, //https://docs.nestjs.com/microservices/basics
        options: {
          host: envs.micro_host,
          port: envs.micro_port
        }
      },
    ]),
  ],
})
export class ProductsModule {}
