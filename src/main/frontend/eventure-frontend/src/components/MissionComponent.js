import React from 'react';

export const MissionComponent = () => {
    return (
        <div className="py-5 my-5" id="mission">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/img/mission.jpg`}
                            className="img-fluid mx-lg-5 rounded"
                            alt="Our Mission"
                        />
                    </div>
                    <div className="col-md-6 bg-body rounded p-5 border border-dark">
                        <h2 className="text-danger big-text madimi-one-regular">Our Mission</h2>
                        <p>At Eventure, we are dedicated to bringing people together through unforgettable experiences.
                            Our mission is to connect communities, foster creativity, and promote cultural events that
                            enrich lives. Join us in celebrating the vibrant culture of Maribor through unique events
                            and activities.
                        </p>
                        <a href="#events" className="btn btn-danger px-4">See Upcoming Events</a>
                    </div>
                </div>
            </div>
        </div>
    );
};