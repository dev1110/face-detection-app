import React from 'react';
import './App.css';
import FaceDetection from './components/FaceDetection';
import Navigation from './components/Navigation';
import Rank       from './components/Rank';
import SignIn     from './components/SignIn';
import SignUp     from './components/SignUp';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0
      },
      route: 'signin',
    }
  }

  loadUser= (user) =>{
    this.setState({
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries
      }
    });
  }
  updateEntries= () => {
    this.setState(Object.assign(this.state.user, {entries:this.state.user.entries +1}));
  }
  onRouteChange = (route) => {
    this.setState({route: route});
  }
  onSignOut = () => {
    this.setState({user:{email:''}});
    this.setState({route: 'signin'});
  }

  render(){
    return (
      <div className="App">
        <Navigation onRouteChange = {this.onRouteChange} state = {this.state.route} onSignOut = {this.onSignOut}/>
        {this.state.route === 'home' ?
        <div>
          <Rank user ={this.state.user.name} rank={this.state.user.entries} />
          <FaceDetection
            updateEntries = {this.updateEntries}
            userId = {this.state.user.id}
          /> 
        </div>
        : 
        ( this.state.route ==='signin'?
          <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
          :
          <SignUp onRouteChange = {this.onRouteChange}/>
        )
        }
      </div>
    );
  }
}

export default App;
