import { Injectable } from '@nestjs/common';
import { BankAccount } from './bank-account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountDocument } from './bank-account.schema';

@Injectable()
export class BankAccountService {

  constructor(
    @InjectModel(BankAccount.name)
    private readonly bankAccountModel: Model<BankAccountDocument>,
  ) {}
  
  depositMoney(userId: string, amount: number) {
    return this.bankAccountModel.findOneAndUpdate({ 'user': userId }, { $inc: { 'balance': amount } });
  }
  
  findOneByUserId(userId: string) {
    return this.bankAccountModel.findOne({ 'user': userId });
  }

  create(createBankAccountDto: CreateBankAccountDto) {
    return 'This action adds a new bankAccount';
  }

  findAll() {
    return `This action returns all bankAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
