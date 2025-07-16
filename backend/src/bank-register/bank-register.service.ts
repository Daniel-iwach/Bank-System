import { Injectable } from '@nestjs/common';
import { BankRegister } from './bank-register.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBankRegisterDto } from './dto/create-bank-register.dto';
import { UpdateBankRegisterDto } from './dto/update-bank-register.dto';

@Injectable()
export class BankRegisterService {

  constructor(@InjectModel(BankRegister.name) private bankRegisterModel: Model<BankRegister>) {}

  create(createBankRegisterDto: CreateBankRegisterDto) {
    return this.bankRegisterModel.create(createBankRegisterDto);
  }

  findAll() {
    return `This action returns all bankRegister`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankRegister`;
  }

  update(id: number, updateBankRegisterDto: UpdateBankRegisterDto) {
    return `This action updates a #${id} bankRegister`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankRegister`;
  }
}
