import { Request, Response } from 'express';
import Expense from '../models/expenseModel';

export const createExpense = async (req: Request, res: Response) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  const { date } = req.query;

  try {
    const expenses = await Expense.find({ date });
    res.status(200).json(expenses);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const getExpensesInRange = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    const expenses = await Expense.find({
      date: { $gte: startDate, $lte: endDate }
    });
    res.status(200).json(expenses);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeExpense = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: 'expense not found' });
    }
    res.status(200).json({ message: 'expense removed successfully' });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};