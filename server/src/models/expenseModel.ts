import mongoose, { Schema, Document } from 'mongoose';

interface IExpense extends Document {
  description: string;
  amount: number;
  price: number;   // Price per unit of the item
  cost: number;    // Calculated cost = amount * price
  date: string;
}

const ExpenseSchema: Schema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  date: { type: String, required: true },
});

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
