import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Register() {
  const [username, setUsername] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCorrect,changeIsCorrest]=useState(false);
  const [passwordMatched,changePasswordMatched]=useState(false);

  const handleRegister = () => 
  {
    // Add your Register logic here
  }

  function PassHandler(e)
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
    else
    {
      let a=false,b=false,c=false,d=false;

      for(let i=0;i<x.length;i++)
      {
        if(x[i]>='a'&&x[i]<='z')
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
  };

  function CheckHandler(e)
  {
      setCPassword(()=>
      {
        const x=e.target.value
        return x;
      })

      // alert(cpassword + " " +password);

      if(e.target.value===password)
      {
        changePasswordMatched(()=>{
          return true;
        })
      }
      else
      {
        changePasswordMatched(()=>
        {
          return false;
        })
      }
  }

  return (

    <div className="register">
    <div className="register-container">
      <div className="register-form">
        <h2 className='header'>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={PassHandler}
        />
        {isCorrect?<p style={{color:"green"}}>Correct</p>:<p style={{color:"red"}}>Password must be of 7-15 character && must contain a digit,a uppercase letter && a lowercase letter</p>}
        <input
          type="password"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={CheckHandler}
        />
        {passwordMatched?<p style={{color:"green"}}>Password Matched</p>:<p style={{color:"red"}}>Not Yet Matched</p>}
        <button onClick={handleRegister} className="register-btn" >Register</button>
        <Link to="/login" className="register2">Log into Account</Link>
      </div>
    </div>
    </div>
  );
}

export default Register;