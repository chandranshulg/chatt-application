# Java Chat Application

This is a simple multithreaded chat server application built using Java. It allows multiple clients to connect to a server and send messages to each other in real-time.

## Overview

The Java Chat Application uses socket programming to create a server that can handle multiple clients simultaneously. Each client connects to the server and can broadcast messages to all other connected clients. The server listens for incoming client connections and handles communication through individual threads for each client.

## Features

- **Multithreaded Server:** The server can handle multiple clients at the same time by creating a new thread for each connected client.
- **Client Broadcast:** Messages sent by one client are broadcasted to all other connected clients.
- **Client Management:** The server keeps track of connected clients and removes them when they disconnect.
- **Simple Command Handling:** Clients can exit the chat by sending the "exit" command.


## Technologies Used

- **Java:** The programming language used to develop the chat application.
- **Socket Programming:** Used to establish communication between the server and clients.

## Future Enhancements

- **GUI Client:** Develop a graphical user interface (GUI) for the client application.
- **Private Messaging:** Implement private messaging functionality so users can send direct messages.
- **File Sharing:** Add a feature that allows users to share files over the chat.

## License

This project is open-source and available under the MIT License. Feel free to use, modify, and distribute as needed.

## Author

Created by Chandranshu.
