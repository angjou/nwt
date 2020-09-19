import React, {Component} from 'react';
import './AddStory.css';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';


class AddStory extends Component {
    constructor(props){
        super()
        this.state={
            fileInputName :"Choose a file",
            selectedFile: null,
            title:"",
            description:""
        };
    }
     onChangeHandler= event=>{
       this.setState({
          selectedFile: event.target.files[0],
          fileInputName: event.target.files[0].name
       })
     }
     uploadHandler = ()=>{
       const data = new FormData()
       data.append('file', this.state.selectedFile)
       console.log(data.getAll('file'));
       axios.post("http://localhost:5000/upload",data, {})
       .then(res=> {
         console.log(res.statusText)
       })
     }
     handleChange = event =>{
       var name=event.target.name;
       var value=event.target.value
       this.setState({[name]: value});
     }
     submitHandle=()=>{
       axios
       .post('http://localhost:5000/api/submitStory',{
      filename: this.state.fileInputName,
       description: this.state.description,
       title: this.state.title
      })
       .then(res => {
         console.log(res);
         console.log(res.data);
         this.props.history.push("/")
       });
     }
     
    render(){
       return(
       <MDBContainer className="addnewstory">
        <MDBRow>
          <MDBCol md="6">
            <form>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" onClick={this.uploadHandler} id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={this.onChangeHandler}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  {this.state.fileInputName}
                </label>
              </div>
            </div>
              <br />
              <label htmlFor="defaultFormContactSubjectEx"  className="grey-text">
                Title
              </label>
              <input type="text" id="defaultFormContactSubjectEx" value = {this.state.title} onChange={this.handleChange} name="title"className="form-control" />
              <br />
              <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                Description
              </label>
              <textarea type="text" id="defaultFormContactMessageEx"value = {this.state.description} onChange={this.handleChange}className="form-control" name="description" rows="3" />
              <div className="text-center mt-4">
                        <MDBBtn color="warning" outline onClick={this.submitHandle}>
                          Save
                          <MDBIcon far icon="paper-plane" className="ml-2" />
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            );
    }
}

export default AddStory;
