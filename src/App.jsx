/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react'
import './App.css'
import CreateTask from './components/CreateTask'
import { TasksList } from './components/TasksList'
import { Toaster } from "react-hot-toast";

import { DndProvider } from 'react-dnd';
import {HTML5Backend} from'react-dnd-html5-backend';

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    if(localStorage.getItem("tasks") != null){
      setTasks(JSON.parse(localStorage.getItem("tasks")))
    }else{
      setTasks([])
    }
  },[])

  console.log(tasks);
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster/>
      <div className='bg-slate-100 w-screen h-screen flex flex-col items-center pt-32 gap-10'>
        <div className='text-center'>
          <h2 className='text-lg'>My Todo Tasks</h2>
          <p>Do your best today</p>
        </div>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <TasksList tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  )
}

export default App
