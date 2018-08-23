const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const inc = (counter) => {
  var count ;
  if (counter == "break-increment"){
    count = "break"
  } else {
    count = "session"
  }
  return {type: INCREMENT,
          counter: count}
}

const dec = (counter) => {
  var count ;
  if (counter == "break-decrement"){
    count = "break"
  } else {
    count = "session"
  }
  return {type: DECREMENT,
          counter: count}
}

const reset = () =>{
  return {type: RESET}
}

const counterReducer = (state ={break: 5, session: 25}, action) =>{
  var newState = Object.assign({},state)
  switch (action.type){
    case INCREMENT:
      if (newState[action.counter] == 60){
        return state;
      }
      newState[action.counter] +=  1;
      return newState;
    case DECREMENT:
      if (newState[action.counter] == 1){
        return state;
      }
      newState[action.counter] -=1;
      return newState;
    case RESET:
        newState.break = 5;
        newState.session = 25;
    return newState;
    default:
      return state;
  }
}

const START = 'START';
const COUNTDOWN = 'COUNTDOWN';

const start = () =>{
  return {type: START}
}

const countdown = () =>{
  return {type: COUNTDOWN}
}

const timerReducer =(state = {minLeft: 25, secLeft: 0, counter: "session", run: false, timerDone: false}, action) => {
  var newState = Object.assign({}, state);
  switch(action.type){
    case INCREMENT:
      if (action.counter == newState.counter){
        newState.minLeft += 1;
        newState.secLeft = 0;
      }
      return newState;
    case DECREMENT:
      if (action.counter == newState.counter){
        newState.minLeft -= 1;
        newState.secLeft = 0;
      }
      return newState;
    case START:
      newState.run = !newState.run;
      return newState;
    case COUNTDOWN:
      if (newState.secLeft == 0){
        newState.secLeft = 59;
        newState.minLeft -= 1;
      } else {
        newState.secLeft -=1;
      }
      if (newState.minLeft == 0 && newState.secLeft == 0){
        newState.timerDone = true;
      }
      return newState
    case RESET:
      newState.minLeft =25;
      newState.secLeft = 0;
      newState.counter = "session";
      newState.run= false;
      return newState;
    default:
      return state;
  }
}

const rootReducer = Redux.combineReducers({
  counters: counterReducer,
  timer: timerReducer
})

const shared = (pomo) => (next) => (action) =>{
  console.log(action);
  var audio = new Audio($("#beep").attr("src"));
  if (action.type == INCREMENT || action.type == DECREMENT){ // when incrementing or decrmening
    if (pomo.getState().timer.run == false){ // only allow change if the timer is not running,
      next(action);
      pomo.getState().timer.minLeft = pomo.getState().counters[pomo.getState().timer.counter];
    }
  } else{
    if (pomo.getState().timer.timerDone == true){  // if a timer is done then
      audio.play(); // play beep
      if (pomo.getState().timer.counter == "session"){ // if current timer is session switch to break
        pomo.getState().timer.counter = "break";
        changeColor();
      } else {  // if current timer is break switch to session
        pomo.getState().timer.counter = "session";
        changeColor();
      }
      pomo.getState().timer.minLeft = pomo.getState().counters[pomo.getState().timer.counter]; // change timer to appropiate number
      pomo.getState().timer.timerDone = false; // reset timer so it is not done
    }
    next(action);
  }
}

const middleware = Redux.applyMiddleware(shared)

const pomo = Redux.createStore(rootReducer,middleware);

