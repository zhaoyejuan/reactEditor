import React from 'react';
import { Tooltip } from "antd";

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
                component: <Code editor={editor} />
            }
        ]
        return(
            Icons.map(item => {
                return (
                    <Tooltip placement="bottom" title={item.title}>{item.component}</Tooltip>
                )
            })
        )
    }
}

export default Banner;