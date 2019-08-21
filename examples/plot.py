import numpy as np
import matplotlib.pyplot as plt

def getDist(lsb, msb):
    if (msb == "80" or msb == "70"):
        return False
    return int(msb + lsb, 16)/1000.

def addPoint(dist, theta, x, y):
    if (dist != False and dist < 6):
        print(dist)
        x.append(dist*np.cos((theta+90) * np.pi/180))
        y.append(dist*np.sin((theta+90) * np.pi/180))

x=[]
y=[]
with open("./outfile.txt") as f:
    line = f.readline()
    print(line)
    while line != "":
        bytes = line.strip(':n').split(':')[:22]
        print(bytes)
        if (len(bytes) == 22):
            theta = (int(bytes[1], 16) - 160) * 4
            # print(line)
            print(theta)
            addPoint(getDist(bytes[4], bytes[5]), theta, x, y)
            addPoint(getDist(bytes[8], bytes[9]), theta + 1, x, y)
            addPoint(getDist(bytes[12], bytes[13]), theta + 2, x, y)
            addPoint(getDist(bytes[16], bytes[17]), theta + 3, x, y)
        line = f.readline()


fig = plt.figure()
ax = fig.gca()
ax.set_xticks(np.arange(-10,10,0.2))
ax.set_yticks(np.arange(-10,10.,0.2))
ax.set_aspect('equal')
plt.scatter(x,y)
plt.grid()
plt.show()
