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