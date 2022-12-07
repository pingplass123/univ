import React from 'react'
import '../Category/Category.css'
import CardCategory from '../Category/CardCategory'
import Load from '../Category/Loading';

class Category extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          categorys: [],
          subCategorys: [],
          DataisLoaded: false 
      };
  }

  componentDidMount() {
      Promise.all([
        fetch("https://univelear.herokuapp.com/api/category"),
        fetch("https://univelear.herokuapp.com/api/subcategory")
      ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
          categorys: data1, 
          subCategorys: data2,
          DataisLoaded: true
      }));
  }

  render(){

    const { DataisLoaded, categorys,subCategorys } = this.state;
    const arrSubcategory = [];


    if(DataisLoaded){
      {subCategorys.data.map((data) => {
        if (data.catagoriesID) {
          arrSubcategory.push({
            id: data.id,
            catagoriesID: data.catagoriesID,
            sub_name: data.sub_name,
            description: data.description,
            urlPhoto: data.urlPhoto,
          });
        }
      })}
    }

    if (!DataisLoaded) 
    return <div><Load /></div> ;

    return (
      
      <div className="category" id="category">
        <div className="header">
          <div className="header-blog" >Discover your interesting</div>

        <div className="body" style={{marginTop:'1rem'}}>
          <div className="category-menu">
            {categorys.data.map((data,idx) => 
              <div className="category-title" style={{textAlign: 'left'}}>
                <div className='title' style={{fontWeight: 'bold', fontSize: '1.2rem'}}>
                  <div  className='category-title' style={{color:'white' , marginTop:'0.5rem'}} key={idx}>
                    {data.name}
                  </div>
                  <div className="subcategory scrollCard" style={{display: 'flex'}}>
                  
                    {arrSubcategory.map((item,id)=>
                    {       
                      if(data.id===item.catagoriesID){
                          return <li key={id}></li>,item,
                          <div className="subcategory-detail" style={{fontSize: '1rem' ,fontWeight: 'lighter'}} key={id}>
                              <CardCategory id={item.id} urlPhoto={item.urlPhoto} sub_name={item.sub_name} description={item.description} />
                          </div>
                      }
                    })
                  }  
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      )
  }
}
          

export default Category