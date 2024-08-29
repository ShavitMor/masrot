import mongoose, { Schema, Document } from 'mongoose';

interface ISalary extends Document {
  source: string;
  amount: number;
  date: string;
}

const SalarySchema: Schema = new Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
});

export default mongoose.model<ISalary>('Salary', SalarySchema);
