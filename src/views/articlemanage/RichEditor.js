import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'; //Editor 
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html' //draft==>html
import htmlToDraft from 'html-to-draftjs'; //html ==>draft
import { EditorState, ContentState } from 'draft-js';

export default class RichEditor extends Component {
    state = {
        editorState: "", //同步编辑器状态
        contentState: "" //同步内容
    }

    componentDidMount() {
        if(!this.props.content) {
            return;
        }// 创建时候，没有传入content, 此时undefined ,不处理
        const html = this.props.content;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState
            })
        }
    }


    render() {
        return (
            <div>
                {/* {this.props.content} */}
                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName" //DIY样式
                    wrapperClassName="wrapperClassName"//DIY样式
                    editorClassName="editorClassName"//DIY样式
                    onEditorStateChange={this.onEditorStateChange}
                    onContentStateChange={this.onContentStateChange}
                    onBlur={() => {
                        //失去焦点的时候， 再传给父组件
                        this.props.getContent(draftToHtml(this.state.contentState))
                    }}
                />

            </div>
        )
    }
    onContentStateChange = (contentState) => {
        this.setState({
            contentState
        })
        // 
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
        // console.log(editorState)
    }
}
