import React from 'react';
import { Icon } from 'antd';
import { EditorState } from 'draft-js';

class Do extends React.Component{

    doClick = () => {
        const { editor, type } = this.props;
        const { editorState } = this.props.editor.state;
        if (type === 'undo') {
            editor.onChange(
                EditorState.undo(editorState)
            )
        } else if (type === 'redo') {
            editor.onChange(
                EditorState.redo(editorState)
            )
        }
    }

    render(){
        const { type } = this.props;
        return(
            <Icon type={ type === 'undo' ? 'undo' : 'redo'} onClick={this.doClick} />
        )
    }
}

export default Do;