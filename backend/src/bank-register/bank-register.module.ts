import { Module } from '@nestjs/common';
import { BankRegisterService } from './bank-register.service';
import { BankRegisterController } from './bank-register.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BankRegister, BankRegisterSchema } from './bank-register.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BankRegister.name, schema: BankRegisterSchema },
    ])
  ],
  controllers: [BankRegisterController],
  providers: [BankRegisterService],
})
export class BankRegisterModule {}
