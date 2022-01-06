package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"sync"

	pb "github.com/avirtan/tictacWebGoJs/proto"
	"github.com/google/uuid"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"
)

var idLobby int = 0

type client struct {
	stream pb.Game_StreamServer
	id     string
	name   string
	done   chan error
}

type lobby struct {
	clients [2]*client
	isRedy  bool
}

type Server struct {
	pb.UnimplementedGameServer
	clients map[string]*client
	lobbys  map[int]*lobby
	mu      sync.RWMutex
}

func (s *Server) Connect(ctx context.Context, in *pb.ConnectRequest) (*pb.ConnectResponse, error) {
	token := uuid.New()
	s.mu.Lock()
	s.clients[token.String()] = &client{
		id:   token.String(),
		name: in.GetName(),
		done: make(chan error),
	}
	s.mu.Unlock()
	fmt.Println("connect")
	res := &pb.ConnectResponse{Token: token.String(), IdLobby: int32(idLobby)}
	lb, ok := s.lobbys[idLobby]
	field := "x"
	if !ok {
		var tempLobby = &lobby{}
		tempLobby.clients[0] = s.clients[token.String()]
		tempLobby.clients[1] = nil
		tempLobby.isRedy = false
		s.lobbys[idLobby] = tempLobby
	} else {
		lb.clients[1] = s.clients[token.String()]
		lb.isRedy = true
		field = "o"
		s.lobbys[idLobby] = lb
		fmt.Println(s.lobbys[idLobby])
	}
	res.Field = field
	return res, nil
}

func (s *Server) Stream(req *pb.Request, stream pb.Game_StreamServer) error {
	ctx := stream.Context()
	if req.Token == "" {
		fmt.Println("no token")
		return net.ErrClosed
	}
	fmt.Println(s.clients[req.Token])
	user, ok := s.clients[req.Token]
	if !ok {
		fmt.Println(req.Token)
		fmt.Println(s.clients)
		return fmt.Errorf("NOT OK")
	}
	user.stream = stream
	lb, ok := s.lobbys[idLobby]
	if ok && lb.isRedy && lb.clients[0].stream != nil && lb.clients[1].stream != nil {
		idLobby++
		fmt.Println("send ready")
		resp := &pb.Response{
			IdField:   "startGame",
			TypeField: "",
			Error:     "",
		}
		err := lb.clients[0].stream.Send(resp)
		if err != nil {
			fmt.Println("error send user1")
		}
		err = lb.clients[1].stream.Send(resp)
		if err != nil {
			fmt.Println("error send user2")
		}
	}
	var doneError error
	select {
	case <-ctx.Done():
		doneError = ctx.Err()
	case doneError = <-user.done:
	}
	log.Printf(`stream done with error "%v"`, doneError)
	s.mu.Lock()
	delete(s.clients, user.id)
	s.mu.Unlock()
	log.Printf("%v - removing client", user.id)
	fmt.Println(s.clients)
	return doneError
}

func (s *Server) Update(ctx context.Context, in *pb.UpdateRequest) (*pb.Status, error) {
	lb, ok := s.lobbys[int(in.IdLobby)]
	if ok {
		if lb.clients[0].id == in.Token {
			err := lb.clients[1].stream.Send(&pb.Response{IdField: fmt.Sprintf("%v", in.IdField), TypeField: "", Error: ""})
			if err != nil {
				fmt.Println("error sande 2 user")
			}
		} else {
			err := lb.clients[0].stream.Send(&pb.Response{IdField: fmt.Sprintf("%v", in.IdField), TypeField: "", Error: ""})
			if err != nil {
				fmt.Println("error sande 2 user")
			}
		}
	}
	return &pb.Status{Message: "ok"}, nil
}

func (s *Server) StartGame(ctx context.Context, in *pb.StartRequest) (*pb.StartResponse, error) {
	return nil, nil
}

func main() {
	listener, err := net.Listen("tcp", ":30000")

	if err != nil {
		grpclog.Fatalf("failed to listen: %v", err)
	}

	opts := []grpc.ServerOption{}
	grpcServer := grpc.NewServer(opts...)

	pb.RegisterGameServer(grpcServer, &Server{clients: make(map[string]*client), lobbys: make(map[int]*lobby)})
	fmt.Println("server run")
	grpcServer.Serve(listener)
}
