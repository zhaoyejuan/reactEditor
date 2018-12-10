import React from 'react';
import { Tooltip } from "antd";

import Do from './do';
import Font from './font';

class Banner extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const { editor } = this.props;
        const Icons = [
            {
                title: '源码',
                component: <Source editor={eidtor}/>
            },{
                title: '清除',
                component: <Eraser editor={editor} />
            },{
                title: '撤销',
                component: <Do type="undo" editor={editor} />
            },{
                title: '重做',
                component: <Do type="redo" editor={editor} />
            },{
                title: '增加缩进',
                component: <Indent type="plus" editor={editor} />
            },{
                title: '减少缩进',
                component: <Indent type="minus" editor={editor} />
            },{
                title: '字体',
                component: <FontFamily editor={editor} />
            },{
                title: '字号',
                component: <FontSize editor={editor} />
            },{
                title: 'h1',
                component: <Font type="1" editor={editor} />
            },{
                title: 'h2',
                component: <Font type="2" editor={editor} />
            },{
                title: 'h3',
                component: <Font type="3" editor={editor} />
            },{
                title: 'h4',
                component: <Font type="4" editor={editor} />
            },{
                title: 'h5',
                component: <Font type="5" editor={editor} />
            },{
                title: 'h6',
                component: <Font type="6" editor={editor} />
            },{
                title: '引用',
                component: <Blockquote editor={editor} />
            },{
                title: '代码',
                component: <Font type="CODE" editor={editor} />
            },{
                title: '粗体',
                component: <Font type="BLOD" editor={editor} />
            },{
                title: '斜体',
                component: <Font type="ITALIC" editor={editor} />
            },{
                title: '下划线',
                component: <Font type="UNDERLINE" editor={editor} />
            },{
                title: '删除线',
                component: <Font type="STRIKETHROUGH" editor={editor} />
            }
        ]
        return(
            <div className="RichEditor-controls">
                {
                    Icons.map(item => {
                        return (
                                <Tooltip placement="bottom" title={item.title}>
                                    <span className="RichEditor-styleButton">{item.component}</span>
                                </Tooltip>
                        )
                    })
                }
            </div>

        )
    }
}

export default Banner;