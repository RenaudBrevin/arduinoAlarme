import network
import urequests
import ujson
import utime
from machine import Pin

wlan = network.WLAN(network.STA_IF)
wlan.active(True)

ssid =  "toma"
password = "12345678"
wlan.connect(ssid, password)
print(wlan.isconnected())
url = "http://172.20.10.8:3000/send_data"

mouvement = Pin(26, mode=Pin.IN)
alarme = Pin(16, mode=Pin.OUT)


    
while True:
    print(mouvement.value())
    utime.sleep(0.2)
    if mouvement.value() == 1:
                print("Sending data")
                data = { "text": "Hello from MicroPython!" }
                headers = { "Content-Type": "application/json" }
                r = urequests.post(url, json=data, headers=headers)
                print(r.json())
                r.close()
                for i in range(3):
                    alarme.on()
                    utime.sleep(0.4)
                    alarme.off()
                    utime.sleep(0.1)


