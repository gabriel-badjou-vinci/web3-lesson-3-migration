/* eslint-disable react-hooks/rules-of-hooks */
// import { useState } from "react";
import { ExpenseFormSchema, type Expense, type NewExpense } from "../types/Expense";
import { useForm } from "react-hook-form";



interface ExpenseAddProps {
  addExpense: (expense: NewExpense) => void;
}

function generateRandomExpense(): Expense {
  return {
    id: Math.round(Math.random()*100).toString(),
    date: "2026-09-18",
    description: "New random Expense",
    payer: "New random Payer",
    amount: Math.random() * 100
  };
}

function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  // const [name,setName] = useState("Bob");
  // const [description,setDescription] = useState("");
  // const [amount,setAmount] = useState(0);
  // const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const {
  handleSubmit,
  register
} = useForm<NewExpense>();

const onSubmit = async (data:NewExpense) =>{
  // console.log("onSubmit: "+JSON.stringify(data))
  const result = ExpenseFormSchema.safeParse({
    description: data.description,
    payer: data.payer,
    amount: data.amount,
    date: data.date
  })

  if(result.success){
    await addExpense(data);
  }else{
    console.log(result.error);
  }
  
};

  // const handleSubmit = (e:SyntheticEvent) => {
  //   e.preventDefault();
  //   const exp:Expense = {
  //     id: Math.round(Math.random()*100).toString(),
  //     date: "2026-09-18",
  //     description: description,
  //     payer: name,
  //     amount: amount
  //   }
  //   console.log("exp:"+JSON.stringify(exp));
  //   // addExpense(exp);
  // }

  return <div>
    <h2>Add a new random Expense</h2>
    <button onClick={() => addExpense(generateRandomExpense())}>Add</button>
    <h3>Add a detail Expense</h3>

    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Payer : 
        <select {...register("payer")}>
          <option value={"Bob"} >Bob</option>
          <option value={"Alice"} >Alice</option>
        </select>
      </label>
      <br />
      <label>
        Date :
        <input type="date" {...register("date", {required:true})} /> 
      </label>
      <br />
      <label>
        Description :
        <input type="text" {...register("description", {required:true})} /> 
      </label>
      <br />
      <label>
        Amount :
        <input type="number" {...register("amount", {required:true,valueAsNumber:true})} /> 
      </label>
      <button type="submit">Add</button>
      {/* 
      <label htmlFor="name">Name</label>
      <select value={name} onChange={(e)=>setName(e.target.value)}>
        <option value={"Bob"} >Bob</option>
        <option value={"Alice"}>Alice</option>
      </select>
      <label htmlFor="date">Date</label>
      <input 
        name="date"
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)} />
      <br />
      <label htmlFor="description">Description</label>
      <input
        name="description"
        type="text"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
        <br />
      <label htmlFor="amount">Amount</label>
      <input
        name="amount"
        type="number"
        value={amount}
        onChange={(e)=>setAmount(Number(e.target.value))}
      /> */}
      
    </form>
  </div>;
}

export default ExpenseAdd;
