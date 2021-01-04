Last modified: January 4th, 2021.

## 1. Overview

For IoT applications that use many devices, device registration with AWS should be automatic for security reasons.

rainbowtype uses ATECC608A as a hardware root of trust to keep your connection with AWS IoT secure.

In this scenario, AWS IoT Just in time registration (JITR) is used to automatically connect the device  
to AWS IoT using the certificate that signed the device.

## 2. AWS preparation

Make sure your AWS IoT custom endpoint on AWS console.
<img src="/docimage/demoaws-1.png" width="800">

## 3. Device side code

The device side is programmed with ESP-IDF with PlatformIO.

You can get a boilerplate as folows:

```
git clone --recursive https://github.com/kmwebnet/rainbowtype-boilerplate-aws.git
```

you need to modify the constants which you already have as follows:

```
CONFIG_AWS_IOT_MQTT_HOST="XXXXXXXX-ats.iot.us-east-1.amazonaws.com" on "sdkconfig.default"

```

<img src="/docimage/demoaws-2.png" width="800">

and you must copy "cert_chain.c" which you have generated one by rainbowtype client.

<img src="/docimage/demoaws-3.png" width="800">

On PlatformIO, only build (do not upload) and upload the firmware to the device with the rainbowtype client.

First, connect to the rainbowtype server.

<img src="/docimage/demoaws-4.png" width="800">

<img src="/docimage/demoaws-5.png" width="800">

<img src="/docimage/demoaws-6.png" width="800">

Select "OTA" and upload firmware.
You'll find the firmware on (project root folder)/.pio/build/esp32dev/firmware.bin

<img src="/docimage/demoaws-7.png" width="800">

## 4. AWS JITR setup

At first, get a registration code for registering cert.

```
C:\Users\test>aws --version
aws-cli/2.0.35 Python/3.7.7 Windows/10 botocore/2.0.0dev39

C:\Users\test>aws iot get-registration-code
{
    "registrationCode": "d9ed019c4680e29f7627b509771c9c9406b83c0e34043ed270468efc88c47faf"
}

```

Enter "Cloud connecting" on rainbowtype client.

<img src="/docimage/demoaws-8.png" width="800">

Click Add button and enter the value as CN.

<img src="/docimage/demoaws-9.png" width="800">

<img src="/docimage/demoaws-10.png" width="800">

Transfer the generated verification certificate.  
on PC’s cmd.exe, move to where the certs stored.

```
C:\Users\test>cd AppData\Local\Programs\rainbowtypeclient\


C:\Users\test\AppData\Local\Programs\rainbowtypeclient>aws iot register-ca-certificate --ca-certificate file://certs/testproject.crt --verification-certificate file://cloud/certs/d9ed019c4680e29f7627b509771c9c9406b83c0e34043ed270468efc88c47faf.pem
{
    "certificateArn": "arn:aws:iot:us-east-1:XXXXXXXX:cacert/3558994fc1ffae1fa3a8b132fc107db71e9694c36c52a80177f1da22e1941358",
    "certificateId": "3558994fc1ffae1fa3a8b132fc107db71e9694c36c52a80177f1da22e1941358"
}

C:\Users\test\AppData\Local\Programs\rainbowtypeclient>aws iot describe-ca-certificate --certificate-id 3558994fc1ffae1fa3a8b132fc107db71e9694c36c52a80177f1da22e1941358
{
    "certificateDescription": {
        "certificateArn": "arn:aws:iot:us-east-1:XXXXXXXX:cacert/3558994fc1ffae1fa3a8b132fc107db71e9694c36c52a80177f1da22e1941358",
        "certificateId": "3558994fc1ffae1fa3a8b132fc107db71e9694c36c52a80177f1da22e1941358",
        "status": "ACTIVE",
        "certificatePem": "-----BEGIN CERTIFICATE-----\nMIIBuDCCAV2gAwIBAgIQe0xe8yPd2CGKG6LAxgquAzAKBggqhkjOPQQDAjApMREw\nDwYDVQQKDAh0ZXN0Y29ycDEUMBIGA1UEAwwLdGVzdHByb2plY3QwHhcNMjAxMDA4\nMDI0NTE1WhcNMzAxMDA4MDI0NTE1WjAqMREwDwYDVQQKDAh0ZXN0Y29ycDEVMBMG\nA1UEAwwMdGVzdHBqc2lnbmVyMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE2vVE\n8HiInSTQS1QLbgSlXXeO6MJIcaiNQAayucQgtHOgw8MpI+sKp7Cq+y69i7/69Yrs\nvKwP27nyfrvpyRXh1aNmMGQwEgYDVR0TAQH/BAgwBgEB/wIBADAOBgNVHQ8BAf8E\nBAMCAYYwHQYDVR0OBBYEFNZQLQyWSAz2Dg1kjgPI7evYSwNcMB8GA1UdIwQYMBaA\nFC1i8nD/KsnTOAcFBkz5CWkEipEqMAoGCCqGSM49BAMCA0kAMEYCIQCrHzCzSCwS\ne4wJ+mhYmfcWwyiN0EyOlrqEyQpS8MBBrQIhAKVAJN5yELF9odTKfvSX8JNmJlmB\nG2nZBKY31luwnDiN\n-----END CERTIFICATE-----\n",
        "ownedBy": "XXXXXXXX",
        "creationDate": "2020-10-12T09:52:16.814000+09:00",
        "autoRegistrationStatus": "ENABLE",
        "lastModifiedDate": "2020-10-12T11:32:57.133000+09:00",
        "customerVersion": 7,
        "generationId": "9410adb3-114b-46a8-9d1f-398ddbe85f97",
        "validity": {
            "notBefore": "2020-10-08T11:45:15+09:00",
            "notAfter": "2030-10-08T11:45:15+09:00"
        }
    }
}

C:\Users\test\AppData\Local\Programs\rainbowtypeclient>aws iot update-ca-certificate --certificate-id 3558994fc1ffae1fa3a8b132fc107db71e9694c36c52a80177f1da22e1941358 --new-status ACTIVE


C:\Users\test\AppData\Local\Programs\rainbowtypeclient>aws iot update-ca-certificate --certificate-id 3558994fc1ffae1fa3a8b132fc107db71e9694c36c52a80177f1da22e1941358 --new-auto-registration-status ENABLE

```

