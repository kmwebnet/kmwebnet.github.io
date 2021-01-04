Last modified: January 4th, 2021.

<img src="/docimage/getstarted-1.png" width="800">

## 1. Preparation

- ESP32 (ECO V3 revision module such as ESP32-WROOM-32E, ESP32-WROVER-E)
- ATECC608A (I2C standard version, Not compatible with ATECC608A-SSHCZ, TrustFlex, TrustGO)
- Servers and instances on the Internet with fixed IP (GCE, etc.)
- Windows10 x64 PC

The components that make up the rainbow type are as follows.

- rainbowtype provisioning A program that sets up the initial certificate on the device
- rainbowtype bootloader A program that is always placed in the ESP32 Factory area
- rainbowtype server Status exchange with ESP32, server for OTA, placed on the Internet
- rainbowtype client Windows 10 desktop program that manages certificates, sets status and sends OTA firmware to ESP32.

## 2. Deploy rainbowtype client

First, set up the rainbow type client on Windows 10.

Download Python 3.8.6 and install it at c:\Python38. https://www.python.org/ftp/python/3.8.6/python-3.8.6-amd64.exe  
Make sure “Add Python 3.8 to PATH” is unchecked.

<img src="/docimage/getstarted-2.png" width="800">

<img src="/docimage/getstarted-3.png" width="800">

<img src="/docimage/getstarted-4.png" width="800">

<img src="/docimage/getstarted-5.png" width="800">

Make sure destination directory is “c:\Python38”.

<img src="/docimage/getstarted-6.png" width="800">

install Python3.8 dependencies

