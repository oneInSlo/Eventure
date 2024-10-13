import React, { useState, useEffect } from 'react';
import { EventDetailsModalComponent } from "./EventDetailsModalComponent";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const EventsComponent = () => {
    const [events, setEvents] = useState([]); // state to hold event data
    const [filteredEvents, setFilteredEvents] = useState([]); // state to hold filtered events
    const [searchQuery, setSearchQuery] = useState(''); // state to hold search query
    const [selectedEvent, setSelectedEvent] = useState(null); // state to hold the selected event for editing
    const [showModal, setShowModal] = useState(false); // state to control modal visibility
    const navigate = useNavigate();

    // fetch events from the backend
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/events');
            setEvents(response.data);
            setFilteredEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);


    const handleCreateNewEvent = () => {
        setSelectedEvent(null); // clear any selected event
        setShowModal(true); // open the modal
    }

    const handleEditEvent = (event) => {
        setSelectedEvent(event); // set the event to be edited
        setShowModal(true); // open the modal
    }

    const handleViewEvent = (id) => {
        navigate(`/events/${id}`);
    }

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = events.filter(event => event.event_name.toLowerCase().includes(query));
        setFilteredEvents(filtered);
    }

    return (
        <div className="py-5 bg-light" id="events">
            <div className="container my-5">
                <h1 className="text-center big-text madimi-one-regular text-danger">EXPLORE EVENTS</h1>
                <div className="input-group mt-4">
                    <input type="text" className="form-control" id="search-input"
                           placeholder="Search Events..." value={searchQuery} onChange={handleSearchChange}/>
                    <span className="input-group-text bg-light" id="basic-addon3">
                        <lord-icon
                            src="https://cdn.lordicon.com/qxvhathv.json"
                            trigger="hover"
                            state="hover-rotation"
                            colors="primary:#dc3545,secondary:#dc3545,tertiary:#e4e4e4,quaternary:#dc3545"
                            style={{width: '30', height: '30'}}>
                        </lord-icon>
                    </span>
                </div>
                <div className="text-end mt-4">
                    <button className="btn btn-danger" onClick={handleCreateNewEvent}>Create a New Event</button>
                </div>
                <div className="row mt-5">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <div key={event.id} className="col-md-4">
                                <div className="card mb-4 box-shadow text-start">
                                    <div className="img-container">
                                        <img
                                            className="card-img-top"
                                            src={`${process.env.PUBLIC_URL}/assets/img/event_${event.id}.jpg`}
                                            alt={event.event_name}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title text-danger madimi">{event.event_name}</h3>
                                        <p className="card-text">{event.event_description}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small
                                                className="text-muted">{new Date(event.event_datetime_start).toLocaleString()}</small>
                                            <div className="btn-group" role="group" aria-label="Button group">
                                                <button className="btn btn-sm btn-outline-secondary px-3"
                                                        onClick={() => handleEditEvent(event)}>Edit Event
                                                </button>
                                                <button className="btn btn-sm btn-danger px-3"
                                                        onClick={() => handleViewEvent(event.id)}>View Event
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Sorry! No events found.</p>
                    )}
                </div>
            </div>

            {showModal && <EventDetailsModalComponent event={selectedEvent} setShowModal={setShowModal}
                                                      refreshEvents={fetchEvents}/>}
        </div>
    );
};
