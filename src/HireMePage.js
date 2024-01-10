import React, { useEffect, useState } from 'react';
import { Chrono } from "react-chrono";
import NavigationPane from './NavigationPane';
import './HireMePage.scss';

function HireMePage() {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const items = [
        { title: "2022-2023", cardTitle: "Employment as Sales Analyst", cardSubtitle: "Ecovacs Robotics Americas", cardDetailedText: "As sole analyst for the Americas region of this China-based company, my work was to design, implement and maintain an end-to-end reporting solution with Azure, Power BI, Python, and Excel/Powerpoint. I collected huge amounts of data, captured insights from it with statistical and other analytics, and wrote clear, impactful reporting with beautiful visualizations." },
        
        { title: "2020-2022", cardTitle: "Employment as Business Intelligence Analyst", cardSubtitle: "MarketStar, LLC", cardDetailedText: "On joining the BI team, I was responsible for developing and maintaining Power BI and Excel dashboards for a wide variety of sales teams and sales motions, as well as building data models for several functions. This was where I solidified concepts like SCRUM and started to incorporate machine-learning and AI-based technologies into my work." },
        
        { title: "2018-2020", cardTitle: "Employment as Global Sales Operations Manager", cardSubtitle: "MarketStar, LLC", cardDetailedText: "I spent some time with the Pinterest team at MarketStar as the functional Salesforce admin for a seller group of 150+ agents. A lot of time here went into data modeling: compensation, sales/inventory forecast, and customer and employee churn. I also started studying basic neural network modeling with Brain.js. Used the GSuite, Javascript and Tableau." },
        
        { title: "2017-2018", cardTitle: "Employment as Sales Team Manager", cardSubtitle: "MarketStar, LLC", cardDetailedText: "When first joining Marketstar, I led two teams of SDRs in Direct Sales and Channel motions. I enjoyed making use of my people management background and spent a lot of time learning the ropes in the SAAS field." },
        
        { title: "2017", cardTitle: "Award - Double Hackathon Winner", cardSubtitle: "DevPoint Labs at University of Utah", cardDetailedText: "I love contests and competitions! During the training program there were two separate hackathon events, one in which each individual in the group participated on their own, and one where groups were organized. I won both the group competition as Team Leader and the individual competition. Both projects involved Javascript and a Ruby backend, and the former was a prototype CMS with React.js." },
        
        { title: "2017", cardTitle: "Education - Full Stack Web Developer Certificate", cardSubtitle: "DevPoint Labs at University of Utah", cardDetailedText: "Although I'd been using different types of programming since childhood, copying BASIC code out of Compute! Magazines on a C64, this was my first formal education environment for learning Javascript, React.js, Node.js, SQL, Ruby on Rails, HTML/CSS, and more." },
        
        { title: "2016", cardTitle: "Award - 1st Place Winner", cardSubtitle: "Utah State Chess Championship", cardDetailedText: "A lifelong chess enthusiast, I haven't played in very many official tournaments. I was happy to take home the big trophy this time and look forward to earning another in the future. I also dabble in chess engine development and follow world chess happenings in the news." },
        
        { title: "2015-2017", cardTitle: "Employment as Data Analyst", cardSubtitle: "Wayfair, LLC", cardDetailedText: "As Wayfair was going through its early explosive expansion period, I was internally climbing the ranks and getting a reputation for good analytics and a mastery of the tools. I worked side-by-side with the director of the fledgling B2B department, learned SQL and Javascript on the job, and built and maintained data models for workforce planning and sales forecasting." },
        
        { title: "2014-2015", cardTitle: "Employment as Senior Manager", cardSubtitle: "Wayfair, LLC", cardDetailedText: "Later at Wayfair, I led managers of teams of phone Service agents. I kept building QOL apps in VBA and Javascript, giving function leaders things like automatic compensation calculations, rankings and organizations of internal communication. I also authored a significant amount of research on the subject of high-stakes customer service situations, meant to inspire and grow a culture of service." },
        
        { title: "2014", cardTitle: "Award - Service Manager of the Year", cardSubtitle: "The Wayfair, LLC global organization", cardDetailedText: "Accompanied by a $100 gift card, this award also came with a lot of bragging rights in the highly competitive culture of Wayfair. It was presented to me in the middle of an enormous gala the the beautiful Snowbird ski resort in Utah." },
        
        { title: "2012-2014", cardTitle: "Employment as Service Team Manager", cardSubtitle: "Wayfair, LLC", cardDetailedText: "I was tapped to lead a team of phone and email CS agents. I took a lot of pride in mentoring and training, and helped to direct the structure which would later become an organized and flexible hybrid workforce. I also codified my customer service philosophy and techniques in a teachable curriculum." },
        
        { title: "2011", cardTitle: "Employment as Service Agent", cardSubtitle: "Wayfair, LLC", cardDetailedText: "I earned promotion to manager after only six months on the job. I was given the title of 'The Customer Whisperer' based on my ability to calm even the most upset telephone customer and ensure peaceful outcomes. My former background as a military intelligence professional, in having learned how to handle myself through stressful situations, gave me an advantage in this line of work." },
       
        { title: "2008-2011", cardTitle: "Employment as Foreign Currency Account Manager", cardSubtitle: "InterbankFX, LLC", cardDetailedText: "Working in Finance was fascinating. While with Interbank, I maintained, serviced and executed on foreign currency trading accounts, working with customers all over the world. I learned to read Arabic on the job to perform official foreign document translation, and used VBA/Excel to build quality of life tools for multiple business functions." },
       
        { title: "2007-2008", cardTitle: "Employment as Steel Worker", cardSubtitle: "J&M Steel Solutions, Inc", cardDetailedText: "Built metal structures across the western US including UAV hangers near Las Vegas, an IKEA in Salt Lake City, and a wastewater treatement plant in eastern Colorado. Ironworking is a dangerous job, and there was only so much of it I was willing to go on doing once I met my wife." },
       
        { title: "2006-2007", cardTitle: "Employment as General Manager", cardSubtitle: "Domino's Pizza", cardDetailedText: "The highest position I achieved within the Domino's organization was that of General manager. For about a year and a half I was responsible for my own Domino's storefront and location in Clearfield, UT, hiring and training all staff and overseeing all store operations. At any given time my team  was between 15 and 20 individuals." },
       
        { title: "2006", cardTitle: "Award - Gold Pin uniform flair", cardSubtitle: "Domino's Pizza", cardDetailedText: "Set a new district-wide record in speed pizza-making with a time of 26 seconds for a large pepperoni. The ability to do this was honed by making tens of thousands of pizzas for hours on end at the highest performance levels I could produce. If you've never heard of speed pizza-making, yes - it's a thing." },
      
        { title: "2005-2006", cardTitle: "Employment as Assistant Manager", cardSubtitle: "Domino's Pizza", cardDetailedText: "After earning a promotion to AM, I make my mark as being exceptionally flexible, and worked as a roving stand-in management worker for the northern Utah corporate stores, travelling from Salt Lake City to Logan and everywhere in between. I made thousands and thousands of pizzas in conditions ranging from fall-asleep slow to sky-falling slammed, and everywhere in between." },
      
        { title: "2004-2017", cardTitle: "Employment as Delivery Driver, various", cardSubtitle: "Domino's Pizza", cardDetailedText: "A friendly disposition and knack for navigation has given me a long and successful career as a part-time delivery driver or pizza-maker at various stages, including while working a second full-time job or going to school full-time. Immediately after my Air Force contract, finding few good applications of the skills I'd honed so far, I worked full-time as a delivery driver."},
      
        { title: "1998-2004", cardTitle: "Education - Military Leadership Certification", cardSubtitle: "Noncomissioned Officer's Academy, Lackland AFB, TX", cardDetailedText: "Graduated top of my class as an E-5 (Staff Sergeant), clearing the last barrier to the ranks of Master Sergeant and above. The coursework covered topics of military strategy, leadership, logistic and heuristic principles of warfare, and professional report writing." },
      
        { title: "1998-2000", cardTitle: "Education - Master level Slavic Crytolinguist 1N373B", cardSubtitle: "Defense Language Institute Foreign Language Center, Presidio of Monterey, CA", cardDetailedText: "Served as airman leader through all training periods, with positions including Drill Team, Honor Guard, Squad Leader, Bay Chief, and Flight Commander (red rope). Professional linguist training also includes the Crypto sections, which are delivered at Goodfellow AFB, TX in Secure Compartmented Information Facilities, lovingly known as SCIFs. Part of the reason for the unusually long training program for this job is the ~8 months it takes to complete the prerequisite security clearance investigation." },
      
        { title: "2001-2003", cardTitle: "Education - Associates of Science Degree, Communications Technology", cardSubtitle: "Community College of the Air Force", cardDetailedText: "Earned while serving under active duty. I was able to leverage my ability to learn abstract and symbolic concepts and earned the majority of college credits required for this degree by taking College Level Proficiency Exams, and a significant portion through On the Job training as a cryptolinguist. The core principles of academic focus in this degree deal with Radio Frequency Communication technologies." },
      
        { title: "1998-2004", cardTitle: "Employment as Cryptologic Linguist", cardSubtitle: "United States Air Force", cardDetailedText: "Taking a mandatory 6-year contract for the job of linguist, I spent the first two years of my enlistment navigating technical training in Russian language and culture, cryptography, and military intelligence. I used Linux and Unix systems, learned about shell programming, and held a Top Secret / SCI classication clearance. After promotion to Staff Sergeant, I also supervised a dozen airmen on a day-to-day basis." },
      
        { title: "1998", cardTitle: "Award - Air Force Basic Military Training Honor Graduate", cardSubtitle: "319th Training Squadron, US Air Force", cardDetailedText: "No more than 3% of BMT graduates can earn the designation of Honor Graduate. In earning this distinction, I had to undergo the substantial physical and mental challenges of Basic Training and make no academic, formal or behavioral mistakes at any point in the process. Because of my musical abilities, I was a member of a specially designated 'band flight' and performed the lead snare alongside my flight for graduation ceremonies." },
       
        { title: "1998", cardTitle: "Employment as Assistant Plumber", cardSubtitle: "Harlingen Plumbing and Drainage", cardDetailedText: "My first job out of high school. I already had a committment to join the Air Force later that fall but spent a little time learning about hard work with Frank Rackley's fine company. I developed a taste for coffee and donuts and a certain awareness of basic plumbing concepts, while getting the opportunity to stay out of trouble and get my hands dirty at the same time." },
      
        { title: "1994-98", cardTitle: "Education - High School Diploma", cardSubtitle: "Science Academy of South Texas", cardDetailedText: "One of four comprehensive magnet secondary schools in the South Texas Independant School District, just 7 miles from the U.S. - Mexico border. The curriculum included an elective teaching the Pascal programming language, to which I took an instant liking. On graduation, I was granted the honorary title of 'Unofficial Mexican' by my Hispanic friends, which is not, strictly speaking, a legal title." },
       
        { title: "1986-90", cardTitle: "Award - Musical Achievement", cardSubtitle: "Consecutive Years: 4, Violin Recital Grade of Superior",
        cardDetailedText: "Awarded by the Rio Grande Valley Orchestral Music Association. I was a member of the children's orchestra and was very lucky to receive weekly lessons on the violin from the ages of 6 to 10. Since then I've learned to compose sonatas and symphonies, mix and master audio recordings, and continue to have a reasonably high creative output for an amateur/hobbyist."}
    ];

    return (
        <div className={`hire-me-page ${fadeIn ? 'fade-in' : ''}`}>
            <div className="page-header">
                <h1 className="page-title">Professional History</h1>
            </div>
            <p className="intro-paragraph">Thank you for your interest. I've organized my journey so far below as a timeline - why not have a look?</p>
            <div className="outer-chrono-wrapper">
                <div className="chrono-wrapper">
                    <div style={{ width: "90vw", height: "50vh" }}>
                        <Chrono items={items} theme = {{primary: "gray", secondary: "black"}} fontSizes={{title:"0.8rem", cardHeader: "0.8rem", cardText: "0.7rem", cardSubtitle: "0.75rem"}}mode="VERTICAL_ALTERNATING"/>
                    </div>
                </div>
            </div> 
            <p className="conclusion-paragraph">email: jared.d.menard@gmail.com</p>
            <NavigationPane />
        </div>
    );
}

export default HireMePage;