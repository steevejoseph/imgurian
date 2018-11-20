import React, { Component } from 'react';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api/';

class FileSubmission extends Component {

  constructor(props){
    super(props);
    this.state = {
      pic: null,
    }
  }
  
  handleUploadFile = () => {
    const data = new FormData();
    const serviceId = '5bf45e72676c03e56c4fdab6';

    data.append('image', this.state.pic);
    // data.append('name', 'some value user types');
    // data.append('description', 'some value user types');
    
    axios
      .post(`${ROOT_URL}/photos/service/${serviceId}/create`, data)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }
   
  render() {
    return (
      <div>
        <input type="file" name="image" onChange={event => this.setState({ pic: event.target.files[0] })} />
        <input type="submit" onClick={this.handleUploadFile} />
      </div>
    );
  }
}

export default FileSubmission;
