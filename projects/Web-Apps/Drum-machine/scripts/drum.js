{/* Set of audio and their assocaited keys and name*/}
const setOne=[
  {
    sound: "heater-1",
    source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    key: "Q"
  },
  {
    sound: "heater-2",
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    key:"W"
  },
  {
    sound: "heater-3",
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    key:"E"
  },
  {
    sound: "heater-4",
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    key:"A"
  },
  {
    sound: "brk-snr",
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
    key:"S"
  },
  {
    sound: "dsc-oh",
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    key:"D"
  },
  {
    sound: "kick-n-hat",
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    key:"Z"
  },
  {
    sound: "rp4-kick",
    source: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    key:"X"
  },
  {
    sound: "cev-h2",
    source: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    key:"C"
  }
];

// Plays audio depending on the given keyStroke
class Button extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
      var audio = new Audio($("#"+this.props.clipKey).attr("src"));
      audio.play();
      this.props.changeDisplay(this.props.clipSound);
      $("#"+this.props.clipSound).css("opacity","0.5");
      var that = this;
      setTimeout(function () {
        $("#"+that.props.clipSound).css("opacity","1");
      }, 250);

  }
  render(){
    return(
      <button className="drum-pad" id={this.props.clipSound} onClick={this.handleClick}>
        <audio src={this.props.clipSource} className="clip" id={this.props.clipKey}></audio>
        <div className="drum-text">{this.props.clipKey}</div>
      </button>
    )
  }
}

class Panel extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    // buttons is an array of Button elements with their associated audio element and text
    const buttons = this.props.set.map(function(sound){
      return(
        <Button clipSound={sound.sound} clipSource={sound.source} clipKey={sound.key} key={sound.key} changeDisplay={this.props.changeDisplay}/>
      )
    },this)
    // Rows is a 2d array of buttons of size 3 to make imitate a row of 3 buttons
    var rows = [];
    while(buttons.length) rows.push(buttons.splice(0,3));

    // panel warps each row into a div element with class "panel-row"
    const panel = rows.map(function(row){
      return(
        <div className="panel-row" id={"row-" + rows.indexOf(row)} key={"row" + rows.indexOf(row)}>
          {row}
        </div>
      )
    })
    return (
      <div id="panel">
        {panel}
      </div>
    )
  }
}

// Main App component
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      display:"        "
    }
    this.handleDisplay = this.handleDisplay.bind(this)
  };
  handleDisplay(text){
    this.setState({display:text})
  }

  render(){
    return(
      <div id="drum-machine">
         <Panel changeDisplay={this.handleDisplay} set={setOne}/>
         <div id="display">
          <div id ="display-box">
            {this.state.display}
          </div>
         </div>
      </div>
    )
  }
}

/*  Detects strokes in the form of onkeydown and sends the assocaited key-storke to playAudio*/
$(document).ready(function(){
  onkeydown =function(event){
    var stroke = String.fromCharCode(event.keyCode);
    $("#"+stroke).click();
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
