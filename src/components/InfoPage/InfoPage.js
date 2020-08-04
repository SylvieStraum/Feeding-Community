import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <div className="information">
    <h1>Feeding Community Application Overview</h1>
    <h3>Technologies used</h3>
    <ul>
      <li>list of tech here</li>
    </ul>
    <h3>Big Picture</h3>
    <p>Big picture paragraph here</p>
    <h3>Getting Started</h3>
    <p>This application was created with the intent of providing an intuitive means of interacting with Client Data. 
      This application requires an Admin to view and use each page, and only Admins are permitted to create new admin accounts
      to prevent sensitive client information to leak. Here are the main interactive points of our application and how to use them effectively.
    </p>
    <p><b>Intake Form:</b> All of the inputs are required information for the intake process. Input client information in the 
    structure provided by each input to ensure optimal function for the Application. There will be an assumption as to which program
    a person is enrolled based off of county selected. This can be changed on the Table afterwards if proven to be inaccurate.
    </p>

  </div>
);

export default InfoPage;
