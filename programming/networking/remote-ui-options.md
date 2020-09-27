Running UI-Based Applications on a Remote Server
============================

## X11 vs VNC
- The top 2 options are:
  - **X11 forwarding**
    - Original X-Windows Protocol for remote UI
    - Extremely chatty: lots of small messages, which makes it unusable over a high-latency WAN (ie the internet)
  - **VNC**
    - Newer alternative which addresses many downsides of X11 forwarding.  (e.g. VNC is preferred over WANs)
    - Models the problem very differently than X11:
      - By itself, VNC, is video streaming that incorporates clicks and mouse movements
- Both of these solutions:
  - can be tunnelled through X11
  - require a server at the (remote) host and a client (local)
- [Running VNC on an EC2 instance](https://medium.com/@Arafat./graphical-user-interface-using-vnc-with-amazon-ec2-instances-549d9c0969c5)

## X Windows
- 2 implementations of X
  - X.org - X11 <- Main
  - XFree86 <- Old
- Client / Server Arch
  - **Note**: Bc it takes the perspective of the application, rather than the user, the client/server designation appears reversed, but that's just how X works
  - **X Server**: 
    - Sits on the user machine (this distinction in case there are 2 machines involved)
    - Passes hardware (display, mouse keyboard) interactions back to the X-client
    - Recieves requests from the X-Client to d
  - **X Client**
    - The application that wants to draw windows

## Linux Graphics Stack
- Basic Stack:
  - X Windows
  - Windows Manager
  - Desktop
- Window Managers vs X windows
  - X will draw a window
  - Window manager: 
    - Variety of these
      - Enlightenment
      - compiz
      - kwin
    - customize look/feel of windows
    - manage tiling / desktops (min/max/etc)
      - alternately: you can use "Client Side decorations" in some applications
    - provide additional interactions
- Desktop Environment
  - Variety of these:
    - KDE
    - Gnome
    - Cinnamon
  - Lots of different programs 
  - Configuration file driven
  - Toolbars, Start Menus, Desktop space, search/fast launchers


## Running GUI Apps in Container
- Stack
  - App
    - X11 client
    - Chrome
  - Window Manager
    - Ratpoison
  - X Server
    - Interacts with your hardware
  - Virtual Frame Buffer
    - Represents a video card buffer that stores what to display
    - This is what X server is going to be writing into
  - TurboVNC
    - VNC server
  - Websocksify
    - Wraps the VNC server output into websockets
    - Points at the VNC client
  - NoVnc
    - Host a VNC client 
- [more info](https://www.youtube.com/watch?v=L4nqky8qGm8&list=LLFQhohrmA_t9vMYJknHcZlw&index=1&t=1274s)
  - [forked repo](https://github.com/skijit/dockercon-demos)






