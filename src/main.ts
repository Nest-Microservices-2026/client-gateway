import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { RcpExceptionFilter } from './common/filters/rpc-exception.filter';

async function main() {
  const logger = new Logger('Gateway')
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.useGlobalFilters(new RcpExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(envs.port);
  logger.log(`Gateway running on port ${envs.port}`)
}
main();
