/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { toast } from "react-hot-toast"

export const TasksList = ({tasks,setTasks}) => {
    const [todos,setTodos] = useState([])
    const [inprogress,setInprogress] = useState([])
    const [closed,setClosed] = useState([])

    useEffect(()=>{
        const todosTasks = tasks.filter(task => task.status === "todo")
        const inProgressTasks = tasks.filter(task => task.status === "inProgress")
        const closedTasks = tasks.filter(task => task.status === "closed")
        setTodos(todosTasks)
        setInprogress(inProgressTasks)
        setClosed(closedTasks)
    },[tasks])

    const statuses = ["todo","inProgress","closed"]

  return (
    <div className="flex gap-16">
        {statuses.map((status,index)=><Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inprogress={inprogress} closed={closed} />)}
    </div>
  )
}

const Section = ({status,tasks,setTasks,closed,inprogress,todos}) => {

  const [{isOver},drop] = useDrop(()=>({
    accept: "task",
    drop:(item)=>addItemToSelection(item.id),
    collect: monitor => ({
      isOver:!!monitor.isOver()
    })
  }))

  let text = "Todo"
  let bg = "bg-slate-500"
  let taskToMap= todos

  if (status === "inProgress") {
    text = "In Progress"
    bg = "bg-purple-500"
    taskToMap = inprogress
  }
  if (status === "closed") {
    text = "Completed"
    bg = "bg-green-500"
    taskToMap = closed
  }

  const addItemToSelection = (id) => {
    setTasks((prev)=>{
      const tasksM = prev.map( task =>{
        if (task.id === id) {
          return {...task, status}
        }
        return task
      })
      localStorage.setItem("tasks", JSON.stringify(tasksM))
      toast.success("Task's status has been updated")
      return tasksM
    })
  }

  return (
    <div ref={drop} className="w-80">
        <Header text={text} bg={bg} count={taskToMap.length} />
        {taskToMap.map((task,index)=><Task key={index} task={task} setTasks={setTasks} tasks={tasks} />)}
    </div>
  )
}

const Header = ({text,bg,count}) => {

  return (
    <div className={`${bg} h-10 font-medium flex items-center justify-center text-white rounded-md uppercase text-sm gap-3`}>{text} <span className="h-7 w-7 text-black rounded-full bg-white flex items-center justify-center">{count}</span></div>
  )
}

const Task = ({task,tasks,setTasks}) => {
  
  const [{isDragging},drag] = useDrag(()=>({
    type: "task",
    item:{id:task.id},
    collect: monitor => ({
      isDragging:!!monitor.isDragging()
    })
  }))

  const handleRemove = (id)=>{
    const newTasks = tasks.filter(task => task.id!== id)
    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    toast.success("Task removed")
  }

  

  return (
    <div ref={drag} className={`h-10 font-medium flex items-center justify-between rounded-md text-sm shadow-md cursor-grab my-2 px-2`}>
      <span>{task.name}</span>
      <button className="text-slate-500" onClick={()=>handleRemove(task.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </div>
  )
}

