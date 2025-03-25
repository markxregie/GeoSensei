    import React from 'react';
    import './home.css';

    export default function Home() {
        return (
            <section id="home" className="home-container container-fluid">
                <div className="row align-items-center justify-content-center text-center">
                    {/* Image */}
                    
                    <div class="parent">
                        <div class="div1">
                            <div className="col-md-6 text-center">
                                <img src="/Assets/globe.svg" alt="fig" className="img-fluid home-image" />
                            </div>
                        </div>
                        <div class="div2">
                            <h1 className="home-title">Welcome to GeoSensei</h1>
                            <p className="lead fs-4">
                                Your ultimate georaphy learning companion! Explore the world's wonders and 
                                sharpen your geographical knowledge with us.
                            </p>
                        <button className="btn btn-primary rounded-pill px-4 py-2 home-button">Lets go!</button></div>
                    </div>
                    
                    <div className="div3"> 
                       
                       <img src="/Assets/cloudy.svg" alt="fig" className="cloud" />
                       
                       
                    </div>
                </div>
            </section>
        );
    }
