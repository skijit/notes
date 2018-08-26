Bash Environment Variables
==========

- [src](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps)
- [src2](https://ryanstutorials.net/bash-scripting-tutorial/bash-variables.php)
- [so question](https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path)

## General Info

- Environment 
    - contains system properties and variables
    - set for each session
    - is provided **by** the shell
    - is provided **to** the processes that are spawned by the shell
- Environment variables
    - Are key value pairs
    - multiple values are comma delimted
        ```KEY=value1:value2```
    - values with spaces are enclosed in quotations
        ```KEY="value with spaces"```
        - note that there are some semantic differences between single and double quotes.
            - double quotes will expand special characters (if they have a meaning to the shell)
            - single quotes will not expand
- Shell vs Environmental variables
    - Similarities
        - named with CAPITAL letters, always
    - Differences
        - Shell variables are not passed to child processes, environment variables are! 
- `printenv`
    - `printenv`: calling w no parameters will dump out all the environment variables
    - `printenv PATH`: like this lets you dump only 1 environment variable (e.g. PATH)
- `env`
    - good when you want to change the environment variable that a spawned process runs in (rather than having it inherit from the shell)
    - `env VAR1="blahblah" command_to_run command_options`
- `set`
    - `set`: calling with no parameters will dump all shell, environment, and local variables
- some common environment variables
    - **USER**: the current user logged in
    - **PWD**: the current working directory
    - **OLDPWD**: the previous working directory
    - **PATH**: list of directories to search for executables in
    - **_**: the last executed command
- some common shell variables
    - **HISTSIZE**: number of lines in the command history
    - **DIRSTACK**: stack of directories available with `pushd` and `popd` commands
    - **PS1**: primary command prompt definition
- Examples of Shell vs Env variables
    - create a shell variable: `TEST_VAR='HELLO WORLD!'`
        - note we don't need to call `set` to set
    - you can check the value of TEST_VAR by running (either):
        - `set | grep TEST_VAR`
        - `echo $TEST_VAR`
    - but you will not see any output if you type in: `printenv | grep TEST_VAR`
    - if  you start a new bash shell overtop the current one by running the command `bash`, then run `echo $TEST_VAR`, it will not be visible
    - the way to make your shell variable visible to child processes is by running `export TEST_VAR`
    - remember that environment variables are only passed from parent to child process (never the other way around)
    - when you want to clear an environment variable, use the `unset` command:
        - `unset TEST_VAR`
- session types
    - Login vs NonLogin
        - **Login**: Begins by authenticating the user
    - Interactive vs NonInteractive
        - **Interactive**: is attached to a terminal
    - examples
        - start a new ssh session: **Login**
        - create a new bash shell from within your authenticated (ssh) session: **NonLogin**
        - run a script from your bash shell and that script runs in **NonInteractive**
- Configuration of env variables
    - **Login**: 
        - first read from `/etc/profile`
        - then find the first user-specific shell config info (in user's home dir) including
            - `.bash_profile`
            - `.bash_login`
            - `.profile`
            - most linuxes are configured to also read from the nonlogin config files (see below) in a login session
    - **NonLogin**:
        - `/etc/bash.bashrc`
        - `~/.bashrc`
    - **Noninteractive**:
        - read an environment variable called **BASH_ENV** which points at a file which has all the environment variable
    - to force the current bash session to refresh its configurations, type this at the commandline `source ~/.bashrc`
- Other stuff
    - to concatenate to your path: `PATH=$PATH:your_new_path_here`
- Scripting Notes
    - special variables
        - $0 - The name of the Bash script.
        - $1 - $9 - The first 9 arguments to the Bash script. (As mentioned above.)
        - $# - How many arguments were passed to the Bash script.
        - $@ - All the arguments supplied to the Bash script.
        - $? - The exit status of the most recently run process.
        - $$ - The process ID of the current script.
        - $USER - The username of the user running the script.
        - $HOSTNAME - The hostname of the machine the script is running on.
    - command substitution
        - precede the command with a `$`
        
        ```(bash)
        myvar=$( ls /etc | wc -l )
        echo There are $myvar entries in the directory /etc
        ```


