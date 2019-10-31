import React, { Component } from 'react';
import moment from 'moment';
import './calendar.css'

class Calendar extends Component {


  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
    this.style.width = this.width; // add this
  }

  weekDays = moment.weekdays()
  weekDaysShort= moment.weekdaysShort()
  months = moment.months()
  

state = { 
  dateContext: moment(),
  today: moment(),
  showMonthPopup: false,
  showYearPopup: false,

  x: this.year
}

year = () => this.state.dateContext.format('Y')

month = () => this.state.dateContext.format('MMMMM')

daysInMonth = () => this.state.dateContext.daysInMonth()

currentDate = () => this.state.dateContext.get('date')

currentDay = () => this.state.dateContext.format('D')

firstDayOfMonth = () => {
  let dateContext = this.state.dateContext
  let firstDay = moment(dateContext).startOf('month').format('d')
  return firstDay
}

  render() {

    let weekDays = this.weekDaysShort.map(day => {
      return (
        <td key={day} className="week-day">{day}</td>
      )
    })

    let blanks = [] 
    for (let i = 0; i < this.firstDayOfMonth(); i ++) {
      blanks.push(<td className='emptySlot'>{" "}</td>)
    }

    let daysInMonth = []
    for (let d = 1; d <= this.daysInMonth(); d ++ ) {
      let className = (d == this.currentDay() ? "day current-day" : "day")
      daysInMonth.push(
      <td key={d} className={className}>
        <span>{d}</span>
      </td>)
    }

    var totalSlots = [...blanks, ...daysInMonth]
    let rows = []
    let cells = []

    totalSlots.forEach((row, i) => {
      if ((i % 7) !== 0) {
        cells.push(row)
      } else {
        let insertRow = cells.slice()
        rows.push(insertRow)
        cells = []
        cells.push(row)
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice()
        rows.push(insertRow)
      }
    })

    let trElems = rows.map((d, i) => {
      return (
        <tr key={i*100}>
          {d}
        </tr>
      )
    })

    console.log("hello")
    console.log(this.firstDayOfMonth());
    console.log(moment().startOf('month'))
    console.log("hi")
    console.log(daysInMonth)

    return (
      <div className='calendar-container' onClick={() => console.log("hi")}>

        <table className='calendar'>
          <thead>
            <tr className='calendar=header'> </tr>
            <tbody>
              <tr>
              {weekDays}
              </tr>
              {trElems}
            </tbody>
          </thead>
        </table>

      </div>
    );
  }
}

export default Calendar;