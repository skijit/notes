Misc Networking
==========

- [some good stuff here](https://www.digitalocean.com/community/tutorials/understanding-ip-addresses-subnets-and-cidr-notation-for-networking)
- IPv4 address is 32 bits broken into 4 groups of 8 bits (called octets) valued between 0-255: 255.255.255.255
- IPv6 address is 128 bits so it is usually written as 8 segments of 4 hex digits: FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF
  - You can ignore all 0's in the higher-order bits: ...:00bc:... -> ...:bc:...
  - If a segment is all 0's, you can use this shorthand: ...:18bc:0000:0000:0000:00ff:... -> ...:18bc::ff...
- Network vs Host Sections of an address
  - Class-based Approach
    - FWIW - this is no longer used
    - Originally, the IPv4 networking space was divided into 5 "classes", based on their 4 most-significant bits in the first octet.
    - Each class determined the networking part and the host part of the address
      - **Class A**: Most significant (first) bit is 0 (range: 0-127)
        - First octet: Network, rest: Host
      - **Class B**: First bit is 1, second bit is 0 (range: 128-191)
        - First 2 octets: Ntwork, rest: Host
      - **Class C**: First two bits are 1, third bit is 0 (range: 192-223)
        - First 3 octets: Network, rest: Host
      - **Class D**: First three bits are 1, fourth is 0 (range: 224-239)
        - For Multicast connections - exceptional
      - **Class E**: First four bits are 1 (range: 240-255) 
        - Experimental class - largely not used
  - Subnetting
    - For a variety of reasons (e.g. traffic segregation), you might want to subdivide your network (a subnet)
    - Using on the class-based approach, we already have a means of determining the network and host portions of the IPv4 address (above)
    - We need an additional specification to refer to the subnet
    - The mechanism is based on masks: a tool to help you separate network (net mask) from subnetwork (subnet mask) from host address
      - 32 bits where each bit's value is a 1 if the corresponding bit in the IP Address is part that you're interested in
      - You only have to AND the address with the mask to get this
    - Examples
      - In a traditional class C address, the net mask will be `1111 1111 - 1111 1111 - 1111 1111 - 0000 0000`
        - If you AND the netmask with a class C address, the result will be the address of the network
      - If you want to subnet that network (in 2), then you'll need the first bit of the host portion to indicate the subnet's address
        - The corresponding subnet mask would then be `1111 1111 - 1111 1111 - 1111 1111 - 1000 0000`
  - CIDR
    - Classless Inter-Domain Routing
    - Developed as an alternative to Class-based routing and subnetting
    - Problem is that it was a very limited (in terms of address space) scheme and provided little flexibility with subnetting (see example below)
    - They decided to just add something like the net mask to the actual address itself
      - Ex: `192.168.0.0/23` means to get the network portion, you just and it with a length of 23 1's: `1111 1111 - 1111 1111 - 1111 1110 - 0000 0000`
    - Subnetting Limitation Example: 
      - You couldn't have `192.168.0.0` and `192.168.1.0` in the same network with class based routing because the first 3 octets indicate the network.  
      - However with the `/23` that means their network portion will be the same.
- Loopback: 127.0.0.0 - 127.255.255.255  (anything in this range works)
- Network Address Translation (NAT): 
  - A lot of times the actual host address is hidden behind a shared IP address
  - Each addresses for connected hosts must be unique *within their network*, but outside of that, they can be shared (using something like NAT)
  - When devices need to communicate beyond their network, routers (assuming they support NAT) will translate the packets' original IP address to it's own
  - This would cause a problem when response packets arrive if the router doesn't know how to map them back to the original (internal) IP address
    - It works because the NAT router keeps a translation table to rewrite the responses appropriately
    - It will use the emphemeral port used by the source (host) and the destination IP address to resolve to the host's private IP
- Ports
  - Port range is 0-65,535
  - Ephemeral port numbers should be greater than 1023
  - Each program binds to a port for it's communication 
    - i.e. when host A and B communicate, the ports don't have to match
  - IP address identifies the host, whereas port number identifies the process
- The 0.0.0.0 address:
  - Called the 'wildcard address' or 'unspecified address'
  - If we're on a server, it means:
    - all IPv4 addresses on the given machine
  - If we're in a route table, it means:
    - The default route (i.e. it doesn't match one of the explicit entries)
  

 

