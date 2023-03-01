import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { configuration } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = configuration();
  const reflector = new Reflector();

  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('/api');
  await app.listen(config.port);
  console.log('Starting on port ' + config.port);
}
bootstrap();
