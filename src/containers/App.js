import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'


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
    showCockpit: true
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

    this.setState({
      persons : persons
    })
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
             />
        </div> 
      );
    }

    return (
        <div className={classes.App}>
          <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
          {this.state.showCockpit ? <Cockpit 
           title={this.props.appTitle}
           showPersons={this.state.showPersons}
           persons={this.state.persons}
           clicked={this.togglePersonHandler} 
          /> : null}
          {person}
        </div>
    );
  }
}


export default App;


