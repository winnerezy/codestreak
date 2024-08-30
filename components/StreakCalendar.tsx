"use client";

import React, { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";

const StreakCalendar = () => {
  const [commits, setCommits] = useState<Commit[] | []>([]);
  const [calendarDays, setCalendarDays] = useState<{ date: string; active: boolean;}[]>([]);

  const today = useMemo(() => new Date(), [])
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    // Fetch commit data from API
    fetch("/api/commits/aora")
      .then((response) => response.json())
      .then((data) => setCommits(data));

      const days = [];
      for (let i = 1; i < daysInMonth; i++) {
        const date = format(
          new Date(today.getFullYear(), today.getMonth() + 1, i).toISOString(),
          "dd"
        );
        const commitExists = commits.some(commit => format(commit.commit.author.date, "yyyy-MM-dd") == format(new Date(today.getFullYear(), today.getMonth() + 1, i), "yyyy-MM-dd"))
        days.push({ date, active: commitExists });
        console.log(commitExists)
      }
      setCalendarDays(days);
  }, [daysInMonth, today, commits]);




  const handleDayClick = (day: any) => {
    // Toggle active class
    const updatedDays = calendarDays.map((d) => {
      if (d.date === day.date) {
        return { ...d, active: !d.active };
      }
      return d;
    });
    setCalendarDays(updatedDays);
  };

  return (
    <div className="streak-calendar">
      {calendarDays.map((day, index) => (
        <div
          key={index}
          className={`calendar-day ${day.active ? "active" : ""}`}
          onClick={() => handleDayClick(day)}
        >
          {day.date}
        </div>
      ))}
    </div>
  );
};

export default StreakCalendar;
