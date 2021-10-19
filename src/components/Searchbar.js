import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { Button, Spinner } from 'react-bootstrap'
const Searchbar = (props) => {
    return (
        <>
            <div style={{ width: '100%' }}>
                <div style={{ width: '45%', float: 'left' }}>
                    <div style={{ width: '20%', float: 'left', padding: '0.9rem 0.2rem' }}>
                        <b>Date Range: </b>
                    </div>
                    <div style={{ width: '40%', float: 'left' }}>
                        <DatePicker className="myinputclass" placeholder="From Date" name="start_date" selected={props.start_date} onChange={(date) => { props.onchange(date, "start_date") }} maxDate={new Date()} />
                    </div>
                    <div style={{ width: '40%', float: 'left' }}>
                        <DatePicker className="myinputclass" placeholder="To Date" name="end_date" selected={props.end_date} onChange={(date) => { props.onchange(date, "end_date") }} maxDate={new Date()} />
                    </div>
                </div>
                <div style={{ width: '38%', float: 'left' }}>
                    <div style={{ width: '18%', float: 'left', padding: '0.9rem 0rem', marginLeft: '25px' }}>
                        <b>Members: </b>
                    </div>
                    <div style={{ width: '75%', float: 'left' }}>
                        <select style={{ width: '95%' }} className="myinputclass" name="resource" value={props.resource} onChange={(e) => { props.onchange(e.target.value, "resource") }}>
                            <option value="">Please Select Team Member</option>
                            {
                                props.AllUserlistdata.map((userdropdata) =>
                                    <option key={userdropdata.user_id} value={userdropdata.user_id}>{userdropdata.name}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div style={{ width: '15%', float: 'right' }}>
                    {!props.loader ?
                        <Button onClick={() => { props.datasevendays(); props.getUserList(); }} type="submit" style={{ marginTop: '10px', background: 'rgba(237, 28, 36, 1)', borderRadius: '3px', border: '0 none', padding: '12px 42px', fontSize: '16px', fontWeight: '500', lineHeight: '16px', cursor: 'pointer', textTransform: 'capitalize', color: 'rgba(255, 255, 255, 1)' }}>Search</Button>
                        :
                        <Button variant="primary" style={{ marginTop: '10px', background: 'rgba(237, 28, 36, 1)', borderRadius: '3px', border: '0 none', padding: '12px 42px', fontSize: '16px', fontWeight: '500', lineHeight: '16px', cursor: 'pointer', textTransform: 'capitalize', color: 'rgba(255, 255, 255, 1)' }} disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>
                    }
                </div>
            </div>
        </>
    )
}
export default Searchbar;