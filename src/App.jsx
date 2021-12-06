import AllBlogPosts from "./pages/AllBlogPosts"
import SingleBlogPost from "./pages/SingleBlogPost"
import Form from "./pages/Form"

import React, { useState, useEffect } from "react"

import { Route, Routes, Link, useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate()

  ////////////////////
  // Style Objects
  ////////////////////

  const h1 = {
    textAlign: "center",
    margin:"10px"
  }

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto",
  }

  ///////////////
  // State & Other Variables
  ///////////////

  // API URL
  const url = "https://fb-seir-masonite-blog-backend.herokuapp.com/blogs/"

  // State to hold list of blog posts
  const [blogPosts, setBlogPosts] = useState([])

  // object that represents null blog post
  const nullBlogPost = {
    title: "",
    body: ""
  }

  // state to hold blog post edit
  const [targetBlogPost, setTargetBlogPost] = useState(nullBlogPost)

  //////////////
  // Functions
  //////////////

  // function to get list of blog posts from api
  const getBlogPosts = async () => {
    const response = await fetch(url);
    const data = await response.json()
    setBlogPosts(data)
  }

  // function to add blog post from form data
  const addBlogPost = async (newBlogPost) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBlogPost)
    })

    //updated list of blog posts
    getBlogPosts()
  }

  // function to select blog post to edit
  const getTargetBlogPost = (blogPost) => {
    setTargetBlogPost(blogPost)
    navigate("/edit")
  }

  // function to edit blog post on form submission
  const updateBlogPost = async (blogPost) => {
    await fetch(url + blogPost.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogPost)
    })

    //updated list of blog posts
    getBlogPosts()
  }

  const deleteBlogPost = async (blogPost) => {
    await fetch(url + blogPost.id + "/", {
      method: "delete"
    })
    getBlogPosts()
    navigate("/")
  }
  //////////////
  // useEffects
  //////////////

  // useEffect to get list of blog posts when page loads
  useEffect(() => {
    getBlogPosts()
  }, [])
  //////////////////////////
  // Returned JSX
  //////////////////////////

  return (
    <div className="App">
      <h1 style={h1}>My Blog</h1>
      <Link to="/new"><button style={button}>Create New Blog Post</button></Link>
      <Routes>
        <Route path="/" element={<AllBlogPosts blogPosts={blogPosts}/>}/>
        <Route path="/post/:id" element={<SingleBlogPost blogPosts={blogPosts} edit={getTargetBlogPost} deleteBlogPost={deleteBlogPost}/>}/>
        <Route path="/new" element={<Form initialBlogPost={nullBlogPost} handleSubmit={addBlogPost} buttonLabel="Create Blog Post"/>}/>
        <Route path="/edit" element={<Form initialBlogPost={targetBlogPost} handleSubmit={updateBlogPost} buttonLabel="Update Blog Post"/>}/>
      </Routes>
    </div>
  )
}

export default App
