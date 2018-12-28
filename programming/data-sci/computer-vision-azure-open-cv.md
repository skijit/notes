Computer Vision with OpenCV and Azure
================
  
## Existing Cognitive Services Offerings
- uses Azure Cognitive Services
  - AI API's
  - for more info see [these notes](/programming/data-sci/ai-as-service-platforms)
- what is in a photo
  - faces, age, adult content, type of animal
- did a fun project
  - has a rasperry pi
  - he has a motion sensor camera
  - sends image to cog services
  - if cat or racoon, squirt water
  - for more info see DanielEgan's github account.  
    - Project is called 'wackoon'
    - raspicam
- so you shoud see whether cognitive services api covers any needs

## Custom Training
- use [this site](https://www.customvision.ai/)
- you create a new custom vision project
- Training your own just requires a decent training set
- You add tags for the binary classifier:
  - Positive
  - Negative

## Using OpenCV
- use python, if for no other reason, because the docs are better
- Use this when customvision.ai can't take of your needs
- OpenCV has all sorts of stuff
  - general image processing
  - geometric
  - sgemtation
  - detectio
  - rcognition
  - tracking
  - fitting
  - calibration, stero, 3d
  - features
- ONNX is an open neural net format to make models portable
- Applications
  - facial recognition
  - gesture recogntion
  - hci
  - motion understanding
  - etc
- opencv.org
- HOGS
  - historgram of oriented gradients
  - magic of how classifiest work
  - hogs creates matrix of eigenvectors
- HAAR feature-based cascade classifier
  - image recognition (esp facial)
  - not ml
- Tesseract OCR
  - googles state of the art ocr library

## good resources
- kaggle
- google data set serarch
