#Rapid Meteor Detection (my bachelor thesis)

Meteor detection is a very interesting topic. After completing most of my observatory construction work, 
I finally had the opportunity to build my own meteor camera system. The hardware for the monitoring device 
can be simple, all you need just a camera with lens. After that, we need a software such as Ufocapture 
or RMS to detect the video stream and record the suspected meteor video.

However, most of these software are based on motion-detection algorithms, and some small flickering such as 
airplanes or bugs will trigger false alarms and record them. Therefore, it is necessary to manually 
review the candidate videos of the night.

## Can the process of manually review be replaced by AI?
Certainly. The task of reviewing the videos is simple and mechanical, as the advanced AI algorithms available 
today are capable of recognizing almost any object. However, real-time detection places significant demands on 
computer performance and most of the setups used for recording such as mini PC or Raspberry Pi, do not have a 
powerful GPU. Therefore, compressing the entire video's information and focusing on meteor becomes highly useful.

## A universal solver
<figure markdown>
  ![Meteor](/project/Meteordetection/example.gif){width="600",loading=lazy} 
  <figcaption>Meteor in the sky</figcaption>
</figure>
We know that different meteor recording cameras have varying fields of view, resolutions, and background objects. 
If we want to create a universal solution, we must standardize each video. Building upon the discussion in the previous 
chapter, we need to extract meteor information as comprehensively as possible and eliminate background information.

## Actually a vedio = a data cube
<figure markdown>
  ![data_cube](/project/Meteordetection/data_cube.png){width="500"}
  <figcaption>data_cube</figcaption>
</figure>
Actually, a video is a data cube extends in the time dimension(as frames). Through the data cube(In matlab or numpy, 
we treat it as a three-dimensional matrix), we can obtain the variation of each pixel over time, as shown in figure above.
Moreover, only part of the frames contain meteor information as shown in the figure below.
<figure markdown>
  ![meteor_frame](/project/Meteordetection/meteor_frame.png){width="500"}
  <figcaption>Meteor show up from frame 30 to frame 60 in the video</figcaption>
</figure>
These frames constitute the video along the time dimension, but only a few pixels experience significant changes in their 
grayscale values, while the majority of pixels represent unchanged background with overlaid varying noise.
Consequently, In a meteor capture scene, pixels can be roughly categorized into four types: Background ground pixels, 
Background sky pixels, meteor path pixels, moon or bright objects pixels, as illustrated in figure below. Below is a brief 
analysis of the variation in these four representative types of pixels:
<figure markdown>
  ![different_pixel](/project/Meteordetection/different_pixel.png){width="800"}
  <figcaption>Four types of pixels</figcaption>
</figure>
(a) Background ground pixels: Due to minimal illumination, they contain the least information and show minimal variation 
along the time dimension, with grayscale values close to pure black.

(b) Background sky pixels: They receive partial photon information influenced by moonlight or skylight, resulting in noticeably 
higher brightness compared to the ground. However, they still contain very little information, and these pixels are greatly 
affected by noise, leading to irregular changes in grayscale values at low numeric levels along the time dimension.

(c) Meteor path pixels: These pixels belong to the sky background but show variation in grayscale values along the time 
dimension when meteors or other luminous objects pass through them. This variation is characterized by a sudden increase in 
grayscale values followed by a return to the level of the sky background.

(d) Moon or bright objects pixels: These pixels receive the maximum and constant illumination, causing their grayscale 
values to appear almost pure white along the time dimension.

## Single pixel subtraction
Based on the characteristics of the grayscale value changes in the four regions mentioned above, we can perform the 
following operation on all pixels in the temporal dimension:
$$New_{gray(i,j)}= Max_{gray(i,j)} - Avg_{gray(i,j)}$$
As a result, we obtain an image composed of the grayscale values of each pixel after subtraction, as shown in figure below. 
In this way, the glowing and moving objects in the original video will be recorded in a single image, while non-glowing or 
stationary objects will be completely subtracted, and more exciting is the background noise will be greatly reduced due to the 
averaging process of grayscale values.
<figure markdown>
  ![comparison](/project/Meteordetection/comparison.png){width="800"}
  <figcaption>Comparison</figcaption>
</figure>
It can be seen that irrelevant areas such as the background ground, background sky, and moon or other bright objects are almost 
completely subtracted, while all glowing moving object information is well preserved. From this point, we have completed the 
compression of the video and the standardization of the images, as the characteristics of the meteor are already quite clear 
from these glowing trail information. 

## AI model for trail detection
If we want a more elegantly automated review, we can introduce an object detection AI model for automatic classification. 
This AI model should accurately identify meteor trails, and we can execute scripts to delete or retain videos based on the 
recognition results. In my bachelor thesis, I used YOLOv3 and v4 models for training and modeling to recognize meteor and aircraft trail, 
with aircraft trail being the primary objects causing false alarms.
<figure markdown>
  ![meteor_plane_trail](/project/Meteordetection/meteor_plane_trail.png){width="500"}
  <figcaption>Trail of meteor and aircraft</figcaption>
</figure>
It's worth noting that since we only need to detect a single image, we don't require a powerful GPU. And the task can be accomplished 
solely with the CPU. The entire model is written in Python, so it can even run on a Raspberry Pi. In the subsequent work, I also 
attempted to develop a UI demo to provide a more intuitive user experience.
<figure markdown>
  ![UI](/project/Meteordetection/UI.png){width="800"}
  <figcaption>a UI demo</figcaption>
</figure>