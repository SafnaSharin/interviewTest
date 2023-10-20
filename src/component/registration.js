import { useState } from 'react';
import styles from "./register.module.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';



function Form(){
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [address,setAddress]=useState("")
    const [image,setImage]=useState(null)
    const [fieldRequired, setFieldRequired] = useState(false);
    const navigate = useNavigate();

    const handleimg =(e)=>{
        const image=e.target.files[0];
        setImage(image)
       }

    const submit =async(e)=>{
        e.preventDefault();
        if (name === '' || password === '' || address==='') {
            setFieldRequired(true);
            toast.error("Please enter all fields");
            return;
        }
        const data={
          name:name,
          address:address,
          password:password,
          image:image,
     }
     console.log(data)
        try{         
            const response = await axios.post('http://localhost:4000/admin/submit',data,{
                headers:{
                'Content-Type':'multipart/form-data',
                },        
            });
            
            navigate('/profile');
        }
        catch(err){
          console.log("errrorr")
        }
    }
return(
<section className="h-100 h-custom" style={{backgroundColor: '#8fc4b7'}}>
    <Toaster/>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-8 col-xl-6">
        <div className="card rounded-3">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp" className={styles.img}  alt="Samplephoto" />
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
            <form className="px-md-2">
              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example1q">Name</label>
                <input type="text" id="form3Example1q" className="form-control" onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example1q">Address</label>
                <input type="text" id="form3Example1q" className="form-control" onChange={(e)=>setAddress(e.target.value)} />
              </div>
              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example1q">Password</label>
                <input type="password" id="form3Example1q" className="form-control" onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example1q">Image</label>
                <input type="file" id="form3Example1q" className="form-control"  accept="image/*"  onChange={handleimg} />
              </div>             
               <button type="submit" className="btn btn-success btn-lg mb-1" onClick={submit}>Submit </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

);
}
export default Form;