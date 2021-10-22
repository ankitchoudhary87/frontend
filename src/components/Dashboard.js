import React, { useState, useEffect } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import useValidator from './useValidator'
import { addTasklist } from '../Services/userapi'
import { useCookies } from 'react-cookie';
const Dashboard = (props) => {
    const [cookies, setCookie] = useCookies([]);
    let loggedInUserId = "";
    const storedData = JSON.parse(localStorage.getItem("MyUser"));
    if (storedData) {
        loggedInUserId = storedData.user_id;
        //if(!cookies.userid){
            setCookie('userid', loggedInUserId, { path: '/' });
        //}
    }
    const [validator, showValidationMessage] = useValidator()
    const [loading, setLoading] = useState(false);
    const [tasklist, setTasklist] = useState({
        tasklistname: "",
        taskchallenge: "",
        user_id: ""
    })
    // set the props as a default user_id in tasklist state
    useEffect(() => {
        if (props.loggedinuser.user_id) {
            setTasklist({ ...tasklist, user_id: props.loggedinuser.user_id });
        }
    }, [props.loggedinuser.user_id]) // eslint-disable-line react-hooks/exhaustive-deps

    const inputVal = (e) => {
        const { name, value } = e.target;
        setTasklist({
            ...tasklist,
            [name]: value
        })
    }
    const submittasklist = async (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            setLoading(true);
            let res = await addTasklist(tasklist);
            if (res.data.message === "Tasklist Added Successfully") {
                alert(res.data.message)
                setLoading(false);
                setTasklist({
                    tasklistname: "",
                    taskchallenge: "",
                    user_id: props.loggedinuser.user_id
                })
            } else {
                setLoading(false);
                alert(res.data.message)
            }
        } else {
            showValidationMessage(true);
        }
    }
    //console.log("AAAA", tasklist)
    return (
        <>
            <div className="outsider">
                <div className="login" style={{ maxWidth: '70%' }}>
                    <form onSubmit={(e) => { submittasklist(e) }}>
                        <div style={{ display: 'flex', justifyContent: 'center', fontSize: '18px' }}>Enter Your Tasklist and Task Challenge</div>
                        <textarea style={{ height: '120px' }} className="newinputval" value={tasklist.tasklistname} placeholder="Enter your tasklist" name="tasklistname" onChange={inputVal} />
                        {/**********   This is where the magic happens     ***********/}
                        {validator.message('tasklistname', tasklist.tasklistname, 'required', {
                            className: 'text-danger spaceparttasklist',
                            messages: {
                                required: "Tasklist is required"
                            }
                        })}

                        <textarea style={{ height: '100px' }} className="newinputval" value={tasklist.taskchallenge} placeholder="Enter your task challenge" name="taskchallenge" onChange={inputVal} />
                        {/*validator.message('taskchallenge', tasklist.taskchallenge, 'required', {
                            className: 'text-danger spaceparttasklist',
                            messages: {
                                required: "Task challenge is required"
                            }
                        })*/}

                        {!loading ? <Button type="submit" style={{ marginTop: '15px', width: 'auto', background: 'rgba(237, 28, 36, 1)', borderRadius: '3px', border: '0 none', padding: '15px 42px', fontSize: '16px', fontWeight: '500', lineHeight: '16px', cursor: 'pointer', textTransform: 'capitalize', color: 'rgba(255, 255, 255, 1)' }}>Add Tasklist</Button> : <Button variant="primary" style={{ marginTop: '15px', width: 'auto', background: 'rgba(237, 28, 36, 1)', borderRadius: '3px', border: '0 none', padding: '15px 42px', fontSize: '16px', fontWeight: '500', lineHeight: '16px', cursor: 'pointer', textTransform: 'capitalize', color: 'rgba(255, 255, 255, 1)' }} disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>}
                    </form>
                </div>
            </div>
        </>
    )
}
export default Dashboard;