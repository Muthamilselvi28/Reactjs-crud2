import React ,{useState,useEffect}from 'react';
import { Link,useNavigate } from 'react-router-dom';


function Create() {
  const[id,setID]=useState("");
  const[uname,setName]=useState("");
  const[age,setAge]=useState("");
  const[city,setCity]=useState("");
  const [validation,setValidation] = useState(false);
  const navigate=useNavigate();
  useEffect(()=>{
fetch("http://localhost:5000/data")
.then((res)=>res.json())
.then((data)=>{
    if(data.length>0){
      const lastRecord =data[data.length-1];
      const newID=parseInt(lastRecord.id)+1;
      setID(newID.toString());
    }else{
      setID("");
    }
  })
  .catch((err)=>console.log(err.message));
},[]);
const handleSubmit=(evt)=>{
  evt.preventDefault();
  const data1={id,uname,age,city};
  fetch("http://localhost:5000/data",{
    method:"POST",
    headers:{
      "content-type":"application/Json"
    },
    body:JSON.stringify(data1)

  })
.then((res)=>alert("user added successfully"))
.catch((err)=>console.log(err.message));
navigate("/");

};


  return (
    <>
    <h1>Add a user</h1>
<form onSubmit={handleSubmit}>
  <label htmlFor='id'>id</label>

  <input
  type="text"
  placeholder='enter user id'
  name='id'
  value={id}
  onChange={(e)=>setID(e.target.value)}
  required
  onMouseDown={()=>setValidation(true)}/>
  {id.length === 0 && validation && (
    <span>please enter your ID</span>
  )}


<label htmlFor='name'>name</label>

<input
type="text"
placeholder='enter user name'
name='name'
value={uname}
onChange={(e)=>setName(e.target.value)}
required
onMouseDown={()=>setValidation(true)}/>
{uname.length === 0 && validation && (
  <span>please enter your name</span>
)}


<label htmlFor='age'>age</label>

<input
type="text"
placeholder='enter user age'
name='age'
value={age}
onChange={(e)=>setAge(e.target.value)}
required
onMouseDown={()=>setValidation(true)}/>
{age.length === 0 && validation && (
  <span>please enter your age</span>
)}


<label htmlFor='city'>City</label>

<input
type="text"
placeholder='enter user city'
name='city'
value={city}
onChange={(e)=>setCity(e.target.value)}
required
onMouseDown={()=>setValidation(true)}/>
{city.length === 0 && validation && (
  <span>please enter your city</span>
)}

<button type="submit">Submit</button>
<Link to="/">Back</Link>


  </form>      
    </>
  )
}

export default Create
