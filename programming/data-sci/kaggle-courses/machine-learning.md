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
  - `RandomForestRegressor` is almost always better than `DecisionTreeRegressor`


- Kaggle Competition Submissions
  - Use the jupyter kernel
  - You write a csv file (from pandas)
  - You commit - which also runs
  - The `<<` button in the upper-left puts you in View-mode
  - Then you can view the Output tab, which has your exported csv
    - From Output, you can click the Submit button

## Handling Missing Values
  - Python represents missing values as `nan`
  - Here's how you can identify the count of missing values per column:
    `missing_val_count_by_column = (data.isnull().sum())`
  - Most libraries give you an error for missing values
  - 3 basic missing value strategies
    1. Drop Columns with Missing Values
      - Good for when most values in a column are missing
      - `data_without_missing_values = original_data.dropna(axis=1)`
      - If you have separate test and training set, here's how you can drop the same columns

      ```(python)
      cols_with_missing = [col for col in original_data.columns 
                                 if original_data[col].isnull().any()]
      redued_original_data = original_data.drop(cols_with_missing, axis=1)
      reduced_test_data = test_data.drop(cols_with_missing, axis=1)
      ```

    2. Imputation
      - Imputation fills in the missing value with some number
      - Won't be the *right* value but usually better than nothing (i.e. strategy 1)
      - There are a variety of heuristics on what kind of imputation you could use, but it all comes out in the wash for sophisticated modelling algorithms
        - thus we use the mean value
      
      ```(python)
      from sklearn.impute import SimpleImputer
      my_imputer = SimpleImputer()
      data_with_imputed_values = my_imputer.fit_transform(original_data)
      ```

  3. Imputation with Extension
    - Another option is to use imputation but add a new binary column for each column with missing values
    - That way the model can key off whether the missing value was somehow significant

    ```(python)
    # make copy to avoid changing original data (when Imputing)
    new_data = original_data.copy()

    # make new columns indicating what will be imputed
    cols_with_missing = (col for col in new_data.columns 
                                    if new_data[col].isnull().any())
    for col in cols_with_missing:
        new_data[col + '_was_missing'] = new_data[col].isnull()

    # Imputation
    my_imputer = SimpleImputer()
    new_data = pd.DataFrame(my_imputer.fit_transform(new_data))
    new_data.columns = original_data.columns
    ```

## Categorical Values with One Hot Encoding
- Here was how you can filter out non-numeric columns: `melb_numeric_predictors = melb_predictors.select_dtypes(exclude=['object'])`
- One hot encoding works very well for categorical variables with < 15 values
- Creates a new binary column for each variable's value.
  - If a variable `Color` has possible values { Red, Yellow, Green }, then new columns `Red`, `Yellow`, and `Green` get created
- pandas assigns a data type (called `dtype`) to each colum or series
- `get_dummies` from pandas produces one hot encoding on the object (ie text) typed colummns in a data frame 
  - `one_hot_encoded_training_predictors = pd.get_dummies(train_predictors)`
- aligning multiple files with the `align` function
  - you might have separate files, such as a train and test dataset
  - scikit-learn is sensitive to ordering of columns and if the signature of data frames is different, it will fail  
  - you can one hot encode both test and training sets and then reorder to make sure they're the same
    - the join parameter is like a sql join.  you could also use 'inner'.

  ```(python)
  one_hot_encoded_training_predictors = pd.get_dummies(train_predictors)
  one_hot_encoded_test_predictors = pd.get_dummies(test_predictors)
  final_train, final_test = one_hot_encoded_training_predictors.align(one_hot_encoded_test_predictors,
                                                                      join='left', 
                                                                      axis=1)
  ```

## XGBoost
- XGBoost
  - is a very powerful learning algorithm
  - It's very useful for dealing with text and numeric data
    - Not so much video, images
  - Requires lots of tuning
  - Implementation of Gradient Boosted Decision Trees
















