const projects = [
  {
    name: "Website",
    key: "website",
    content: [
      {
        key: "HaydenYap.com",
        content: {
          thumbnail: "images/haydenyap.png",
          name: "HaydenYap.com",
          tech: ["HTML","CSS", "JavaScript( Bootstrap, Jquery, React, and Redux)", "Amazon AWS"],
          info:
          `
          This website was first launched in late 2017 using only HTML and CSS. With this most recent update
          (completed in late august 2018), I have implemented the use of primarily JavaScript and its abundance of
          libraries.
          I heavily used React and Redux to build an easily scalable website to ease future updates
          as well as BootStrap in order to produce a responsive website for all devices.
          `,
          href: `https://github.com/HaydenYap/Personal-Webpage`,
          link:"http://haydenyap.com"
        }
      }
    ]
  },
  {
    name: "Web Applications",
    key: "Web-Aplications",
    content:[
      {
        key:  "calculator",
        content: {
          thumbnail: "images/calculator.png",
          name: "Calculator",
          tech: ["HTML", "CSS", "JavaScript( BootStrap, jQuery, React and Redux )"],
          info:
          `
          The visual interface is generated using React Components and the State of the
          calculator (value in the display) is managed throough the Redux Store. The application
          is comparable to a standard calculator.
          `,
          href: "https://github.com/HaydenYap/calculator",
          link: "/projects/Web-Apps/calculator/index.html"
        }
      },
      {
        key:  "Drum-Machine",
        content: {
          thumbnail: "images/drum.png",
          name: "Drum Machine",
          tech: ["HTML", "CSS", "JavaScript( BootStrap, jQuery, React and Redux)"],
          info:
          `
          Performs audio playback of set files based on input in the form of mouse clicks
          on specific buttons or keystrokes of the label on each button. A small box on the right changes to display
          the name of the audio file on playback.
          `,
          href: "https://github.com/HaydenYap/Drum-machine",
          link: "/projects/Web-Apps/Drum-machine/index.html"
        }
      },
      {
        key:  "Markdown-Previewer",
        content: {
          thumbnail: "images/markdown.png",
          name: "Markdown Previewer",
          tech: ["HTML", "CSS", "JavaScript( BootStrap, jQuery, and React )"],
          info:
          `
          Displays a real time preview of the parsed markdown content using the
          Markedjs on <b><a href="https://github.com/markedjs/marked">GitHub</a></b>.
          `,
          href: "https://github.com/HaydenYap/Markdown-Previewer",
          link: "/projects/Web-Apps/Markdown-Previewer/index.html"
        }
      },
      {
        key:  "Pomodoro-Clock",
        content: {
          thumbnail: "images/pomodoro.png",
          name: "Pomodoro Clock",
          tech: ["HTML", "CSS", "JavaScript( BootStrap, jQuery, React, and Redux)"],
          info:
          `
          A timer with two seperate intervals. When the primary interval(session) runs down to 0:00,
          the secondary interval(break) is then started. This process repeats indefinitely. The state of this application
          is handled through Redux which manages which interval to use and what value remains on the timer.
          `,
          href: "https://github.com/HaydenYap/Pomodoro-Clock",
          link: "/projects/Web-Apps/Pomodoro-Clock/index.html"
        }
      },
      {
        key:  "Random-Quote-Machine",
        content: {
          thumbnail: "images/rqm.png",
          name: "Random Quote Machine",
          tech: ["HTML", "CSS", "JavaScript( BootStrap and jQuery )"],
          info:
          `
          Displays a random quote on page load and in reponse to click of "new quote" button.
          The quote is selected from a finite array of quotes. With each page load and new quote, the color scheme
          of webpage alters using jQuery and BootStrap.
          `,
          href: `https://github.com/HaydenYap/Random-Quote-Machine`,
          link: "/projects/Web-Apps/Random-Quote-Machine/index.html"
        }
      }
    ]
  }
]

class ProjectBox extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div className="media">
        <img src={this.props.box.thumbnail} className="align-self-center mr-3 project-image"/>
        <div className="media-body align-self-center project-text">
          <div className="project-name">
            <b>Project Name</b> : {this.props.box.name}
          </div>
          <div className="project-tech">
            <b>Technologies Used</b> : {this.props.box.tech.join(" ")}
          </div>
          <div className="project-info">
            <b>Information</b>:
            <div>{this.props.box.info}</div>
          </div>
          <div className="project-href">
             <b><a href={this.props.box.href}>Github</a> Link</b>
          </div>
          <div className="project-link">
             <b>View the <a href={this.props.box.link}>Web Page</a> here.</b>
          </div>
        </div>
      </div>
    )
  }
}

class ProjectSection extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const projectBoxes = this.props.projects.map(function(box){
      var index = projects.findIndex(x => x.key==this.props.section)
      let color;
      if (projects[index].content.findIndex(x => x.key==box.key) %2 == 0){
        color = "teal";
      } else {
        color = "sky-blue";
      }
        return(
          <div id={box.key} key={box.key} className={color}>
            <ProjectBox box={box.content} />
          </div>
        )
      },this
    )
    return(
      <div>
        {projectBoxes}
      </div>
    )
  }
}

class Root extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const projectSections = projects.map(function(section){
        return(
          <div id={section.key} key={section.key}>
            <div className="section-title"><b>{section.name}</b></div>
            <ProjectSection projects={section.content} section={section.key}/>
          </div>
        )
      }
    )
    return(
      <div id="app">
        {projectSections}
      </div>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
