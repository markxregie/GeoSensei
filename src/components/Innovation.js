import React from 'react';
import Container from 'react-bootstrap/Container';
import './innovation.css';


export default function AppInnovation() {
    return (
        <section id="Innovation" className="block Innovation-block">
            <Container fluid>
                <div className="title-holder">
                    <h1 className="title">Innovations</h1>
                </div>

                <div className="about-parent">
                    {/* Left Section */}
                    <div className="about-item">
                        <img src="/Assets/rocket1.svg" alt="world" className="about-img" />
                        <h2 className="about-subtitle">Unique Aspects</h2>
                        <p>GeoSensei offers a gamified learning experience with interactive quizzes that make geography learning fun and engaging. Users can collect badges as they progress, providing motivation to continue learning. Additionally, the app features an AI-powered chatbot that is restricted to geography topics, allowing users to receive hints and learning assistance in a focused and interactive manner.</p>
                    </div>

                    {/* Right Section */}
                    <div className="about-item">
                        <img src="/Assets/rocket2.svg" alt="world" className="about-img" />
                        <h2 className="about-subtitle">Emerging technologies</h2>
                        <p>   The app integrates advanced technologies to enhance user experience, including an AI-powered chatbot with geography-specific filtering to ensure relevant assistance. Gamification elements are incorporated to boost engagement and motivation. Furthermore, GeoSensei utilizes a cloud-based database, enabling scalability and real-time quiz updates to keep content fresh and dynamic.</p>
                    </div>
                </div>
                <div className="div3">                       
                       <img src="/Assets/city.svg" alt="fig" className="city" />                      
                </div>
                <div className="div3">                       
                       <img src="/Assets/wave.svg" alt="fig" className="wave" />                      
                </div>

            </Container>
        </section>
    );
}
