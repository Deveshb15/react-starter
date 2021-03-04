import React, { useEffect, useRef, useContext } from 'react';

import classes from './Cockpit.css';
import AuthContext from "../../context/auth-context"

const cockpit = (props) => {

  const toggleBtnRef = useRef(null);

  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect')

    // Fake http req
    // const timer = setTimeout(() => {
    //   alert('Saved Data to cloud!')
    // }, 1000);
    toggleBtnRef.current.click();
    return () => {
      // clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect')
    };
  },[]);

  useEffect(() => {
    console.log('[Cockpit.js] in 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect')
    }
  })

    let assignedClasses = [];

    let btnClass = '';

    if(props.showPersons){
      btnClass = classes.Red;
    }

    if(props.personsLength <= 2){
      assignedClasses.push(classes.red);
    }
    if(props.personsLength <= 1){
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This actually works</p>
            <button
            ref={toggleBtnRef}
            className={btnClass}
            alt={props.showPersons}
            onClick={props.clicked}>Toggle Persons</button>
           <button onClick={authContext.login}>Log IN</button>
        </div>
    );
}

export default React.memo(cockpit);