import React, { useState, useEffect } from 'react';

export const HeroComponent = () => {
    return (
        <div>
            <div className="text-center m-5">
                <div className="container-fluid g-0">
                    <img
                        style={{maxHeight: '400px', objectFit: 'cover'}}
                        className="img-fluid w-100 min-vh-25 min-vh-md-50 mb-n7 rounded-top-4"
                        src={`${process.env.PUBLIC_URL}/assets/img/hero-maribor.jpg`}
                        alt="Maribor"
                    />
                </div>

                <div className="container p-5 bg-body mt-md-n6 position-relative rounded-top-4">
                    <div className="row">
                        <div className="col">
                            <div className="lc-block">
                                <div>
                                    <img src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} className={"logo mb-3"}/>
                                    <h1><span className="text-danger madimi-one-regular big-text">EVENTURE</span></h1>
                                    <p className="display-6 madimi medium-text">Discover Maribor's Best Events!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="">
                            <div className="mt-5">
                                <div>
                                    <p className="lead text-secondary font-weight-bold"> Experience the vibrant culture of Maribor, where
                                        something exciting happens every day.</p>
                                    <p className="lead text-secondary"> Whether you're a local or a visitor, Eventure is
                                        your gateway to festivals, concerts, exhibitions, and more. <br/> Find the best
                                        events, save your favorites, and never miss out on the excitement!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4">
                        <a href={"#events"}>
                            <button type="button" className="btn btn-danger btn-lg mx-2 px-5">Explore Events</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};