You can also see the result on AWS console as follows:

<img src="/docimage/demoaws-11.png" width="800">

Then create a policy in AWS IAM.

<img src="/docimage/demoaws-12.png" width="800">

This is full policy example:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "iot:UpdateCertificate",
                "iot:CreatePolicy",
                "iot:AttachPrincipalPolicy"
            ],
            "Resource": "*"
        }
    ]
}
```

Name it "JITRPolicy".

<img src="/docimage/demoaws-13.png" width="800">

Create role for Lambda.

<img src="/docimage/demoaws-14.png" width="800">

assign "JITRPolicy".

<img src="/docimage/demoaws-15.png" width="800">

Name it "JITRRole".

<img src="/docimage/demoaws-16.png" width="800">

Create the function on AWS lambda.

<img src="/docimage/demoaws-17.png" width="800">

Set the function as shown below.

<img src="/docimage/demoaws-18.png" width="800">

<img src="/docimage/demoaws-19.png" width="800">

This is full fuction example:

```
const AWS = require("aws-sdk");

const REGION = "us-east-1";

const iotClient = new AWS.Iot({
  region: REGION,
  apiVersion: "2015-05-28"
});

exports.handler = async event => {
  const accountId = event.awsAccountId.toString().trim();
  const certificateId = event.certificateId.toString().trim();
  const certificateARN = `arn:aws:iot:${REGION}:${accountId}:cert/${certificateId}`;
  const policyName = `Policy_${certificateId}`;

  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        "Effect": "Allow",
        "Action": [
          "iot:Connect",
          "iot:Publish",
          "iot:Receive",
          "iot:Subscribe"
        ],
        "Resource": [
          "*"
        ]
      }
    ]
  };

  await iotClient
    .createPolicy({
      policyDocument: JSON.stringify(policy),
      policyName: policyName
    })
    .promise();

  await iotClient
    .attachPrincipalPolicy({
      policyName: policyName,
      principal: certificateARN
    })
    .promise();

  await iotClient
    .updateCertificate({
      certificateId: certificateId,
      newStatus: "ACTIVE"
    })
    .promise();
};
```

Create a rule on AWS IoT.

<img src="/docimage/demoaws-20.png" width="800">

set query on "rule query statement".

<img src="/docimage/demoaws-21.png" width="800">

This is query example:

```
SELECT * FROM '$aws/events/certificates/registered/3558994fc1ffae1fa3a8b132fc107db71e9694c36c52a80177f1da22e1941358'
```

Add Lambda Action.

<img src="/docimage/demoaws-22.png" width="800">

Select the function you registered earlier.

<img src="/docimage/demoaws-23.png" width="800">

In this state, if an unregistered device is connected, the device certificate can be  
automatically registered and the connection can be started.

You can check the reception status by subscribing to "test_topic / esp32" on the AWS console.

<img src="/docimage/demoaws-24.png" width="800">

Similarly, the message from the AWS console side can be confirmed by the serial output on the device side.

<img src="/docimage/demoaws-25.png" width="800">
