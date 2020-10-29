import React ,{useState,useEffect} from 'react'
import {PageHeader} from 'antd'
import axios from 'axios'
//为preview 组件提供数据
const usePreviewData=(props)=>{
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const [category, setcategory] = useState([])

    useEffect(() => {
        axios.get(`/articles/${props.match.params.myid}`).then(res=>{
            // console.log(res.data)
            let {title,category,content} =  res.data
            settitle(title)
            setcontent(content)
            setcategory(category)
        })
        return () => {
            
        }
    }, [props])

    return {
        title,
        content,
        category
    }
}

const Preview = (props)=>{

    // console.log(props) //函数式组件从函数的形参中就能拿到属性
    let {title,category,content} = usePreviewData(props)
    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => {
                    // console.log("back",this.props.history)
                    props.history.goBack()//返回上一个页面
                }} //返回按钮
                title={title} //文章标题
                subTitle={category.join("/")} //分类
             />
             <div style={{ padding: "24px" }} dangerouslySetInnerHTML={{
                 __html:content
             }}>
                {/* {this.state.content} */}
             </div>
        </div>
    )
}

export default Preview