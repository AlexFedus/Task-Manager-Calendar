# Task Manager and Calendar

This is a website that shows a calendar which also features a task manager. 

Introduction
============

This project was completed by myself and another person as part of a web development class project. 

Features
========

This calendar and task manager site allows a user to view a calendar of the current month.
Users are also able to traverse through the months with forward and backward arrow buttons. On the left
side of the screen, two boxes are shown. The box at the top allows a user to add a new task.
It requires a task name and a date of the task. Once the fields are filled and the "Add Task"
button is clicked, the task will appear on the calendar. In the second box on the left side of
the screen, a list of current tasks is shown. From this box, users are able to delete a task
or save a list of tasks as a txt file. When the save tasks button is clicked, a dialog box will pop up 
where a user can choose where on their device they want to save the file. Along with tasks being shown
on the calendar, holidays are also shown. This is done through a json file. Since this was completed in 2022, 
static holidays will appear, but holidays with inconsitant dates do not currently work.

Tools Used
==========

This was created with html, javascript, css, and used a json file.

How to View
===========

To view this site, a local server software is required. When testing, we used XAMPP. 

First start an apache server on XAMPP. Then download this code as a zip file, unzip it, and move it into 
the htdocs folder within the XAMPP directory on your machine. Then, open a browser, and type

(localhost/"Name that folder is saved as in htdocs"/calendar.html)

From there, the program will be available to use. 
