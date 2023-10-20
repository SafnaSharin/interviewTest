import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/details");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
   
    
      try {
        await axios.delete(`http://localhost:4000/admin/delete/${id}`);
        alert('Are you sure want to delete?')
        console.log('deleted');
       
      
       
      } catch (err) {
        console.log(err);
      }
    
  };
  
  return (
    <div className={styles.maindiv}>
        <h1 className={styles.heading}> Registered Users</h1>
    <ul class="list-group list-group-light">
    {data && data.map((datas)=>(
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <img src={`http://localhost:4000/uploads/${datas.image}`}  alt="" style={{width: "45px" ,height:" 45px"}}
        class="rounded-circle" />
      <div class="ms-3">
        <p class="fw-bold mb-1">{datas.name}</p>
        <p class="text-muted mb-0">{datas.address}</p>
      </div>
    </div>
    <div>
    <Link to={`/edit/${datas._id}`}><button>edit</button></Link>
    <button onClick={()=>handleDelete(datas._id)}>Delete</button>
   
    </div>
  </li>
    ))}
 
</ul>
</div>
  );
}
export default Profile;
