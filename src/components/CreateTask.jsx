/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react"
import toast  from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';


const CreateTask = ({tasks,setTasks}) => {
    
    const [task,setTask] = useState({
        id:'',
        name:'',
        status:"todo"
    })

    const handleSubmit=(e)=>{     
        e.preventDefault()
        if(task.name.length < 3) return toast.error("The Task must be more than 3 characters")
        if(task.name.length > 100) return toast.error("The Task must be less than 101 characters")

        const list = [...tasks,task]
        localStorage.setItem("tasks",JSON.stringify(list))
        setTasks(list)
        toast.success("The Task was created successfully")

        setTask({
            id:'',
            name:'',
            status:"todo"
        })
    }


  return (
    <form onSubmit={handleSubmit}>
        <input type="text" 
        value={task.name}
        className="border-2 h-10 w-80 border-slate-400 bg-slate-100 rounded-md px-2 mx-4 focus:outline-none focus:border-cyan-500" 
        onChange={(e)=>setTask({...task,id:uuidv4(),name:e.target.value})}/>
        <button className="bg-cyan-500 px-4 rounded-md h-10">Create</button>
    </form>
  )
}

export default CreateTask