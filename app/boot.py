import main
import network
import utime

w=network.WLAN(network.STA_IF)

while w.isconnected() != True:
    print('Connection not ready')
    utime.sleep(1)
    
main.play()
