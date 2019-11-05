import React from 'react'
import { Form } from 'semantic-ui-react'
import API from '../adapters/API'
import moment from 'moment';
import './calendar.css'


class NewPostForm extends React.Component {

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
    favouriteAttractions: [],
    datesFromServer: '',
    datesFromServerWithID: '',

    title: '',
    content: ''
  }


  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  // submit = e => {
  //   e.preventDefault()
  //   API.postPost({ title: this.state.title, content: this.state.content })
  //   .then(post => this.props.history.push('/posts/' + post.id))
  // }

                    postEventOnClick = event => {
                      event.preventDefault()

                      let objToAdd = event.target.value

                      this.setState({
                        colours: [...this.state.colours, objToAdd]
                      })

                      API.postCalendar(objToAdd)
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
  
  onDayClick = (e, day) => {
    this.setState({
      selectedDay: day
    })
    // this.props.onDayClick && this.props.onDayClick(e, day)
  
    // this.setState({
    //   counter: this.state.selectedDay == day ? (this.state.counter === 2 ? 0 : this.state.counter +1) : 0
    // })
  
    this.setState({
      showColours: !this.state.showColours
    })
  }
  
  // postEventOnClick = (event) => {
  //   event.preventDefault()
    
  //   let objToAdd = event.target.value
  
  //   this.setState({
  //     colours: [...this.state.colours, objToAdd]
  //   })
  
  //   this.postCalendar(objToAdd)
  // }
  
    // getDates = () => {
    //   return fetch(`http://localhost:3000/api/v1/calendars`, {method: "GET"})
    //   .then(response => response.json())
    //   .then(data => this.setState({
    //       datesFromServer: data.map(data => data.date)
    //     })
    //   )   
    // }


    getDates = () => {
      return fetch(`http://localhost:3000/api/v1/users`, {method: "GET"})
      .then(response => response.json())
      .then(data =>  data.filter(user => user.id === this.props.userID).map(data => this.setState({datesFromServer: data.calendars.map(data => data.date) }) )
        
      )   
    }

    // user.id === this.props.userID).map(data => data.calendars.map(data => data.date))
  
    getDatesWithID = () => {
      return fetch(`http://localhost:3000/api/v1/calendars`, {method: "GET"})
      .then(response => response.json())
      .then(data => this.setState({
          datesFromServerWithID: data.map(data => data.id + ":" + data.date)
        })
      )   
    }
  
  postCalendar = (objToAdd) => {   
  
    let data = {
      user_id: 1,
      date: objToAdd
    }
  
    fetch('http://localhost:3000/api/v1/calendars', {
    method: "POST",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify(data)
    }).then(response => response.json())
      
  }
  
  
  Colours = () => {
    return (
      <form>
        <label>
         <button><h4>Satus for {this.state.selectedDay + "-" + this.month() + "-" + this.year()}</h4></button>
          <select onChange={this.postEventOnClick}>
            <option value={this.state.selectedDay + this.month() + this.year() + '-default'}>Default</option>
            <option value={this.state.selectedDay + this.month() + this.year() + '-green'}>Achieved</option>
            <option value={this.state.selectedDay + this.month() + this.year() + '-red'}>Not Achieved</option>
          </select>
        </label>
      </form>
    )
  }
  
  componentDidMount() {
    this.getDates()
    this.getDatesWithID()
  }




  render() {

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
      

      <div className='calendar-container' style={this.style} onClick={() => console.log(this.props.userID)}>
        
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
      {this.state.showColours ? <this.Colours /> : null}


      </div>


    )
  }
}

  



export default NewPostForm
