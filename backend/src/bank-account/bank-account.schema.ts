import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BankAccountDocument = BankAccount & Document;

@Schema()
export class BankAccount {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ required: true, default: 0 })
    balance: number;

    @Prop({ required: true, enum: ['active', 'inactive'] })
    status: 'active' | 'inactive';
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
