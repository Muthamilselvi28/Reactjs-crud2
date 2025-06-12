import React,{useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Update() {
  const {id}=useParams();
  const[uid,setId]=useState("");
  const[uname,setName]=useState("");
  const [age,setAge]=useState("");
  const[city,setCity]=useState("");
  const [validation,setValidation]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    fetch(`http://localhost:5000/data/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
      setId(data.id);
      setName(data.uname);
      setAge(data.age);
      setCity(data.city);})
    .catch((err)=>console.log(err.message));
  },[]);
  console.log(`http://localhost:5000/data/${id}`);
  const handleSubmit=(evt)=>{
    evt.preventDefault();
    const data1={id,uname,age,city};
    fetch(`http://localhost:5000/data/${id}`,{
      method:"PUT",
      headers: {"Content-Type": "application/json"},

      body:JSON.stringify(data1)

    })
    .then((res)=>{
      if(res.ok){
        alert("user updated successfully")
        navigate("/");

      }else{
        throw new Error("Failed to updated user");

      }
    })
.catch((err)=>console.error(err));

    };

  

  return (
    <>
      <h1>Edit details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='id'>ID</label>
        <input
        type="text"
        placeholder='enter user id'
        name='id'
        value={id}
        onChange={(e)=>setId(e.target.value)}
        required
        onMouseDown={()=>setValidation(true)}/>
{id.length === 0 && validation && (
  <span>please enter your ID</span>
)}

<label htmlFor='name'>name</label>
<input
type="name"
placeholder='Enter your name'
name='name'
value={uname}
required

onChange={(e)=>setName(e.target.value)}
onMouseDown={()=>setValidation(true)}/>

{uname.length === 0 && validation && (
  <span>please enter your name</span>
)}

<label htmlFor='age'>Age</label>
<input
type='text'
placeholder='enter your Age '
name='age'
value={age}
required
onChange={(e)=>setAge(e.target.value)}
onMouseDown={() =>setValidation(true)}/>
{age.length === 0 && validation && (
  <span>please enter your Age</span>
)}

<label htmlFor='city'>City</label>
<input
type="text"
placeholder='enter your city'
name='city'
value={city}
required
onChange={(e)=>setCity(e.target.value)}
onMouseDown={()=>setValidation(true)}/>
{city.length === 0 && validation &&(
  <span>please enter your city</span>
)}

<button className="btnn" type="submit">
  Update
</button>
<Link to="/">Back</Link>




      </form>
    </>
  );
}

export default Update
