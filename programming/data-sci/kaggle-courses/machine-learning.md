Intro to ML (Kaggle Course)
===========================

- [src](https://www.kaggle.com/learn/machine-learning)
- decision tree
  - **Split**: each decision is called a 'split'
- importing with pandas

```(python)
# save filepath to variable for easier access
melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
# read the data and store data in DataFrame titled melbourne_data
melbourne_data = pd.read_csv(melbourne_file_path) 
# print a summary of the data in Melbourne data
melbourne_data.describe()
```

- `describe` produces the following data for each column:
  - count
  - mean
  - std
  - min
  - 25 percentile
    - e.g. if you sorted, this value would be bigger than 25% of the data and less than 75% of the data
  - 75 percentile
  - max

- pre-Modelling Process
  - load data
  - handle missing data
  - special values
  - drop records
  - other options?
- identify the value to predict
  - label as `y`
- identify the features
  - label as `x`
  
  ```(python)
  melbourne_features = ['Rooms', 'Bathroom', 'Landsize', 'Lattitude', 'Longtitude']
  X = melbourne_data[melbourne_features]
  X.describe()
  X.head()
  ```

- Modelling
  - using **scikit-learn**
  - define what kind of learning algorithm you want to use
  - fit
  - predict
  - evaluate

```(python)
from sklearn.tree import DecisionTreeRegressor

melbourne_model = DecisionTreeRegressor(random_state=1)
melbourne_model.fit(X, y)

print("Making predictions for the following 5 houses:")
print(X.head())
print("The predictions are")
print(melbourne_model.predict(X.head()))
```

  - You don't want to test on the same data you trained on, but this is pedagogy
  - notice the fit() and predict() methods.  this is usually uniform.

- pandas notes
  - print out columns in a data frame: `print(df.columns)`
  - project a single column:
    - `df.ColName`
    - `df[ColName]`
  - project out a few columns:
    - `cols = ['col1', 'col2']`
    - `df[cols]`

- mean absolute error
  - one way of quantifying model's value
  
  ```(python)
  from sklearn.metrics import mean_absolute_error

  predicted_home_prices = melbourne_model.predict(X)
  mean_absolute_error(y, predicted_home_prices) 
  ```

- validation with test_train_split

```(python)
from sklearn.model_selection import train_test_split

# split data into training and validation data, for both features and target
# The split is based on a random number generator. Supplying a numeric value to
# the random_state argument guarantees we get the same split every time we
# run this script.
train_X, val_X, train_y, val_y = train_test_split(X, y, random_state = 0)
# Define model
melbourne_model = DecisionTreeRegressor()
# Fit model
melbourne_model.fit(train_X, train_y)

# get predicted prices on validation data
val_predictions = melbourne_model.predict(val_X)
print(mean_absolute_error(val_y, val_predictions))
```

- overfitting vs underfitting
  - more leaf nodes -> overfitting
  - we often determine these types of hyperparameters experimentally by inspecting mean absolute error for various settings

  ```(python)
  scores = {leaf_size: get_mae(leaf_size, train_X, val_X, train_y, val_y) for leaf_size in candidate_max_leaf_nodes}
  best_tree_size = min(scores, key=scores.get)
  ```
  - nice way of using python dict with list comprehension

- **random forest**
  - creates many trees and avg's the prediction across those trees
    - purpose is to improve overfitting/underfitting from normal decision trees

- on exercise random forests











