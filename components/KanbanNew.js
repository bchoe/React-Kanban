import React from 'react';
import { connect } from 'react-redux';
import { moveCards } from '../actions/kanbanActions';
import { newCard } from '../actions/kanbanActions';
import { deleteCard } from '../actions/kanbanActions';
class KanbanNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: "", priority: "", createdby: "", assignedto: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.createNewCard = this.createNewCard.bind(this)
  }

    //this is when anything on the input is being typed in by the user

  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

    //this is when button is clicked
    handleSubmit(event) {
      event.preventDefault();
      const { dispatch } = this.props;
      const parsedData = JSON.parse(event.currentTarget.response);
      dispatch(newCard(parsedData.cards));

    this.props.createNewCard({
            Title: this.state.title,
            Priority: this.state.priority,
            Createdby: this.state.createdby,
            Assignedto: this.state.assignedto
        });

      const oReq = new XMLHttpRequest();
      dispatch(newCard(parsedData.cards));
      oReq.addEventListener("load", {});
      oReq.addEventListener("error", {});
      oReq.open("POST", `${this.props.kanbanUrl}/new`);
      oReq.setRequestHeader("content-type", "application/json");
      oReq.send(JSON.stringify(newCard));
      //prevents browser from submiting method
      event.preventDefault();
    //put function as close to the source as possible ie. createNewCard
  }
/*
class="kanbanCardField"
class="newKanban"*/

  render() {
    return (
      <div className="newCardBackground">
        <h3 className="newKanbanCard" >New Kanban Card
          <form method ="post" action="/new" type="text">
            <input type="text" placeholder="Title" onChange={this.handleChange} value={this.state.Title} name='title' /> <br />
              <select name="priority" onChange={this.handleChange}>
                <option placeholder="Priority" value="Low" >Low</option>
                <option placeholder="Priority" value="Medium" >Medium</option>
                <option placeholder="Priority" value="High" >High</option>
              </select> <br />
            <input type="text" placeholder="Created By" onChange={this.handleChange} value={this.state.Createdby} name='createdby' /> <br />
            <input type="text" placeholder="Assigned To" onChange={this.handleChange} value={this.state.Assignedto} name='assignedto' /> <br />
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
        </h3>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { kanbanPageReducer } = state;
  return {
    data: kanbanPageReducer.toJS()
  }
}

export default connect(
  mapStateToProps,{ moveCards, deleteCard, newCard }
)(KanbanNew);