import React, { Component } from 'react';
import './App.css';
import Goals from './Components/Goals'
import Calendar from './Components/Calendar'

const style = {
  position: 'relative',
  margin: '50 px auto'
}


class App extends Component {
  
  onDayClick = (e, day) => {
    alert(day)
  }

  render() {
    return (
      <div>
        <Calendar style={style} width='302px' onDayClick={(e, day) => this.onDayClick(e, day)}  />
      </div>
    );
  }
}

export default App;