import { Temporal } from 'temporal-polyfill';
(globalThis as any).Temporal = Temporal;
import { db } from './src/prisma/db.ts';

async function main() {

  // const users = await db.orm.public.User.createAll([
  //   {
  //     "name":"Bob",
  //     "email":"b@mail.com",
  //     "bankAccount":"1234567890",
  //   },
  //   {
  //     "name":"Alice",
  //     "email":"a@mail.com",
  //     "bankAccount":"0987654321",
  //   }
  // ])

  const expenses = await db.orm.public.Expense.createAll([
    {
      "description": "ex 1",
      "amount": 25.5,
      "date": Temporal.PlainDate.from({ year: 2021, month: 7, day: 1 }).toZonedDateTime("UTC").toInstant(),
      "payerId":1,    
    },
    {
      "description": "ex 2",
      "amount": 56.5,
      "date": Temporal.PlainDate.from({ year: 2021, month: 7, day: 1 }).toZonedDateTime("UTC").toInstant(),
      "payerId":2,    
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