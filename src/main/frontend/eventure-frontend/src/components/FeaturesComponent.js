export const FeaturesComponent = () => {
    return (
        <div className="bg-light">
            <div className="container py-5 my-5">
                <div className="row justify-content-around mt-4 p-5">
                    <div className="col-md-4 mb-4 mb-md-0">
                        <div className="card h-100 border-0 bg-light">
                            <div className="card-body text-center">
                                <lord-icon
                                    src="https://cdn.lordicon.com/gluvzmuz.json"
                                    trigger="hover"
                                    style={{ width:'80px', height: '80px'}}>
                                </lord-icon>
                                <h4 className="card-title fw-bold text-warm madimi">
                                    Curated Events
                                </h4>
                                <p className="card-text">
                                    Handpicked events to suit every taste, from arts and culture to sports and
                                    entertainment.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4 mb-md-0">
                        <div className="card h-100 border-0 bg-light">
                            <div className="card-body text-center">
                                <lord-icon
                                    src="https://cdn.lordicon.com/lsrcesku.json"
                                    trigger="hover"
                                    style={{ width:'80px', height: '80px'}}>
                                </lord-icon>
                                <h4 className="card-title fw-bold text-warm madimi">
                                    Real-Time Updates
                                </h4>
                                <p className="card-text">
                                    Stay up-to-date with latest news about upcoming events, changes, and special deals.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4 mb-md-0">
                        <div className="card h-100 border-0 bg-light">
                            <div className="card-body text-center">
                                <lord-icon
                                    src="https://cdn.lordicon.com/hgqdtxby.json"
                                    trigger="hover"
                                    style={{ width:'80px', height: '80px'}}>
                                </lord-icon>
                                <h4 className="card-title fw-bold text-warm madimi">
                                    Exclusive Deals
                                </h4>
                                <p className="card-text">
                                    Enjoy discounts on event tickets, drinks, and more by being part of the Eventure
                                    community.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

