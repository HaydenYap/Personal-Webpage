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
        name: "Web Pages",
        keyID: "web-pages",
        href: "#",
        subCat: [
          {
            name: "Survey Page",
            keyID: "survey-page",
            href: "#",
            target: "_self",
            subCat: null
          },
          {
            name: "Technical Documentation Page",
            keyID: "technical-documentation-page",
            href: "#",
            target: "_self",
            subCat: null
          },
          {
            name: "Tribute Page",
            keyID: "tribute-page",
            href: "#",
            target: "_self",
            subCat: null
          }
        ]
      },
      {
        name: "Web Apps",
        keyID: "web-apps",
        href: "#",
        subCat: [
          {
            name: "Calculator",
            keyID: "calculator",
            href: "#",
            target: "_self",
            subCat: null
          },
          {
            name: "Drum Machine",
            keyID: "drum-machine",
            href: "#",
            target: "_self",
            subCat: null
          },
          {
            name: "Markdown Previewer",
            keyID: "markdown-previewer",
            href: "#",
            target: "_self",
            subCat: null
          },
          {
            name: "Pomodoro Clock",
            keyID: "pomodoro-clock",
            href: "#",
            target: "_self",
            subCat: null
          },
          {
            name: "Random Quote Machine",
            keyID: "random-quote-machine",
            href: "#",
            target: "_self",
            subCat: null
          }
        ]
      },
      {
        name:"Information on all Projects",
        keyID: "projects-info",
        href: "#",
        target: "_self",
        subCat: null
      }
    ]
  },
  {
    name: "Resume",
    keyID: "resume",
    href: "#",
    target: "_blank",
    subCat: null
  },
  {
    name: "GitHub",
    keyID: "github",
    href: "https://github.com/HaydenYap",
    target: "_blank",
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

      if (newState["projects"] == false){
        newState["web-apps"] = false;
        newState["web-pages"] = false;
      }else if (newState["web-apps"] == true && action.name =="web-apps"){
        newState["web-pages"] = false;
      }else if(newState["web-pages"] == true && action.name =="web-pages"){
        newState["web-apps"] = false;
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
        <div className="nav-name" id={this.props.buttonKeyID}><a href={this.props.buttonHref} target={this.props.buttonTarget}>{this.props.buttonName}</a></div>
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
      let icon;
      if (store.getState()[button.keyID]){
        icon = "fas fa-angle-down";
      } else {
        icon = "fas fa-angle-right";
      }
      if(button.subCat == null){
        return(
          <DirectButton key={button.keyID} buttonKeyID={button.keyID} buttonName={button.name} buttonHref={button.href} buttonTarget={button.target}/>
        )
      } else {
        let sub = store.getState()[button.keyID] ? <SubNavButton subButtons={button.subCat} /> : null
        return (
          <li className="nav-sub-button" key={button.keyID}>
            <div className="nav-sub-name" id={button.keyID} onClick={this.handleDrop}><a href={button.href}>{button.name} <i className={icon}></i></a></div>
            <ul className="sub-drop">
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
      let icon;
      if (store.getState()[button.keyID]){
        icon = "fas fa-angle-down";
      } else {
        icon = "fas fa-angle-right";
      }
      if (button.subCat == null){
        return (
          <DirectButton classes="main-nav-button" key={button.keyID} buttonKeyID={button.keyID} buttonName={button.name} buttonHref={button.href} buttonTarget={button.target}/>
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
            <div className="nav-name" id={button.keyID} onClick={this.handleDrop}>{button.name} <i className={icon}></i></div>
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
