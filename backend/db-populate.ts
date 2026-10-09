import { db } from './src/prisma/db.ts';

async function main() {
  const expenses = await db.orm.public.Expense.createAll([
  {
    "date": "2025-01-16",
    "description": "Example expense #1 from Alice",
    "payer": "Alice",
    "amount": 25.5
  },
  {
    "date": "2025-01-15",
    "description": "Example expense #2 from Bob",
    "payer": "Bob",
    "amount": 35
  },
  {
    "date": "2025-01-15",
    "description": "Example expense #3 from Alice",
    "payer": "Alice",
    "amount": 2
  },
  {
    "date": "2026-09-18",
    "description": "New random Expense",
    "payer": "New random Payer",
    "amount": 69.56660033593514
  },
  {
    "date": "2026-09-18",
    "description": "New random Expense",
    "payer": "New random Payer",
    "amount": 12.66630576002703
  },
  {
    "date": "2026-09-18",
    "description": "New random Expense",
    "payer": "New random Payer",
    "amount": 21.267052537904252
  },
  {
    "date": "2026-09-18",
    "description": "New random Expense",
    "payer": "New random Payer",
    "amount": 29.445904735715157
  }
]);
  console.log(expenses);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });