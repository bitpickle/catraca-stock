import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './AppModule';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const config = new DocumentBuilder()
    .setTitle('Stock Control Service')
    .setDescription('Catraca.co stock service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  process.env.TZ = 'America/Sao_Paulo'
}

bootstrap();

