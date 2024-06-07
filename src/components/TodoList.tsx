import React from 'react'
import { Todo } from '../models'
import SingleTodo from './SingleTodo';
import { Droppable } from '@hello-pangea/dnd';

interface Props {
    todos : Todo[];
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos : Todo[];
    setCompletedTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList:React.FC<Props> = ({todos,setTodos,completedTodos,setCompletedTodos}:Props) => {
  return (
    // container of active tasks and complete tasks
      <div className='flex justify-between items-start w-[95%]'>
        <Droppable droppableId="TodoList">
            {
              (provided,snapshot)=>(
                // active tasks
               <div ref={provided.innerRef}{...provided.droppableProps} className={`${snapshot.isDraggingOver ? "bg-blue-500":""} bg-blue-400 flex flex-col w-[47%] rounded-md p-3`}>
                  <span className='ms-5 mb-3 font-bold text-lg'>Active tasks</span>
                  {
                      todos.map((todo,index)=>(
                          <div key={todo.id}>
                              <SingleTodo index={index} todo={todo} todos={todos} setTodos={setTodos}/>
                          </div>
                      ))
                  }
                  {
                    provided.placeholder
                  }
                </div>
              ) 
            }
        </Droppable>
        
        <Droppable droppableId="TodoRemove">
          {
            (provided,snapshot)=>(
              <div ref={provided.innerRef}{...provided.droppableProps} className={`${snapshot.isDraggingOver ? "bg-orange-500":""} bg-orange-400 flex flex-col w-[47%] rounded-md p-3`}>
                <span className='ms-5 mb-3 font-bold text-lg'>Completed tasks</span>
                {
                    completedTodos.map((todo,index)=><SingleTodo index={index} key={todo.id} todo={todo} todos={completedTodos} setTodos={setCompletedTodos}/>)
                }
                {
                    provided.placeholder
                }
              </div>
            )
          }
        </Droppable>
      </div>
  )
}

export default TodoList;
