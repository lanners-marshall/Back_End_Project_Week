import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { BGColor, City } from './css';
import SideBar from './components/SideBar/SideBar';
import axios from 'axios'

import NoteList from './components/NoteInfo/NoteList';
import CreateNote from './components/NoteInfo/CreateNote'
import LinkedNote from './components/NoteInfo/LinkedNote';
import Weather from './components/Weather/Weather'
import Signin from './components/Auth/Signin'
import SignUp from './components/Auth/SignUp';

class App extends Component {
  constructor() {
    super();
    this.state = {
      topNews: [],
    };
  }


  componentDidMount() {
    axios
      .get("https://newsapi.org/v2/top-headlines?country=us&apiKey=fe1ec32653734ee8895f2371139ed9da")
      .then(response => {

        let topTen = [];

        for (let i = 0; i < 3; i++){
          topTen.push(response.data.articles[i])
        }

        //console.log(topTen)

        this.setState({topNews: topTen})
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleData = data => this.setState({ notesData: data });

  render() {
    return (
      <BGColor>
        <Route
          path="/notes"
          render={props => (
          <div>
            <SideBar
              {...props}
              news={this.state.topNews}
            />
          </div>
          )}
        />

        <Route
          exact
          path="/notes"
          render={props => (
          <div>
            <City>{this.state.city}</City>
            <Weather
              {...props}
            />
          </div>
          )}
        />

        <Route
          exact
          path="/notes"
          render={props => (
          <div>
            <NoteList
              {...props}
            />
          </div>
          )}
        />

      <Switch>
        <Route
          path="/notes/create"
          render={props => (
          <div>
            <CreateNote
              {...props}
              handleData={this.handleData}
            />
          </div>
          )}
        />

        <Route
          exact
          path="/notes/:id"
          render={props => (
          <div>
            <LinkedNote
              {...props}
              handleData={this.handleData}
            />
          </div>
          )}
        />
      </Switch>

        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={SignUp} />
      </BGColor>
    );
  }
}

export default withRouter(App);
