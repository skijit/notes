SSH Notes
========

## General
- SSH replaces telnet
    - passed cleartext passwords
    - SSH can first identify that you're using the correct server
    - password is also encrypted with SSH
    - SSH users typically have root access (since they're administrators)
- SSH uses port 22
- You can multiplex any TCP/IP connection into port 22 using SSH
    - the mapping of different ports is called *port forwarding*
    - the encryption protocol wrapping another protocol is called *tunneling*
- to close an ssh session: `~.`
  - or `exit`
- vnc is a remote desktop for the linux world
    - it's a faster alternative to X11
- [interesting examples of local and remote forwarding](https://www.youtube.com/watch?v=g_Row8zEJZc)
    - covers tunnelling and using a proxy
- ssh tunnel vs vpn
  - vpn is os-level
- TLS
    - same as https and ssl
    - any web server that supports TLS is typicall administered via SSH
- SSH also supports other services like:
    - secure copy protocol (scp)
    - sftp
- SSH used to login to basically any linux or unix box
- SSH clients for windows:
    - putty
    - git-bash

## Key Exchange
- public / private keys are needed on both server and client
    - server keypair identifies the server to the client
        - the first time a new user logs into this server, the server will pass down it's public key
            - the client will say, is this the right server public key?, but she generally will just accept it
            - the public key and address will be stored on the client side.
    - client password is to alleviate the need for passwords in authentication:        
        - client puts public key in a file on the server called the authorized keys file
- server to server access:
    - you can create a different keypair from one server to and put it on another server's authorized keys users
    - in reality, you might have tons of keypairs for different servers and users
    - some places don't allow public key authentication (without passphrases)
        - but passphrase-less authentication is important for automated applications
      
## Keypairs
- SSH relies on a public / private keypair
- pgp keys are different than rsa ssh keys!
- with git:
    - ssh keys are often used on github and  to sign your commits though
    - with github and bitbucket you often clone with https, but you can also clone with ssh
    - to change your origin to use ssh (after having originally used https):
        - `git remote set-url origin git@github.com:your-repo-name.git`
        - the first time you push after changing this, you'll get a prompt asking whether you trust the server identity
    - you also have to go to settings in github and register your public ssh key
        - you might be asked for a passphrase on push (if you specified one with your keypair)

## Some Practical Tips
- To see if you have an ssh keypair created:
    - `cat ~/.ssh/id_rsa.pub`
    - you can copy-paste this directly from the terminal
- to create a pair:
    - `ssh-keygen` and follow the prompts
        - you can leave the passphrase if you want
    - better to use rsa instead of dsa, so use:
        - `ssh-keygen -t rsa`
- to scp a directory from local host to remote host:
    - works just like `cp`
    - `scp -r publish/ user@some-ip-address:~/destination-dir`
- to copy your public key to a server:
    - `scp id_rsa.pub your-user-name@your-server-ip:~`
    - the tilde is just telling where you want to copy it
    - the user name may be root most of the time, but not necessarily
    - you will be prompted for the username's password
    - this is still not sufficient to ssh into the machine though...
        - you need to copy that id_rsa.pub to ./ssh/authorized_keys
        - make sure you chmod on this file to 644
        - and your home folder chmod needs to be non-world writeable
- you can configure ssh by changing the sshd config
    - `find / -name sshd_config`
    - copy your sshd_config before you make any changes!
    - lots of setting which can be changed
        - e.g. makin it impossible to login to the machine with cleartext passwords
- you can have an alias for ssh'ing to a particular machine
    - put this bash config file: `alias se2='ssh root@123.123.123'`
- ssh'ing into a box typically looks like:
    - `ssh root@some-ip-address`


## Managing Client Keypairs
- keypairs can be shared across machines
- you can view your keypairs in ~/.ssh directory:
    - public key has extension `pub`
    - example:
        - github_rsa : private key
        - github_rsa.pub : public key
- ssh-agent
    - keeps your key loaded into memory so you don't have to enter your passphrase all the time
    - you can also set up key forwarding which lets servers you are logged into access your local ssh-agent
    - `ssh-add` command lets you add a key for ssh agent
    - NOTE: when using git-bash, you need to start ssh-agent manually. See [here](https://help.github.com/articles/working-with-ssh-key-passphrases/#auto-launching-ssh-agent-on-msysgit)
        - example:
            - `eval `ssh-agent -s``
            - `ssh-add ~/this-is-my-keypair-file.pem`
    - there's an ssh hosts config to map domains to keys
        - see [here](https://superuser.com/questions/287651/can-i-have-multiple-ssh-keys-in-my-ssh-folder)
    - [general info](https://developer.github.com/v3/guides/using-ssh-agent-forwarding/)
    
## Useful Links
- https://help.github.com/articles/generating-ssh-keys#platform-windows
- https://docs.microsoft.com/en-us/azure/virtual-machines/linux/ssh-from-windows

## SSH Tools (somewhat duplicative)
- **ssh-agent**:
    - main purpose is to cache your keys and passphrases so you can directly log into systems
    - typically run at login time, but you can run manually
    - generates a bunch of environment variables that are shortcuts for setting up ssh connections
    - the reason it's typically executed with `eval` in front of of it is to set these in your current session
    - when using **agent forwarding**, all your identities are propagated into each ssh server you log into - this works through the remote ssh-agent communicating with the client ssh-agent
- **ssh-add**
    - usually ssh-agent will use whatever keys are in your `.ssh` directory, but you can use ssh-add to add additional ones

- **ssh-copy-id**
    - lets you copy keypairs to remote systems



