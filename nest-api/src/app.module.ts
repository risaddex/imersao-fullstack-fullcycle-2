import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
// ES7 decorators
@Module({
  imports: [RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
