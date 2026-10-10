import fs from "fs";
import type { Expense, NewExpense } from "../types/expense.ts";
import { db } from '../src/prisma/db.ts';
import { Temporal } from "temporal-polyfill";
(globalThis as any).Temporal = Temporal;
export class ExpensesService {

  // private static dataPath = "./data/expenses.json";
  // private static resetPath = "./data/expenses.init.json";
  
  public static async getExpenses(): Promise<Expense[]> {
    return await this.readExpenses();
  }
  
  public static async addExpense(newExpense: NewExpense): Promise<Expense[]> {
    console.log("aaaaaaaaaaaaaaaaaa");
    try {
    await db.orm.public.Expense.create({
      amount: newExpense.amount,
      description: newExpense.description,
      date: Temporal.PlainDate.from(newExpense.date).toZonedDateTime("UTC").toInstant(),
      payerId: newExpense.payer === "Bob" ? 1 : 2,
    });
    // console.log(newExpense.payer , newExpense.payer === "Bob");
  } catch (e) {
    console.error("create a échoué :", e);
    throw e;
  }
    console.log("bbbbbbbbbbbbbbbbbb");
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
        id: String(item.id),
        payer: (item.payerId === 1 ? "Bob" : "Alice")
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