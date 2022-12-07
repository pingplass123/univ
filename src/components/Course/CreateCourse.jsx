import '../Blog/CreateBlog.css';
import { useState, useEffect } from 'react';
import parser from "html-react-parser";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import swal from "sweetalert";

const CreateBlog = () => {
  //get name
  const getName = localStorage.getItem("user");
  const name = getName.slice(0);

  //GET DATE TIME
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  
  const [title,setTitle]=useState("")
  const [image, setImage] = useState();


  //SELECT HASHTAG
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

    // CONNECT API SUBCATEGORY
    useEffect(() => {
      fetch("https://univelear.herokuapp.com/api/subcategory")
        .then((res) => res.json())
        .then((json) => {
          const data = [];
          // console.log('before',data);
          json.data.forEach((element) => {
            data.push({ label: element.sub_name, value: element.id });
          });
          // console.log('after',data);
          setOptions(data);
          // console.log("clear data", data);
  
          setTimeout(() => {}, 3000);
        });
    }, []);

   //convert file Img to Base64
   const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  // console.log(title);

    // CONNECT API CREATE
    const token = localStorage.getItem("token");
    async function CreatePost(credentials) {
      return fetch("https://univelear.herokuapp.com/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(credentials),
      })
        .then((data) => data.json())
        .then(console.log(credentials));
    }
    // SET STATE FORM SUBMIT
    const classes = useState();
    const [body, setBody] = useState("");
    const sub_id = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const select_label = [];
    selected.forEach((element) => {
      select_label.push(element.label);
    });
    const response = await CreatePost({
      title,
      body,
      sub_id,
      hastag: select_label,
      image,
    });
    // RESPONSE SUBMIT
    if (response.success) {
      swal("Success", response.message, "successfully.", {
        buttons: false,
        icon: "success",
        timer: 2000,
      });
    } else {
      swal("Failed", response.message, "error");
    }
  
  };

  
  return (
    
    <Form  onSubmit={handleSubmit}>
      <div className="create-blog">
      <Form.Label><h2>Created by {name}</h2></Form.Label><br/>
      <Form.Label>{date}{' '}{time}</Form.Label><hr/>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label style={{color:'#37a6fb'}}>What's your blog title?</Form.Label>
          <Form.Control
          type="text" 
          value={title} 
          placeholder="Enter title"
          required
          onChange={(event)=>{
            setTitle(event.target.value)
          }}/>
      </Form.Group>
      
      <Form.Label style={{color:'#37a6fb'}}>Select your hashtag!</Form.Label>
        <Select
          defaultValue={selected}
          options={options}
          value={selected}
          required
          onChange={setSelected}
        />
        <br/>
      <Form.Label style={{color:'#37a6fb'}}>Select your cover blog!</Form.Label>
      <div className="mb-3 ">
        <input
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg, .gif" //set type
          required
          onChange={(e) => handleFileUpload(e).setImage}
        />
        <img src={image} height="300"/>
      </div>

      <div className="text-end">
        <Button 
        variant="primary" 
        type='submit' 
        className='mb-3' 
        style={{margin:'0.5rem', marginLeft:'1rem'}}>
          Create
        </Button>
      </div>
      </div>
  </Form>
  )
}

export default CreateBlog