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

    const handleDelete = async () => {
        console.log(event.id);
        try {
            await axios.delete(`http://localhost:8080/events/${event.id}`);
            refreshEvents();
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("There was an error deleting the event. Please try again.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('event_name', formData.event_name);
        data.append('event_description', formData.event_description);
        data.append('event_location', formData.event_location);
        data.append('event_costs', formData.event_costs);
        data.append('event_datetime_start', formatDateTime(formData.event_datetime_start));
        data.append('event_datetime_end', formatDateTime(formData.event_datetime_end));

        if (formData.image) {
            data.append('image', formData.image);
        }

        // check console
        for (let pair of data.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
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

    const formatDateTime = (datetimeString) => {
        const date = new Date(datetimeString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <>
            <div className="modal-overlay" onClick={() => setShowModal(false)}></div>

            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header bg-danger">
                                <h1 className="modal-title fs-5 text-white madimi-one-regular">
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
                                    <textarea className="form-control" name="event_description"
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
                                         showMonthYearDropdown/>
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
                                             showMonthYearDropdown/>
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
                                    <input type="file" className="form-control" onChange={handleFileChange} accept="image/*"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="submit" className="btn btn-light border border-dark px-4">
                                        {event ? 'Update' : 'Create'}
                                    </button>
                                    {
                                        event ?
                                            <button type="button" className="btn btn-danger px-4"
                                                    onClick={handleDelete}> Delete
                                            </button>
                                            : null
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}