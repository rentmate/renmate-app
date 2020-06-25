package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"goji.io"
	"goji.io/pat"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

var Newid int

func ErrorWithJSON(w http.ResponseWriter, message string, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	fmt.Fprintf(w, "{message: %q}", message)
}

func ResponseWithJSON(w http.ResponseWriter, json []byte, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	w.Write(json)
}

type MESSAGE struct {
	ID      bson.ObjectId `bson:"_id,omitempty"`
	User1   string        `json:"user1"`
	User2   string        `json:"user2"`
	Subject string        `json:"subject"`
	Content string        `json:"content"`
	Date	string        `json:"date"`
}

func main() {
	session, err := mgo.Dial("rentmate-chats-db")
	if err != nil {
		fmt.Printf("Houston, we have a problem: ")
		panic(err)
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)

	mux := goji.NewMux()

	mux.HandleFunc(pat.Get("/rentmate-chats-ms"), allMessages(session))
	mux.HandleFunc(pat.Post("/rentmate-chats-ms"), addMessage(session))
	mux.HandleFunc(pat.Delete("/rentmate-chats-ms/:id"), deleteMessage(session))

	http.ListenAndServe(":4003", mux)

}

func addMessage(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		var message MESSAGE

		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&message)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}
		c := session.DB("rentmate-chats-db").C("messages")
		message.ID = bson.NewObjectId()

			err = c.Insert(message)
		if err != nil {
			if mgo.IsDup(err) {
				ErrorWithJSON(w, "message with this ID exists", http.StatusBadRequest)
				return
			}

			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed insert message: ", err)
			return
		}
		respBody, err := json.MarshalIndent(message, "", "  ")
		if err != nil {
			log.Fatal(err)
		}
		ResponseWithJSON(w, respBody, http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Location", r.URL.Path+"/"+string(message.ID))
		w.WriteHeader(http.StatusCreated)
	}
}

func allMessages(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		c := session.DB("rentmate-chats-db").C("messages")

		var messages []MESSAGE
		err := c.Find(bson.M{}).All(&messages)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed get all messages: ", err)
			return
		}

		respBody, err := json.MarshalIndent(messages, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func deleteMessage(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		id := pat.Param(r, "id")

		c := session.DB("rentmate-chats-db").C("messages")

		err := c.Remove(bson.M{"_id": bson.ObjectIdHex(string(id))})
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed deleting message: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "message not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}