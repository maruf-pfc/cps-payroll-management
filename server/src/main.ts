import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' }); // or your frontend domain
  app.setGlobalPrefix('api'); // now routes will be /api/auth/login etc.
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
