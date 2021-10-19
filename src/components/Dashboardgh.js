import React, { useState, useEffect } from 'react'
import { Table, Container } from 'react-bootstrap'
import { ghUserData } from '../Services/userapi'
import Tasklist from '../components/Tasklist';
import Searchbar from '../components/Searchbar';
import { useCookies } from 'react-cookie';
const Dashboardgh = (props) => {
    const [cookies, setCookie] = useCookies([]);
    let loggedInUserId = "";
    const storedData = JSON.parse(localStorage.getItem("MyUser"));
    if (storedData) {
        loggedInUserId = storedData.user_id;
        if(!cookies.userid){
            setCookie('userid', loggedInUserId, { path: '/' });
        }
    }
    const [loader, setLoader] = useState(false);
    const [userlist, setUserlist] = useState([]);
    const [dateseven, setDateseven] = useState([]);
    const [tasklist, setTasklist] = useState([]);
    const [AllUserlist, setAllUserlist] = useState([]);
    const [searchval, setSearchval] = useState({
        start_date: new Date(new Date().getTime() - (6 * 24 * 60 * 60 * 1000)),
        end_date: new Date(),
        resource: "",
        gh_id: loggedInUserId
    })
    const statefromchild = (newValue, statename) => {
        setSearchval({
            ...searchval,
            [statename]: newValue
        })
    }
    const datasevendays = () => {
        var no_of_days;
        var today; var dd; var mm; var yyyy;
        var result = [];
        if ((searchval.start_date && searchval.start_date !== '' && searchval.start_date !== null) && (searchval.end_date && searchval.end_date !== '' && searchval.end_date !== null)) {
            no_of_days = props.getDifferenceInDays(new Date(props.datconverted(searchval.start_date)), new Date(props.datconverted(searchval.end_date)));
            today = props.datconverted(new Date(searchval.end_date));
        } else if ((searchval.start_date && searchval.start_date !== '' && searchval.start_date !== null) && (searchval.end_date === '' || searchval.end_date === null)) {
            no_of_days = props.getDifferenceInDays(new Date(props.datconverted(searchval.start_date)), new Date(props.datconverted(new Date())));
            today = props.datconverted(new Date());
        } else if ((searchval.start_date === '' || searchval.start_date === null) && (searchval.end_date && searchval.end_date !== '' && searchval.end_date !== null)) {
            no_of_days = props.getDifferenceInDays(new Date(props.datconverted(new Date(searchval.end_date.getTime() - (30 * 24 * 60 * 60 * 1000)))), new Date(props.datconverted(searchval.end_date)));
            today = props.datconverted(new Date(searchval.end_date));
        } else {
            no_of_days = '6';
            today = props.datconverted(new Date());
        }
        //alert(no_of_days)
        for (var i = 0; i <= no_of_days; i++) {
            var d = new Date(today);
            d.setDate(d.getDate() - i);
            dd = d.getDate();
            mm = d.getMonth() + 1;
            yyyy = d.getFullYear();
            if (dd < 10) { dd = '0' + dd }
            if (mm < 10) { mm = '0' + mm }
            var datefinal = yyyy + '-' + mm + '-' + dd;
            result.push(datefinal)
        }
        setDateseven(result);
    }
    /*useEffect(() => {
        datasevendays();
    }, [])*/
    const getUserList = async () => {
        setLoader(true);
        //alert("Now Loader turn off");
        let res = await ghUserData(searchval);
        //console.log(res.data.tasklistdata)
        if (res.data.message === 'user list fetched') {
            setAllUserlist(res.data.userdatalist)
            setUserlist(res.data.userdata)
            setTasklist(res.data.tasklistdata)
        } else {
            alert(res.data.message)
        }
        setLoader(false)
    }
    useEffect(() => {
        datasevendays();
        getUserList();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    //console.log(searchval);
    return (
        <>
            <div className="login" style={{ marginTop: '90px', width: '95%', overflow: 'overlay', maxWidth: '95%' }}>
                <Searchbar start_date={searchval.start_date} end_date={searchval.end_date} resource={searchval.resource} onchange={statefromchild} datasevendays={datasevendays} getUserList={getUserList} AllUserlistdata={AllUserlist} loader={loader} />
            </div>
            {  loader ? <Container style={{ textAlign: 'center' }}><img src="/images/ajax-spinner.gif" alt="Loader" /></Container> :
            <div className="outsider" style={{ marginTop: '-75px' }}>
                <div className="login scroll" style={{ maxWidth: '95%' }}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th style={{ width: '25%', textAlign: 'center' }}>Team Members</th>
                                <th style={{ width: '25%', textAlign: 'center' }}>12PM</th>
                                <th style={{ width: '25%', textAlign: 'center' }}>3PM</th>
                                <th style={{ width: '25%', textAlign: 'center' }}>6PM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dateseven.map((dataval, indexdate) =>
                                    <React.Fragment key={indexdate}>
                                        <tr>
                                            <th style={{ textAlign: 'center', backgroundColor: 'lightskyblue' }} colSpan="4">{dataval}</th>
                                        </tr>
                                        {
                                            userlist.map((userdata, index) =>
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td>{userdata.name}&nbsp;({userdata.employee_code})</td>
                                                        {
                                                            tasklist.map((taskdata, indextask) =>
                                                                <Tasklist key={indextask} dateblock={dataval} userid={userdata.user_id} tasklist={taskdata} />
                                                            )
                                                        }
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="4"></td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        }
                                    </React.Fragment>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </div> }
        </>
    )
}
export default Dashboardgh;