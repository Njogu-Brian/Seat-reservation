// form elements
const name = document.getElementById("name"); 
const email = document.getElementById("email");
const service = document.getElementById("service");
const seatNumber = document.getElementById("seat");
const submitBtn = document.getElementById("submit-btn");

// will be used to know what service the user chose
// this is nessarcy because the select has 
// options with values that are numbers
const services = [
    "8 am - 10 am",
    "10:30 am - 12:30 pm",
    "1 pm - 3 pm",
];

// keep track of which seats have been reserved
let reservedSeats = [];


