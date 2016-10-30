from machine import Pin
import usocket
import network
import time
from dht import DHT11

IP = '192.168.1.101'
PORT = 5005

sensor=DHT11(Pin(5))
w=network.WLAN(network.STA_IF)

def get_temp_hum():
    sensor.measure()
    return sensor.temperature(), sensor.humidity()

def main(s):
    counter = 0
    while True:
        temp, hum = get_temp_hum()
        print('sending...')
        payload = 'b{},{}e'.format(temp, hum)
        s.send(payload)

        time.sleep(5)

def play():
    s = usocket.socket()
    s.connect((IP, PORT))

    try:
        main(s)
    finally:
        s.close()
