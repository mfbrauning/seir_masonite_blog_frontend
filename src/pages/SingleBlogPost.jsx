import { Link, useParams } from "react-router-dom"


// destructure props 
function SingleBlogPost({blogPosts, edit, deleteBlogPost}){
    const params = useParams()
    const id = parseInt(params.id)
    const blogPost = blogPosts.find((blogPost) => blogPost.id === id)

    ////////////////////
    // Styles
    ///////////////////
    const div = {
        textAlign: "center",
        border: "3px solid green",
        width: "80%",
        margin: "30px auto",
    };
    
    return (
        <div style={div}>
            <h1>{blogPost.title}</h1>
            <h2>{blogPost.body}</h2>
            <button onClick={(event) => edit(blogPost)}>Edit</button>
            <button onClick={(event) => deleteBlogPost(blogPost)}>Delete</button>
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    )
}

export default SingleBlogPost