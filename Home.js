import React ,{useEffect,useState}from 'react';
import{Link,useNavigate} from "react-router-dom";


function Home() {
    const[udata,setUdata] = useState([]);
    const navigate = useNavigate();
    const displayDetails = (id) =>{
        console.log(id);
        navigate("/read/" + id);

    };
    const UpdateDetails =(id) =>{
        navigate("/update/"+id);
    };
    const deleteDetails = (id) =>{
        if(window.confirm("ARE you  sure you want to delete")){
            fetch(`http://localhost:5000/data/${id}`,{                                    
                method:"DELETE"
            })                                                          
              
            
          .then((res)=>{
            if(res.ok){
                alert("user deleted successfully");
                window.location.reload();
            }
            else{
                throw new Error("Failed to updated user");
            }
          })
          .catch((err)=>console.log(err));
      }
    };
    useEffect(()=>{
        fetch("http://localhost:5000/data")
        .then((res)=>{
            return res.json();

        })
        .then((data)=>{
            console.log(data);
            setUdata(data);
        });
    },[]);
  return (
    <div>
        <h2 >List of Users</h2>
        <div className='head'>
            <Link className='btn' to="/create">
            <input 
             type="search" 
            placeholder='search user....'/>
        
<button>Add record</button>    
            </Link>
            <table>
                <thead>
                <tr className='color'>
                <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Actions</th>
                    </tr>
                    </thead>
                 
                   {udata.map((d,i)=>(
                        <tr key={d.id}>
                           <td>{d.id}</td>
                            <td>{d.uname}</td>
                            <td>{d.age}</td>
                            <td>{d.city}</td>
                            <td>
                               
<button className='read' onClick={()=>displayDetails(d.id)}>
    Read
</button>
<button className='edit' onClick={()=>UpdateDetails(d.id)}>
    Update
</button>
<button className='delete' onClick={()=>deleteDetails(d.id)}>
    Delete
</button></td>


                        </tr>
                    ))}
            </table>
        </div>

      
    </div>
  );
}

export default Home;
