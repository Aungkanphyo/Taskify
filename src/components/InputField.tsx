import React, { useRef } from 'react'

interface Props{
    todo : string;
    setTodo : React.Dispatch<React.SetStateAction<string>>;
    handleAdd : (e:React.FormEvent)=>void;
}

const InputField : React.FC<Props> = ({todo,setTodo,handleAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className='self-center'>
        <form onSubmit={(e)=>{
        handleAdd(e);
        // inputRef.current?.blur;
    }} className='m-6 w-80 relative flex items-center'>
        <input ref={inputRef} value={todo} onChange={(e)=>setTodo(e.target.value)} placeholder='Enter todos...' type="text" className='border w-full focus:outline-none border-black p-3 rounded-full' />
        <button className='bg-blue-500 shadow-lg hover:shadow-indigo-500/100 h-10 w-10 rounded-full p-1 text-white absolute right-1 active:scale-95'>Go</button>
    </form>
    </div>
  )
}

export default InputField
