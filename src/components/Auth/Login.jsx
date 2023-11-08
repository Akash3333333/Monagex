import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCorrect,changeIsCorrest]=useState(false);

  const handleLogin = () => 
  {
    // Add your login logic here
  };

  function managePassword(e)
  {
      setPassword((x)=>{
        x=e.target.value
        return x;
      })

      const x=e.target.value;

      if(x.length<7 || x.length >15)
      {
        changeIsCorrest(false);
      }
      else if(true)
      {
        let a=false,b=false,c=false,d=false;

        for(let i=0;i<x.length;i++)
        {
          if(x[i]>='a'&&x[i]<=['z'])
          {
            a=true;
          }
          else if(x[i]>='A'&&x[i]<='Z')
          {
            b=true;
          }
          else if(x[i]>='0'&&x[i]<='9')
          {
            d=true;
          }
          else
          {
            c=true;
          }
        }

        if(a&&b&&c&&d)
        {
          changeIsCorrest(true);
        }
        else
        {
          changeIsCorrest(false);
        }
      }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className='header'>Sign In</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={managePassword}
        />
        {isCorrect?<p style={{color:"green"}}>Correct</p>:<p style={{color:"red"}}>InCorrect</p>}
        <button onClick={handleLogin}>Login</button>
        <Link to="/signup" className="register2">Go Back to Register</Link>
      </div>
    </div>
  );
}

export default Login;
