"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import questionsData from "@/data/quiz-questions.json";
import resultsData from "@/data/quiz-results.json";
// import { trackCoupon } from "../utils/gtag";

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface Result {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  discount: string;
  color: string;
}

const shuffleOptions = (question: Question): Question => {
  const correctAnswer = question.options[question.correct];
  const shuffledOptions = [...question.options].sort(() => 0.5 - Math.random());
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    ...question,
    options: shuffledOptions,
    correct: newCorrectIndex
  };
};

const getRandomQuestions = (questions: Question[], count: number): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(shuffleOptions);
};

const getResult = (score: number): Result => {
  return resultsData.find(result => score >= result.minScore && score <= result.maxScore) || resultsData[0];
};

export default function JogosPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(getRandomQuestions(questionsData, 10));
  }, []);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setGameFinished(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setGameFinished(false);
    setSelectedAnswer(null);
    setQuestions(getRandomQuestions(questionsData, 10));
  };

  const result = getResult(score);

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-white text-gray-800 p-8" style={{backgroundImage: 'url(/backgroudgame.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/90 p-8 rounded-2xl">
            <div className="text-6xl mb-4">💄</div>
            <p className="text-xl">Carregando quiz...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!gameStarted) {
    return (
      <main className="min-h-screen bg-white text-gray-800 p-8" style={{backgroundImage: 'url(/backgroudgame.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="max-w-2xl mx-auto text-center">
          <Link href="/" className="text-orange-600 hover:text-orange-700 mb-4 inline-block font-semibold">
            ← Voltar para Home
          </Link>
          
          <div className="bg-white/95 p-8 rounded-2xl shadow-2xl mb-8">
            <div className="text-6xl mb-4">💄</div>
            <h1 className="text-4xl font-bold mb-4 text-orange-600">Descubra seu nível de beleza!</h1>
            <p className="text-gray-600 mb-8">Teste seus conhecimentos sobre Natura, Avon e o mundo da beleza</p>
          
            <button 
              onClick={() => setGameStarted(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-xl transition-colors shadow-lg"
            >
              Começar o Quiz
            </button>
          </div>
        </div>
      </main>
    );
  }

  const copyDiscount = () => {
    const cupom = result.description.split('Cupom: ')[1];
    navigator.clipboard.writeText(cupom);
    // trackCoupon(cupom);
    alert('Cupom copiado!');
  };

  if (gameFinished) {
    return (
      <main className="min-h-screen bg-white text-gray-800 p-8" style={{backgroundImage: 'url(/backgroudgame.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <button 
              onClick={resetGame}
              className="text-orange-600 hover:text-orange-700 mb-4 inline-block font-semibold"
            >
              ← Voltar
            </button>
          </div>
          
          <div className="bg-white/95 p-8 rounded-2xl shadow-2xl text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold mb-4 text-orange-600">{result.title}</h1>
              <p className="text-2xl text-gray-700 mb-4">Você acertou {score} de {questions.length} perguntas!</p>
              <p className="text-lg text-gray-600 mb-6">{result.description}</p>
              <div className="bg-orange-500 text-white px-6 py-3 rounded-full inline-block mb-6 shadow-lg">
                🛍️ Ganhe {result.discount} de desconto na loja!
              </div>
              <button 
                onClick={copyDiscount}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors ml-2 shadow-lg"
              >
                Copiar Cupom
              </button>
            </div>
            
            <div className="space-y-4">
              <a 
                href="https://www.minhaloja.natura.com/consultoria/vmai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block shadow-lg"
              >
                Usar Desconto na Loja
              </a>
              
              <div>
                <Link 
                  href={`/certificado?title=${encodeURIComponent(result.title)}&score=${score}&total=${questions.length}`}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition-colors inline-block shadow-lg"
                >
                  🏆 Compartilhar Conquista
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 p-8" style={{backgroundImage: 'url(/backgroudgame.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-semibold">Pergunta {currentQuestion + 1} de {questions.length}</span>
            <span className="text-white font-semibold">Pontuação: {score}</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-300 shadow-lg"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white/95 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-orange-600">{questions[currentQuestion].question}</h2>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all font-medium ${
                  selectedAnswer === null 
                    ? 'bg-white border-orange-200 hover:bg-orange-50 hover:border-orange-300' 
                    : selectedAnswer === index
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : 'bg-red-100 border-red-500 text-red-800'
                      : index === questions[currentQuestion].correct
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                }`}
              >
                <span className="font-bold mr-3 text-orange-600">{String.fromCharCode(65 + index)})</span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}