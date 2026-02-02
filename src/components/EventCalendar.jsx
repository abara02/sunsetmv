import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, List, Calendar as CalendarIcon } from 'lucide-react';
import './EventCalendar.css';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const EventCalendar = ({ events }) => {
    // Default to June 2025 since that's where most demo events are
    const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1));

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // Generate calendar grid
    const renderCalendarDays = () => {
        const days = [];

        // Empty cells for days before start of month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // Find events for this day
            const dayEvents = events.filter(e => {
                const eDate = new Date(e.date);
                return eDate.getDate() === day &&
                    eDate.getMonth() === currentDate.getMonth() &&
                    eDate.getFullYear() === currentDate.getFullYear();
            });

            days.push(
                <div key={day} className="calendar-day">
                    <span className="day-number">{day}</span>
                    <div className="day-events">
                        {dayEvents.map(event => (
                            <div key={event.id} className="calendar-event-pill">
                                <span className="event-time-pill">{event.time.split(' - ')[0]}</span>
                                <span className="event-title-pill">{event.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="event-calendar-container fade-in">
            <div className="calendar-header-controls">
                <div className="month-nav">
                    <button onClick={prevMonth} className="nav-btn"><ChevronLeft size={24} /></button>
                    <button onClick={nextMonth} className="nav-btn"><ChevronRight size={24} /></button>
                    {/* Placeholder for "This Month" button if needed */}
                    <button className="btn-today" onClick={() => setCurrentDate(new Date())}>This Month</button>
                </div>
                <h2>{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>

                {/* Accesibility icon placeholder from screenshot, optional */}
                <div className="calendar-actions"></div>
            </div>

            <div className="calendar-grid">
                {/* Weekday Headers */}
                {DAYS.map(day => (
                    <div key={day} className="calendar-weekday">{day}</div>
                ))}

                {/* Calendar Days */}
                {renderCalendarDays()}
            </div>
        </div>
    );
};

export default EventCalendar;
