SSRS Outline
=========================

## General

- Enterprise Reporting
    - Departmental std report
- Operational Reporting
    - What's happening
- Ad-Hoc Reporting
    - Digging deeper, customization

- Microsoft Report Definition Types
    - Report Types
        - Paginated Reports: Use Reporting services
            - Need it to be static, pixel-perfect
        - Interactive Reports
            - Use Power BI Desktop and Service
        - Mobile Rporting
            - Use Reporting Services Mobile
        - Analytical report and charts
            - Excel
- For Paginated Reports
    - Use SSRS
    - It's the On-premises reporting platform
    - Supports static or dyanamic reports
        - Created automatically
        - or on request
- Web Portal for reporting services
    - There's a dashboard, customizable
- Report Dev Tools
    - SQL Server Data Tools (SSDT- previously named BIDS)
        - It's a reduced version of visual studio, with a limited set of projects
        - the 2016 version has full backwards compatibility!!
        - It may just be add-on to VS or separate project templates
        - Supports source control
    - Report Builder
        - Can't create a shared data source
        - This is what you would use if you don't have an MSDN subscription
    - Mobile Report Publisher
- Using SSDT
    - Create a new project
    - Panes    
        - Solution Explorer
        - Toolbox
        - Report Data
- Data Sources:
    - Specify the target, platform, query
    - Supports typical backends (rdms), xml, sp list, analysis services cube
    - Shared and Embedded
        - Always use a shared data source
    - Create the data source (shared) before you create the rport
- 'Add New Report' -> wizard
- Select the shared datasource in the Report Data pane
- Then you add a Shared DataSet
    - Typically, these are not shared
- Can you combine datasets?
    - Sorta: You can use one dataset as a kind of lookup 
- Dataset properties
    - Fields: what you're projecting
    - These will populate in the Report Data pane
- Tabular/Text Data Objects
    - Table
        - Can be grouped or aggregated
        - Has a static list of columns
        - Grows in the Y direction
    - Matrix
        - Variable amount of rows or columns
        - Can grow in the X direction    
    - List
        - One row, one column, repeats for each dataset row
- To build a Tablix:
- Drag it onto the design surface
- Then drag dataset fields onto the tablix
    - You need to define the groupings: that's not part of the query
- Clicking on the top left box of the table lets you go to *tablix properties*- very useful
    - Sorting
    - Paging
- Doesn't give you a count of all the rows
    - But you could create an expression
- Doesn't preload all of the pages (for large queries)
    - Notice the pagination control will say 'x of 3?' since it doesn't know
    - You can create an expression to calculate all of the pages, if you need that 
- Other Toolbox items
    - textbox: titles and escriptions
    - rectangle: good for grouping objects together
    - image: logos/pictures
        - can be embedded, external, or put in the ssrs database
        - sizing, scaling options
    - subreport:  parent child
    - line: separate sections
- Integration with other websites
    - Iframes
- Headers and footers
    - Right-click on the white background of the design surface
    - You can put these in your template (which we would do informally)
        - We have Afton/NM templates which we can use (ask Jessica)
- Visual Reports
    - Chart
    - Gauge
    - Map
        - Basic
        - Bubble overlays
        - Analytical
        - supports ESRI shape file
    - Databar
        - small bar chart that hosws a data boint in a limited amount of space
        - used to show ouliers or problem areas
    - sparkline
        - small visual chart to show a trend
        - good for totals
    - Indicator
        - tiny gagues, for each row         

- Grouping
    - Details row: every time rs sees a unique row, it creates a 'detail' group.
    - Sorting works from the inside out
        - if a grouping is not working, look at the other sort screens
    - Try using the report with no grouping/sorting to start with
    - Group Types
        - Parent Groups
        - Child Group
        - Adjacent Group
- Report level filters are possible
    - Lots of operators: equality, comparison, top n, like, etc.
- Parameters
    - Two types
        - Query Parameters
            - MOdify the query string sent to the data source
            - Specify this on the data sets properties
            - Just add a parameter to the SQL
                - `select top 100 * from table wehere OderDate=@OrderDate`
            
        - Report Parmeters (ie a user interface)
            - Allow a user to pass something into the report
            - Report data pane: go to parameters and add a parameter
            - Specify a data type (primitives)
            - You can specify a list or leave it open to the user
                - You would typically have this drvien from another query/dataset
            - You can create a Text Box and in the expression underlying it, you can reference a parameter
- Embedding content
    - You can use an image and specify the reference type as 'external', and use the expression builder to determine the URL
    - You can use a text field and interpret it as HTML (similar approach as above): but it only recognizes a limited number of HTML tags (see books online for the list)
- Expression
    - Use Visual Basic
    - Begin with '=' signs
    - Can drive:
        - Txtboxes
        - Group and Sort definitions
        - Queries
        - Data Sources
    - Building blocks
        - Field
            - [Sales]
        - Function
            - [Sum(Sales)]
        - Global Variable
            -[&PageNumber]
        - Report Parameter
            -[@MyReportParam]
        - Complext Expression
            - <<Expr>>
        
    - =Sum(Fields!YearlyIncome.Value)
    - =IIF(Fields!Gender.Value <> "M" AND Fields!Gender.Value<> "F", "U", , Fields!Gender.Value)
     - ="Page " & Globals!PageNumber & " of " & Globals!TotalPages

- You can get the expression to execute custom code (from a DLL)
    - Tough to think of a use case though- maybe to consume a web service
- Formatting
    - You can use regular expressions!
