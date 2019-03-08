Misc, Informal Learning Algorithm Comparisons
=============================

## Deep Learning vs Everything
- [src](https://medium.com/@faizanahemad/why-deep-learning-is-not-the-holy-grail-of-data-science-9929c38d1c45)
- It is not the "holy grail" because:
  - ETL still needed
  - Understanding the relative importance of features is difficult
  - Complicated Black box (contrast with Decision trees and Naive Bayes)
  - You cannot infer statistical significance
  - You still need to domain knowledge to develop an error function
    - A fraud detection scenario where only 1% of transactions are fraudelent may only classify as the dominant (non-fraud category) if the right error function isn't selected
  - Requires lots of data - usually a million records
  - Deep learning requires lots of theoretical knowledge

## Deep Learning vs XgBoost
- [src](https://www.quora.com/Why-is-xgboost-given-so-much-less-attention-than-deep-learning-despite-its-ubiquity-in-winning-Kaggle-solutions)
- Deep Learning typically requires more training data than XGBoost
  - Deep learning: 100k or 1,000,000 rows
- Training takes longer with Deep Learning
- XGBoost really good for tabular data (categories and numeric)
- DL good for video, images
- DL architectures might be more complicated than what you use for XGBoost, but once you have the right DL architecture, DL beats everything else out there.