import { PartialType } from '@nestjs/mapped-types';
import { CreateBankRegisterDto } from './create-bank-register.dto';

export class UpdateBankRegisterDto extends PartialType(CreateBankRegisterDto) {}
