# **My Tiny Observatory**

<figure markdown>
  ![inside_preview](/project/Mytinyobservatory/inside.jpg){width="500"}
  <figcaption>Preview</figcaption>
</figure>


My hometown has extremely low light pollution compared to the city(bortle scale is 2) and approximately 100 clear nights 
are available for observation each year. If the observatory can be controlled remotely, the efficiency will be greatly improved. 
This is a plan I've been consistently working on since my bachelor's study. It's a multidisciplinary project, primarily focused 
on programming and mechanics... I'm happy to share the challenges I've encountered and the solutions I've developed.

## **The central system**
### **Main functions of the central system**
The central system serves as the brain of the entire observatory.
It not only needs to handle data collection (temperature, humidity, wind speed, etc.), real-time monitoring 
image display but also control switches for numerous electrical appliances. Finally, it should be easy to 
access and possess a certain level of upgradability.

### **How to achieve cross-platform access on any device?**
While most observations and imaging tasks require the use of PC, day-to-day monitoring is primarily done on mobile devices. 
Developing an app solely for the ios or android is not a wise choice, the time cost will be greatly increased. 
Is there a platform can cross-device smoothly access? Yes, that is web.

### **Where to deploy our web services?**
Since the device needs to run stably for a long time and has the lowest possible power consumption, a Raspberry Pi 4B run with 
linux kernel is our best choice.
<figure markdown>
  ![server_ideal](/project/Mytinyobservatory/server_ideal.jpg){width="900"}
  <figcaption>Basic ideal of the system</figcaption>
</figure>
</br>
In the end, I decided the use of a web network deployed on a Raspberry Pi as the central control system for the observatory, 
building the server backend using Python's Flask. Thanks to the Raspberry Pi's powerful expandability, I could utilize its built-in 
pins to control relays and, consequently, control electrical appliances. Additionally, I integrated Arduino to control numerous 
sensors for data collection and cameras to capture images in inside and outside. The most exciting part is that the cost of all the 
materials is remarkably cheap compared to smart home device available on the market!
<figure markdown>
  ![Web_UI](/project/Mytinyobservatory/Web_UI.png){width="700"}
  <figcaption>Web_UI</figcaption>
</figure>