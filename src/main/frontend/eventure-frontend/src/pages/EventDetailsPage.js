import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const EventDetailsPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) {
        return <div>Loading...</div>;
    }

    const exportToPDF = () => {
        const input = document.getElementById('event-details');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgHeight = (canvas.height * 210) / canvas.width;

                pdf.addImage(imgData, 'PNG', 10, 10, 190, imgHeight);

                pdf.save(`${event.event_name}.pdf`);
            }).catch((error) => {
                console.error('Error exporting PDF:', error);
            });
    }

    return (
        <div>
            <div id="event-details"  className="text-center m-5 rounded-4">
                <div className="container-fluid g-0">
                    <img
                        style={{maxHeight: '600px', objectFit: 'cover'}}
                        className="img-fluid w-100 min-vh-25 min-vh-md-50 mb-n7 rounded-4"
                        src={`${process.env.PUBLIC_URL}/assets/img/event_${event.id}.jpg`}
                        alt="Maribor"
                    />
                </div>
                <div className="container p-5 bg-body mt-md-n7 position-relative rounded-4 border border-dark">
                    <div className="row">
                        <div className="col">
                            <div className="lc-block text-start">
                                <div>
                                    <h1><span className="text-danger madimi-one-regular big-text">{event.event_name}</span></h1>
                                    <p className="display-6 madimi medium-text">{event.event_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="">
                            <div className="mt-5 text-end">
                                <div>
                                    <p className="lead text-secondary font-weight-bold">
                                        Location: <span className={"bg-danger px-3 py-1 text-white rounded"}> {event.event_location} </span>
                                    </p>
                                    <p className="lead text-secondary">
                                        Date(s): <span className={"bg-danger px-3 py-1 text-white rounded"}>
                                            {new Date(event.event_datetime_start).toLocaleString()} - {new Date(event.event_datetime_end).toLocaleString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 mb-5">
                <button className="btn btn-danger" onClick={exportToPDF}>Export Event to PDF</button>
            </div>
        </div>
    );
};
