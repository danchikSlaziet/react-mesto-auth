import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function ProtectedRoute({element: Component, ...props}) {
  return props.loggedIn ? <><Header loggedIn={props.loggedIn} userEmail={props.userEmail} handleLogin={props.handleLogin} pathName="/sign-in">Выйти</Header><Component {...props}/><Footer /></> : <Navigate to="/sign-in" replace/>;
}