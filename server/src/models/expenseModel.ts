import mongoose, { Schema, Document } from 'mongoose';

interface IExpense extends Document {
  description: string;
  amount: number;
  date: string;
}

const ExpenseSchema: Schema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
});

export default mongoose.model<IExpense>('Expense', ExpenseSchema);
