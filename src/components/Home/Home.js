import React, { useContext } from 'react';
import AuthContext from '../../store_context/auth-context';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = () => {
  const ctx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back, User!</h1>
      {ctx.isLoggedIn && (
      <button onClick={ctx.onLogout}>Log out</button>
      )}
      </Card>
  )};

export default Home;
