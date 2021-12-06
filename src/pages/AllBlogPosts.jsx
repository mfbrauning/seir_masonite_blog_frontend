import BlogPost from "../components/blogpost"

function AllBlogPosts(props){
    // for each blog post in the array render a BlogPost component
    return props.blogPosts.map((blogPost) => {
        return <BlogPost key={blogPost.id} blogPost={blogPost}/>
    })
}

export default AllBlogPosts