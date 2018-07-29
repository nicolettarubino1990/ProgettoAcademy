import React from 'react';
import { Accordion, Panel,Form,Button, Modal, FormGroup, FormControl, ControlLabel, Label,Input, FormText} from "reactstrap";
import Eventstyle from './EventStyle.css';

let DATA = [
  // {
  // title: "React Academy 2018",
  // Description: ["bacon", "lettuce", "tomato", "toast"]},
  // {
  // title: "Pizza",
  // Description: ["dough", "cheese", "sauce"]}
]

if(!localStorage.getItem('_EventList')){
  localStorage.setItem('_EventList', JSON.stringify(DATA))
}


class EventBox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: JSON.parse(localStorage.getItem('_EventList')),
      showModal: false,
      showButton: false
    }
		this.toggleModal = this.toggleModal.bind(this)
		this.handleData = this.handleData.bind(this)
  }
     
  componentDidMount() {
    const token = localStorage.getItem('userId');
    console.log(token); 
if (token === 'WIuFqdrPWtTxUGYO1yjGagfSWJp1') {
    this.setState({
      showButton: true
    })
  }
}


	toggleModal () {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleData (arr) {
    localStorage.setItem('_EventList', JSON.stringify(arr))
    this.setState({
      data: arr
    })
  }

  render (){
    const Events = this.state.data;

    return (
      <div className='ContainerEvent'>

      {this.state.showButton && <MyButton buttonClass="add addevent"  name='Add Event' onClick={this.toggleModal}/> }
        {this.state.showModal &&
          <MyModal
            name="Add Event"
            EventName=''
            eventDate=''
            eventSelect=''
            Eventtime=''
            EventDescription=''
            onClose={this.toggleModal}
            handleData={this.handleData}/>}
      
        {Events.map((Event)=>{
          const name = Event.title
          const date= Event.date
          const select= Event.select
          const time= Event.time
          const ings = Event.Description
          const index = Events.findIndex((item, i)=>{
            return item.title === name
          })
          return(
            <EventTitle
              key={index}
              index={index}
              name={name}
              date={date}
              select={select}
              time={time}
              ings={ings}
              handleData={this.handleData}/>
        )
        })}
        
      </div>
    )
  } 
}

class EventTitle extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      show: false
    }
		this.toggleDescription = this.toggleDescription.bind(this)
		this.handleData = this.handleData.bind(this)
  }
	toggleDescription() {
    this.setState({
      show: !this.state.show
    })
  }

  handleData(arr) {
    this.props.handleData(arr)
    this.toggleDescription()
  }

  render(){
    return (
      <div className='Event-container'>
        <h2 onClick={this.toggleDescription}>{this.props.name}</h2>
        
        {this.state.show &&
          <Description
            name={this.props.name}
            ings={this.props.ings}
            index={this.props.index}
            handleData={this.handleData}
            date={this.props.date}
            select={this.props.select} 
            time= {this.props.time}
            />}
      </div>
    )
  }
}

class Description extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      showModal: false,
      showButton: false
    }
		this.toggleModal = this.toggleModal.bind(this)
		this.deleteData = this.deleteData.bind(this)
  }
	  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }
  componentDidMount() {
    const token = localStorage.getItem('userId');
    console.log(token); 
if (token === 'WIuFqdrPWtTxUGYO1yjGagfSWJp1') {
    this.setState({
      showButton: true
    })
  }
}


  deleteData() {
    let currentData = JSON.parse(localStorage.getItem('_EventList'))
    currentData.splice(this.props.index,1)
    this.props.handleData(currentData)
  }

  render(){
    const ings = this.props.ings;
    const date = this.props.date;
    const select = this.props.select;
    const time = this.props.time;
		let count = 0;
    return (
      <div className='Description-container'>
        <h3>Dettagli Evento</h3>
      <h4>Date: {date}</h4>
      <h6>Location: {select}</h6>
        <h5>Time: {time}</h5>
        {ings.map((item)=> {
          count++
          return (


            <p key={count}>{item}</p>
          )
        })}
        {this.state.showButton && <MyButton buttonClass='edit'
          name="Edit"
      onClick={this.toggleModal}/> }
        {this.state.showModal &&
          <MyModal
            name="Edit Event"
            onClose={this.toggleModal}
            handleData={this.props.handleData}
            EventName={this.props.name}
            eventDate={this.props.date}
            eventSelect={this.props.select}
            EventTime={this.props.time}
            EventDescription={ings}/>
        }
        {this.state.showButton && <MyButton buttonClass='delete'
          name="Delete"
          onClick={this.deleteData} />}
      </div>
    )
  }
}

class MyModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: this.props.EventName,
      date: this.props.eventDate,
      select: this.props.eventSelect,
      time: this.props.EventTime,
      Description: this.props.EventDescription
    }
		
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
  }
	
	handleChange(name, value) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit() {
    let currentStorage = JSON.parse(localStorage.getItem('_EventList'))
    let checkIndex = currentStorage.findIndex((item, i)=>{
      return item.title === this.state.title
    })
    let Description = this.state.Description
    let ingArr = (typeof Description === 'string') ? Description.split() : this.state.Description

    if(checkIndex >=0){
      currentStorage[checkIndex].Description = ingArr
    } else {
      const newEvent = {
        title: this.state.title,
        date: this.state.date,
        select: this.state.select,
        time: this.state.time,
        Description: ingArr
      }
      currentStorage.push(newEvent)
    }
    this.props.onClose()
    this.props.handleData(currentStorage)
  }

  render() {
    let button = null
    if (this.state.title.length === 0 ||
      this.state.Description.length === 0){
        button = <MyButton
          name='Submit'
          buttonClass='disabled'
          disable={true} />
      } else {
        button = <MyButton
          buttonClass='submit'
          name="Submit"
          onClick={this.handleSubmit} />
      }
    return (
      <div className='backdrop'>
        <div className='modal show'>
          <h3>{this.props.name}</h3>
          <h2>{this.props.date}</h2>
          <h6>{this.props.select}</h6>
          <h5>{this.props.time}</h5>
          <MyForm
            onChange={this.handleChange}
            EventName={this.state.title}
            EventDescription={this.state.Description}
            />

          {button}
          <MyButton name="Close"
            buttonClass='close'
            onClick={this.props.onClose} />
        </div>
      </div>
    )
  }
}
const MyForm = (props) => {
  const handleInputChange = (e)=>{
    const target = e.target
    const name = target.name
    const value = target.value
    props.onChange(name, value)
  }

  const disableEnter = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
    }
  }

  return (
      
    <Form onKeyPress={disableEnter}>
       <FormGroup>
          <Label>Event:</Label>
          <Input type='text'
        className='input-text'
        name="title"
        value={props.EventName}
        placeholder="Add Event Name"
        onChange={handleInputChange}  />
        </FormGroup>
      <br />

      <FormGroup>
          <Label for="exampleDate">Date: </Label>
          <Input type="date" 
          className="input-date"
          name="date"
          value={props.eventDate}
           placeholder="date placeholder" 
           onChange={handleInputChange}  />
        </FormGroup>



        <br/>

        <FormGroup>
          <Label for="exampleSelect">Location: </Label>
          <Input type="select"           
          className="select" 
          name="select"      
          placeholder="select placeholder"
           onChange={handleInputChange} >
          <option>ThinkOpen Sede operativa Assago</option>
            <option>ThinkOpen Sede Legale Garlasco (PV)</option>
            <option>ThinkOpen Distaccamento Barcellona</option>
          </Input>
        </FormGroup>
            <br/>
            <FormGroup>
          <Label for="exampleText">Description: </Label>
          <Input  className='textarea'
        name="Description"
        value={props.EventDescription}
        placeholder="Descrizione Evento"
        onChange={handleInputChange} />
        </FormGroup>
      <br/>

      <FormGroup>
          <Label for="exampleTime">Time: </Label>
          <Input type="time" 
          name="time" 
          value={props.EventTime}
          id="exampleTime"
          onChange={handleInputChange} />
        </FormGroup>
<br/>
    </Form>
  )
}

const MyButton = (props) =>
  <button className={props.buttonClass}
    onClick={props.onClick}
    disabled={props.disabled}>
    {props.name}
  </button>


export default EventBox;