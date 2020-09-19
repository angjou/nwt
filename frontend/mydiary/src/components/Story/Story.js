import React, {Component} from 'react';
import axios from 'axios'
import './Story.css'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

class Story extends Component{
  constructor(props){
    super()
    this.state={
        edit :false,
        title:"",
        description:""
    };
}
handleChange = event =>{
  var name=event.target.name;
  var value=event.target.value
  this.setState({[name]: value});
}
  handleDelete=()=>{
    console.log(this.props.id)
      axios
      .delete(`http://localhost:5000/api/deleteStory/${this.props.id}`)
      .then(res=> console.log(res.status))
      .catch(err=>console.log(err));
      window.location.reload();
  };

  handleEdit=()=>{
    this.setState({edit:!this.state.edit})
  }

  handleSave=()=>{
    axios
      .post(`http://localhost:5000/api/updateStory/${this.props.id}`,{
        title:this.state.title,
        description:this.state.description
      })
      .then(res=> {
      window.location.reload();
    })
  }

    render(){
     const src=require("C:/Users/andel/Desktop/nwt/frontend/mydiary/public/images/"+this.props.image);

        return (
            <MDBCol className="story">
              <MDBCard style={{ width: "22rem" }}>
                <MDBCardImage className="img-fluid" src={src} waves />
                {!this.state.edit && (
                    <MDBCardBody>
                    <MDBCardTitle>{this.props.title}</MDBCardTitle>
                    <MDBCardText>
                      {this.props.description}
                    </MDBCardText>

                     <MDBBtn outline color="primary" onClick={this.handleEdit}>EDIT</MDBBtn>
                    <MDBBtn outline color="red" onClick={()=>this.handleDelete()}>DELETE</MDBBtn>
                  </MDBCardBody>
                 
                  )}
                {this.state.edit && (
                   <MDBCardBody>
                   <MDBCardTitle><input type="text" placeholder={this.props.title} value={this.state.title} onChange={this.handleChange} name="title"/></MDBCardTitle>
                   <MDBCardText>
                     <textarea placeholder={this.props.description} value={this.state.description} onChange={this.handleChange} name="description"></textarea>
                   </MDBCardText>

                    <MDBBtn outline color="yellow" onClick={this.handleSave}>SAVE</MDBBtn>
                   <MDBBtn outline color="red" onClick={()=>this.handleEdit()}>BACK</MDBBtn>
                 </MDBCardBody>
                    )}
              
              </MDBCard>
            </MDBCol>
          );
    }
}

export default Story;