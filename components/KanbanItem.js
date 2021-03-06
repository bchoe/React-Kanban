import React from 'react';
import { connect } from 'react-redux';
import { moveCards } from '../actions/kanbanActions';
import { deleteCard } from '../actions/kanbanActions';
import KanbanPage from './KanbanPage';

class KanbanItem extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {title: "", priority: "", createdby: "", assignedto: ""};
  };

  handleSubmit(event) {
    let targetStatus = event.target.innerHTML;
    if(targetStatus !== "Delete") {

      event.preventDefault();
      this.props.moveCards({
        id:this.props.id,
        status: targetStatus
      });

      const oReq = new XMLHttpRequest();
      oReq.addEventListener("load", (data) => {});
      oReq.addEventListener("error", () => {});
      oReq.open("PUT", `${this.props.kanbanUrl}/edit`);
      oReq.setRequestHeader("content-type", "application/json");
      oReq.send(JSON.stringify({
      Status: this.props.Status,
      Title: this.props.Title
      }));

      if(targetStatus === "Queue"){
        oReq.send(JSON.stringify({
          Title:this.props.Title,
          Status:"hello"
         }));
      }
      if(targetStatus === "Done") {
         oReq.send(JSON.stringify({
          Title:this.props.Title,
          Status:this.props.Status
         }));
      }
      if(targetStatus === "In Progress"){
        let targetStatus = event.target.innerHTML;
        event.preventDefault();
        this.props.moveCards({
          id:this.props.id,
          status: targetStatus
        });
      }

      oReq.send(JSON.stringify({
        Title:this.props.Title,
        Priority:this.props.Priority,
        Status: this.props.Status,
        Createdby:this.props.Createdby,
        Assignedto:this.props.Assignedto
      }));

    } else {
      this.props.deleteCard(this.props.id);
      const oReq = new XMLHttpRequest();
      oReq.addEventListener("load", (data) => {});
      oReq.addEventListener("error", () => {});
      oReq.open("DELETE", `${this.props.kanbanUrl}/delete`);
      oReq.setRequestHeader("content-type", "application/json");
      oReq.send(JSON.stringify({
      id:this.props.id
      }));
    }
  }

  handleChange(event){
  let newState = {};
  newState[event.target.name] = event.target.value;
  this.setState(newState);
  }

  render() {
    let cardButton;
    let cardBox = "cardBox";
    if(this.props.Status === "Queue") {
      cardButton = (
        <div>
          <button onClick={this.handleSubmit}>In Progress</button>
        </div>
      )
    }
    if(this.props.Status === "In Progress") {
      cardButton = (
        <div>
          <button onClick={this.handleSubmit}>Done</button>
          <button onClick={this.handleSubmit}>Queue</button>
        </div>
      )
    }
    if(this.props.Status === "Done") {
      cardButton = (
        <div>
          <button onClick={this.handleSubmit}>In Progress</button>
        </div>
      )
    }
    if(this.props.Priority === "Low") {
      cardBox = "cardBox1"
    }
    if(this.props.Priority === "Medium") {
      cardBox = "cardBox2"
    }
    if(this.props.Priority === "High") {
      cardBox = "cardBox"
    }
    return (
      <div className={cardBox}>
        <div className="kanbanCard">
          <h4>Task: {this.props.Title}</h4>
          <p>Priority: {this.props.Priority}</p>
          <p>Created By: {this.props.Createdby}</p>
          <p>Assigned To: {this.props.Assignedto}</p>
          { cardButton } <button onClick={this.handleSubmit}>Delete</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { kanbanPageReducer } = state;
  return {
    data: kanbanPageReducer.toJS()
  }
}

export default connect(
  mapStateToProps,{ moveCards, deleteCard }
)(KanbanItem);