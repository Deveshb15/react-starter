import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass';
import Aux from "../hoc/Auxiliary";
import AuthContext from "../context/auth-context"

class App extends Component{

  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons : [
      {id : '123', name : "Devesh", age: 18},
      {id : '456', name : "Sujata", age : 43},
      {id : '789', name : "Shailesh", age: 22}
    ],
    showPersons : false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(state, props){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount(){
    console.log('[App.js] component did mount')
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  nameChangeHandler = (e, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = e.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) =>{
      return  {
        persons : persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  deletePersonHandler = index => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];

    persons.splice(index, 1);

    this.setState({persons: persons});
  }

  togglePersonHandler = () =>{
    const doesShow = this.state.showPersons;

    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] render')

    let person = null;

    if(this.state.showPersons){
      person = (
        <div>
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangeHandler}
            isAuthenticated={this.state.authenticated}
            />
        </div> 
      );
    }

    return (
        <Aux>
          <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
          <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler }}>
            {this.state.showCockpit ? <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonHandler} 
            /> : null}
            {person}
          </AuthContext.Provider>
        </Aux>
    );
  }
}


export default withClass(App, classes.App);


