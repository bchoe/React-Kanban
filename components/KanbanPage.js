import React from 'react';
import { connect } from 'react-redux';
import { addAllCards } from '../actions/kanbanActions';
import KanbanList from './KanbanList';
import KanbanNew from './KanbanNew';

class KanbanPage extends React.Component {
  constructor() {
    super();
    this.onKanban = this.onKanban.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  onKanban(data) {
    const { dispatch } = this.props;
    const parsedData = JSON.parse(data.currentTarget.response);
    dispatch(addAllCards(parsedData.cards));
  }

  onKanbanError(error) {
    console.log('error: ', error);
  }

  loadData(){
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", this.onKanban);
    oReq.addEventListener("error", this.onKanbanError);
    oReq.open("GET", this.props.kanbanUrl);
    oReq.send();
  };

  componentWillMount() {
    this.loadData();
  }

  render() {
    return (
      <div id='header'>
        <h1>Kanban Page</h1>
        <KanbanNew
          createNewCard={this.createNewCard}
        />
        <div className='kanbanList'>
            <div id="list">
              <KanbanList
                columnName = 'Queue'
                queue={this.props.data.filter( card => {
                  return card.Status === 'Queue'
                })}
              />
              <KanbanList
                columnName = 'In Progress'
                queue={this.props.data.filter( card =>{
                  return card.Status === 'In Progress'
                })}
              />
              <KanbanList
                columnName = 'Done'
                queue={this.props.data.filter( card => {
                  return card.Status === 'Done'
                })}
              />
            </div>
        </div>
      </div>
    )
  }
}

//remove

KanbanPage.defaultProps = {
  queue: React.PropTypes.array,
  progress: React.PropTypes.array,
  done: React.PropTypes.array
}
//remove
KanbanPage.defaultProps = {
  queue: [],
  progress: [],
  done: []
}

const mapStateToProps = (state, ownProps) => {
  const { kanbanPageReducer} = state;
  return {
    //type array
    data: kanbanPageReducer.toJS()
  }
}

export default connect(
  mapStateToProps
)(KanbanPage);

