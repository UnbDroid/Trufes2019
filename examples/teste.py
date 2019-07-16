#!/usr/bin/python
import serial
import time
import math
 
# Some settings and variables
outfile = open("outfile.txt", "w+")
print("Start")
 
f = serial.Serial(port='/dev/ttyO1', 
                            baudrate=115200, 
                            parity=serial.PARITY_NONE, 
                            stopbits=serial.STOPBITS_ONE, 
                            bytesize=serial.EIGHTBITS, 
                            timeout=0)
 
def decode_string(string):
    print string
    data = []
 
    for byte in string.strip("\n").split(":")[:21]:
        data.append(int(byte,16))
 
    start = data[0]
    idx = data[1] - 0xa0
    speed = float(data[2] | (data[3] << 8)) / 64.0
    in_checksum = data[-2] + (data[-1] << 8)
 
    # first data package (4 bytes after header)
    angle = idx*4 + 0
    angle_rad = angle * math.pi / 180.
    dist_mm = data[4] | ((data[5] & 0x1f) << 8)
    quality = data[6] | (data[7] << 8)
 
    if data[5] & 0x80:
         print "X - ",
    else:
        print "O - ",
    if data[5] & 0x40:
         print "NOT GOOD"
    print "Speed: ", speed, ", angle: ", angle, ", dist: ",dist_mm, ", quality: ", quality
    #print "Checksum: ", checksum(data), ", from packet: ", in_checksum
    outfile.write(string+"\n")
    print "-----------"
 
byte = f.read(1)
started = False
string = "Start"
while True:
    if byte != '':
        enc = (byte.encode('hex') + ":")
        if enc == "fa:":
            if started:
                try:
                    decode_string(string)
                except Exception, e:
                    print e
 
            started = True
            string = "fa:"
        elif started:
            string += enc
        else:
            print "Waiting for start"
 
    byte = f.read(1)
outfile.close()
print("End")