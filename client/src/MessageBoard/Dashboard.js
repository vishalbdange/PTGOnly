import {React,useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Dashboard = () => {

    const [posts,setPosts] = useState([])
    const [messageobj,setMessageobj] = useState({
        subject:"",
        message : "",
        linkName : "",
        linkUrl : ""
    })
    
    const handleChange = (e) => {
        console.log(e.target.value)
        setMessageobj({...messageobj,[e.target.name]:e.target.value})
    }

    const handleSubmit = () => {
        setPosts((oldPosts) => [...oldPosts, messageobj])
        const inputs = document.querySelectorAll('#subject,#message,#linkName,#linkUrl');
        inputs.forEach(input => {
            input.value = '';
          });
        console.log(messageobj)
         
    }


    const styles = {

        formBoxParent: {
            margin: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        },
        formBox: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "10px",
            height: "60vh",
            width: "70vw",
            border: "1px solid grey",
            boxShadow: "1px 2px 3px 1px grey",
        },
        buttonStyle: {
            margin: "10px"
        },
        posts : {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "evenly",
            padding:"20px",
            margin:"20px",
            boxShadow:"1px 2px 3px 1px grey",
            borderRadius:"4px",

        },
        allposts : {

            margin:"5px",
            padding:"5px",
            boxShadow:"1px 2px 3px 1px grey",
            
        },
        post: {
            display: "flex",
            flexDirection: "column",
            fontFamily:"sans-serif",
            fontSize:"16px" ,
            padding:"20px",
            borderRadius:"10px",
            border:"4px grey",
            margin:"10px",
            boxShadow:"1px 2px 2px 1px grey"
        }
    };

    return (
        <>
            <div style={styles.formBoxParent}>
                <div style={styles.formBox}>
                    <TextField id="subject" name="subject" fullWidth size="small" onInput={handleChange} label="Subject" variant="outlined" />
                    <TextField id="message" name="message" fullWidth size="small" onInput={handleChange} label="Message" variant="outlined" />
                    <TextField id="linkName" name="linkName" fullWidth size="small" onInput={handleChange} label="Link Name" variant="outlined" />
                    <TextField id="linkUrl" name="linkUrl" fullWidth size="small" onInput={handleChange} label="Link URL" variant="outlined" />
                    <Button variant="contained" style={styles.buttonStyle} onClick={handleSubmit}>Post</Button>
                </div>  
            </div>
            <div style={styles.allposts}>
                <h3 style={{textAlign:"center"}}>All Posts</h3>
                <div style={styles.posts}>
                    {
                        posts?.map((post)=> {
                            return(
                            <div style={styles.post}>
                                <h7>Subject - {post.subject}</h7>
                                <h7>Message - {post.message}</h7>
                                <h7>LinkName - {post.linkName}</h7>
                                <h7>Link - {post.linkUrl}</h7>
                            </div>)
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default Dashboard;