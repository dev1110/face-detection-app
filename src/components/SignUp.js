import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpName: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpError: '',
    }
  };
  
  onNameChange =(event) =>{
    this.setState({signUpName: event.target.value})
  }
  onEmailChange =(event) =>{
    this.setState({signUpEmail: event.target.value})
  }
  onPasswordChange =(event) =>{
    this.setState({signUpPassword: event.target.value})
  }
  
  onSubmitSignUp =() =>{
    fetch('https://tranquil-refuge-48785.herokuapp.com/signup',{
      method: 'post', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.signUpName,
        email: this.state.signUpEmail,
        password: this.state.signUpPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data ==='success'){
        this.props.onRouteChange('signin');
      }else{
        this.setState({signUpError:data})
        // console.log(data)
      }
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div >
        <article className="pa4 black-80 br3 gark-gray mv4 w-50-m w-25-l mw6 shadow-5 center">
          <div>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="ph0 mh0 fw6 f3 theme">Sign Up</legend>
              <div className="mt3">
                <label className="db fw4 lh-copy f5 white" htmlFor="name">Name</label>
                <input 
                  className="b pa2 br2 input-reset ba bg-white" 
                  type="text" 
                  name="name"  
                  id="name"
                  required ='required'
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f5 white" htmlFor="email-address">Email address</label>
                <input 
                  className="b pa2 br2 input-reset ba bg-white" 
                  type="email" 
                  name="email-address" 
                  id="email-address"
                  onChange = {this.onEmailChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f5 white" htmlFor="password">Password</label>
                <input 
                  className="b pa2 br2 input-reset ba bg-white" 
                  type="password" 
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="mt3">
              <input
                onClick = {this.onSubmitSignUp}
                style={{backgroundColor:'#61dafb'}} 
                className="b ph3 br2 pv2 input-reset ba b--black grow pointer f5" 
                type="submit" 
                value="Sign Up"
              />
            </div>
            <div className="lh-copy mt3">
              <span className="f5 fw4 link dim db pointer theme " onClick = {() => this.props.onRouteChange('signin')}>←Back</span>
              <span className="f6 fw2 link light-red db">
                {this.state.signUpError}
              </span>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default SignUp;