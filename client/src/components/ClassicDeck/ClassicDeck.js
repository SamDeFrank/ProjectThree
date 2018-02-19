import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import "./ClassicDeck.css";
import GameForm from "../GameForm";

class ClassicDeck extends Component {
	constructor(props) {
    	super(props);
    	this.toggle = this.toggle.bind(this);
    	this.state = { collapse: false };
  	}

  	toggle() {
    	this.setState({ collapse: !this.state.collapse });
  	}

  render() {
  	return (
  		<div>
        	<Button className="classicdeck" onClick={this.toggle}> Classic Deck</Button>
        	<Collapse isOpen={this.state.collapse}>
            	<GameForm />
          </Collapse>
      	</div>
  	)
  }

}

export default ClassicDeck; 