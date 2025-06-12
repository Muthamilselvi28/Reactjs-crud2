import React ,{useEffect,useState}from 'react';
import { Link,useParams } from 'react-router-dom';

function Read() {
  const [udata,setUdata]=useState({});
  console.log(useParams());
  const{id}=useParams();
  console.log(id);
  useEffect(()=>{
    fetch(`http://localhost:5000/data/${id}`)
    .then((res)=>res.json())
    .then((data)=>setUdata(data))
    .catch((err)=>console.log(err.message));

  },[]);
  console.log(udata);
  return (
    <>
      <h1>Selected user Details</h1>
      <div className='content'>
      <p>ID:{udata.id}</p>
     <p>Name:{udata.uname}</p>
     <p>Age:{udata.age}</p>
        <p>City:{udata.city}</p>
        <div className='link'>
        <Link to="/">Back</Link></div>
  
    </div>
    </>
  )
}

export default Read
