import React, { useState } from 'react';
import './index.css';
import Chatbot from './components/Chatbot';

function App() {
  const [activeView, setActiveView] = useState('chatbot'); // chatbot, quiz, result
  const [step, setStep] = useState('start'); // for quiz view: start, quiz, result
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Quiz functions (from original)
  const fetchQuestion = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/start');
      const data = await response.json();
      setQuestion(data.question);
      setOptions(data.options);
    } catch (err) {
      setError('Failed to load question');
      console.error(err);
    }
  };

  const handleAnswerSelect = async (selectedOption) => {
    setAnswer(selectedOption);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: selectedOption }),
      });
      const data = await response.json();
      setResult(data);
      setStep('result');
    } catch (err) {
      setError('Failed to get recommendation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const restartQuiz = () => {
    setStep('start');
    setAnswer('');
    setResult(null);
    setError('');
  };

  // View rendering
  const renderView = () => {
    switch (activeView) {
      case 'chatbot':
        return <Chatbot />;
      case 'quiz':
        if (step === 'start') {
          return (
            <div className="app">
              <div className="screen">
                <h1>Welcome to the Mysterious Experience</h1>
                <p>
                  Step into a world of flavors and mysteries. Answer a few questions to discover your
                  perfect match and unlock a special discount.
                </p>
                <button onClick={() => setStep('quiz')}>Begin Journey</button>
              </div>
            </div>
          );
        }
        if (step === 'quiz') {
          return (
            <div className="app">
              <div className="screen">
                <h1>{question}</h1>
                <div className="options">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswerSelect(opt)}
                      disabled={loading}
                      className={answer === opt ? 'selected' : ''}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
              </div>
            </div>
          );
        }
        if (step === 'result') {
          return (
            <div className="app">
              <div className="screen">
                <h1>Your Discovery</h1>
                <p>
                  Based on your choice, we recommend:<br />
                  <strong>{result.item}</strong>
                </p>
                <p>
                  Enjoy a <strong>{result.discount}</strong> discount on this item!
                </p>
                <p>
                  Your unique code: <strong>{result.code}</strong>
                </p>
                <p>
                  Show this screen to the staff to redeem your discount. Code valid for 24 hours.
                </p>
                <button onClick={restartQuiz}>Try Again</button>
              </div>
            </div>
          );
        }
        break;
      default:
        return <Chatbot />;
    }
  };

  return (
    <div className="App">
      <header className="sticky top-0 z-50 bg-gray-800 bg-opacity-75 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-700 via-orange-600 to-amber-500 flex items-center justify-center text-stone-950 font-black text-xl shadow-lg shadow-orange-950/60">⛰️</div>
            <div>
              <span className="text-xl font-extrabold tracking-wider text-orange-400 block">گُـدار</span>
              <a href="https://instagram.com/godarspot" target="_blank" className="text-[10px] text-stone-400 tracking-widest hover:text-orange-400 transition flex items-center gap-1 mt-0.5">
                <i data-lucide="instagram" className="w-3 h-3"></i> @godarspot
              </a>
            </div>
          </div>
          <nav className="flex items-center gap-1 bg-stone-900/90 p-1 rounded-xl border border-stone-800 text-xs font-medium">
            <button
              onClick={() => setActiveView('chatbot')}
              className={`tab-btn ${activeView === 'chatbot' ? 'active bg-orange-600 text-white' : 'text-stone-300'} px-3 py-1.5 rounded-lg transition flex items-center gap-1.5`}
            >
              <i data-lucide="message-circle" className="w-3 h-3"></i>
              <span>چت بات</span>
            </button>
            <button
              onClick={() => setActiveView('quiz')}
              className={`tab-btn ${activeView === 'quiz' ? 'active bg-orange-600 text-white' : 'text-stone-300'} px-3 py-1.5 rounded-lg transition flex items-center gap-1.5`}
            >
              <i data-lucide="message-circle" className="w-3 h-3"></i>
              <span>کوییز</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full px-4 py-6 flex-1">
        {renderView()}
      </main>
    </div>
  );
}

export default App;