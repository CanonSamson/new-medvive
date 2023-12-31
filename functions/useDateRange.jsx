"use client";

import { useState, useEffect } from "react";
import { getWeek } from "./functions";

export function useDateRange() {
  const [dateRange, setDateRange] = useState([]);
  const [timestamp, setTimestamp] = useState(null);

  const [selectedRange, setSelectedRange] = useState({
    date: "",
    time: "",
    weekday: "",
    weekNumber: "",
    year: "",
  });

  const [timeData, setTimeData] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const s = selectedRange.date.split("-");
    const ot = s[2];

    // Get the current time
    const currentTime = new Date();
    if (currentTime.getDate() == ot) {
      // Get the current time
      const currentTime = new Date();

      // Set the initial time to the next half-hour interval
      currentTime.setMinutes(Math.ceil(currentTime.getMinutes() / 30) * 30);

      // Create an array of time slots
      const timeSlots = [];
      for (let i = 0; i < 12; i++) {
        // Adjust the loop count as needed
        let time = currentTime.getHours() >= 12 ? "PM" : "AM"; // Initialize with AM or PM

        // Format the hour in 12-hour format
        let hour = currentTime.getHours() % 12 || 12;

        // Format the minutes
        let minutes = currentTime.getMinutes();

        // Add "AM" or "PM" to the time slot
        time = `${hour}:${minutes < 10 ? "0" : ""}${minutes} ${time}`;

        const onClick = () => setSelectedTime(time);
        timeSlots.push({ time, onClick });

        if (timeSlots.length > 1) {
          // Increment time by 30 minutes for the next slot
          currentTime.setMinutes(currentTime.getHours() + 1);
        }
      }

      // Update the state with the generated time slots
      setTimeData([...timeSlots]);
    } else {
      setTimeData([
        { time: "9:00 AM", onClick: () => setSelectedTime("9:00 AM") },
        { time: "10:00 AM", onClick: () => setSelectedTime("10:00 AM") },
        { time: "11:00 AM", onClick: () => setSelectedTime("11:00 AM") },
        { time: "12:00 AM", onClick: () => setSelectedTime("12:00 AM") },
        { time: "1:00 PM", onClick: () => setSelectedTime("1:00 PM") },
        { time: "2:00 PM", onClick: () => setSelectedTime("2:00 AM") },
        { time: "3:00 PM", onClick: () => setSelectedTime("3:00 AM") },
        { time: "4:00 PM", onClick: () => setSelectedTime("4:00 AM") },
        { time: "5:00 PM", onClick: () => setSelectedTime("5:00 AM") },
        { time: "6:00 PM", onClick: () => setSelectedTime("6:00 AM") },
        { time: "7:00 PM", onClick: () => setSelectedTime("7:00 AM") },
        { time: "8:00 PM", onClick: () => setSelectedTime("8:00 PM") },
        { time: "9:00 PM", onClick: () => setSelectedTime("9:00 PM") },
      ]);
    }
  }, [selectedRange]);

  useEffect(() => {
    // Get the current date
    const today = new Date();

    // Calculate the start and end dates for the next 7 days
    const startDate = new Date(today);
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 7);

    // Create an array to store the date range
    const dates = [];

    // Weekday names for displaying
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Loop through the dates and calculate the week number for each day
    let currentDate = new Date(startDate);
    setTimestamp(currentDate);
    while (currentDate <= endDate) {
      const weekNumber = getWeek(currentDate);

      // Extract the date, week, year, and time using split
      const [year, month, date] = currentDate
        .toISOString()
        .split("T")[0]
        .split("-");
      const time = currentDate.toTimeString().split(" ")[0];
      const weekday = weekdayNames[currentDate.getDay()]; // Get the weekday name

      dates.push({
        date: `${year}-${month}-${date}`,
        weekNumber,
        year,
        time,
        weekday,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const dateRangesWithClick = dates.map((range) => ({
      ...range,
      onClick: () =>
        setSelectedRange({
          date: range.date,
          time: range.time,
          weekday: range.weekday,
          weekNumber: range.weekNumber,
          year: range.year,
        }),
    }));
    setDateRange(dateRangesWithClick);
  }, []);

  return {
    dateRange,
    selectedRange,
    selectedTime,
    timeData,
    timestamp,
  };
}
