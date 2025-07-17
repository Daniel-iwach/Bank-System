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

  @Put('/deposit/:accountId')
  deposit(@Param('accountId') accountId: string, @Body('amount') amount: number) {
    return this.bankAccountService.depositMoney(accountId, amount);
  }

  @Put('/withdraw/:accountId')
  withdraw(@Param('accountId') accountId: string, @Body('amount') amount: number) {
    return this.bankAccountService.withdrawMoney(accountId, amount);
  }

  @Get('/exist/:cbu')
  exist(@Param('cbu') cbu: string) {
    return this.bankAccountService.existAccount(cbu);
  }

  @Get("/findUser/:accountId")
  findUserByAccount(@Param('accountId') accountId: string) {
    return this.bankAccountService.findUserByAccount(accountId);
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
