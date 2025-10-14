import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useSwagger } from './configs/swagger.config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Log CORS configuration

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Validate body/query/params dựa trên DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ field thừa
      forbidNonWhitelisted: false,
      transform: true, // chuyển kiểu theo DTO
      exceptionFactory: (errors) => {
        const messages = errors
          .flatMap((e) => Object.values(e.constraints ?? {}))
          .filter(Boolean);
        const message = messages.length
          ? `Validation failed: ${messages.join(', ')}`
          : 'Validation failed';
        return new Error(message) as any;
      },
      transformOptions: {
        enableImplicitConversion: true,
        exposeDefaultValues: true,
      },
    }),
  );

  // Serialize entity/DTO theo @Expose/@Exclude và chuẩn hóa response
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseInterceptor(app.get(Reflector)),
  );

  // Enable Swagger UI
  useSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
