import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar } from 'react-calendar-component';
import moment from 'moment';
import 'moment/locale/en-gb';

let dates = {
  october: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31],
  november: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
}

class Goals extends Component {
  state = {
    october: {
      first: "green",
      second: "red",
      third: "green", 
      fourth: "null",
      fifth: "red",
      sixth: "green",
      seventh: "null",  
    },
    dates: {
      october: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31],
      november: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      december: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31],
    },
    month: "december"
  }


  render() {
    return (
      <div>
        <h4>Goals</h4>
        Goal Name: Reading <br />
        <br />
        {this.state.month.charAt(0).toUpperCase() + this.state.month.slice(1)}<br />

        <div class="ui card" id="card">
          <div id='dates'>
            {this.state.month == "october" ? this.state.dates.october.map(date => <button>{date}</button>) : null}
            {this.state.month === "november" ? this.state.dates.november.map(date => <button>{date}</button>) : null}
            {this.state.month === "december" ? this.state.dates.december.map(date => <button>{date}</button>) : null}
          </div>
        </div>


        {/* <button onClick={this.state.october.first === "green" ? () => this.setState({october: {...this.state.october, first: "red"} }) : () => this.setState({october: {...this.state.october, first: "green"} })} >1</button> */}
        {/* <button onClick={() => dates.october.map(date => <button>{date}</button> )}>2</button> */}

      
        <br/>

        <select /*onChange={}*/>
          <option /*value="green"*/>green</option>
          <option /*value="red"*/>red</option>
        </select>


       


      </div>
    )
  }
}

export default Goals
