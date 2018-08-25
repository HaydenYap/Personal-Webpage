const defaultText =
"# This is a H1 size heading\n## This is a H2 size heading\n### This is a H3 size heading\nThis is a link to the marked [gitHub](https://github.com/markedjs/marked.git)\n\nInline code `<div></div>`\n\n```\nfunction blockCode(){\n \treturn true;\n}```\n\n- List of items\n\t- item 1\n\t\t- item 2\n\t\t\t- item 3\n\n> Block Quotes are a thing as well\n\n![cat image](https://i.pinimg.com/736x/80/92/0e/80920e478c21f79e90923659d7b1f950--funny-cats-funny-animals.jpg)\n\nHow **BOLD** are you?"

marked.setOptions({
  breaks:true
});
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}
class App extends React.Component {
    constructor(props){
      super(props);
      this.state={
        input: defaultText,
        editMaximized: false,
        previewMaximized: false
      }
      // this bindings
      this.handleEdit = this.handleEdit.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.handleExpand = this.handleExpand.bind(this);
    };
    handleEdit(event){
      this.setState({input:event.target.value})
    }
    handleReset(){
      this.setState({input: defaultText});
      document.getElementById('editor').value= defaultText;
    }
    handleExpand(event){
      var target = event.target.value
      if (target == "Expand Editor"){
        this.setState({
          editMaximized: !this.state.editMaximized,
          previewMaximized: false
        }, function(){
        expand(this.state);});
      } else if (target == "Expand Preview"){
        this.setState({
          editMaximized: false,
          previewMaximized: !this.state.previewMaximized
        },function(){
        expand(this.state);});
      } else {
        console.log("Invalid target")
      }
    }

    render() {
        return (
          <div id="page">
            <div id="toolbar">
              <button onClick={this.handleReset}>Reset</button>
              <button id="expandEdit" onClick={this.handleExpand} value={"Expand Editor"}>Expand Editor</button>
              <button id="expandPreview" onClick={this.handleExpand} value={"Expand Preview"}>Expand Preview</button>
            </div>
            <div id="content">
              <div id="editWindow" className="window">
                <div className="titlebar">Editor</div>
                <textarea id="editor" className="textBox" onChange={this.handleEdit} defaultValue={this.state.input}></textarea>
              </div>
              <div id="markdownWindow" className="window">
                <div className="titlebar">Markdown Preview</div>
                <Preview input={this.state.input}/>
              </div>
            </div>
          </div>
        );
    };
};

function expand(state){
  if (state.editMaximized == true){
    $('#markdownWindow').hide();
    $('#editWindow').addClass('fullscreenWindow').show()
  } else if(state.previewMaximized == true) {
    $('#editWindow').hide();
    $('#markdownWindow').addClass('fullscreenWindow').show()
  } else if(state.editMaximized == false && state.previewMaximized == false){
    $('#editWindow').removeClass('fullscreenWindow').addClass('window').show()
    $('#markdownWindow').removeClass('fullscreenWindow').addClass('window').show()
  }
}


const Preview =(props) =>{
  console.log(marked(props.input));
  return (
    <div id="preview" className="textBox" dangerouslySetInnerHTML={{__html: marked(props.input,{renderer: renderer})}} />
  );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
