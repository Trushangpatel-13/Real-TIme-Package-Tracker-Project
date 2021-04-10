#include <TinyGPS++.h>
#include <HardwareSerial.h>
#include <WiFi.h>
#include <FirebaseESP32.h>

#define FIREBASE_HOST "https://news-471f1.firebaseio.com/"
#define FIREBASE_AUTH "XKWMZHuKiCKkmFMToAiG0ZC2foFEYXZvTTAA7P9U"

float latitude , longitude;
String  lat_str , lng_str;
const char *ssid =  "IOT";     // Enter your WiFi Name
const char *pass =  "90087140trupen"; // Enter your WiFi Password

FirebaseData firebaseData;
FirebaseJson json;


WiFiClient client;
TinyGPSPlus gps;
HardwareSerial SerialGPS(1);

void setup()
{
  Serial.begin(115200);
  Serial.println("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  SerialGPS.begin(9600, SERIAL_8N1, 16, 17);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");              // print ... till not connected
  }
  Serial.println("");
  Serial.println("WiFi connected");

   Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  
  Serial.println("------------------------------------");
  Serial.println("Connected...");
  
}
void loop()
{
  while (SerialGPS.available() > 0) {
    if (gps.encode(SerialGPS.read()))
    {
      if (gps.location.isValid())
      {
        latitude = gps.location.lat();
        lat_str = String(latitude , 6);
        longitude = gps.location.lng();
        lng_str = String(longitude , 6);
        Serial.print("Latitude = ");
        Serial.println(lat_str);
        Serial.print("Longitude = ");
        Serial.println(lng_str);
        json.set("/Lat", latitude);
        json.set("/Long", longitude);
        Firebase.updateNode(firebaseData,"/Location/trupenc",json);
      }
     delay(5000);
     Serial.println();  
    }
    
  }  
  
}
