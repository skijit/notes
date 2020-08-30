- [primary source](https://github.com/saschagrunert/demystifying-containers)

- [talk 1: demystifying containers](https://www.youtube.com/watch?v=Hb1bsfFyC-Q&feature=youtu.be)
- Linux processes exist in a tree structure

- Container def: isolated group of proceses running on a single host and fulfilling certain features:
  - Must have a shared root process 

## chroot
- change the root directory of the current running process and it's children
- part of unix/linux since 1979
- available as syscall or commandline
- used for a variety of reasons:
  - package managers use it to provide reproducible builds, often
- if you chroot a shell, it presents the new root as if it were the root dir in your fs
- aka 'jail': as it was used to isolate a process, but it's not a security feature:
  - when using syscall, CWD is unchanged
  - relative paths can refer outside of chroot
  - you cannot stack chroots
  - only changes the root path
  - ie you can break out of a jail
- `pivot_root`: since 2014, containers use this instead of chroot
- You can get a root file system (one which contains all the necessary binaries, etc) from container image
  - using tool like `skopeo`
  - you can untar a docker image
  - BUT- there's no process, network, or device isolation!

## namespaces
- for process isolation
- wrap global system resources in an abstraction layer
- finalized in 2013
- 7 distinct namespaces
  - mnt
    - isolate a set of mount points by a group of processes
    - proc directory will have mount info instead of the normal mnt file
  - pid
  - net
  - ipc
  - uts
  - user
  - cgroup
- namespace api 3 syscalls
  - `clone`: creates a new child process (like fork), but you can give it a different execution context
 - `unshare`: remove execution context process
 - `setns`: add execution context to process
at 27:00
  


   


