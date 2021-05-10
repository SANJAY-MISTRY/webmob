import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const SignUp = (props) => {
    const history = useHistory();
    const [name, setName] = useState({
        value: "",
        error: false,
        message: "",
    });

    const [email, setEmail] = useState({
        value: "",
        error: false,
        message: "",
    });

    const [password, setPassword] = useState({
        value: "",
        error: false,
        message: "",
    });

    const [rePassword, setRePassword] = useState({
        value: "",
        error: false,
        message: "",
    });

    const formValidation = () => {
        let returnValue = true;
        console.log(name, email, password, rePassword);
        if (name.value == "" || name.value == undefined) {
            setName({
                ...name,
                error: true,
                message: "Required",
            });
            returnValue = false;
        }
        if (email.value == "" || email.value == undefined) {
            setEmail({
                ...email,
                error: true,
                message: "Required"
            })
        }
        if (password.value == "" || password.value == undefined) {
            setPassword({
                ...password,
                error: true,
                message: "Required"
            })
        }
        if (rePassword.value == "" || rePassword.value == undefined) {
            setRePassword({
                ...rePassword,
                error: true,
                message: "Required"
            })
        }

        if (
            name.error ||
            email.error ||
            password.error ||
            rePassword.error
        ) {
            returnValue = false;
        }
        return returnValue;
    }

    const submitHandler = () => {
        const isValid = formValidation();
        console.log(isValid);
        console.log(JSON.stringify({
            username: name.value,
            email: email.value,
            password: password.value
        }));
        axios({
            method: 'post',
            url: 'http://68.183.48.101:3333/users/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                username: name.value,
                email: email.value,
                password: password.value
            })
        }).then(function (response) {
            console.log(response);
            localStorage.setItem('accessToken', response.data.data.token.token)
          })
          .then(function (nav) {
            let token = localStorage.getItem("accessToken");
            if(token){
                history.push('/user-list')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div style={{border:'1px solid orange', width:'300px', padding:"20px", margin:'20px auto', borderRadius:'20px'}}>
            <div>
            <h2 className="text-center" style={{fontFamily:'cursive', fontWeight:'bold', color:'#ffc107'}}> SIGN UP</h2>
            </div>
            <hr style={{color:"orange", height:'1px', fontFamily:"cursive"}}></hr>
                <div>
                <div className="form-group py-2">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" 
                    value={name.value}
                        onChange={(e) => {
                            if (e.target.value.trim().length > 0) {
                                setName({
                                    ...name,
                                    error: false,
                                    value: e.target.value,
                                });
                            } else {
                                setName({
                                    ...name,
                                    error: true,
                                    value: e.target.value,
                                    message: "First Name is required feild",
                                });
                            }
                        }} />
                </div>
                <div className="form-group py-2">
                    <label>Email address</label>
                    <input type='email'
                        className="form-control"
                        placeholder="Email"
                        value={email.value}
                        onChange={(e) => {
                            if (e.target.value.trim().length > 0) {
                                setEmail({
                                    ...email,
                                    error: false,
                                    value: e.target.value,
                                });
                            } else {
                                setEmail({
                                    ...email,
                                    error: true,
                                    value: e.target.value,
                                    message: "email is required feild",
                                });
                            }
                        }} />
                    {email.error && (
                        <p>{email.message}</p>
                    )}
                </div>
                <div className="form-group py-2">
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder="Password"
                        className="form-control"
                        value={password.value}
                        onChange={(e) => {
                            if (e.target.value.trim().length > 0) {
                                setPassword({
                                    ...password,
                                    error: false,
                                    value: e.target.value,
                                });
                            } else {
                                setPassword({
                                    ...password,
                                    error: true,
                                    value: e.target.value,
                                    message: "Password is required feild",
                                });
                            }
                        }} />
                    {password.error && (
                        <p>{password.message}</p>
                    )}
                </div>
                <div className="form-group py-2">
                    <label>Confirm-password</label>
                    <input
                        type='password'
                        placeholder="Confirm-password"
                        className="form-control"
                        value={rePassword.value}
                        onChange={(e) => {
                            let error = false;
                            let message = "";
                            if (e.target.value.trim().length == 0) {
                                error = true;
                                message = "Confirm password is required field";
                            } else if (e.target.value !== password.value) {
                                error = true;
                                message = "Password and Confirm Password should match";
                            }
                            setRePassword({
                                ...rePassword,
                                error: error,
                                value: e.target.value,
                                message: message,
                            });
                        }} />
                    {rePassword.error && (
                        <p>{rePassword.message}</p>
                    )}
                </div>
                </div>
                {/* <div>
                    <label>Email</label><br />
                    <input type='email'
                        placeholder="Email"
                        value={email.value}
                        onChange={(e) => {
                            if (e.target.value.trim().length > 0) {
                                setEmail({
                                    ...email,
                                    error: false,
                                    value: e.target.value,
                                });
                            } else {
                                setEmail({
                                    ...email,
                                    error: true,
                                    value: e.target.value,
                                    message: "email is required feild",
                                });
                            }
                        }} />
                    {email.error && (
                        <p>{email.message}</p>
                    )}
                </div> */}
                {/* <div>
                    <label>Password</label><br />
                    <input
                        type='password'
                        placeholder="Password"
                        className="form-control"
                        value={password.value}
                        onChange={(e) => {
                            if (e.target.value.trim().length > 0) {
                                setPassword({
                                    ...password,
                                    error: false,
                                    value: e.target.value,
                                });
                            } else {
                                setPassword({
                                    ...password,
                                    error: true,
                                    value: e.target.value,
                                    message: "Password is required feild",
                                });
                            }
                        }} />
                    {password.error && (
                        <p>{password.message}</p>
                    )}
                </div> */}
                {/* <div>
                    <label>Re enter password</label><br />
                    <input
                        type='password'
                        placeholder="Re enter password"
                        value={rePassword.value}
                        onChange={(e) => {
                            let error = false;
                            let message = "";
                            if (e.target.value.trim().length == 0) {
                                error = true;
                                message = "Confirm password is required field";
                            } else if (e.target.value !== password.value) {
                                error = true;
                                message = "Password and Confirm Password should match";
                            }
                            setRePassword({
                                ...rePassword,
                                error: error,
                                value: e.target.value,
                                message: message,
                            });
                        }} />
                    {rePassword.error && (
                        <p>{rePassword.message}</p>
                    )}
                </div> */}
                <button className="btn btn-outline-warning w-100 mt-3" onClick={submitHandler} >Sign Up</button>
            
        </div>
    );
}

export default SignUp;