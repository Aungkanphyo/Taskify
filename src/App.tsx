import React, { useState } from 'react'
import './App.css'
import InputField from './components/InputField';
import { Todo } from './models';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

function App() {

  const [todo,setTodo] = useState<string>('');
  const [todos,setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  
  const handleAdd = (e:React.FormEvent)=>{
    e.preventDefault();
    if(todo){
      setTodos([...todos,{id : Date.now(),todo : todo,isDone : false}]);
      setTodo('');
    }
  }
  console.log(todos);
  
  
  const onDragEnd = (result:DropResult)=>{
    const {source,destination} = result;
    console.log(result);
    
    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;
    let add,active = todos,complete = completedTodos;

    if(source.droppableId === "TodoList"){
      add = active[source.index];
      active.splice(source.index,1);
    }else{
      add = complete[source.index];
      complete.splice(source.index,1);
    }

    if(destination.droppableId === "TodoList"){
      active.splice(destination.index,0,add);
    }else{
      complete.splice(destination.index,0,add);
    }
  }

  return (
   <DragDropContext onDragEnd={onDragEnd}>
    <div className='flex flex-col justify-center'>
    <div className='text-center font-bold text-lg'>Taskify</div>
    <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
    <TodoList completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} todos={todos} setTodos={setTodos}/>
   </div>
   </DragDropContext>
  )
}

export default App
