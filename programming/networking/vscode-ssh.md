Using VsCode With SSH
==================

- Use case: You have a Linux server that you dont want to have to use VIM with.
- You want to be able to ssh into a server and use a normal text editor to work with files.

## VSCode and Remote Usage
- Install Extension 'Remote VSCode', and restart VSCode
- Install rmate on your linux vm
    - `sudo wget -O /usr/local/bin/rmate https://raw.github.com/aurora/rmate/master/rmate`
    - `sudo chmod a+x /usr/local/bin/rmate`
- Back in VSCode, open command pallete: Cmd-P (or Ctrl-P) and execute Remote:Start Server
- Open the vs terminal and type: `ssh -R 52698:localhost:52698 boogerface@53.221.223.192`
    - where 53.221.223.192 is the remote IP address and boogerface is the name of your user
- Change directories to wherever you want to go and when you find a file you want to edit, execute: `rmate yourfilename.md`
