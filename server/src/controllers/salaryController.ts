import { Request, Response } from 'express';
import Salary from '../models/salaryModel';

export const createSalary = async (req: Request, res: Response) => {
  try {
    const salary = new Salary(req.body);
    await salary.save();
    res.status(201).json(salary);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSalaries = async (req: Request, res: Response) => {
  const { date } = req.query;

  try {
    const salaries = await Salary.find({ date });
    res.status(200).json(salaries);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSalariesInRange = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    const salaries = await Salary.find({
      date: { $gte: startDate, $lte: endDate }
    });
    res.status(200).json(salaries);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeSalary = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const salary = await Salary.findByIdAndDelete(id);
    if (!salary) {
      return res.status(404).json({ message: 'Salary not found' });
    }
    res.status(200).json({ message: 'Salary removed successfully' });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};