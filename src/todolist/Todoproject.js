import React, { useEffect } from 'react'
import { useState } from 'react'
import './todo.css'
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
const Todoproject = () => {
  const [indicate,setIndicate]=useState(false);
  const [alltodo,setTodo]=useState([])
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [completetodo,setCompletetodo]=useState('')
  const handledetails=()=>{
    let todoitems={
      title:title,
      description:description
    }
    let updatetodo=[...alltodo,todoitems]
    // updatetodo.push(todoitems)
    setTodo(updatetodo);
localStorage.setItem('todolist',JSON.stringify(updatetodo))
  };
  const deleteitem=(index)=>{
    let returntodo=[...alltodo];
    returntodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(returntodo));
    setTodo(returntodo)
}
  useEffect(()=>{
     let savetodo=JSON.parse(localStorage.getItem('todolist'));
     let savecompletedata=JSON.parse(localStorage.getItem('completeTodo'));
     if(savetodo){
          setTodo(savetodo);
     }
     if(savecompletedata){
      setCompletetodo(savecompletedata)
     }
  },[])
 const completeitem=(index)=>{
  let filterarray={
  ...alltodo[index]

  }    
  let updatecompletetodo=[...completetodo,filterarray]
  // updatecompletetodo.push(filterarray)
  setCompletetodo(updatecompletetodo)
  localStorage.setItem('completeTodo',JSON.stringify(updatecompletetodo))
  deleteitem(index)
  }
  const deleteitem1=(index)=>{
    let returntodo1=[...completetodo];
    returntodo1.splice(index,1);
    localStorage.setItem('completeTodo',JSON.stringify(returntodo1));
    setCompletetodo(returntodo1)
  }
  return (
    <div>
          <div className="container">
  <div className="input-controler">
    <div className="input-item">
      <label>Title</label>
      <input  type="text" onChange={(e)=>setTitle(e.target.value)} className="arrage" placeholder="Enter Task" />
    </div>
    
    <div className="input-item arrang33">
      <label>Description</label>
      <input type="text" onChange={(e)=>setDescription(e.target.value)}  placeholder="Enter Description" />
    </div>
    <div className="input-item ">
      <button  className="btn33" onClick={handledetails}>Add</button>
    </div>
  </div>
  <hr className='bb1' />
  <div className="container-footer">   
    <div className="container-footer1">
      <div className="viewbtn">
        <div className="viewbtn-item">
          <button className={` ${indicate===false && 'active'}`} onClick={()=>setIndicate(false)}>Task</button>  
        </div>
        <div className="viewbtn-item">
          <button className={`${indicate===true && 'active'}`} onClick={()=>setIndicate(true)}>Complete</button> 
        </div>
      </div> 
      {indicate===false && alltodo.map((item,index)=>{
        return(
      <div className="details" key={index}>
          <div>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
          </div>
          <div className='controldiv'>
         <AiOutlineDelete className='icon' onClick={()=>deleteitem(index)} />
         <BsCheckLg className='check-icon' onClick={()=>completeitem(index)}/>
      </div>
     </div>
      
        )
      })}

{indicate===true && completetodo.map((item,index)=>{
       return (
      <div className="details" key={index}>
          <div>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              {/* <p>{item.finish}</p> */}
          </div>
          <div className='controldiv'>
         <AiOutlineDelete className='icon' onClick={()=>deleteitem1(index)} />
         {/* <BsCheckLg className='check-icon' onClick={()=>completeitem(index)}/> */}
      </div>
     </div>
      
        )
      })}
       
    </div>
  </div>  
</div> 
    </div>
  )
}

export default Todoproject
