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
                                if (props.tasklist.tasklist1 && props.tasklist.tasklist1 !== '') {
                                    return (
                                        <td style={{ padding: '10px', textAlign: 'left' }}>{nl2br(props.tasklist.tasklist1)}</td>
                                    )
                                } else {
                                    return (
                                        <td style={{ padding: '10px', textAlign: 'left' }}></td>
                                    )
                                }
                            })()}
                            {(() => {
                                if (props.tasklist.tasklist2 && props.tasklist.tasklist2 !== '') {
                                    return (
                                        <td style={{ padding: '10px', textAlign: 'left' }}>{nl2br(props.tasklist.tasklist2)}</td>
                                    )
                                } else {
                                    return (
                                        <td style={{ padding: '10px', textAlign: 'left' }}></td>
                                    )
                                }
                            })()}
                           {(() => {
                                if (props.tasklist.tasklist3 && props.tasklist.tasklist3 !== '') {
                                    return (
                                        <td style={{ padding: '10px', textAlign: 'left' }}>{nl2br(props.tasklist.tasklist3)}</td>
                                    )
                                } else {
                                    return (
                                        <td style={{ padding: '10px', textAlign: 'left' }}></td>
                                    )
                                }
                            })()}
                        </> :"" :""
            }
        </React.Fragment>
    )
}
export default Tasklist;