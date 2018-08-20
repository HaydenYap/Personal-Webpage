const nav =[
  {
    name: "Hayden Yap",
    keyID: "hayden-yap",
    href: "#",
    subCat: null
  },
  {
    name: "Projects",
    keyID: "projects",
    href: "#",
    subCat: [
      {
        name: "Web Apps",
        keyID: "web-apps",
        href: "#",
        subCat: [
          {
            name: "Calculator",
            keyID: "calculator",
            href: "#",
            subCat: null
          },
          {
            name: "Drum Machine",
            keyID: "drum-machine",
            href: "#",
            subCat: null
          },
          {
            name: "Markdown Previewer",
            keyID: "markdown-previewer",
            href: "#",
            subCat: null
          },
          {
            name: "Pomodoro Clock",
            keyID: "pomodoro-clock",
            href: "#",
            subCat: null
          },
          {
            name: "Random Quote Machine",
            keyID: "random-quote-machine",
            href: "#",
            subCat: null
          }
        ]
      },
      {
        name: "Web Pages",
        keyID: "web-pages",
        href: "#",
        subCat: [
          {
            name: "Product Page",
            keyID: "product-page",
            href: "#",
            subCat: null
          },
          {
            name: "Survey Page",
            keyID: "survey-page",
            href: "#",
            subCat: null
          },
          {
            name: "Technical Documentation Page",
            keyID: "technical-documentation-page",
            href: "#",
            subCat: null
          },
          {
            name: "Tribute Page",
            keyID: "tribute-page",
            href: "#",
            subCat: null
          }
        ]
      }
    ]
  },
  {
    name: "Resume",
    keyID: "resume",
    href: "#",
    subCat: null
  }
]

const DROP = 'DROP';

const drop = (name) =>{
  return (
    {
      type: DROP,
      name: name
    }
  )
}

const dropReducer = (state = [], action) =>{
  var newState = Object.assign({}, state);
  switch(action.type){
    case DROP:
      if (newState.hasOwnProperty(action.name)){
        newState[action.name] = !newState[action.name];
      } else {
        newState[action.name] = true;
      }
      return newState;
    default:
        return state;
  }
}

const store = Redux.createStore(dropReducer);

class DirectButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <li className="nav-button">
        <div className="nav-name" id={this.props.buttonKeyID}><a href={this.props.buttonHref}>{this.props.buttonName}</a></div>
      </li>
    )
  }
}

class SubNavButton extends React.Component{
  constructor(props){
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(e){
    this.props.drop(e.currentTarget.id);
  }

  render(){
    const buttons = this.props.subButtons.map(function(button){
      if(button.subCat == null){
        return(
          <DirectButton key={button.keyID} buttonKeyID={button.keyID} buttonName={button.name} buttonHref={button.href}/>
        )
      } else {
        let sub = store.getState()[button.keyID] ? <SubNavButton subButtons={button.subCat} /> : null
        return (
          <li className="nav-sub-button" key={button.keyID}>
            <div className="nav-sub-name" id={button.keyID} onClick={this.handleDrop}><a href={button.href}>{button.name} <i className="fas fa-angle-right"></i></a></div>
            <ul>
              {sub}
            </ul>
          </li>
        )
      }
    },this)
    return(
      <div className="sub-buttons">
        {buttons}
      </div>
    )
  }
}

class MainNavButton extends React.Component{
  constructor(props){
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
  }
  handleDrop(e){
    this.props.drop(e.currentTarget.id);
  }

  render(){
    let sub = [];
    const buttons = this.props.mainButtons.map(function(button){
      if (button.subCat == null){
        return (
          <DirectButton classes="main-nav-button" key={button.keyID} buttonKeyID={button.keyID} buttonName={button.name} buttonHref={button.href}/>
        )
      } else {
        sub.push(
          {
            subName: button.keyID,
            content: <SubNavButton key={button.keyID} subButtons={button.subCat} drop={this.props.drop}/>
          }
        )
        return (
          <li className="main-nav-button nav-button" key={button.keyID}>
            <div className="nav-name" id={button.keyID} onClick={this.handleDrop}>{button.name} <i className="fas fa-angle-down"></i></div>
          </li>
        )
      }
    },this)
    if (store.getState()["projects"] == true){
      sub = sub.map(function(subObj){
        return subObj.content
      })
    } else {
      sub = []
    }
    return(
      <div id="nav">
        <ul id="main-nav-content">
          {buttons}
        </ul>
        <ul id="dropdown">
          {sub}
        </ul>
      </div>
    )
  }
}

class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(name){
    this.props.submitDrop(name);
  }

  render(){
    console.log(store.getState())
    return(
      <div id="nav-bar">
        <MainNavButton mainButtons={nav} drop={this.handleDrop}/>
      </div>
    )
  }
}

const mapStateToProps= (state) => {
  return {state: state}
};

const mapDispatchToProps = (dispatch) =>{
  return {
      submitDrop: (content) => {dispatch(drop(content))}
  }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const Container = connect(mapStateToProps,mapDispatchToProps)(NavBar);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
};
ReactDOM.render(<AppWrapper />, document.getElementById("nav"))


$(document).ready(function(){
  console.log("Document ready!")
  }
)