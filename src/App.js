import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import StreamList from './Components/StreamList';
import StreamCreate from './Components/StreamCreate';
import StreamEdit from './Components/StreamEdit';
import StreamShow from './Components/StreamShow';
import Navbar from './Components/Navbar'
import { connect } from 'react-redux';
import MyAccout from './Components/MyAccout';
function App() {
  return (
    <>
      <Router> 
       <Navbar />
        <Switch>
        <Route exact path = "/" component = {StreamList} />
        <Route exact path = "/streams/new" component = {StreamCreate} />
        <Route exact path = "/streams/edit" component = {StreamEdit} />
        <Route exact path = "/streams/show" component = {StreamShow} />
        <Route exact path = "/myAccount" component = {MyAccout} />
        </Switch>
      </Router>
    </>
  );
}

const mapStateToParams = (state) => {
  return {loggedIn : state.auth.isSignedIn}
}
export default connect(mapStateToParams)(App);
