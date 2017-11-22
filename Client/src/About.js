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
        <p><strong>Food Recovery Network</strong> is the largest student 
        movement against food waste and hunger in America. </p>
        <br> 
        </br>
        <p>In <strong>2011</strong>, Ben Simon, Mia Zavalij and Cam Pascual, students at 
        the University of Maryland, College Park noticed good dining hall 
        food ending up in the trash at the end of the night. By the end 
        of the school year, FRN at UMD had recovered 30,000 meals to DC-area 
        hunger-fighting nonprofits. </p>
        <br> 
        </br>
        <p>During the Spring <strong>2012</strong> semester, the second FRN chapter was 
        founded at Brown University, and the two schools joined forces with two other 
        campus food recovery programs at University of California, Berkeley and Pomona 
        College. </p>
        <br> 
        </br>
        <p> In May <strong>2013</strong>, the Sodexo Foundation provided FRN with founding 
        funding to hire a full-time staff and transition into a professional nonprofit! 
        <strong> Since then</strong>, we have swept the nation and made higher education 
        the first sector where food recovery is the norm and not the exception. </p>
        <br> 
        </br>
        <p>Find out more about our chapters
        <a href="https://www.foodrecoverynetwork.org/chapters"> here.</a>
        </p>
        <br> 
        </br>
        <div>
          <img src={ourImpact} className="picture" alt="ourimpact"/>
        </div>
        <br> 
        </br>
        <p>In September 2011 Food Recovery Network (FRN) was founded as a student group at 
        the University of Maryland.</p>
        <br> 
        </br>
        <p> Today, we are the largest student movement against food waste and hunger and have 
        recovered and donated <strong>more than 2 million pounds of food</strong> that otherwise 
        would have gone to waste. That is more than <strong>1.8 million meals</strong> that has 
        gone to those in need. </p>
        <br> 
        </br>
        <div className = "accomplished">
        <h4><strong>Check out what we have accomplished:</strong></h4>
        </div>
        <br> 
        </br>
        <list>
        <li><a target="_blank" href="https://www.foodrecoverynetwork.org/annualreports">Annual Reports</a></li>
        <br> 
        </br>
        <li><a target="_blank" href="https://static1.squarespace.com/static/555b5cf1e4b0864ccf1a0156/t/5967e02546c3c4bdad4673cf/149997981
        4578/PA+Survey+Report_2017_External.pdf">2017 Partner Agency Report</a></li>
        <br> 
        </br>
        <li><a target="_blank" href="https://www.foodrecoverynetwork.org/faq">FAQ</a></li>
        </list>
        <br> 
        </br>
        <br> 
        </br>
        <br> 
        </br>
      </div>
    )
  }
}

export default About;