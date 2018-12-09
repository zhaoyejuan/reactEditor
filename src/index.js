import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  RichUtils,
  KeyBindingUtil,
  getDefaultKeyBinding
} from 'draft-js';

import styleMap from './config/styleMap';
import Banner from './component/banner';

import 'antd/dist/antd.css';
import './index.css';

const rawContent = {};

const Link = (props) => {
  const { url, targetOption } = props.contentState.getEntity(props.entityKey).getData();
  return(
    <a href={url} target={targetOption}>
      {props.children}
    </a>
  )
}

const Image = (props) => {
  const { height, width, src } = props.contentState.getEntity(props.entityKey).getData();
  return(
    <img src={src} width={width} height={height} />
  )
}

const Video = (props) => {
  const { height, width, src } = props.contentState.getEntity(props.entityKey).getData();
  return(
    <video src={src} width={width} height={height} controls></video>
  )
}

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null && contentState.getEntity(entityKey).getType() === 'Link'
      );
    },
    callback
  );
}

const findImageEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null && contentState.getEntity(entityKey).getType() === 'Image'
      );
    },
    callback
  );
}

const findVideoEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null && contentState.getEntity(entityKey).getType() === 'Video'
      );
    },
    callback
  );
}

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },{
    strategy: findImageEntities,
    component: Image,
  },{
    strategy: findVideoEntities,
    component: Video,
  },
])

const getBlockStyle = block => {
  const blockData = block.getData();
  if(blockData.get('text-align')){
    return `RichEditor-textAlign${blockData.get('text-align')}`;
  }else if(blockData.get('quote')){
    return `RichEditor-${blockData.get('quote')}`;
  }else if(blockData.get('textIndent')){
    return `RichEditor-textIndent${blockData.get('textIndent')}`;
  }
}

const customStyleMap = () => {
  return{
    ...styleMap.fontSize,
    ...styleMap.fontFamily,
    ...styleMap.color,
    ...styleMap.backgroundColor,
    CODE: styleMap.CODE,
    SUPERSCRIPT: styleMap.SUPERSCRIPT,
    SUBSCRIPT: styleMap.SUBSCRIPT
  }
}

//映射自定义的键盘快捷键
const myKeyBindingFn = e => {
  if(e.keyCode === 83 && KeyBindingUtil.hasCommandModifier(e)){
    return 'save';
  }else if(e.keyCode === 75 && KeyBindingUtil.hasCommandModifier(e)){
    return 'insert-link';
  }
  return getDefaultKeyBinding(e);
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        rawContent,
        decorator,
      )
    }

    this.onChange = editorState => this.setState({editorState});
    this.handleKeyCommand = command => this._handleKeyCommand(command);
  }

  _handleKeyCommand = (command) => {
    //按键
    const { editorState } = this.state;
    if(command === 'save'){

    }

    const newState = RichUtils.handleKeyCommand(editorState, command);
    if(newState){
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const { editorState } = this.state;
    const contentState = editorState && editorState.getCurrentContent();
    let className = 'RichEditor-editor';
    if(editorState && !contentState.hasText()){
      if(contentState.getBlockMap().first().getType() !== "unstyled"){
        className += " RichEidtor-hidePlaceholder";
      }
    }
    return (
      <div className="RichEditor-root">
        <Banner editor={this}/>
        <div className={className}>
          <Editor 
            blockStyleFn={getBlockStyle}
            customStyleMap={customStyleMap()}
            keyBindingFn={myKeyBindingFn}
            handleKeyCommand={this.handleKeyCommand}
            editorState={editorState}
            onChange={this.onChange}
            placeholder="请输入……"
            ref="editor"
            stripPastedStyles={true}
          />
        </div>
      </div>
    );
  }
}

export default App;
