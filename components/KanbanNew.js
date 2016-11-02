import React from 'react';

class KanbanNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: "", priority: "", createdby: "", assignedto: ""}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
    //this is when anything on the input is being typed in by the user
  handleChange(event) {
    let newState = {}
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

    //this is when button is clicked
    handleSubmit(event) {
    //prevents browser from submiting method
    event.preventDefault()
    this.props.createNewCard({
      Title: this.state.title,
      Priority: this.state.priority,
      Createdby: this.state.createdby,
      Assignedto: this.state.assignedto
    });

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

export default KanbanNew;