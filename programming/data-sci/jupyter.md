Jupyter Notes
========================

## Getting Started
- [src](https://www.datacamp.com/community/tutorials/tutorial-jupyter-notebook)
- "notebook"
  - code
  - text
  - rich text elements (e.g figures, links, equations)
- "kernels"
  - The list of supported languages
- best way to install is via anaconda bc among other things, you get:
  - `conda`: package and environment manager for python
- running jupyter
  - `jupyter notebook`
- another option for running jupyter is within a docker image (there's lots of docs on this)

- main page when running
  - you'll see the folder structure of whatever root of the fs you're running from
  - you can create new files, run an interactive cmdline, create new files, etc.
  - to create a new notebook, select new->python 3

- notebook
  - you can create any number of cells, of python or md
  - you can enter latex code in MD, just put it inside `$$`
- "magic functions"
  - enter `%lsmagic` to receive a list of predefined jupyter helpers
  - to get more info on them type in `?<functionName>`, e.g. `?automagic`
  - [this link gives good examples for these magic functions](https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts/)
  - 2 types of magic functions
    - **line-oriented magic**: 
      - prefixed with `%`
      - they get the rest of the line as an argument
    - **cell-oriented magic**"
      - prefixed with `%%`
      - they get the rest of the cell
  - useful functions
    - `%time`
    - `%%timeit`
    - `%pdb`: debug
    - `%prun`: preformance run
    - `%writefile` saves contens of a cell to an external file
    - `%pycat` shows syntax highlighted contents of an external file
    - `%who` list all variables of global scope
    - `%store` pass variables between notebooks
    - `%load` insert code from an external script
    - `%run` execute python code
    - `%env` set environment variables
  - there's also magic functions to run different languages within your notebokk without changing kernels
    - `%rmagics` run r code
    - another one to run sql code (not familiar which one though)
  - to run shell commands (e.g. to install packages), prefix with a `!`
  - interactivity through widgets
    - you can install widgets, like text boxes to make your notebooks more interactive
    - [good source](https://blog.dominodatalab.com/interactive-dashboards-in-jupyter/)
- jupyterhub is a server-based jupyter, so you can share with multiple users across a network
- you can save your notebook in any number of static formats, including html and pdf
  - could be useful for reporting?
- notebooks in etl pipelines
  - TODO

## Shortcuts
- In a notebook select `help->keyboard shortcuts`
- command palette: `ctrl-shift-p`
- `ESC` takes you to command mode
  - lets you use arrow keys to nav from one cell to the next
  - `A` to add cell above current, `B` below
  - `ENTER` take you from command mode to edit mode
- printing to output
  - normally: if you want to output something without using `print()`, just end the cell with it
  - you can also update the hell variable to make anything *naked* like that print to the std output
    - `from IPython.core.interactiveshell import InteractiveShell`
    - `InteractiveShell.ast_node_interactivity = "all"`
- quick access to docstring
  - `?str.replace()`
- matplotlib is the standard rendering tool, but there are also other high level libraries which can be build on top of it. 
- column select mode: use Alt and drag cursor
- `shift-tab` to get a function's signature


## kaggle notebook (kernel) tips
- play button: run current cell
- ff button: run all cells
- refresh button: refresh page / clear memory

## other Resources
- [some popular notebooks](https://www.kdnuggets.com/2016/04/top-10-ipython-nb-tutorials.html)
- [matplotlib tutorial notebook](https://nbviewer.jupyter.org/github/jrjohansson/scientific-python-lectures/blob/master/Lecture-4-Matplotlib.ipynb)


## TODO
- investigate the usage of Jupyter as a scratchpad development tool for other languages