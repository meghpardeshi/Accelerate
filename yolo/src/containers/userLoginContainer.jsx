import React from 'react';
import { connect } from 'react-redux';
import * as userLoginObjectFromActionFile from '../actions/userLoginAction';

import Login from '../components/Login/Login';
import { bindActionCreators } from 'redux';

class LoginContainer extends React.Component {
    render() {
        {console.log('Logincontainer');console.log(this)}
        return (<Login 
            
            userLogin = {this.props.userLoginContainerProps}
        />)
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        userLoginContainerProps: userLoginObjectFromActionFile.userLoginAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginContainer);