import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerCustomOptions } from '@nestjs/swagger/dist/interfaces/swagger-custom-options.interface';

const APP_NAME = 'API Redice';
const APP_VERSION = '1.0.0';

export const useSwagger = (
  app: INestApplication,
  swaggerOptions?: SwaggerCustomOptions,
) => {
  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`The ${APP_NAME} description`)
    .setExternalDoc('JSON DOCUMENTS', '/api/docs-json')
    .setVersion(APP_VERSION)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
    ...swaggerOptions,
  });
};
