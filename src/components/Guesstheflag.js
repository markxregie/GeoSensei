import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import backIcon from "../images/back.svg";
import questionIcon from "../images/question.svg"; 
import cupGif from "../images/cup.gif";
import "./guesstheflag.css";
import axios from "axios";

export default function GuessTheFlag() {
    const navigate = useNavigate();
    const { continent } = useParams();
    
    // State variables
    const [showModal, setShowModal] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [usedFlags, setUsedFlags] = useState(new Set());
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);

    const TOTAL_QUESTIONS = 10; // Adjust as needed

    // Background music
    useEffect(() => {
        const bgMusic = new Audio(`${process.env.PUBLIC_URL}/sound/bgmusic.mp3`);
        bgMusic.loop = true; 
        bgMusic.volume = 0.5; 
        bgMusic.play().catch(err => console.error("Autoplay blocked:", err));

        return () => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        };
    }, []);

    // Fetch quiz data
    const fetchQuiz = async () => {
        if (questionNumber >= TOTAL_QUESTIONS) {
            setShowScoreModal(true);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3002/api/quiz/${continent}`);

            let newFlag = response.data;

            if (usedFlags.has(newFlag.flag)) {
                await fetchQuiz();
                return;
            }

            setQuizData(newFlag);
            setSelectedAnswer(null);
            setIsCorrect(null);

            setUsedFlags(prev => {
                const updatedSet = new Set(prev);
                updatedSet.add(newFlag.flag);
                return updatedSet;
            });

            setQuestionNumber(prev => prev + 1);
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [continent]);

    // Handle answer selection
    const handleAnswerClick = (choice) => {
        setSelectedAnswer(choice.code);
        setIsCorrect(choice.correct);

        if (choice.correct) {
            setCorrectCount(prev => prev + 1);
        } else {
            setWrongCount(prev => prev + 1);
        }

        const audio = new Audio(`${process.env.PUBLIC_URL}/sound/${choice.correct ? "correct.mp3" : "wrong.mp3"}`);
        audio.play();

        setTimeout(() => {
            fetchQuiz();
        }, 1000);
    };

    const handleBackClick = () => {
        setShowModal(true);
    };

    const handleConfirmExit = () => {
        setShowModal(false);
        navigate(`/newpage/${continent}`);
    };

    return (
        <div className="guess-the-flag">
            <button className="back-button" onClick={handleBackClick}>
                <img src={backIcon} alt="Back" />
            </button>
            <h1>Guess the Flag</h1>
            <div className="subtitle">{continent}</div>

            {quizData ? (
                <>
                    <div className="flag-box">
                        <img src={quizData.flag} alt="Country Flag" className="flag-image" />
                    </div>

                    <div className="options">
                        {quizData.choices.map((choice, index) => (
                            <button 
                                key={choice.code} 
                                className={`option ${selectedAnswer === choice.code ? (isCorrect ? "correct" : "wrong") : ""}`} 
                                onClick={() => handleAnswerClick(choice)}
                                disabled={selectedAnswer !== null}
                            >
                                {String.fromCharCode(65 + index)}. {choice.name}
                            </button>
                        ))}
                    </div>

                    {selectedAnswer !== null && (
                        <p className={`feedback ${isCorrect ? "correct" : "wrong"}`}>
                            {isCorrect ? "Correct!" : "Wrong answer."}
                        </p>
                    )}
                </>
            ) : (
                <p>Loading quiz...</p>
            )}

            {/* Exit Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Exit Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <img src={questionIcon} alt="Question Icon" className="modal-question-icon" />
                    <p>Are you sure you want to exit the quiz?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleConfirmExit}>Yes, Exit</Button>
                </Modal.Footer>
            </Modal>

{/* Score Summary Modal */}
<Modal show={showScoreModal} onHide={() => navigate(`/newpage/${continent}`)} centered>
    <Modal.Header>
        <Modal.Title className="modal-text">Quiz Summary</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center modal-text">
        <img src={cupGif} alt="Trophy" className="trophy-gif" />
        <h3>Quiz Completed!</h3>
        <p className="correct-text">Correct Answers: <strong>{correctCount}</strong></p>
        <p className="wrong-text">Wrong Answers: <strong>{wrongCount}</strong></p>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={() => navigate(`/newpage/${continent}`)}>OK</Button>
    </Modal.Footer>
</Modal>

        </div>
    );
}
