import java.io.*;
import java.net.*;
import java.util.*;

class ClientHandler implements Runnable {
    private Socket clientSocket;
    private String clientName;
    private BufferedReader input;
    private PrintWriter output;
    private static Set<ClientHandler> clientHandlers = Collections.synchronizedSet(new HashSet<>());

    public ClientHandler(Socket socket) {
        this.clientSocket = socket;
        try {
            this.input = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            this.output = new PrintWriter(clientSocket.getOutputStream(), true);
        } catch (IOException e) {
            System.out.println("Error in ClientHandler constructor: " + e.getMessage());
        }
        clientHandlers.add(this);
    }

    @Override
    public void run() {
        try {
            output.println("Enter your name: ");
            clientName = input.readLine();
            broadcastMessage(clientName + " has joined the chat!");

            String message;
            while ((message = input.readLine()) != null) {
                if (message.equalsIgnoreCase("exit")) {
                    break;
                }
                broadcastMessage(clientName + ": " + message);
            }
        } catch (IOException e) {
            System.out.println("Error in ClientHandler run: " + e.getMessage());
        } finally {
            try {
                clientHandlers.remove(this);
                broadcastMessage(clientName + " has left the chat.");
                clientSocket.close();
            } catch (IOException e) {
                System.out.println("Error closing client socket: " + e.getMessage());
            }
        }
    }

    private void broadcastMessage(String message) {
        synchronized (clientHandlers) {
            for (ClientHandler clientHandler : clientHandlers) {
                clientHandler.output.println(message);
            }
        }
    }
}

public class ChatApplication {
    private static final int PORT = 12345;

    public static void main(String[] args) {
        System.out.println("Chat server started...");
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("New client connected: " + clientSocket.getInetAddress().getHostAddress());
                ClientHandler clientHandler = new ClientHandler(clientSocket);
                Thread thread = new Thread(clientHandler);
                thread.start();
            }
        } catch (IOException e) {
            System.out.println("Error in main: " + e.getMessage());
        }
    }
}
