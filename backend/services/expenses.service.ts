import fs from "fs";
import type { Expense, NewExpense } from "../types/expense.ts";
import { db } from '../src/prisma/db.ts';

export class ExpensesService {

  // private static dataPath = "./data/expenses.json";
  // private static resetPath = "./data/expenses.init.json";
  
  public static async getExpenses(): Promise<Expense[]> {
    return await this.readExpenses();
  }
  
  public static async addExpense(newExpense: NewExpense): Promise<Expense[]> {
    await db.orm.public.Expense.create(newExpense);
    return await this.readExpenses() ;
  }
  
  public static async resetExpenses(): Promise<Expense[]> {
    await this._resetExpenses();
    return await this.readExpenses();
  }
  
  private static async readExpenses(): Promise<Expense[]> {
    try {
      const data = await db.orm.public.Expense.all();
      return data.map((item) => ({
        ...item,
        id:String(item.id),
      })) as Expense[];
    } catch (error) {
      console.error("Error reading expenses file:", error);
      throw error;
    }
  }

  private static async _resetExpenses(): Promise<void> {
    try {
      await db.orm.public.Expense.where({}).deleteAll();
    } catch (error) {
      console.error("Error resetting expenses file:", error);
      throw error;
    }
  }
  
}