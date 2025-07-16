import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BankRegisterService } from './bank-register.service';
import { CreateBankRegisterDto } from './dto/create-bank-register.dto';
import { UpdateBankRegisterDto } from './dto/update-bank-register.dto';

@Controller('bank-register')
export class BankRegisterController {
  constructor(private readonly bankRegisterService: BankRegisterService) {}

  @Post("/create")
  create(@Body() createBankRegisterDto: CreateBankRegisterDto) {
    return this.bankRegisterService.create(createBankRegisterDto);
  }

  @Get()
  findAll() {
    return this.bankRegisterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankRegisterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankRegisterDto: UpdateBankRegisterDto) {
    return this.bankRegisterService.update(+id, updateBankRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankRegisterService.remove(+id);
  }
}
