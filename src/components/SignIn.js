import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      signInError:''
    }
  };

  onEmailChange =(event) =>{
    this.setState({signInEmail: event.target.value})
  }
  onPasswordChange =(event) =>{
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn =() =>{
    const {onRouteChange, loadUser} = this.props;
    fetch('http://localhost:3000/signin',{
      method: 'post', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.id){
        loadUser(data);
        onRouteChange('home');
      }else{
        console.log(data)
        this.setState({signInError:data})
      }
    })
    .catch(error => console.log(error))
  }

  render() {  
  return(
    <div >
      <article className="pa4 black-80 br3 gark-gray mv4 w-50-m w-25-l mw6 shadow-5 center">
        <div >
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
            <legend className="ph0 mh0 fw6 f3 theme">Sign In</legend>
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
                onChange = {this.onPasswordChange}
              />
            </div>
            <label className="pa2 lh-copy f5 white pointer"><input type="checkbox"/> Remember me</label>
          </fieldset>
          <div className="mt3">
            <input
              onClick = {this.onSubmitSignIn}
              style={{backgroundColor:'#61dafb'}} 
              className="b br2 ph3 pv2 input-reset ba b--black grow pointer f5" 
              type="submit" 
              value="Sign In"
            />
          </div>
          <div className="lh-copy mt3">
            <span className="f5 link dim db pointer theme" 
              onClick = {() => this.props.onRouteChange('signup')}>
              Sign up
            </span>
            <span className="f5 link dim white db pointer">
              Forgot your password?
            </span>
            <span className="f6 fw2 link light-red db">
              {this.state.signInError}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
  }
}

export default SignIn;