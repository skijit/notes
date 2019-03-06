Json Support in Sql Server
==========================

- [src](https://docs.microsoft.com/en-us/sql/relational-databases/json/json-data-sql-server?view=sql-server-2017)
- Supported Functionalities (Sql Server 2016)
  - Import Json
  - Export table as Json
  - Query relational AND Json
    - You can use values from JSON text in any part of a Transact-SQL query (including WHERE, ORDER BY, or GROUP BY clauses, window aggregates, and so on)
- You can set indexes on fields in Json columns ([info](https://docs.microsoft.com/en-us/sql/relational-databases/json/index-json-data?view=sql-server-2017))
  - For individual properties in Json column, you need to create a computed column that projects that property
- `ISJSON`
- `JSON_VALUE`
  - For parsing/accessing/filtering a scalar value from Json
  
  ```(SQL)
  -- Convert Json fields into columns and filter on particular values for Json fields
  SELECT Name, Price, JSON_VALUE(MyJsonCol, '$.Color') Color, JSON_VALUE(MyJsonCol, '$.StandardCost') Cost
  FROM ProductCatalog
  WHERE JSON_VALUE(MyJsonCol, '$.Color') = 'Black'
  ```

- `JSON_QUERY`:
  - For parsing/accessing/filtering an object/array from Json
  - For comparison with `JSON_VALUE`, see [here](https://docs.microsoft.com/en-us/sql/relational-databases/json/validate-query-and-change-json-data-with-built-in-functions-sql-server?view=sql-server-2017#JSONCompare

- `JSON_MODIFY`:
  
  ```(SQL)
  -- Update a value inside of a Json column
  UPDATE ProductCatalog
  SET MyJsonCol = JSON_MODIFY(MyJsonCol, '$.Color', 'White')
  WHERE JSON_VALUE(MyJsonCol, '$.ProductNumber') = 'BK-123'
  ```
  

- `OPENJSON`: Transforms Json Text to Table
  - Arrays -> Tables
  - Object -> Rows
  - KV Pairs -> Column/Cells
  - This gives you the ability to read in a Json text file (use OPENROWSET) and then query the Json values as if they were columns in a table

)
- `FOR JSON PATH`: Format a result set as Json text
  
  ```(SQL)
  -- return a table as an array of Json objects
  SELECT id, name, managerid 
  FROM employee
  FOR JSON PATH
  ```

- `FOR JSON AUTO`: similar to PATH (above) variant.  Not sure the specific differences.
