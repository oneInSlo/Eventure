import React, { useState, useEffect } from 'react';
import { EventDetailsModalComponent } from "./EventDetailsModalComponent";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const EventsComponent = () => {
    const [events, setEvents] = useState([]); // state to hold event data
    const [selectedEvent, setSelectedEvent] = useState(null); // state to hold the selected event for editing
    const [showModal, setShowModal] = useState(false); // state to control modal visibility
    const navigate = useNavigate();

    // fetch events from the backend
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/events');
            setEvents(response.data);
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

    return (
        <div className="py-5 bg-light" id="events">
            <div className="container my-5">
                <h1 className="text-center big-text madimi-one-regular text-danger">EXPLORE EVENTS</h1>
                <div className="text-end">
                    <button className="btn btn-danger px-5" onClick={handleCreateNewEvent}>Create a New Event</button>
                </div>
                <div className="row mt-5">
                    {events.length > 0 ? (
                        events.map(event => (
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
                                            <small className="text-muted">{event.event_datetime_start}</small>
                                            <div className="btn-group" role="group" aria-label="Button group">
                                                <button className="btn btn-sm btn-outline-secondary px-3" onClick={() => handleEditEvent(event)}>Edit Event</button>
                                                <button className="btn btn-sm btn-danger px-3" onClick={() => handleViewEvent(event.id)}>View Event</button>
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

            {showModal && <EventDetailsModalComponent event={selectedEvent} setShowModal={setShowModal} refreshEvents={fetchEvents}/>}
        </div>
    );
};
