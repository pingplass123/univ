import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateBlog from './CreateBlog';
import CreateCourse from '../Course/CreateCourse';
import {BiArrowBack} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom';
import './TabCreate.css';

function TabCreate() {
  const navigate = useNavigate();
  
  return (
    <div className='tabtab'>
      
    <Tabs
      defaultActiveKey="Blog"
      id="uncontrolled-tab-example"
      className="mb-3"
   >
      <Tab eventKey="Blog" title="Blog">
          <div  onClick={()=>navigate(-1)} style={{display:'flex',marginLeft:'1rem'}}>
            <div className='align-self-center'><BiArrowBack/></div>
            <div className='back'>&nbsp;go back</div>
          </div>
        <CreateBlog/>
      </Tab>
      <Tab eventKey="Course" title="Course">
          <div  onClick={()=>navigate(-1)} style={{display:'flex',marginLeft:'1rem'}}>
            <div className='align-self-center'><BiArrowBack/></div>
            <div className='back'>&nbsp;go back</div>
          </div>
        <CreateCourse />
      </Tab>
    </Tabs>
    </div>
  );
}

export default TabCreate;