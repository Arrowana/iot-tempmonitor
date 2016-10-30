import SocketServer
import re
import requests

URL = '' #The url to the GAS web app

def process_data(data):
    res = re.match(r'b(\d+),(\d+)e', data)
    if res:
        r=requests.post(URL+'?temperature={}&humidity={}'.format(*res.groups()))
        print(r.status_code)
    else:
        print('Fail to read message')

class MyTCPHandler(SocketServer.BaseRequestHandler):

    def handle(self):
        # self.request is the TCP socket connected to the client
        running=True
        while running:
            data = self.request.recv(1024).strip()
            if data:
                print 'Received: {}'.format(data)
                process_data(data)
            else:
                running=False 

if __name__ == "__main__":
    SocketServer.TCPServer.allow_reuse_address = True
    HOST, PORT = "0.0.0.0", 5005

    server = SocketServer.TCPServer((HOST, PORT), MyTCPHandler)
    server.serve_forever()
