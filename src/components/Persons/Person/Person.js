import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Aux from "../../../hoc/Auxiliary"
import withClass from "../../../hoc/withClass"
import classes from './Person.css';
import Persons from '../Persons';
import AuthContext from "../../../context/auth-context"

class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render(){
        console.log('[Person.js rendering...]')
        return (
            <Aux>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please Login</p>}
                

                <p key="i1" onClick={this.props.click}>I'm {this.props.name} and my age is {this.props.age}</p>
                <p key="i2">{this.props.children}</p>
                <input 
                    key="i3" 
                    type="text" 
                    // ref = {(inputEL) => {this.inputElement = inputEL}}
                    ref={this.inputElementRef}
                    onChange={this.props.change} 
                    value={this.props.name} />
            </Aux> );
    }
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    change: PropTypes.func
}

export default withClass(Person, classes.Person);