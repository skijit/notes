Intro to ML, Using Keras, TensorFlow, and CNTK, PyTorch, Raw Python
========================

- This is a big pile of unstructured notes from a ML/TensorFlow/Keras Workshop in Dec 2018

## Presenter
- james mccaffery
  - https://www.microsoft.com/en-us/research/people/jammc/
  - https://jamesmccaffrey.wordpress.com/
  - jamccaff@microsoft.com / v-iyl@microsoft.com (Shirley Lin)


## Installation
- Bleeding edge - software is changing rapidly
  - Installation is a nightmare too
- This is same content as what people get at MS
- Nadella all-employees email about if you aren't learning about ML, "you probably shouldn't be working here"
- Keras is selected over TensorFlow, CNTK, PyTorch, Raw Python
- copy "azure ai" folder to root
- installation is extremely specific 
  - requires you to remove any previously existing python installations
- python 2 vs 3 : almost completely incompatible
- wants us to run training, development locally
- always use the anaconda distro of python

- install anaconda to C:\Users\skijit\AppData\Local\Continuum\anaconda3
  - even though default will be: C:\Users\skijit\Anaconda3 
- add anaconda to PATH env var

- content notes
  - stored local data to `c:\AzureAi`
  - the iris folder has basically the same types of models created w/ different libraries (cntk, keras, pytorch, tensorflow, raw python)

- whl ("wheel") files: structure of filename is important
  - like an msi
  - program to run a whl file is `pip`
  - go to pypy and get the wheel file and install like `pip install path-to-whl-file`
- install to Lib\site-packages

## Content
- keras runs on top of tensor flow 
  - tensor flox is basically the engine
  - tensor flow is extremely low level, and hard to program
- cntk is an ms product
- top (most popular) packages for deep learning: keras, ml, pytorch

- important concepts
  - cross entropy error

- interesting application: analysis of legal documents

- people are no longer using validation files for deep learning
  - gives you less data to train on
  - there are other reasons

- ask for nn kitchen sink ppt

- 1-hot encoding for binary classification (aka "1 of n" encoding)
  - all libraries require this EXCEPT pytorch

- typically want to scale the data
  - iris is scaled between 1-10
  - this is important when the data is really spread out
 
 - nn are great bc they can handle different types of features
  - int
  - float
  - bool
  - string
  - category

- encoding predicting variables, you use "1 of n-1"
  - low , med, high
  - scrunch to 2
  - values are: 01, 10, -1-1

- nn will generally do automatic featurization for you

- input nodes is determined by data
- hidden layer number of nodes has to be experimentally determined
  - called a hyper parameter
  - as you add more nodes, you have to worry about over-fitting
  - it has a profound effect
- number of output nodes is determined by the output categories
  - the node with the biggest output, means that's the predicted classification
- wieghts and biases are determined during training

- deep nn vs nn
  - deep nn has 2 or more hidden layers
  - deciding the number of layers is another hyperparameter

- interpreting iris output 
  - loss function is like error
    - imagine correct output is 0 1 0
    - actual output is .2 .7 .2
      - the loss value by iteslef is hard to interpret, the importnat thing is that with each epohc it should go down 
  - acc is accuracy

- 3 big techniques for normalization
  1. gaussian aka z-score
    - use this when you have reason to believe that the data is normally distributed
  2. min-max 
    - new_x = (x - min) / (max - min)
    - this is the most common, and stuff usually ends up between 0 and 1
  3. order of magnitude
    - divide by a power of 10
    - good for image processing grayscale data
  - statistical aside...
    - standard dev
      - there are 2 types
        - population
        - sample

- predictor encoding / aka class label encoding
  - encoding is really deep
  - types of encoding in ML
    - dummy: not used in ML
    - effect: not used in ML
    - orthogonal: not used in ML
    - 1-of-(n-1) coding - used A LOT in ML 
      - google this
      - good for just < 26 predictors
    - you can also use 1-of-n encoding for predictors
      - for > 26 predictors
      - hierarchical softmax
    - encoding for bindary categorical classification
      - use 0,1 encoding (single node)

- reproductible results in these libraries is very rare
  - theres stochasticicity
  - there's complicated

- data loading can be a bottleneck
  - pytorch has some advantages

- other intiliazation algorithms (other than glo_rot)
  - uniform
    - you had to choose boundaries
  - gaussian
    - then you specify the mean value
  - glorot
    - figures out the stuff baseddon the topology of the nn
  - he initialization
    - this is a new algorithm
    - only for deep nn's, but not too deep
    - if you use relu activation, use these

- stochasitc gradient descent
  - aka backpropagation
  - it's the most complicated topic of ml
  - works well until deep nn
  - considered very primitive and rarely used
  - Adam is the general purpose default
    - there are zillions of others and they're very highly specialized
  
- see boston data for encoding
  - river proximity has to be -1,1 encded not 0,1
  - this is a regression problem

- 3 classes of ML problems
  - multiclass classification
  - regression
  - binary classification

- 3 types of nn
  - normal nn :
  - convolutions nn : image
  - recurrent nn: text

- image classification used to be very nichey
  - but now it's opened up
  - MNIST
    - to keep the geometry of the pixels in MNIST, convolutional nn;s were used
      - bc other encoding would get rid of that
      - breaks it into chunks (subboxes) and called features, then tries to pipe those in to a bigger nn

- dropout
  - motivation: it's a way of combatting overfitting
  - at each training iteration, you random select a percentage of nodes to drop out.
    - requires some postprocessing
    - experimentally performs well, not theoretically understood well
    - in some packages, you can add a dropout layer between other layers
  - other methods:
    - train-test split
    - k fold cross validation
    - train-validate test
    - dropout training
    - l1 and l2 regularization
    - input jittering: add random noise to the input values
      - sometimes called 'input dropout'

- momentum
  - motivation: speed up training
  - its not as important now that we have such high-speed performance
  - similar to learning rate
    - 0.01 : std learning rate
    - 0.0001 : guarantees incremental improvment, but it takes longer
    - 0.1 : you might overshoot or overfit, but it will be a fit
  - momentum
    - sgd
    - nesterov momentum: new

- cross entropy error
  - this is the standard error measure for classification tasks ( you can't use it for regression)
  - mean-squared error is another error measure that can be used for classification AND regression
  - they good at classification because it deals with output that always sum to 1 (which is not true for regression)
    - classification outputs usually look like (0, 0, 1) and so, yes, it does sum to 1

- L1/L2 regularization
  - not used that much  - part of pre dnn
  - motivation: combat overfitting
  - weknow overfit models are spiky
  - in polynomials, big coefficients usually imply big jumps (spikiness)
  - regularization deals with penalizing big coefficients

- types of recurrent nn
  - lstm
    - has a memory state, so it depends on everything that came before it

- embeddings
  - like wod 2 vec
  - 3 ways to create one
    1. preprocess with a custom nn
      - going to be very specific
    2. preprocess with an outside tool
      - portable, generic
    3. generic word vectors, like glove
      
- google alpha-go
  - gave it the rules and let it play against it self
  - then it beat the world champ
  - did the same thing with chess rules, trained it for a night, and it killed the best known chess program
