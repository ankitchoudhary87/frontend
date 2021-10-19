import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap'
import useValidator from './useValidator'
import { adminLogin } from '../Services/userapi';
const Login = (props) => {
    const history = useHistory();
    const [validator, showValidationMessage] = useValidator()
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("MyUser"));
        if (storedData) {
            history.push("/");
        } else {
            history.push("/login");
        }
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps
    const inputVal = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    //axios.post("http://localhost:9001/user/login", user).then((res) => { })
    const loginUser = async (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            setLoading(true);
            let res = await adminLogin(user);
            if (res.data.message === "Login Successfully") {
                alert(res.data.message)
                props.updateUserinlocalStorage(res.data.user);
                setLoading(false);
                history.push("/");
            } else {
                setLoading(false);
                alert(res.data.message)
            }
        } else {
            showValidationMessage(true);
        }
    }
    return (
        <>
            <form onSubmit={(e) => { loginUser(e) }}>
                {/* onChange={(e)=>{setUser({...user, f_name: e.target.value})}} */}
                <div className="outsider">
                    <div className="login">
                        <div className="user_img"></div>
                        <br />

                        <input className="newinputval" type="text" value={user.email} placeholder="Enter your username" name="email" onChange={inputVal} />
                        {/**********   This is where the magic happens     ***********/}
                        {validator.message('email', user.email, 'required', {
                            className: 'text-danger spacepart',
                            messages: {
                                required: "Username is required"
                            }
                        })}

                        <input className="newinputval" type="password" value={user.password} autoComplete="on" placeholder="Enter your password" name="password" onChange={inputVal} />
                        {validator.message('password', user.password, 'required|min:4|max:12', {
                            className: 'text-danger spacepart',
                            messages: {
                                required: "Password is required"
                            }
                        })}


                        { /* onClick={(e) => { loginUser(e) }} */}
                        {!loading ? <Button type="submit" style={{ marginTop: '15px', width: 'auto', background: 'rgba(237, 28, 36, 1)', borderRadius: '3px', border: '0 none', padding: '15px 42px', fontSize: '16px', fontWeight: '500', lineHeight: '16px', cursor: 'pointer', textTransform: 'capitalize', color: 'rgba(255, 255, 255, 1)' }}>Login</Button> : <Button variant="primary" style={{ marginTop: '15px', width: 'auto', background: 'rgba(237, 28, 36, 1)', borderRadius: '3px', border: '0 none', padding: '15px 42px', fontSize: '16px', fontWeight: '500', lineHeight: '16px', cursor: 'pointer', textTransform: 'capitalize', color: 'rgba(255, 255, 255, 1)' }} disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>}
                        <br />
                        {/* <div>OR</div>
                    <div className="button" onClick={() => { history.push("/register") }}>Register  OR <Link to="/register">Register</Link> </div>
                    */}
                    </div>
                </div>
            </form>
        </>
    )
}
export default Login;