class Counter extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  //handle INCREMENT
  handleIncrement(e){
    this.props.submitIncrement(e.currentTarget.id);
    console.log("incrementing for " + e.currentTarget.id)
  }
  //handle DECREMENT
  handleDecrement(e){
    this.props.submitDecrement(e.currentTarget.id);
    console.log("decrementing for " + e.currentTarget.id)
  }

  handleClick(e){
    console.log(e.currentTarget.id);
  }

  render(){
    var label = this.props.id + "-label"
    var decrement = this.props.id+"-decrement"
    var increment = this.props.id +"-increment"
    var length = this.props.id+"-length"
    var count = this.props.id+"-count"
    return(
      <div id={this.props.id} className="pill">
        <div id={label} className="label">
          {capitalize(this.props.id)} Length
        </div>
        <div id={count} className="count">
          <div id={length}>{pomo.getState().counters[this.props.id]}</div>
        </div>
        <div className="control">
          <div id={decrement} className="control-button" onClick={this.handleDecrement}>
            <i className="fas fa-minus"></i>
          </div>
          <div id={increment} className="control-button" onClick={this.handleIncrement}>
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
    )
  }
}

class Timer extends React.Component{
  constructor(props){
    super(props);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  // handle start_stop
  handleStartStop(){
    var that = this;
    this.props.submitStart();
    if (pomo.getState().timer.run == true){
      var timer = window.setInterval(function(){
        if (pomo.getState().timer.run == false){
          clearInterval(timer);
        } else {
          that.props.submitCountdown();
        }
      },1000)
    }
  }
  //handel reset
  handleReset(){
    this.props.submitReset();
  }

  render(){
    var startStop = pomo.getState().timer.run ? <i className="fas fa-stop"></i> : <i className="fas fa-play"></i>
    return(
      <div id="timer" className="pill">
        <div id="timer-label" className="label">
          {capitalize(pomo.getState().timer.counter)}:
        </div>
        <div id="time-left" className="count">
          {twoDigitPadding(pomo.getState().timer.minLeft)}:{twoDigitPadding(pomo.getState().timer.secLeft)}
        </div>
        <audio src="sound/beepSound.wav" preload="auto" className="beepAudio" id="beep" />
        <div className="control">
          <div id="start_stop" className="control-button" onClick={this.handleStartStop}>
            {startStop}
          </div>
          <div id="reset" className="control-button" onClick={this.handleReset}>
            <i className="fas fa-undo"></i>
          </div>
        </div>
      </div>
    )
  }
}

class Root extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log(pomo.getState())
    return(
    <div id="app">
      <div id="title"> Pomodoro Clock </div>
      <div id="by"> by Hayden Yap </div>
      <div id="counters">
        <Counter id="break" submitDecrement={this.props.submitDecrement} submitIncrement={this.props.submitIncrement}/>
        <Counter id="session" submitDecrement={this.props.submitDecrement} submitIncrement={this.props.submitIncrement}/>
      </div>
      <Timer submitStart={this.props.submitStart} submitReset={this.props.submitReset} submitCountdown={this.props.submitCountdown}/>
    </div>
    )
  }
}

const mapStateToProps= (state) => {
  return {counters: state.counters,
          timer: state.timer}
};

const mapDispatchToProps = (dispatch) =>{
  return {
      submitIncrement: (counter) => {dispatch(inc(counter))},
      submitDecrement: (counter) => {dispatch(dec(counter))},
      submitStart: () =>{dispatch(start())},
      submitCountdown: () =>{dispatch(countdown())},
      submitReset: () =>{dispatch(reset())}
  }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const Container = connect(mapStateToProps,mapDispatchToProps)(Root);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={pomo}>
        <Container />
      </Provider>
    );
  }
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'))

//formating functions
function twoDigitPadding(digit){
  if (digit < 10){
    return '0' + digit;
  } else {
    return digit;
  }
}

function capitalize(string){
  return string[0].toUpperCase() + string.substr(1);
}

function randomColorValue(){
  return Math.floor(Math.random() * 256).toString(16);
}

function changeColor(){
  var red = randomColorValue();
  var green = randomColorValue();
  var blue = randomColorValue();
  while(blue == red && blue == green ){
    blue = randomColorValue();
  }
  var color = (("#".concat(red)).concat(green)).concat(blue);
  $("html body").animate({backgroundColor: color, color: color},1000);
}

$(document).ready(function(){
  changeColor()
})
