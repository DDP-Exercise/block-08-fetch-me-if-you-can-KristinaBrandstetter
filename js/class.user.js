"use strict";

/*******************************************************
 *  Users
 *
 *  See: https://jsonplaceholder.typicode.com/users
 *
 *  Your users should have:
 *      -id
 *      -name
 *      -username
 *      -email
 *      -website
 *
 *  You can skip address, phone and company.
 *
 *  users should also have posts[] (see main.js).
 *
 *  When printing a user, don't forget to make
 *      - href="mailto:.." for the email and
 *      - href=".." target="_blank" for the website.
 *  *******************************************************/

export default class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.website = data.website;
        this.posts = [];
    }

    userToString(){
        return`<button data-user-id="${this.id}">${this.name}</button>
         <a href="mailto:${this.email}">${this.email}</a> 
         <a href="${this.website}" target="_blank">${this.website}</a>
         `;
    }



}