import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (val) => {
        setEmail(val.target.value);
    }
    const handlePasswordChange = (val) => {
        setPassword(val.target.value);
    }
    const handleLoginSubmit = async() => {
        const data = {email, password};
        const response = await 
        // fetch('https://raftaarcheckin.herokuapp.com/user/login'
        fetch('http://18.217.196.171:7070/user/login'
        , {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
        let result = await response.json();
        if(result.result == true)
        {
            window.localStorage.setItem("auth","Authorized");
            window.location.reload();
        }
        else{
            window.alert("Wrong email or password! Please try again.")
        }
    }

    return (
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input onChange={(val) => handleEmailChange(val)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input onChange={(val) => handlePasswordChange(val)} type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Remember Me</label>
            </div>
            <input onClick={handleLoginSubmit} class="btn btn-primary" value="Submit" />
        </form>
    )
}

export default Login;