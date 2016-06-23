HTTPS / SSL / TLS
================
Collections of notes about HTTPS, SSL, TLS, certificates, etc.

## Misc SSL Notes
- NW Stack Position: SSL operates **directly** on top of TCP
    - This means all the TCP functionality remains unchanged, but the payloads will be encrypted data
    - HTTPS protocol is the same as HTTP, but it's just built to sit on top of SSL
        - I would assume SSL exposes a similar/same interface to HTTP as TCP.
- **Handshake**: The protocol/exchange involved in initiating an SSL connection.
    - Configuration steps determine:
        - Version of TLS/SSL
        - What ciphersuites to use
        - What compression methods to use
    - Certificate Exchange:
        - Server sends certificate, which is signed by a Certificate Authority (CA)
        - If Client trusts the CA, either directly or transitively, then the Client and Server can communicate using symmetric encryption.
            - TODO: transitive trust / certificate chain
- Communication:
    - Client encrypts is messages to the Server using the Server's Public Key
    - Only the Server can decrypt those messages since that requires the corresponding Private Key, (and that is known only to the Server)
    - The Server can encrypt its messages using its Private Key, and then the Client can know it only came from Server (again bc only the Server has access to its Private Key)
- Additional Safeguard: The Message Authentication Code (MAC)
    - Each SSL connection will estable a unique key and hashing cipher: it will only be known to the Client and Server
    - Then each message exchanged can compute a MAC (like a checksum) based on the key and cipher, and include this in the message
    - If your message is tampered with, the MAC will not match the messages payload

## Questions
- **Q:** What is the difference between SSL and HTTPS?
    - SSL: **S**ecure **S**ockets **L**ayer.  
        - The reference to sockets indicate the developers intentions that applications could use them like traditional TCP sockets
    - TSL: **T**ransport **L**ayer **S**ecurity
    - **TLS** is the new name for SSL.  The protocol got upgraded, and switched names and reset version numbers.
    - HTTPS is HTTP within an SSL/TLS Tunnel
- **Q:** How does the SSL Certificate work?
    - The whole framework for encrypted communication employs symmetric encryption at two levels, using at least two different entity's public/private keys:
        - Privacy and Authentication between Client and Server is provided via the **Server's public/private keys**
        - Trust between the Client and Server is provided via the various **CA's public/private keys in the certificate chain 
    - There are 3 kinds of certificates at play in most SSL connections:
        1. End-user Certificate
            - This is the certificate which is returned by the Server in a standard Client/Server communication scenario
            - The End-user certificate is signed by a Certificate Authority (CA), which the Client may or may not have explicity listed as a Trusted CA
        2. Intermediate Certificate
            - Presumably, the CA is not listed in as a Trusted CA, which means that it's an Intermediate Certificate 
            - This makes the Client check the CA's certificate to determine, again, if that CA's certificate is signed by an explicitly Trusted CA
            - If it is trusted, then the End-User Certificate can now be trusted.  If not, the process of checking the CA's intermediate certificate continues.
        3. Root Certificate
            - When the Client finally gets to a certificate signed by a CA explicitly listed as Trusted, then the End-User Certificate can be trusted
            - This last certificate in the process is called a Root Certificate.
- **Q:** How does the SSL Cert **chain** work?
    - The SSL Chain is the list of End-User, Intermediate, and Root Certificates used to determine a Client's trust of a Server
    - The relationship of trust from on CA to the next is called the *chain of trust*
- **Q:** What is a self-signed certificate?
    - Recall in a common SSL scenario, there are **two pairs of public/private keys** involved
        1. The Server's (i.e. the machine the Client is trying to communicate with)
        2. The CA's : To establish a transitive chain of trust between Client and the Server, mediated by the CA's, one of whom is ultimately a known and trusted CA to the Client
    - A self-signed certificate uses only **one pair of public/private keys**
        - The Server's certificate is signed not by CA but by it's same public/private pair
- **Q:** What's up with self-signed certificate errors with things like NPM and Git?
    - Many corporate proxies do SSL termination: basically an incoming communication is unencrypted (terminated) and then re-encrypted (for the end-user / client) with a self-signed certificate.
    - The client software, like NPM or Git, might be configured to not accept a self-signed certificate.
    - A lot of times you can reconfigure the client software to accept a self-signed certificate, but this is also a big security risk.
    - A better solution would be to re-encrypt with a trusted certificate, but I suspect that may be a pain in the neck.