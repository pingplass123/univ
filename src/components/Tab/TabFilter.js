import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Search from './Search';
import TimelineBlog from '../Timeline/TimelineBlog';
import TimelineCourse from '../Timeline/TimelineCourse';


function TabFilter() {
  return (
    <Tabs
      defaultActiveKey="Blog"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Blog" title="Blog">
        <TimelineBlog />
      </Tab>
      <Tab eventKey="Course" title="Course">
        <TimelineCourse />
      </Tab>
      <Tab eventKey="Search" title="Search">
        <Search />
      </Tab>
    </Tabs>
  );
}

export default TabFilter;