import { useEffect, useState } from "react";
import Login from "./Login"; // Import the Login component
import Register from "./Register"; // Import the Register component
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchBooks();
    }
  }, [isLoggedIn]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addBook = async () => {
    const bookData = {
      bookTitle: title,
      release_year: releaseYear,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (pk, release_year) => {
    const bookData = {
      bookTitle: newTitle,
      release_year,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === pk) {
            return data;
          } else {
            return book;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (pk) => {
    if (!pk) {
      console.error("Book ID is undefined");
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setBooks((prev) => prev.filter((book) => book.id !== pk));
        if (books.length > 1) {
          setCurrentIndex((prev) => (prev + 1) % books.length);
        } else {
          setCurrentIndex(0);
          setShowFront(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleNext = () => {
    if (books.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % books.length);
      setShowFront(true);
    }
  };
  
  const handlePrevious = () => {
    if (books.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
      setShowFront(true);
    }
  };
  


  const handleFlip = () => {
    setShowFront((prev) => !prev);
  };

  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <>
      {showLogin && !isLoggedIn && (
        <Login onLogin={handleLogin} />
      )}

      {showRegister && !isLoggedIn && (
        <Register />
      )}

      {isLoggedIn && (
        <>
          <h1>Flashcards</h1>

          <div>
            <input
              type="text"
              placeholder="term"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={addBook}>Add Term</button>
          </div>

          {books.length > 0 && (
            <div className="flashcard-container">
              <div className="flashcard">
                <div
                  className="flashcard-inner"
                  style={{
                    transform: showFront ? "rotateY(0deg)" : "rotateY(180deg)",
                  }}
                >
                  <div className="flashcard-side front">
                    <button onClick={handleFlip}>Flip</button>
                    <p>{books[currentIndex].bookTitle}</p>
                  </div>
                  <div className="flashcard-side back">
                    <button onClick={handleFlip}>Flip</button>
                    <p>{books[currentIndex].release_year}</p>
                  </div>
                </div>
              </div>
              <div className="flashcard-controls">
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
                <button onClick={() => deleteBook(books[currentIndex].id)}>Delete</button>
              </div>
            </div>
          )}

          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      <button onClick={() => setShowRegister(true)}>Register</button>
    </>
  );
}

export default App;
