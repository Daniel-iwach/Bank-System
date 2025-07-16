import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { BankRegisterModule } from './bank-register/bank-register.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Habilita variables de entorno (.env)
    MongooseModule.forRoot(process.env.MONGO_URI!), UserModule, BankAccountModule, BankRegisterModule,
  ],
})
export class AppModule {}
