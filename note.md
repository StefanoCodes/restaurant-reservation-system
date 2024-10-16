<!-- overlapping reservations -->

# prevent overllaping reservations for the same table and also any time that could be in between the duration

# the start time will be for example 7:00 by default the end time will be the start time + 2 hours so whenver we display the tables we want do a look up for that specific table and then check if the start time is between the open and close hours and then we want to check if the end time is between the open and close hours and if it is we want to return an error to the user

<!-- notes -->

# we want to add a notes section to the reservations table so the user can add any additional notes about the reservation / special requests

# we also need to ensure that when a user books at 9pm they should be warned that they can only stay for 1 hour so that needs to be a condition to check before accepting the reservation

<!-- After Reservation Created -->

# an email confirming the table has been booked and awaiting the approval of the admins

# once the admin approves the reservation we want to send another email to the user confirming the reservation and the details of the reservation

# update the status of the reservation to "confirmed"

# Pending Reservation Email sent upon creation

includes
reservation ID:#
name,
email,

<!-- create admin table in the db with the admin login information -->

# admins will only be able to see the admin pages not user pages

admins can delete any reservation and see the reservation details
