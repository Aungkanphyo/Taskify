
export interface Todo{
    id : number;
    todo : string;
    isDone : boolean;
}

// type Action = 
// {type:'add',payload:string}|
// {type:'remove',payload:number}|
// {type:'done',payload:number}
// const TodoReducer = (state:Todo[],action:Action)=>{

// }
// import { useReducer } from "react";
// const ReducerExample = ()=>{
//     const [state, dispatch] = useReducer(TodoReducer, []);
// }