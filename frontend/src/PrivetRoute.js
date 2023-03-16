import { Navigate, Outlet } from "react-router-dom";
import { connect } from 'react-redux';


const PrivateRoute = ({isAuthenticated}) => {
    if (isAuthenticated){
        return (
            <Outlet/>
        )
    }
    return (
        <Navigate to="/login"/>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  
export default connect(mapStateToProps, {})(PrivateRoute);