- Adding Code
    - Report menu -> Report Properties
    - Basically you add it in the text box
    - You just write a VB function
    - Might be useful if you need to loop over the data (or anything you wouldn't do in a normal expression)
    - Expression will look like `Code.MyFunction()`
- Drill through reports
    - Passing through one report to view another
    - They are linked together by "Actions"
    - Actions are accessible through a text boxs propertties
        - Link to an RS report
        - A bookmark in the same report
        - An external URL
            - This is a good way to link back to an application
    - The other use case is using subreports
- Subreports
    - Can be in a table
    - You specify the parameters too
    - All of that is in the properties
- New features in SSRS 2016
    - Web Portal
    - Mobile Reports
    - Subscription
        - Reports are emailed out to you or put on a share
        - Can be scheduled to run on an automated basis through schedules
        - Specify emails to send to or the destination file share
        - There is a web service for creating / changing subscriptions
- Security
    - Server level
        - permissions for the management page
        - Site settings: Roles: System Admin and System User
    - Item level
        - who has permissions to see the actual reports and folders
        - Roles include Browser, Content Manager, My Reports, Publisher, Report Builder
- To deploy from SSDT
    - Check the solution/report properties
    - Right-click the solution and select 'deploy'


## Other
- Don't right-click 'add new report'
    - That takes you through report wizard which sucks
    - Add new ...
- Each query that you use, should come from a dataset
    - possibly share
- to deploy, you have to build, then pick up the rdl files from the bin folder
- the data source is not deployed, that already lives on the report server
- [good youtube tutorial](https://www.youtube.com/watch?v=CZRmcWrPxzc&list=PLmhoQ1nd8VnQvdlWb7Z4fc7kBvsL-aXhW)
    - most controls from toolbox can be data bound
    - data region
        - table
        - matrix
        - chart
        - list
        - gauge
    - matrix: dynamic columns and rows
        - static column:
            - header: column name (e.g. Country Name)
            - data row: column field (e.g. [CountryName])
        - dynamic column:
            - header: put a column field in here (each distinct value will get a column) (e.g. [Year])
                - creates an implicit group
            - data row: aggregation function (e.g. [Sum(AMount)])
        - you can create row or column-wise totals automatically
            - right-click cell: Add Total-> Choose 'Row' or 'Column'
    - list 
        - no layout : sounds like a repeater that can hold other data regions
        - also can probably do detail rows?
        - you can put a table in a list
        - in a list you need to set the row group, which sets a context for the other controls in the current list control
    - chart reports
        - data fields are divided into:
            - Series  (Group 1)
            - Categories (Group 2)
            - Values
    - report wizard
        - has limitations
            - only 1 dataset
            - no parameterized report
            - only table, matrix items
        - only good for basic stuff
    - expressions:
        - uses:
            - can perform calculations
            - dynamic behaviors for report items
            - pass parameters
            - display detailed or aggregated data
        - report types:
            - parameterized reports
            - linked reports
            - snapshot reports
            - cascaeded reports
            - ad hoc reports
            - drilldown reports
            - drill through reports
            - subreports
    - parameterized reports (not query string based)
        - two types:
            - single value parameterized report
            - multiple value parameterized report
        - single value parameterized report
            - steps:
                - create a parameter                    
                - create a dataset
                    - query looks like: select * from blah where col = @myParamName
            - this creates the parameter in the top of the report
    - multivalued parameterized reports
        - select multivalues
        - query looks like: select * from blah where col in (@myParamName)

    - how does ssrs parameter visibility work?
    
    - actions
        - enable hyperlink options in report
            - use onclick option
        - Goto bookmark, report, or url in a data row cell
        - select Text box properties in cell, go to Actions tab

    - lookup in SSRS
        - when you need to join the data between two datasets in SSRS
        - create 2 datasets
        - in a drow data cell, select expression..
            - =Lookup(...)  (use query builder)
    
    - you can add a calculated field to a dataset using an expression builder

    - custom net code in ssrs
        - 2 ways
            - embedded .net code in ssrs
            - add a dll of .net code
        - report properties -> code -> add vb
            - then refer to your functions in expressions by prefacing them with 'Code': e.g. = Code.MyFunction
    
    - subreports
        - first create the subreport with a parameter
        - then move to the parent report
            - in a data row cell, select insert then 'subreport'
            - double click- choose subreport properties
                - choose the subreport (should be in same project)
                - select the parameters and values you want to pass in
        - drill through reports work similarly, but you select an action -> new report
        - "drill down reports": expose inline detail
            - actually just merge rows
            - click on the data row cell you want to be a parent (for merging)
                - for row group, choose 'parent group...'
                - groupby: select the field 
                - will add a new column, which you can remove
            - in the group p    roperties, you can set the visibility based on expression or toggle

    
## Making them Less Ugly

- [src](http://www.msbiblog.com/2015/10/16/ssrs-non-ugly-1-the-use-of-typography-fonts/)
- title styling
    - when you have charts, remove the title and create your own
- typography (i.e. arial font)
    - suggested fonts (these all work in windows browsers):
        - Calibri
        - Segoe UI
        - Segoe UI Light (looks very good when printed apparently)
        - Verdana
    - segoe UI and segoe UI Light see to pain nicely
    - comparison
    ![fonts comparison](http://www.msbiblog.com/wp-content/uploads/2015/10/New-Fonts-SSRS.png)
    - **Changing fonts**: there's no easy way to globally change it.  Best way is to make the changes in the xml (rdl) file directly
        - Probably this is the best way to change the font color as well
- texts all in black (too "hard")
    - use varying greys
-table formatting
    - remove borders as much as possible
    - use smaller fonts with more row padding above and below
- forced page breaks are problematic
- panels approach: grey background with white panels and dark colors
    - using a grid-based approach to get more data on a single page








        
                
        
        




         
        