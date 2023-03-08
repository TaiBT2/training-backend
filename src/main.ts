import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { configuration } from './config/configuration';
import { useContainer } from 'class-validator';
import { unset } from 'lodash';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = configuration();
  const reflector = new Reflector();
  app.enableCors({
    origin: true,
    methods: '*',
    credentials: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        validationErrors.forEach((err) => unset(err, 'target'));
        return new BadRequestException(validationErrors);
      },
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
