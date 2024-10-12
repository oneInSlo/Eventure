import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export const EventDetailsModalComponent = ({event, setShowModal, refreshEvents}) => {

    const [formData, setFormData] = useState({
        event_name: event?.event_name || '',
        event_description: event?.event_description || '',
        event_location: event?.event_location || '',
        event_costs: event?.event_costs || '',
        event_datetime_start: event ? new Date(event.event_datetime_start) : new Date(),
        event_datetime_end: event ? new Date(event.event_datetime_end) : new Date(),
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDateChange = (date, field) => {
        setFormData(prev => ({ ...prev, [field]: date }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('event_name', formData.event_name);
        data.append('event_description', formData.event_description);
        data.append('event_location', formData.event_location);
        data.append('event_costs', formData.event_costs);
        data.append('event_datetime_start', formData.event_datetime_start.toISOString());
        data.append('event_datetime_end', formData.event_datetime_end.toISOString());
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (event) {
                await axios.put(`http://localhost:8080/events/${event.id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('http://localhost:8080/events', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            refreshEvents();
            setShowModal(false);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error submitting the form. Please try again.");
        }
    }

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header bg-danger">
                            <h1 className="modal-title fs-5 text-white">
                                {event ? 'Edit Event' : 'Create a New Event'}
                            </h1>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="event_name" className="form-label">Event Name</label>
                                <input type="text" className="form-control" name="event_name"
                                       value={formData.event_name} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="event_description" className="form-label">Event Description</label>
                                <input type="text" className="form-control" name="event_description"
                                       value={formData.event_description} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="event_location" className="form-label">Event Location</label>
                                <input type="text" className="form-control" name="event_location"
                                       value={formData.event_location} onChange={handleChange} required/>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label">Event Start Date & Time </label>
                                    <DatePicker
                                        selected={formData.event_datetime_start}
                                        onChange={(date) => handleDateChange(date, 'event_datetime_start')}
                                        showTimeSelect
                                        dateFormat="Pp"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Event End Date & Time </label>
                                    <div className="">
                                        <DatePicker
                                            selected={formData.event_datetime_end}
                                            onChange={(date) => handleDateChange(date, 'event_datetime_end')}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="event_costs" className="form-label">Event Costs</label>
                                <input type="number" className="form-control" name="event_costs"
                                       value={formData.event_costs} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Event Image</label>
                                <input type="file" className="form-control" onChange={handleFileChange}
                                       accept="image/*"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit"
                                    className="btn btn-danger">{event ? 'Update Event' : 'Create Event'}</button>
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}>Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}