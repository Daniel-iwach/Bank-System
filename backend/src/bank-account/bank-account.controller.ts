import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(createBankAccountDto);
  }

  @Put('/deposit/:userId')
  deposit(@Param('userId') userId: string, @Body('amount') amount: number) {
    return this.bankAccountService.depositMoney(userId, amount);
  }

  @Get()
  findAll() {
    return this.bankAccountService.findAll();
  }

  @Get('/:userId')
  findOne(@Param('userId') userId: string) {
    return this.bankAccountService.findOneByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankAccountDto: UpdateBankAccountDto) {
    return this.bankAccountService.update(+id, updateBankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(+id);
  }
}
