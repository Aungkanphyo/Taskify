import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../models';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { MdDownloadDone } from "react-icons/md";
import { Draggable } from '@hello-pangea/dnd';

type Props = {
    index : number;
    todo : Todo;
    todos : Todo[];
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({index,todo,todos,setTodos}:Props) => {
  const [editTodo,setEditTodo] = useState<string>(todo.todo);
  const [edit,setEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null)

  // when edit todo task, this place the cursor to the end of the todo task text
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])
  
  const handleDone = (id:number)=>{
    setTodos(todos.map((todo)=>todo.id === id?{...todo,isDone:!todo.isDone}:todo));
  }

  const handleDelete = (id:number)=>{
    setTodos(todos.filter((todo)=>todo.id !== id));
  }

  const handleEdit = (e:React.FormEvent,id:number)=>{
    e.preventDefault();
    setTodos(todos.map((todo)=>todo.id === id ? {...todo,todo:editTodo} : todo));
    setEdit(false);
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided)=>(
          <form ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps} onSubmit={(e)=>handleEdit(e,todo.id)} className='flex justify-between rounded-md p-2 bg-yellow-400 items-center min-w-[20%] ms-5 mb-3 me-2 duration-200 shadow hover:shadow-lg hover:shadow-black hover:scale-95'>
          {
            edit ? (
              <input ref={inputRef} onChange={(e)=>setEditTodo(e.target.value)} className='w-28 me-2 text-black rounded-md ps-2' type="text" value={editTodo} />
            ):(
              todo.isDone ? (
                <s className='me-5'>{todo.todo}</s>
              ):(
                <span className='me-5'>{todo.todo}</span>
              )
            )
          }
          <div className='flex'>
              <span onClick={()=>{
                if(!edit && !todo.isDone){
                  setEdit(!edit);
                }
              }} className='mr-2 cursor-pointer'><FaEdit/></span>
              <span onClick={()=>handleDelete(todo.id)} className='mr-2 cursor-pointer'><MdDeleteSweep/></span>
              <span onClick={()=>handleDone(todo.id)} className='mr-2 cursor-pointer'><MdDownloadDone/></span>
          </div>
        </form>
        )
      }
    </Draggable>
  )
}

export default SingleTodo
