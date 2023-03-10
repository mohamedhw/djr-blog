// import { Navigate, Outlet } from "react-router-dom";
// import { connect } from 'react-redux';


// const PrivateRoute = ({isAuthenticated, username}) => {
//     console.log(isAuthenticated)
//     return (
//         isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
//     )

// }

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated,
//     username: state.profile.username
//   })
  
// export default connect(mapStateToProps, {})(PrivateRoute);