import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SemesterResults from './components/SemesterResults';
import DetailedMarks from './components/DetailedMarks';
import RetakeInfo from './components/RetakeInfo';
import UpcomingCourses from './components/UpcomingCourses';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/results" component={SemesterResults} />
          <PrivateRoute exact path="/results/:courseCode" component={DetailedMarks} />
          <PrivateRoute exact path="/retakes" component={RetakeInfo} />
          <PrivateRoute exact path="/courses" component={UpcomingCourses} />
          <PrivateRoute exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
