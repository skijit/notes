Intro to Data Science with Pandas
=========================

- [Python data science with Pandas](https://www.youtube.com/watch?v=ikOEn8jY2Is)
- [Jupyter Tutorial](https://www.datacamp.com/community/tutorials/tutorial-jupyter-notebook)
- Pandas doesn't do modelling - it lets you tweak data 
  - preprocessing
  - creating data frames
  - often used to pass to scikit learn
- pandas is in-memory - small data
  - for big data... maybe look into Spark?


## Getting Started With Jupyter
- starting with Jupyter
  - install via Anaconda
- `%time` lets you know how long it takes to execute a particular cell
- kaggle is a place to share jupyter notebooks (kind of like github for notebooks) 
- remember everything in jupyter is global scope

## End to End example of Juptyer and Pandas

- import all the libs you want
  - note: `%matplotlib inline` is jupyter code to tell jupyter to render images in the notebook

```(python)
%matplotlib inline
import matplotlib.pyplot as plt
import pandas as pd
from sklearn import ensemble, model_selection, preprocessing, tree
from yellobrick.classifier import ROCAUC
from yellobrick.classifier import ClassificationReport, ConfusionMatrix
```

- read a csv with pandas

```(python)
bit_df = pd.read_csv('filepath')
```

- This will show you the format of the data

```(python)
bit_df.dtypes
```

- convert one of the dataframe fields to a legit datetime (since currently is a list of seconds), add as a column

```(python)
bit_df['date'] = pd.to_datetime(bit_df.Timestamp, unit='s')
```

- set the index to a particular column and also renames columns to the lowercase and underscores (python friendly)
- the format here is part of pandas
- `resample` is turning this into a time series, after which you can do an aggregation at the day level ('d') and reassign values
  - you can also do a groupby with arbitrary functional logic
- `iloc` will take the last 1000 values, in this case, to remove some missing values since this messes up our models
- the `shift` line is letting you create a new column whose rows are lagged fwd 1 and you can use that to determine a new value
- the last iloc will remove the last row

```(python)
bit_df = (
  bit_db.set_index('date')
    .rename(columns={'Open':'open', 'High':'hi', 'Low':'lo', ...})
    .resample('d')
    .agg({'open':'first', 'hi':'mean', ...})
    .iloc[-1000:]
    .assign(buy = lambda x: x.close.shift(-1) > x.close).astype(int)
    .iloc[:-1]
)
```

- to see the pandas functions defined on the dataframe, try this.  There's a lot!

```(python)
print(dir(bit_df))
```

### Building a model
- Build a random forest: 
  - bunch of decision trees
  - randomly choose which columns to are in each decision tree, and then you group them all together
  - can do categorization and regression
- you have to create features (x) and output (y) columns
- need to split into test and train dataset
  - using scikit-learn (sklearn) to split datasets, function `train_test_split`
  - random_state helps make it reproducible
  - test size is 30% of the full data set 
- the random forest algorithm is also part of scikit and real data scientists seem to use this pretty well
  - library has lots of models that have a similar interface... so you can head to head them easily
  - build on numpy
- initial score is really bad, bc original was overfit (which he verified by scoring against the training)

```(python)
ignore = {'buy'}
cols = [c for c in bit_df.columns if c not in ignore]
X = bit_df[cols]
y = bit_df.buy
X_train, X_test, y_train, y_test = model_selection.train_test_split(X, y, test_size=.3, random_state=42)
rf1 = ensemble.RandomForestClassifier(random_state=42)
rf1.fit(X_train, y_train)
rf1.score(X_test, y_test)
```

- yellowbrick is a new library for visualizations for ml models
- this outputs the ROC curve which measures sensitivity and selectivity
  - the area under the curve is what you're able to predict ( you want it close to 1)
  - the identity line is guessing, so you definitely want it above that

```(python)
fig, ax = plt.subplot(figsize=(10, 10))
roc_viz = ROCAUC(rfl)
roc_viz.score(X_test, y_test)
roc_viz.poof()
```



```(python)

```

```(python)

```

```(python)

```

```(python)

```

```(python)

```