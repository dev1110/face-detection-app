import React from 'react';
import './FaceDetection.css';

class FaceDetection extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      input: '',
      imageUrl: '',
      box: {}
    }
  }
  onInputChange =(event)=>{
    this.setState({input:event.target.value});
  }

  onImageUrlSubmit =() => {
    this.setState({imageUrl:this.state.input});
    if(this.state.input==''){
      return false;
    }
    fetch('https://tranquil-refuge-48785.herokuapp.com/imageurl',{
      method: 'post', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input,
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data !== 'failed'){
        fetch('https://tranquil-refuge-48785.herokuapp.com/image',{
          method: 'put', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.props.userId,
          })
        })
        .then(response => response.json())
        .then(entries => {
          if(entries !== 'failed'){
            this.props.updateEntries()
          }else{
            console.log(`can't increment rank`)
          }
        })
        .catch(error => console.log(error))
      }
       this.displayFaceBox(this.calculateFaceLocation(response));
      })
    .catch(err => console.log('Bad Image Url!'));
  }
  
  calculateFaceLocation = (data) =>{
    const boundaries = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: boundaries.left_col * width,
      topRow: boundaries.top_row * height,
      rightCol: width - (boundaries.right_col * width),
      bottomRow: height - (boundaries.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  render(){
    const {imageUrl, box} = this.state;
    return(
      <div>
        <p className='f4'>
          {`This Magic app will detect faces in your picture. Give it a try.`}
        </p>
        <div className='center' style={{width:'600px'}}>
          <input onChange = {this.onInputChange} type='text' className='f4 pa2 w-70 center' placeholder='Paste Your Image Url Here'/>
          <button onClick = {this.onImageUrlSubmit} className='w-30 grow f4 pv2'>
            Detect
          </button>
        </div>
        <div className='center ma'>
          <div className='absolute mt2'>
            <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto' />
            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default FaceDetection;