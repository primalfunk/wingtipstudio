import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationPane from './NavigationPane';
import './ContactPage.scss';

function ContactPage() {
    const [fadeIn, setFadeIn] = useState(false);
    const [buttonBgColor, setButtonBgColor] = useState(false);
    const [textareaBorderColor, setTextareaBorderColor] = useState(false);
    const [buttonColor, setButtonColor] = useState(false);
    const [pageColor, setPageColor] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            company: formData.get('company'),
            message: formData.get('message')
        };
        console.log(data); // For now, just log the data. Replace with email sending logic later.
    };

    useEffect(() => {
        setFadeIn(true);

        const timer1 = setTimeout(() => setButtonBgColor(true), 3000);
        const timer2 = setTimeout(() => setTextareaBorderColor(true), 5000);
        const timer3 = setTimeout(() => setButtonColor(true), 7000);
        const timer4 = setTimeout(() => setPageColor(true), 9000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    return (
        <div className={`contact-page ${fadeIn ? 'fade-in' : ''}`}>
            <h1 className="contact-us-tag">Contact Us</h1>

            <div className={`contact-form-container 
                    ${buttonBgColor ? 'button-background-color' : ''} 
                    ${textareaBorderColor ? 'textarea-border-color' : ''}`}>
            <form id="contactForm">
                <label htmlFor="name">Name (optional):</label>
                <input type="text" id="name" name="name" placeholder="Your name..." className="input-text"/>

                <label htmlFor="company">Company (optional):</label>
                <input type="text" id="company" name="company" placeholder="Your company..." className="input-text"/>

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" placeholder="Your message..." className="textarea" required></textarea>

                <button type="submit" className="button">Submit</button>
            </form>
        </div>
            <div className="social-media-icons">
                <a href="https://www.facebook.com/profile.php?id=100073142869678" className="icon facebook-icon"></a>
                <a href="https://www.linkedin.com/in/jared-menard-a520b622/" className="icon linkedin-icon"></a>
                <a href="https://www.github.com/primalfunk/" className="icon github-icon"></a>
            </div>
            <NavigationPane />
        </div>
    );
}

export default ContactPage;