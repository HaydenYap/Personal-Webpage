const nav =[
  {
    name: "Hayden Yap",
    keyID: "hayden-yap",
    href: "http://haydenyap.com/",
    target:"_self",
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
        href: "/projectsInfo.html",
        subCat: null
      },
      {
        name: "Web Pages",
        keyID: "web-pages",
        href: "#",
        subCat: [
          {
            name: "Survey Page",
            keyID: "survey-page",
            href: "/projects/Web-Pages/Survey-Form-Page/index.html",
            target: "_self",
            subCat: null
          },
          {
            name: "Technical Documentation Page",
            keyID: "technical-documentation-page",
            href: "/projects/Web-Pages/Technical-Documentation-Page/index.html",
            target: "_self",
            subCat: null
          },
          {
            name: "Tribute Page",
            keyID: "tribute-page",
            href: "/projects/Web-Pages/Tribute-Page/index.html",
            target: "_self",
            subCat: null
          }
        ]
      }
    ]
  },
  {
    name: "Resume",
    keyID: "resume",
    href: "/images/Resume.pdf",
    target: "_blank",
    subCat: null
  },
  {
    name: "GitHub",
    keyID: "github",
    href: "https://github.com/HaydenYap",
    target: "_blank",
    subCat: null
  },
  {
    name: "linkedIn",
    keyID: "linkedIn",
    href: "https://www.linkedin.com/in/hayden-yap-51715bba/",
    target:"_blank",
    subCat: null
  }
]

class Drop extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const dropButtons = this.props.subCat.map(function(button){
      if (button.subCat == null){
        return(
          <li key={button.keyID} className="dropdown-item">
            <a className="dropdown-link" href={button.href} target={button.target}>{button.name}</a>
          </li>
        )
      } else {
        return(
          <li key={button.keyID} className="dropdown-item dropdown-sub dropright">
            <a className="sub-menu dropdown-link dropdown-toggle" data-toggle="drop">{button.name}</a>
            <Drop subCat={button.subCat} />
          </li>
        )
      }
    })
    return(
      <ul className="dropdown-menu">
        {dropButtons}
      </ul>
    )
  }
}

class Nav extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const mainNavButtons = nav.map(function(button){
      if (button.subCat == null){
        return(
          <li key={button.keyID} className="nav-item">
            <a className="nav-link" href={button.href}>{button.name}</a>
          </li>
        )
      } else {
        return(
          <li key={button.keyID} className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown">{button.name}</a>
            <Drop subCat={button.subCat}/>
          </li>
        )
      }
    })
    return(
      <div id="navigation" className="navbar navbar-expand-sm fixed-top">
        <ul className="navbar-nav">
          {mainNavButtons}
        </ul>
      </div>
    )
  }
}

$(document).ready(function(){
  topPadding()
  $('.dropdown-sub a.sub-menu').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
  });
});
$(window).resize(function(){
  topPadding()
})
const topPadding = () =>{
  var currentHeight = document.getElementById('navigation').clientHeight
  $('#root').css("padding-top",currentHeight + "px")
}

ReactDOM.render(<Nav />, document.getElementById("nav"))
