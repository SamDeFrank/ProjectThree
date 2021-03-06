import "./CardMake.css";
import React, { Component } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import SoloCardInfo from "../../components/SoloCardInfo";
import BgColor from "../../components/BgColor";
import { Button} from 'reactstrap';

class CardMake extends Component {

  constructor (props) {
    super (props);
    let cards = [];

    for(var i=0; i < props.newDeck.numCards; i++){
      cards.push({
        fromDeck: props.newDeck.deckName,
        "fieldInfo0": null,
        "fieldInfo1": null,
        "fieldInfo2": null,
        "fieldInfo3": null,
        "fieldInfo4": null,
        "fieldInfo5": null,
        bgColor: "white"
      });
    };
  
    this.state = {
      deckInfo: props.newDeck,
      cards: cards
    };
  };

  handleInputChange = (property, value, index) => {
    let newState = this.state
    newState.cards[index][property] = value;
    this.setState(newState);
  };

  handleCardSubmit = event => {
    event.preventDefault();

    console.log(this.state);
    
    var deckName = this.state.deckInfo.deckName
    var dataPass = {deckName:deckName}
    var self = this

    axios.post('/api/deckcreate', this.state)
    //Should have used "Response =>""
    .then(function (response) {
      console.log(response.data);
      self.props.renderNewComponent(`backorgo`, dataPass)
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  handleBackClick = () => {
      this.props.renderNewComponent("deckmake", {});
  }

  render() {
    var cardArr = [];
    for(var i=0; i < this.state.deckInfo.numCards; i++){
      cardArr.push(<br key={"br" + i.toString()}/>)
      cardArr.push(<h4 key={"h4" + i.toString()}>Card {i+1}</h4>)
      cardArr.push(<SoloCardInfo key={i} index={i} input={this.handleInputChange} updateFieldInfo={this.updateFieldInfo} numFields={this.state.deckInfo.numFields} />)
      cardArr.push(<BgColor key={"bgColor" + i.toString()} index={i} input={this.handleInputChange}/>)
    };

    return (
      <div>
        <Button className="back2" onClick={this.handleBackClick}/>
        <Navbar renderNewComponent={this.props.renderNewComponent} />
        <h2>Step Two</h2>
        <h4>Enter your card information</h4>
        {/*<h4>Your Cards each have {this.state.deckInfo.numFields} info fields</h4>*/}
        <Container style={{ marginTop: 30 }}>
          {cardArr}
          <button onClick={this.handleCardSubmit}>Submit</button>
        </Container>
      </div>
    );
  }
};

export default CardMake;