Download dependencies list as the link below:
[https://github.com/kmwebnet/rainbowtype-client/releases/download/v1.0.0/requirements.txt](https://github.com/kmwebnet/rainbowtype-client/releases/download/v1.0.0/requirements.txt)

execute the command:
C:\Users\test\rainbowtype-client> c:\Python38\python.exe -m pip install -r requirements.txt

Downolad rainbowtype client
[https://github.com/kmwebnet/rainbowtype-client/releases/download/v1.0.0/rtclient.Setup.1.0.0.exe](https://github.com/kmwebnet/rainbowtype-client/releases/download/v1.0.0/rtclient.Setup.1.0.0.exe)

you can install it by executing .exe file.

<img src="/docimage/getstarted-7.png" width="800">

Follow the tutorial video below to see if you can create a test certificate.  
[![](http://img.youtube.com/vi/mY7psD9G-fY/0.jpg)](http://www.youtube.com/watch?v=mY7psD9G-fY)

if you have any trouble to create cert, make sure the python3.8 install path.

Please make sure if you transfer this app to the other PC, you also setup python environment as follows:  
c:\Python38\python.exe -m pip install -r requirements.txt

## 3. Make Root CA, Signer CA

If all is well, delete the test certificate by clicking the "Trash" icon and create  
a new root CA certificate and signer CA certificate using the same procedure.  
The following example shows the root CA certificate: "testproject",  
Signer CA Certificate: I just created it with "testpjsigner".

<img src="/docimage/getstarted-8.png" width="800">

## 4. Deploy rainbowtype server

As an example of creating a server instance with a fixed IP for free, we will use Google Compute Engine.

As of December 2020, the free tier of Google Compute Engine is offered under the following conditions.  
[https://cloud.google.com/free](https://cloud.google.com/free)  
Compute Engine  
1 F1-micro instance per month  
Scalable, high-performance virtual machines.

1 non-preemptible f1-micro VM instance per month in one of the following US regions:  
Oregon: us-west1  
Iowa: us-central1  
South Carolina: us-east1  
30 GB-months HDD  
5 GB-month snapshot storage in the following regions:  
Oregon: us-west1  
Iowa: us-central1  
South Carolina: us-east1  
Taiwan: asia-east1  
Belgium: europe-west1  
1 GB network egress from North America to all region destinations (excluding China and Australia) per month

Have a valid credit card and Google account ready.  
enter google cloud platform and register your account.

[https://cloud.google.com/](https://cloud.google.com/)

create new project.

<img src="/docimage/getstarted-9.png" width="800">

<img src="/docimage/getstarted-10.png" width="800">

after creating project, choose “VM instance” in menu.

<img src="/docimage/getstarted-11.png" width="800">

create new VM instance.

<img src="/docimage/getstarted-12.png" width="800">

Make settings so that you can use the VM instance for free.

<img src="/docimage/getstarted-13.png" width="800">

increase disk size to 30GB.

<img src="/docimage/getstarted-14.png" width="800">

<img src="/docimage/getstarted-15.png" width="800">

<img src="/docimage/getstarted-16.png" width="800">

enter created new instance settings.

<img src="/docimage/getstarted-17.png" width="800">

<img src="/docimage/getstarted-18.png" width="800">

create SSH key pair in windows 10 cmd.exe

```
Microsoft Windows [Version 10.0.17134.1304]
(c) 2018 Microsoft Corporation. All rights reserved.

C:\Users\test>ssh-keygen -t rsa -b 4096 -f .ssh\mytestpj -C test
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in .ssh\mytestpj.
Your public key has been saved in .ssh\mytestpj.pub.
The key fingerprint is:
SHA256:8rTHEJP6pMuWK4lKoO3/mm8VJ+//skLdfuhoMg1tDRs test
The key's randomart image is:
+---[RSA 4096]----+
|                 |
|         .       |
|        +        |
|       .oo. E    |
|.     o S= o *   |
|o.     B.++ = o  |
|.... ..o+oo+ . . |
|... oo+. .= +.o .|
|....+B*.   *+=o. |
+----[SHA256]-----+

C:\Users\test>type .ssh\mytestpj.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCzQkG5CBPyBysNNmBYgVKO7ysKbDnd8vhl87ljZzHu6uAK+byeOuOG/
...
ZjxTpx0h9Ui6A8Ym2/5wcGIZroEsuVvwxpnRl31DMkkPqCqAf5XqGncecoIJu71dETLzCxHLqi3ZVklqLUG8unw== test
```

Paste and set the pub key into the SSH key setting in VM instance.

<img src="/docimage/getstarted-19.png" width="800">

Enter network setting.  
keep the outer IP address noted to use as global IP.

<img src="/docimage/getstarted-20.png" width="800">

Enter firewall setting.

<img src="/docimage/getstarted-21.png" width="800">

add new firewall rule.

<img src="/docimage/getstarted-22.png" width="800">

<img src="/docimage/getstarted-23.png" width="800">

set traffic direction to incoming, and target, IP address range, specified port number as follows.

<img src="/docimage/getstarted-24.png" width="800">

test SSH connection on cmd.exe as follows:

```
C:\Users\test>ssh test@35.185.226.234 -i .ssh\mytestpj
The authenticity of host '35.185.226.234 (35.185.226.234)' can't be established.
ECDSA key fingerprint is SHA256:6o1aW6rpLBzBxkTsS84BQRtTOhV6snsDHPubtfgJMEQ.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '35.185.226.234' (ECDSA) to the list of known hosts.
Linux instance-1 4.19.0-13-cloud-amd64 #1 SMP Debian 4.19.160-2 (2020-11-28) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Mon Dec 28 03:55:30 2020 from XXX.XXX.XXX.XXX
test@instance-1:~$
```

create server certificate for rainbowtype server

we got public IP address earlier, create a certificate to authenticate it.  
select rt Server Cert.

<img src="/docimage/getstarted-25.png" width="800">

click “+” button to create server cert.  
and,enter IP address to “CN”, “SAN1”, “SAN2”.  
set signer CA cert and root CA cert to make certificate chain for server certificate.

<img src="/docimage/getstarted-26.png" width="800">

<img src="/docimage/getstarted-27.png" width="800">

set server certs to GCE instance created earlier by ssh file transfer with private key.  
on PC’s cmd.exe, move to where the certs stored.

```
C:\Users\test>cd AppData\Local\Programs\rainbowtypeclient\
```

transfer root CA cert, signer CA cert, server cert, and server cert private key.

```
C:\Users\test\AppData\Local\Programs\rainbowtypeclient>scp -i c:\Users\test\.ssh\mytestpj certs\testproject.crt test@35.185.226.234:/home/test/root-ca.crt
testproject.crt                                                                       100%  579     0.6KB/s   00:00

C:\Users\test\AppData\Local\Programs\rainbowtypeclient>scp -i c:\Users\test\.ssh\mytestpj certs\testpjsigner.crt test@35.185.226.234:/home/test/signer-ca.crt
testpjsigner.crt                                                                      100%  648     0.6KB/s   00:00

C:\Users\test\AppData\Local\Programs\rainbowtypeclient>scp -i c:\Users\test\.ssh\mytestpj server\keys\35.185.226.234.crt.key test@35.185.226.234:/home/test/server.key
35.185.226.234.crt.key                                                                100%  241     0.2KB/s   00:00

C:\Users\test\AppData\Local\Programs\rainbowtypeclient>scp -i c:\Users\test\.ssh\mytestpj server\certs\35.185.226.234.crt.chain test@35.185.226.234:/home/test/server.chain
35.185.226.234.crt.chain                                                              100% 1944     1.9KB/s   00:00
```

switch to GCE instance created earlier, setup rainbowtype server.

```
test@instance-1:~$ sudo apt update
test@instance-1:~$ sudo apt upgrade
test@instance-1:~$ sudo apt install git
test@instance-1:~$ sudo apt install docker.io
test@instance-1:~$ git clone https://github.com/kmwebnet/rainbowtype-server.git
test@instance-1:~$ cp server.* rainbowtype-server/certs/
test@instance-1:~$ cp *.crt rainbowtype-server/certs/
test@instance-1:~$ ls rainbowtype-server/certs/
put-here-your-cert.txt  root-ca.crt  server.chain  server.key  signer-ca.crt

test@instance-1:~$ cd rainbowtype-server/
test@instance-1:~/rainbowtype-server$ sudo docker build --tag=rtserver .
Sending build context to Docker daemon  306.2kB
Step 1/9 : FROM node:14.5.0-buster-slim
14.5.0-buster-slim: Pulling from library/node
6ec8c9369e08: Pull complete
656435e2e37d: Pull complete
fac31a15facb: Pull complete
791b58117b66: Pull complete
39f674845297: Pull complete
Digest: sha256:25a4657effc05112405d909a54b0683a8b5649e4737b43aa638926c4fcb5c006
Status: Downloaded newer image for node:14.5.0-buster-slim
 ---> f516131ac55d
Step 2/9 : ENV PORT 3000
 ---> Running in d4f312569c74
Removing intermediate container d4f312569c74
 ---> d23724cd9afb
Step 3/9 : EXPOSE 3000
 ---> Running in 2804d1a269e8
Removing intermediate container 2804d1a269e8
 ---> 4e9a32822354
Step 4/9 : WORKDIR /usr/src/app
 ---> Running in f0e6e4a0cef6
Removing intermediate container f0e6e4a0cef6
 ---> 715966807b86
Step 5/9 : COPY package.json package.json
 ---> 0f19722848ff
Step 6/9 : COPY package-lock.json package-lock.json
 ---> ba43b06ab3c3
Step 7/9 : RUN npm install
 ---> Running in a4c8817c81d1
npm WARN rtserver@1.0.0 No description
npm WARN rtserver@1.0.0 No repository field.

added 316 packages from 272 contributors and audited 316 packages in 13.765s

39 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Removing intermediate container a4c8817c81d1
 ---> f5206168546e
Step 8/9 : COPY . .
Removing intermediate container a4c8817c81d1
 ---> f5206168546e
Step 8/9 : COPY . .
 ---> f9b545247d60
Step 9/9 : CMD [ "node", "index.js" ]
 ---> Running in 7e74f8c74c0e
Removing intermediate container 7e74f8c74c0e
 ---> f48dbb55ac54
Successfully built f48dbb55ac54
Successfully tagged rtserver:latest

test@instance-1:~/rainbowtype-server$ sudo docker run -v $PWD/certs:/usr/src/app/certs -dit --rm -p 3000:3000 --name rtserver rtserver
26906c92c19caa20790522359229f2687fe32ac29e69877420e4cfa2788b5c02
test@instance-1:~/rainbowtype-server$ sudo docker logs rtserver
Listening on port 3000
```

create client cert for connecting from rainbowtype client to rainbowtype server.

<img src="/docimage/getstarted-28.png" width="800">

Any name is OK for CN, and set signer CA cert to sign.

<img src="/docimage/getstarted-29.png" width="800">

<img src="/docimage/getstarted-30.png" width="800">

test the connection to rainbowtype server.

<img src="/docimage/getstarted-31.png" width="800">

<img src="/docimage/getstarted-32.png" width="800">

<img src="/docimage/getstarted-33.png" width="800">

you can see “CONNECTED TO RTSERVER. …” if you successfully connected.  
At this point, the setup of rainbowtype client and rainbowtype server is completed.

<img src="/docimage/getstarted-34.png" width="800">

## 5. Create device cert template

Create a device certificate template that is common to each device.  
This step involves generating a template for the device certificate and a key for code signing.

<img src="/docimage/getstarted-35.png" width="800">

<img src="/docimage/getstarted-36.png" width="800">

You can see if you make the template successfully.

<img src="/docimage/getstarted-37.png" width="800">
 
make sure that you can get cert template constants by pressing “OPEN CERT TEMPLATE TEXT”.  
You will use this constant later.

<img src="/docimage/getstarted-38.png" width="800">

## 6. Create rainbowtype provisioning firmware

Prepare the actual device.  
As an example, use the socket type ESP32-DEVKITS-R in combination with the ESP32-WROVER-E (8MB)  
and connect the ATECC608A on the breadboard.  
There are three types of flash capacity on the ESP32, so select the capacity you need.

However, if it is an ECO V3 module, I think it will work on other development boards as well.

Prepare the ATECC608A-SSHDA and connect it to the ESP32 as shown below.  
SDA to GPIO21  
SCL to GPIO22

First, provision the ATECC608A so that it can be used.  
On WindowsPC, prepare VSCode and PlatformIO to build firmware for provisioning.

```
git clone --recursive https://github.com/kmwebnet/rainbowtype-provisioning.git
```

Save the certificate definition constants that can be obtained above as cert_chain.c as shown below.

<img src="/docimage/getstarted-39.png" width="800">

after building firmware, flash it to the device via USB serial.

<img src="/docimage/getstarted-40.png" width="800">

it’s ready to provision if you get the result in serial console as follows:

```
I (288) cpu_start: Starting scheduler on PRO CPU.
I (0) cpu_start: Starting scheduler on APP CPU.
I (773) MAIN: Config Zone data:
01 23 XX XX 00 00 60 02
XX XX XX XX ee 01 25 00
c0 00 00 01 8f 20 8f 20
8f 20 8f 20 c6 46 c6 46
8f 0f c6 46 c6 46 c6 46
0f 0f 0f 0f 0f 0f 0f 0f
0f 0f 0f 0f ff ff ff ff
00 00 00 00 ff ff ff ff
00 00 00 00 00 00 00 00
00 00 00 00 00 00 00 00
00 00 00 00 00 00 00 00
ff ff 0e 60 00 00 00 00
13 00 13 00 13 00 13 00
1c 00 18 00 5c 00 3c 00
1c 00 38 00 3c 00 30 00
3c 00 3c 00 3c 00 30 00
I (793) uart: queue free spaces: 10
```

enter “Device Cert Provisioning”.

<img src="/docimage/getstarted-41.png" width="800">

Select the serial port number to which the device you want to provision is  
connected and the device certificate template you have created.

<img src="/docimage/getstarted-42.png" width="800">

Press "RUN SERIAL COMMUNICATION" to start provisioning.  
If successful, you will get the following display.

<img src="/docimage/getstarted-43.png" width="800">

## 7. Create rainbowtype bootloader firmware

On WindowsPC, prepare VSCode and PlatformIO to build rainbowtype bootloader firmware.

```
git clone --recursive https://github.com/kmwebnet/rainbowtype-bootloader.git
```

Save the certificate definition constants that can be obtained above as cert_chain.c as shown below.

<img src="/docimage/getstarted-44.png" width="800">

replace server IP address constants in platformio.ini.

<img src="/docimage/getstarted-45.png" width="800">

copy root CA certificate’s contents to rootca.crt in rainbowtype bootloader.

<img src="/docimage/getstarted-46.png" width="800">

<img src="/docimage/getstarted-47.png" width="800">

Only build, not upload on platformio.

Upload to the device from the rainbow type client.  
Select "Deploy rt bootloader".

<img src="/docimage/getstarted-48.png" width="800">

Select the serial port number and template.  
Press "SELECT RT BOOTLOADER ..." and select the project folder of the  
rainbowtype bootloader you built earlier.

<img src="/docimage/getstarted-49.png" width="800">

<img src="/docimage/getstarted-50.png" width="800">

The rainbowtype bootloader firmware is signed and ready to be transferred to the device.

<img src="/docimage/getstarted-51.png" width="800">

When you enter "Deploy rt bootloader" again, "DEPLOY RT BOOTLOADER" becomes active and you can press it.  
Similarly, select the serial port and template to transfer the firmware to the device.

<img src="/docimage/getstarted-52.png" width="800">

If successful, the above display will be displayed, and when the device is started,  
the first encryption process will start and will stop for a while with the following display.

<img src="/docimage/getstarted-53.png" width="800">

When the encryption is completed, the rainbowtype bootloader will start.

<img src="/docimage/getstarted-54.png" width="800">

<img src="/docimage/getstarted-55.png" width="800">

First, enable wifi connection. When GPIO4 is connected to GND and started, AP mode starts as shown below.

<img src="/docimage/getstarted-56.png" width="800">

You will find the ssid for "rtbootloader". Select this and enter the password "rainbowtype".

<img src="/docimage/getstarted-57.png" width="400">

access 192.168.10.1 to connect wifi AP.

<img src="/docimage/getstarted-58.png" width="800">

<img src="/docimage/getstarted-59.png" width="800">

<img src="/docimage/getstarted-60.png" width="800">

if successful, rainbowtype bootloader will reboot.

<img src="/docimage/getstarted-61.png" width="800">

If you can connect to the rainbowtype server, you can check  
the status of "WEBSOCKET EVENT CONNECTED" as shown below.  
You can also see the error  
"image at 0x100000 has invalid magic byte" because you don't have the user's firmware yet.

<img src="/docimage/getstarted-62.png" width="800">

At this point, the device will be controllable from the rainbowtype client and will be able to transfer the user's firmware.

You can securely transfer the firmware you created to the device and communicate with it.

Please also check the demo showcase.
