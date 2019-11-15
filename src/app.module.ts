import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://sheindav:SPW5342118@cluster0-h6hxw.mongodb.net/nest-commerce?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ), 
    SharedModule, 
    AuthModule, ProductModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
