import React, { useEffect } from 'react';
import classes from './Cockpit.css'

const cockpit = (props) => {

  useEffect(() => {
    console.log('[Cockpit.js] useEffect')

    // Fake http req
    const timer = setTimeout(() => {
      alert('Saved Data to cloud!')
    }, 1000);
    return () => {
      clearTimeout(timer);
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

    if(props.persons.length <= 2){
      assignedClasses.push(classes.red);
    }
    if(props.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This actually works</p>
            <button
            className={btnClass}
            alt={props.showPersons}
            onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
}

export default cockpit;