using System;
using System.Threading;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Configuration;

namespace bmbServer
{
    class Program
    {
        static TcpListener listener;
        static int maxConnections = 32;
        const int port = 7778;
        static byte currentConnections = 0;

        static void Main()
        {
            listener = new TcpListener(port);
            listener.Start();

            Console.WriteLine("Server mounted, listening to port " + port);

            for (int i = 0; i < maxConnections; i++)
            {
                Thread t = new Thread(new ThreadStart(Service));
                t.Start();
            }

        }

        public static void Service()
        {
            while (true)
            {
                Socket soc = listener.AcceptSocket();
                

                //soc.SetSocketOption(SocketOptionLevel.Socket,SocketOptionName.ReceiveTimeout,10000);

                Console.WriteLine(Environment.NewLine + "Connected: {0}",  soc.RemoteEndPoint);
                currentConnections++;
                Console.WriteLine( "currently connected: " + currentConnections );
                String userID = currentConnections.ToString();

                try
                {
                    Stream s = new NetworkStream(soc);
                    StreamReader sr = new StreamReader(s);
                    StreamWriter sw = new StreamWriter(s);
                    sw.AutoFlush = true; // enable automatic flushing
                    sw.WriteLine("Connected!");
                    while (true)
                    {
                        string req = sr.ReadLine();
                        if (req == "close")
                            Console.WriteLine("soc.Close();");
                        else
                            sw.WriteLine("Error: Unknown Command");
                       /* if (req == "" || req == null) break;
                        string job =
                            ConfigurationSettings.AppSettings[req];
                        if (job == null) job = "No such employee";
                        sw.WriteLine(job);*/
                    }
                    s.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
                Console.WriteLine(Environment.NewLine + "Disconnected: {0}", soc.RemoteEndPoint);
                currentConnections--;
                Console.WriteLine("currently connected: " + currentConnections );

                soc.Close();
            }


        }
    }
}
