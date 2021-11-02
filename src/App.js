import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'

import './App.css'
import ProtectedRoute from './components/ProtectedRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/notfound" component={NotFound} />
      <Redirect to="/notfound" />
    </Switch>
  </div>
)

export default App
