import React, { Component } from 'react';
import moment from 'moment';
import './calendar.css'
import { thisExpression, throwStatement } from '@babel/types';

class Calendar extends Component {


constructor(props) {
  super(props);
  this.width = props.width || "350px";
  this.style = props.style || {};
  this.style.width = this.width;
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

setMonth = (month) => {
  let monthNo = this.month.indexOf(month)
  let dateContext = Object.assign({}, this.state.dateContext) // to create a clone in order to avoid mutating the original state
  dateContext = moment(dateContext).set('month', monthNo)
  this.setState({
    dateContext: dateContext
  })
}

onSelectChange = (e, data) => {
   this.setMonth(data)
   this.props.onMonthChange && this.props.onMonthChange()
}

SelectList = (props) => {
  let popup = props.data.map(data => {
    return (
      <div key={data}>
        <a href="#" onClick={e => this.onSelectChange(e, data)}>
        </a>
      </div>
    ) 
  })

  return (
    <div className="month-popup">
      {popup}
    </div>
  )
}

onChangeMonth = (e, month) => {
  this.setState({
    showMonthPopup: !this.state.showMonthPopup
  })
}
 
MonthNav = () => {
  return (
    <span className="label-month" onClick={e => this.onChangeMonth(e, this.month())}>
      {this.month()}
      {this.state.showMonthPopup && <this.SelectList data={this.months} /> /* if the showMonthPopup is true THEN show the select list..*/}
    </span>
  )
}

showYearEditor = () => {
  this.setState({
     showYearNav: true
  })
}

setYear = (year) => {
  let dateContext = Object.assign({}, this.state.dateContext)
  dateContext = moment(dateContext).set('year', year)
  this.setState({
    dateContext: dateContext
  })
} 

onYearChange = (e) => {
  this.setYear(e.target.value)
  this.props.onYearChange && this.props.onYearChange(e, e.target.value)
}

onKeyUpYear = (e) => {
  if (e.which == 13 /* the enter key */ || e.which == 27 /* the escape key */) {
    this.setYear(e.target.value)
    this.setState({
      showYearNav: false
    })
  }
}

YearNav = () => {
  return (
    this.state.showYearNav ? 
    <input 
    defaultValue={this.year()} 
    className='editor-year' 
    ref={yearInput => this.yearInput = yearInput} 
    onKeyUp={e => this.onKeyUpYear(e)}
    onChange={e => this.onYearChange(e)}
    type="number"
    placeholder="year"
    />
    :
    <span className="label-year" onDoubleClick={e => this.showYearEditor()}>
      {this.year()}
    </span>
  )
}

  render() {

    let weekDays = this.weekDaysShort.map(day => {
      return (
        <td key={day} className="week-day">{day}</td>
      )
    })

    let blanks = [] 
    for (let i = 0; i < this.firstDayOfMonth(); i ++) {
      blanks.push(<td key={i * 27} className='emptySlot'>{" "}</td>)
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
      <div className='calendar-container' style={this.style} onClick={() => console.log("hi")}>

        <table className='calendar'>
          <thead>
            <tr className='calendar-header'>
              <td colSpan="5">
                <this.MonthNav />
                {" "}
                <this.YearNav/>
              </td>
              <td colSpan='2' className='navMonth'>
                <i className='prev fa fa-fw fa-chevron-left' onClick={e => this.prevMonth(e)}></i>
              </td>
              <td colSpan='2' className='navMonth'>
                <i className='prev fa fa-fw fa-chevron-right' onClick={e => this.nextMonth(e)}></i>
              </td>
            </tr>
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