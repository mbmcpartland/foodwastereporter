import React, { Component } from 'react';
import ourStory from './Pictures/firstAbout.png';
import ourImpact from './Pictures/secondAbout.png';
import './About.css'; 

class About extends Component {
  render () {
    return (
      <div className="aboutUs">
        <div>
          <img src={ourStory} className="picture" alt="ourstory"/>
        </div>
        <br>
        </br>
        <p>The <strong>Food Recovery Network (FRN)</strong> is the largest student-led movement 
        fighting food waste and hunger in the US. Founded by students at the 
        University of Maryland in 2011, FRN has since expanded to 230 chapters 
        across the nation and diverted more than 2 million pounds of food from 
        landfill. </p>
        <br> 
        </br>
        <p>At USF, the Food Recovery Network is a registered student organization 
        that has been recovering excess food for <strong> over three years </strong> and donating it 
        to San Franciscans who struggle with food insecurity. FRN recovers most of 
        its food from Market Café on campus. However, FRN also recovers food from 
        farmers markets, wholesale produce distributors, and bagel shops.</p>
        <br> 
        </br>
        <p> FRN volunteers recover between 60-150 pounds of perishable food from 
        Market Café each night, three nights a week. Recovered food is stored 
        overnight, then reheated and prepared for donation and service the following 
        night. Food donations are held at a different locations in San Francisco each 
        night, and FRN typically feeds about <strong>100</strong> people at each location.</p>
        <br> 
        </br>
        <p> During the 2016-17 academic year, FRN recovered and donated nearly <strong>13,500 
        pounds of food. </strong>
        </p>
        <div className="underline">
            <h1> DONATION SCHEDULE </h1>
        </div>
        <h3> Tuesdays </h3>
        <p> (Faithful Fools - Tenderloin) </p>
        <p> <strong>5:30pm to 8pm</strong> </p>

        <h3> Wednesdays </h3>
        <p> (Civic Center Plaza) </p>
        <p> <strong>5:30pm to 7:30pm</strong> </p>

        <h3> Thursdays </h3>
        <p> (SF Night Ministry - 16th and Mission) </p>
        <p> <strong>6pm to 8pm</strong> </p>

        <p><strong>All donations meet at, and leave from, the loading dock at UC. </strong></p>
        <br>
        </br>
        <li><a target="_blank" href="http://www.frnusfca.com">Visit our Website</a></li>
        <br>
        </br>
      </div>
    )
  }
}

export default About;