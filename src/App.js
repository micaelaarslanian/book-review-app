import { useState } from "react";
import React from "react";
import "./styles.css";


function App() {

  //"blogEntries" holds an array of blog posts. setBlogEntries is a function that updates blogEntries. 
  const [blogEntries, setBlogEntries] = useState([]);

  //"form" stores the input values for a blog post: title, author, feedback, index. setForm is a function used to update form.
  const [form, setForm] = useState({ title: "", author: "", feedback: "", index: null });

  //function updates the form state when a user types in the input fields.
  const handleChange = (e) => {
    //e.target.name refers to the name attribute of the input field, e.target.value to the value.
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // function runs when the user submits the form. 
  const handleSubmit = (e) => {
    //prevents the default page refresh.
    e.preventDefault();

    // this means the user is adding a new post. new posts appear at the top of the list.
    if (form.index === null) {
      setBlogEntries([{ ...form }, ...blogEntries]);
      //if form.index is not null, the user is editing an existing post.
    } else {
      const updatedEntries = [...blogEntries];
      updatedEntries[form.index] = { ...form };
      //updates the state with the new post list.
      setBlogEntries(updatedEntries);
    }
    //the form fields are reset to empty values.
    setForm({ title: "", author: "", feedback: "", index: null });
  };



  //function is called when the user clicks "Edit" on a post.
  const handleEdit = (index) => {
    //sets form to the post's data (blogEntries[index]) and also updates index
    setForm({ ...blogEntries[index], index });
  };


  //function is called when the user clicks "Delete" on a post.
  const handleDelete = (index) => {
    // create a new array without the deleted entry
    const updatedEntries = blogEntries.filter((entry, i) => i !== index);

    // update the state with the new list
    setBlogEntries(updatedEntries);
  }


  return (
    <div className="app">
      <header className="header">
        <img src="/images/logo.png" alt="Logo" />
      </header>
      <div className="mainContent">
        <main >
          <img
            className="img-head"
            src="/images/000024.JPG"
            alt="Book" />
          <h1>Share Your Book Review</h1>

          <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
            <input type="text" name="feedback" placeholder="Feedback" value={form.feedback} onChange={handleChange} required />
            <button type="submit">{form.index === null ? "Submit Review" : "Update Review"}</button>
          </form>

          <div className="blogEntries">
            {blogEntries.map((entry, index) => (
              <div className="blogEntry" key={index}>
                <p className="formElements">Title: {entry.title}</p>
                <p className="formElements">Author: {entry.author}</p>
                <p className="formElements">Feedback: {entry.feedback}</p>
                <div className="buttonContainer">
                  <button className="formButton formElements" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="formButton formElements" onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <footer className="footer">
        <p className="copyright">Read, Eat & Love Blog - Copyright &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};


export default App;