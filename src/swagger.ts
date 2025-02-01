import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/**
 * @description to create swagger documentation
 * @param app
 */
export async function swagger(app: INestApplication, endpoint: string) {
  const options = new DocumentBuilder()
    .setTitle(`demo`)
    .setDescription(
      'API Documentation\
         \n NOTE: The API with (LOCK) symbol can be used only after providing Login API response token in (Authorize)\
         \n -Parameter with * are required to execute related API',
    )
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      name: 'Authorization',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup(endpoint, app, document, {
    customSiteTitle: 'API',
    explorer: false,
  });
}
