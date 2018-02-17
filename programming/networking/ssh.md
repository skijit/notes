SSH Notes
========

- pgp keys are different than rsa ssh keys!
- pgp keys are often used on github to sign your commits though
  
- need to create an ssh keypair in git-bash and then share with other computer AND my mac
- see: https://help.github.com/articles/generating-ssh-keys#platform-windows
- see this: https://docs.microsoft.com/en-us/azure/virtual-machines/linux/ssh-from-windows

- using different ssh keys for different clients:
  - you use ssh-add command so that the ssh agent can use them
  - there's an ssh hosts config to map domains to keys
  - https://superuser.com/questions/287651/can-i-have-multiple-ssh-keys-in-my-ssh-folder

- ssh-agent:
  - keeps your key loaded into memory so you don't have to enter your passphrase all the time
  - you can also set up key forwarding which lets servers you are logged into access your local ssh-agent
  - when using git-bash, you need to start ssh-agent manually: https://help.github.com/articles/working-with-ssh-key-passphrases/#auto-launching-ssh-agent-on-msysgit
  
  - general info see: https://developer.github.com/v3/guides/using-ssh-agent-forwarding/

- procedure:
  - what is the keypair I'm using for git with bitbucket?  I'll want to reuse that one here.
  - see if I can get that working on bitbucket AND windows machines
  
  - create a keypair on mac and verify access to linux box
  - copy keypair to personal windows machine and verify access to linux box
  - copy keypair to work machine and verify access to linux box

- SSH uses port 22
- You can multiplex any TCP/IP connection into port 22 using SSH (port forwarding)
- SSH replaces telnet
    - passed cleartext passwords
    - SSH can first identify that you're using the correct server
    - password is also encrypted with SSH
    - SSH users typically have root access (since they're administrators)

- SSH Keys

- to close an ssh session: `~.`
  - or `exit`

- vnc is a remote desktop

- interesting examples of local and remote forwarding
  - https://www.youtube.com/watch?v=g_Row8zEJZc
  - covers tunnelling and using a proxy

- ssh tunnel vs vpn:
  - vpn is os-level
  - 

- TLS
    - same as https and ssl

- server that supports TLS is typicall administered via SSH

- SSH also supports other services like:
    - secure copy protocol (scp)
    - sftp

- used to login to basically any linux or unix box
- key exchange:
    - server will have a keypair which will identify the server
    - the first time a new user logs into this server, the server will pass down it's public key
        - the client will say, is this the right server public key, but she generally will just accept it
        - the public key and address will be stored on the client side.
    - to alleviate passwords for the client:
        - the client will have her own keypair
        - she'll put her public key in a file on the server called the authorized keys file
- so servers have:
    - the server keypair
    - the authorized users public keys
- server to server access:
    - you can create a user keypair from one server to and put it on another server's authorized keys users
- in reality, you might have tons of keypairs for different servers and users
- some places don't allow public key authentication
    - but this is important for automated applications

- To see if you have an ssh keypair created:
    - `cat ~/.ssh/id_rsa.pub`
- to create a pair:
    - `ssh-keygen` and follow the prompts
        - you can leave the passphrase if you want
    - better to use rsa instead of dsa, so use:
        - `ssh-keygen -t rsa`
- you can copy your public key from the terminal

- to copy your public key to a server:
    - `scp id_rsa.pub your-user-name@your-server-ip:~`
    - the tilde is just telling where you want to copy it
    - the user name may be root most of the time, but not necessarily
    - you will be prompted for the username's password
    - this is still not sufficient to ssh into the machine though...
        - you need to copy that id_rsa.pub to ./ssh/authorized_keys
        - make sure you chmod on this file to 644
        - and your home folder chmod needs to be non-world writeable

- changing the sshd config
    - `find / -name sshd_config`
    - copy your sshd_config before you make any changes!
    - lots of setting which can be changed
        - e.g. makin it impossible to login to the machine with cleartext passwords

- you can have an alias for ssh'ing to a particular machine
    - put this bash config file: `alias se2='ssh root@123.123.123'`


- ssh with git:
    - with github you often clone with https, but you can also clone with ssh
    - `git remote set-url origin git@github.com:your-repo-name.git`
    - the first time you push, you'll get a prompt asking whether you trust the server identity
    - you also have to go to settings in github and create a new ssh key, then you can copy your public key
        - it might ask for you passphrase
    - same procedure works with bitbucket

- ssh'ing into a box typically looks like:
    - `ssh root@some-ip-address`
