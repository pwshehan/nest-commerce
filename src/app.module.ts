import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://sheindav:SPW5342118@cluster0-h6hxw.mongodb.net/nest-commerce?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
