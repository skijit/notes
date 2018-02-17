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

