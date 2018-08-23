const webContent = {
  banner: [
    {
      id: "title",
      content: `Hayden Yap`
    },
    {
      id: "descriptors",
      content: `Aspiring Web Developer, Tech Enthusiast, and Gamer`
    }
  ],
  about: [
    {
      id: "gen",
      content:
      `
      Hello I'm Hayden Yap, welcome to my personal website. I am a Computer Science Student studying at the
      <a href="https://uwaterloo.ca/"><b>University Of Waterloo</b></a>. I've had a keen interest in computers since the 8th
      grade. It started off as an interest in hardware specifically since I built my first computer at around that time.
      Towards the end of my junior year, I started to learn <b>Java</b> using the <b>Ready to Program</b> IDE. Since then, coding has
      transcended from simply a hobby to a career path.
      `
    },
    {
      id: "webDev",
      content:
      `
      I learned a minimal amount of HTML in senior year and did not revisit the topic until late 2017. Since then, I've learned
      how to use CSS and JavaScript to create more modern looking webpages. Recently I started to learn various libraries such as
      Bootstrap, jQuery, React and Redux to further my skils in web development
      `
    },
    {
      id: "game",
      content:
      `
      Some people love movies and some love TV series. Everyone has their favourite form of entertainment which to them,
      trumps all others.For me, It is games. I am asked quite often why I prefer Games over movies or TV and my answer is always
      the same: <em>"I can spend $15 on a 2 hour movie or I spend $80 on a game that I can easily spend 100+ hours playing"</em>.
      `
    }
  ]
}

class Text extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id={this.props.payload.id} dangerouslySetInnerHTML={{__html: this.props.payload.content}}></div>
    )
  }
}

class Section extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const content = this.props.payload.map(function(load){
      return (
        <Text key={this.props.sectionName+"-"+load.id} payload={load}/>
      )
    },this)
    return(
      <div id={this.props.sectionName}>
        {content}
      </div>
    )
  }
}

class Root extends React.Component{
constructor(props){
  super(props);

}

render(){
  return(
    <div>
      <Section payload={webContent.banner} sectionName="banner"/>
      <Section payload={webContent.about} sectionName="about" />
    </div>
  )
}
}

ReactDOM.render(<Root />, document.getElementById('root'))
