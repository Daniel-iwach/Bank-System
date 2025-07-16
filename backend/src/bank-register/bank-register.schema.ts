import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BankRegisterDocument = BankRegister & Document;

export enum OperationType {
    DEPOSITO,
    RETIRO,
    TRANSFERENCIA_RECIBIDA,
    TRANSFERENCIA_ENVIADA
}
@Schema()
export class BankRegister {
    @Prop({ type: Types.ObjectId, ref: 'BankAccount', required: true })
    bankAccountId: Types.ObjectId;
    
    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true, type: String, enum: OperationType })
    operation: OperationType;

}

export const BankRegisterSchema = SchemaFactory.createForClass(BankRegister);
