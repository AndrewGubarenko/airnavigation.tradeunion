import React from 'react';

class Footer extends React.Component {

  render() {
    return(
      <div id="footer" className="footer-container">
        <div className="copyright" >Copyright © {new Date().getFullYear()} All rights reserved</div>
      </div>
    );
  }
}
export default Footer;
