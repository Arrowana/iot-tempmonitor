This is a very simple project to monitor the temperature and humidity with a DHT11 sensor

The goal was to involve as little coding as possible

A ESP8266 is reading from the sensor, the ESP8266 is running a micropython firmware. The goal is to store the data into a google spreadsheet to be able to analyze the data.

After some tests it seems like there is no micropython library supporting https and that http requests are quite unreliable

So I switched to use a socket connection with a server between the board and google app script setup as a webapp

An ugly graph of the design:

![Alt text](/ressources/design.jpg?raw=true "Design")
