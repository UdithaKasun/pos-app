import React from 'react';
import {compose} from 'redux';
import {connect} from "react-redux";
import UserService from '../services/User.service';

const withAuthenticator = (WrappedComponent) => {
    return class extends React.Component {

      async componentDidMount(){
        const storedToken = localStorage.getItem('token');
        const {user : { token, authenticated},history} = this.props;
        if((!token || !authenticated) && !storedToken){
          console.log("I am here")
          this.props.history.push('/login');
        }
        else if(storedToken && history.location.pathname ==='/login'){
          try{
            await UserService.verifyToken(storedToken);
            history.push('/orders');
          }
          catch(error){

          }
          
        }
      }
  
      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
}

const mapStateToProps = state => ({
  user: state.user,
});

export default compose(connect(mapStateToProps,null),(withAuthenticator));