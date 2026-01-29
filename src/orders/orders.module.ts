import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ORDER_SERVICE } from 'src/config/services';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP, //https://docs.nestjs.com/microservices/basics
        options: {
          host: envs.orders_host,
          port: envs.orders_port
        }
      },
    ]),
  ],
})
export class OrdersModule { }
