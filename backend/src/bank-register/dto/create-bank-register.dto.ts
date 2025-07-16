import { IsString, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { OperationType } from '../bank-register.schema';
export class CreateBankRegisterDto {
    @IsString()
    bankAccountId: string;
    
    @IsDateString()
    date: Date;

    @IsString()
    description: string;
    
    @IsNumber()
    amount: number;
    
    @IsEnum(OperationType)
    operation: string;
}
