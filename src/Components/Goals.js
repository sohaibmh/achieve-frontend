import React from 'react'
import { Button, Dropdown, Menu, Select } from 'semantic-ui-react'
import API from '../adapters/API'
import moment from 'moment';
import './goals.css'
import {HorizontalBar} from 'react-chartjs-2';


class Goals extends React.Component {

  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
    this.style.width = this.width;
  }

  state = { 
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false,
    selectedDay: null,
    counter: 0,
    greens: [],
    reds: [],
    colours: [],
    showColours: false,
    datesFromServer: [],
    datesWithID: [],
    datesWithoutStatus: [],
    totalDaysMarked: 0,
    totalGreens: 0,
    showGoalDetails: false,
    datesFromServerTesting: [],
    showChangeGoalInput: true,
    showEditGoal: false,
  }

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }



  totalGreensPercentate = () => {
    let percentage = (this.state.totalGreens * 100) / this.state.totalDaysMarked
  }

  postEventOnClick = event => {
    event.preventDefault()

    let objToAdd = {date: event.target.value, goal_id: this.props.goalID}
    let objToUpdate = {date: event.target.value, goal_id: this.props.goalID}

    this.setState({
      showColours: !this.state.showColours
    })

    if (!this.state.datesFromServer.includes(event.target.value)) {
      API.postCalendar(objToAdd)                      
      .then(() => this.props.getGoals()).then(() => this.componentWillMount()).then(() => this.componentDidMount())
        /*.then(date => this.setState({datesWithID: date.goal.calendars.map(x => x.id + ":" + x.date) })) /* post and get */
      this.setState({
        colours: [...this.state.colours, event.target.value],
      })
    }

    if (this.state.datesWithoutStatus.includes(   this.state.selectedDay + this.month() + this.year()   )){
      API.updateCalendar(this.dateID(), objToUpdate)
    }
    
    this.setState({
      datesFromServer: this.props.goalCalendar,
      datesWithID: this.props.goalDatesWithID,
    })
  }

  weekDays = moment.weekdays()
  weekDaysShort= moment.weekdaysShort()
  months = moment.months()
    
  
  year = () => this.state.dateContext.format('Y')
  
  month = () => this.state.dateContext.format('MMMM')
  
  daysInMonth = () => this.state.dateContext.daysInMonth()
  
  currentDate = () => this.state.dateContext.get('date')
  
  currentDay = () => this.state.dateContext.format('D')
  
  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext
    let firstDay = moment(dateContext).startOf('month').format('d')
    return firstDay
  }
  
  setMonth = (month) => {
    let monthNo = this.months.indexOf(month)
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
            {data}
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
  
  nextMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).add(1, 'month')
    this.setState({
      dateContext: dateContext
    })
    this.props.onNextMonth && this.props.onNextMonth()
  }
  
  prevMonth = () => {
    let dateContext = Object.assign({}, this.state.dateContext)
    dateContext = moment(dateContext).subtract(1, 'month')
    this.setState({
      dateContext: dateContext
    })
    this.props.onPrevMonth && this.props.onPrevMonth()
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

  changeGoalNameHandler = (e) => {
    // e.preventDefault()
    let objToUpdate = {
      user_id: this.props.userID,
      name: this.refs.newGoalName.value
    }

    API.updateGoal(this.props.goalID, objToUpdate).then(() => this.props.getGoals())
    this.setState({showChangeGoalInput: !this.state.showChangeGoalInput})
    this.setState({showEditGoal: !this.state.showEditGoal})
  }

  editGoalHandler = e => {
    e.preventDefault()

    if (e.target.value == 'rename') {
      this.setState({showChangeGoalInput: !this.state.showChangeGoalInput})
    }
    else if (e.target.value == 'delete') {
      API.deleteGoal(this.props.goalID).then(() => this.props.getGoals()).then(() => this.componentWillMount())
    }
    this.setState({showGoalDetails: false})
  }


  editGoal = () => {
    return (
    <form>
      <label>
        <select onChange={this.editGoalHandler} class="ui fluid selection dropdown">
          <option value={'rename'}>Select</option>
          <option value={'rename'}>Rename</option>
          <option value={'delete'}>Delete</option>
        </select>
      </label>
    </form>
    )
  }

  ChangeGoalName = () => {
    return (
        <form onSubmit={this.changeGoalNameHandler}>
          <input 
          defaultValue={this.props.goalName} 
          onKeyPress={this.handleKeyPress}
          placeholder=""
          ref='newGoalName'
          />
        </form>
    )
  }
  
  onDayClick = (e, day) => {
    this.setState({
      selectedDay: day
    })

    this.setState({
      showColours: !this.state.showColours
    })
  }
  
  Colours = () => {
    return (
      <form id='statusForm' onClick={() => this.dateID()}>
        <label>
         <button><h4>Satus for {this.state.selectedDay + "-" + this.month() + "-" + this.year()}</h4></button>
         <br/>
          <select onChange={this.postEventOnClick} class="ui fluid selection dropdown">
            <option value={this.state.selectedDay + this.month() + this.year() + '-default'}>Select</option>
            <option value={this.state.selectedDay + this.month() + this.year() + '-green'}>Achieved</option>
            <option value={this.state.selectedDay + this.month() + this.year() + '-red'}>Not Achieved</option>
          </select>
        </label>
      </form>
    )
  }


  
  componentDidMount() {
    this.setState({
      totalDaysMarked: this.state.datesFromServer.length,
      totalGreens: this.state.datesFromServer.filter(date => {return date.match(/green/)}).length,
      datesWithoutStatus: this.state.datesFromServer.map(date => date.split("-")).flat().filter((x, i) => i % 2 == 0)
      }
    )
  }

  dateID = () => {
    let id = []
    id.push(this.state.datesWithID.filter(date => {return date.match(   this.state.selectedDay + this.month() + this.year()   )}).map(date => date.split(":")).flat())
    return id[0][0]
    // console.log(id[0][0])
  }
  
  componentWillMount() {
    this.setState({
      datesFromServer: this.props.goalCalendar,
      datesWithID: this.props.goalDatesWithID
    })

    this.totalGreensPercentate()
    this.data()
  }


  data = () => {

    let dataPercentage = Math.round((this.state.totalGreens * 100) / this.state.totalDaysMarked)
    let backgroundColor = ''
    let borderColor = ''

    if (dataPercentage < 40) {
      backgroundColor = 'rgba(242, 58, 58, 0.58)'
      borderColor = 'rgba(242, 58, 58, 1)'
    }
    else if (dataPercentage >= 40 && dataPercentage < 70) {
      backgroundColor = 'rgba(129, 160, 253, 1)'
      borderColor = 'rgb(0,0,255)'
    }
    else if (dataPercentage >= 70 && dataPercentage < 90 ) {
      backgroundColor = 'rgba(94, 242, 54, 0.58)'
      borderColor = 'rgba(45, 168, 11, 1)'
    }
    else if (dataPercentage >= 90 && dataPercentage <= 100) {
      backgroundColor = 'rgba(255, 217, 0, 0.6)'
      borderColor = 'rgba(250, 212, 0, 1)'
    }
    
    return ({
      labels: ['Goal Met %'], 
      datasets: [
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 5,
          // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          // hoverBorderColor: 'rgba(255,99,132,1)',
          data: [dataPercentage, 0, 100]
        }
      ]
    })
  }



  render() {

  let  data = 

      {
        labels: ['Goal Met %'], 
        datasets: [
          {
            backgroundColor: 'rgba(129, 160, 253, 1)',
            borderColor: 'rgb(0,0,255)',      
            borderWidth: 5,
            barPercentage: 20,
            // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            // hoverBorderColor: 'rgba(255,99,132,1)',
            data: [(this.state.totalGreens * 100) / this.state.totalDaysMarked, 0, 100]
          }
        ]
      }
    

    let weekDays = this.weekDaysShort.map(day => {
      return (
        <td key={day} className="week-day">{day}</td>
      )
    })

    let blanks = [] 
    for (let i = 0; i < this.firstDayOfMonth(); i ++) {
      blanks.push(<td key={i * 27} className='emptySlot'>{""}</td>)
    }


    let daysInMonth = []
    for (let d = 1; d <= this.daysInMonth(); d ++ ) {
      let className = (d == this.currentDay() ? "day current-day" : "day")
      let selectedClass = () => {
          if (this.state.datesFromServer.includes(d + this.month() + this.year() + '-green') || 
              this.state.colours.includes(d + this.month() + this.year() + '-green') ) {
              return ' selected-day-green ' 
          }
          else if (this.state.datesFromServer.includes(d + this.month() + this.year() + '-red') || this.state.colours.includes(d + this.month() + this.year() + '-red') ) {
            return ' selected-day-red '
          } 
          else {
            return " "
        }
       
      // if (this.state.datesFromServer.includes(d + this.month() + this.year() + '-green') && this.state.datesFromServer.includes(d + this.month() + this.year() + '-red'){
      //    this.state.datesFromServerWithID.map(date => date.split(':')[0])
      // }

      // <li>{attraction.split(':')[1]}<button onClick={() => this.props.destroy(attraction.split(':')[0])} >Delete</button></li>

      }
      daysInMonth.push(
      <td key={d} className={className + selectedClass()}>
        <span onClick={e => this.onDayClick(e, d)}>{d}</span>
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

    return (

    <div> <div className='calendar-container' style={this.style}>

    <div class="ui card">
      <div class="content"><div class="header">{this.state.showChangeGoalInput ? <span onClick={() => this.setState({showGoalDetails: !this.state.showGoalDetails})}> {this.props.goalName }</span> : this.ChangeGoalName()}  </div></div>

      {this.state.showGoalDetails ? <div class="content">
        <div>
        <div class="description">
        <table className='calendar'>
      <thead>
        <tr className='calendar-header'>
          <td colSpan="5">
            <this.MonthNav />
            {" "}
            <this.YearNav/>
          </td>
          <td colSpan='2' className='nav-Month'>
            <i className='prev fa fa-fw fa-chevron-left' onClick={e => this.prevMonth(e)}></i>
            <i className='prev fa fa-fw fa-chevron-right' onClick={e => this.nextMonth(e)}></i>
          </td>
        </tr>
        </thead>
        <tbody> 
          <tr>
            {weekDays}
          </tr>
          {trElems}
        </tbody>
    </table>
    <br/>
    {this.state.showColours ? <this.Colours  /> : null}
     
        </div>
      </div>
      <div class="extra content">
        <i aria-hidden="true"></i>
        <div id={'horizontalBar'}>
        <HorizontalBar data={this.data()} options={{legend: {display: false}, maintainAspectRatio: false, scales : {yAxes : [{barPercentage : 1,  categoryPercentage : 1, precision: 1}]            }}} />
      </div>
      </div>

        <span id='goalEdit' onClick={() => this.setState({showEditGoal: !this.state.showEditGoal})}>: : :</span><br/><br/>


      {this.state.showEditGoal ? this.editGoal() : null}
      </div>
    :
    null}
      
      </div>
      
    </div>
      
      </div>

    )
  }
}

export default Goals
