import React, { useState, useEffect } from 'react';

export const EventsComponent = () => {
    return (
        <div className="py-5 bg-light" id={"events"}>
            <div className="container my-5">
                <h1 className={"text-center big-text madimi-one-regular text-danger"}>EXPLORE EVENTS</h1>
                <div className="row mt-5">

                    <div className="col-md-4">
                        <div className="card mb-4 box-shadow text-start">
                            <div className="img-container">
                                <img className="card-img-top"
                                     src={`${process.env.PUBLIC_URL}/assets/img/wine-fest.jpg`}
                                     alt="Wine Festival"/>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title text-danger madimi">Wine Festival</h3>
                                <p className="card-text">Celebrate the world’s oldest vine and enjoy a weekend of wine
                                    tasting, live music, and gourmet food. A must for wine lovers!</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-sm btn-outline-danger px-4">View Event</button>
                                    <small className="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-4 box-shadow text-start">
                            <div className="img-container">
                                <img className="card-img-top"
                                     src={`${process.env.PUBLIC_URL}/assets/img/movie-night.jpg`}
                                     alt="Open-Air Movie Night"/>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title text-danger madimi">Open-Air Movie Night</h3>
                                <p className="card-text">Watch classic movies under the stars at Maribor's largest
                                    square. Bring your own blanket or rent one on-site.</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-sm btn-outline-danger px-4">View Event</button>
                                    <small className="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row mt-5">
                    <div className={"text-end"}>
                        <button className={"btn btn-danger px-4"}>Create an Event</button>
                    </div>
                </div>
            </div>
        </div>
    );
};