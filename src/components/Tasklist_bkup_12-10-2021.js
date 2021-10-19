import React from 'react'
const nl2br = require('react-nl2br');
const Tasklist = (props) => {
    //console.log(props.tasklist.user_id)
    return (
        <React.Fragment>
            {
                props.dateblock === props.tasklist.date ? props.userid === props.tasklist.user_id ?
                        <>
                            {(() => {
                                if (props.tasklist.time_seconds >= 41400000 && props.tasklist.time_seconds <= 45000000) {
                                    return (
                                        <td style={{ padding: '10px', textAlign: 'left' }}>{nl2br(props.tasklist.tasklist)}</td>
                                    )
                                } else {
                                    return (
                                        ""
                                    )
                                }
                            })()}
                            {(() => {
                                if (props.tasklist.time_seconds >= 52200000 && props.tasklist.time_seconds <= 55800000) {
                                    return (
                                        <td style={{ padding: '10px', textAlign: 'left' }}>{nl2br(props.tasklist.tasklist)}</td>
                                    )
                                } else {
                                    return (
                                        ""
                                    )
                                }
                            })()}
                            {(() => {
                                if (props.tasklist.time_seconds >= 63000000 && props.tasklist.time_seconds <= 66600000) {
                                    return (
                                        <td style={{ padding: '10px', textAlign: 'left' }}>{nl2br(props.tasklist.tasklist)}</td>
                                    )
                                } else {
                                    return (
                                        ""
                                    )
                                }
                            })()}
                        </> :"" :""
            }
        </React.Fragment>
    )
}
export default Tasklist;