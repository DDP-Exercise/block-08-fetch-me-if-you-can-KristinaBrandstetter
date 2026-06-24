"use strict";

import User from "./class.user.js";
import Post from "./class.post.js";


/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    Kristina - 2026-06-22
 *  *******************************************************/

async function asyncawait_getUsers(){
    let dataUser
    let dataPost
    try{
        let responseUser = await fetch("https://jsonplaceholder.typicode.com/users");
        dataUser = await responseUser.json();
        let responsePost = await fetch("https://jsonplaceholder.typicode.com/posts")
        dataPost = await responsePost.json();
    } catch(error){

    }

    let userArray = [];
    for (const item of dataUser) {
        const user = new User(item)
        userArray.push(user);
    }

    let postArray = [];
    for (const item of dataPost) {
        const post = new Post(item)
        postArray.push(post);
    }

    for (const post of postArray) {
        for (const user of userArray) {
            if (post.userId === user.id) {
                user.posts.push(post);
            }
        }
    }

    let content = document.getElementById("content")
    for (let i = 0; i < userArray.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = userArray[i].userToString()
        content.appendChild(div);
    }

    content.addEventListener("click", async function(event){
        if (event.target.dataset.userId) {
            const userId = Number(event.target.dataset.userId);
            for (const user of userArray) {
                if (user.id == userId){
                    for (let i = 0; i < user.posts.length; i++) {
                        const postDiv = document.createElement("div");
                        postDiv.classList.add("post")
                        postDiv.innerHTML = user.posts[i].postToString();
                        event.target.parentElement.appendChild(postDiv);
                    }
                }

            }
        }
        if (event.target.dataset.postId) {
            const postId = Number(event.target.dataset.postId);
            let dataComments
            try{
                let responseComment = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                dataComments = await responseComment.json();
            } catch(error){

            }
            for (let i = 0; i < dataComments.length; i++) {
                const commentDiv = document.createElement("div");
                commentDiv.innerHTML =`<p> ${dataComments[i].name}</p> <p> ${dataComments[i].email}</p> <p>${dataComments[i].body}</p>`;
                event.target.parentElement.appendChild(commentDiv);
            }
        }
    })

}
asyncawait_getUsers();


