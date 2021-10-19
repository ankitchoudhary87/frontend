import React from 'react';
import {Link} from 'react-router-dom';
function Page_not_found_404() {
  return (
      <div style={{marginTop:'150px'}}>
        <h2>404 Error</h2>
        <h4>This Page is not found. <Link to="/">Click here</Link> go to the Home Page</h4>
      </div>
  );
}
export default Page_not_found_404;