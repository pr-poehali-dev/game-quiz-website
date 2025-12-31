import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Question {
  id: string;
  points: number;
  question: string;
  answer: string;
  isAnswered: boolean;
}

interface Category {
  id: string;
  name: string;
  questions: Question[];
}

interface Player {
  name: string;
  score: number;
}

interface GameBoardProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  scores: { name: string; score: number }[];
  setScores: (scores: { name: string; score: number }[]) => void;
}

export default function GameBoard({ categories, setCategories, scores, setScores }: GameBoardProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showPlayerDialog, setShowPlayerDialog] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, { name: newPlayerName.trim(), score: 0 }]);
      setNewPlayerName('');
    }
  };

  const startGame = () => {
    if (players.length > 0) {
      setShowPlayerDialog(false);
    }
  };

  const selectQuestion = (categoryId: string, questionId: string) => {
    const category = categories.find(c => c.id === categoryId);
    const question = category?.questions.find(q => q.id === questionId);
    if (question && !question.isAnswered) {
      setSelectedQuestion(question);
      setShowAnswer(false);
    }
  };

  const markCorrect = () => {
    if (selectedQuestion && players.length > 0) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer].score += selectedQuestion.points;
      setPlayers(updatedPlayers);
      markAsAnswered();
    }
  };

  const markWrong = () => {
    if (selectedQuestion && players.length > 0) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer].score -= selectedQuestion.points;
      setPlayers(updatedPlayers);
      markAsAnswered();
    }
  };

  const markAsAnswered = () => {
    if (selectedQuestion) {
      const updatedCategories = categories.map(category => ({
        ...category,
        questions: category.questions.map(q =>
          q.id === selectedQuestion.id ? { ...q, isAnswered: true } : q
        )
      }));
      setCategories(updatedCategories);
      setSelectedQuestion(null);
      setShowAnswer(false);
      setCurrentPlayer((currentPlayer + 1) % players.length);
    }
  };

  const endGame = () => {
    const finalScores = players.map(p => ({ name: p.name, score: p.score }));
    setScores([...scores, ...finalScores].sort((a, b) => b.score - a.score).slice(0, 10));
    setPlayers([]);
    setShowPlayerDialog(true);
  };

  return (
    <>
      <Dialog open={showPlayerDialog} onOpenChange={setShowPlayerDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Добавьте игроков</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Имя игрока"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
              />
              <Button onClick={addPlayer}>
                <Icon name="Plus" size={20} />
              </Button>
            </div>
            
            {players.length > 0 && (
              <div className="space-y-2">
                <p className="font-semibold">Игроки:</p>
                {players.map((player, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span>{player.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPlayers(players.filter((_, i) => i !== idx))}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button 
              className="w-full" 
              onClick={startGame}
              disabled={players.length === 0}
            >
              Начать игру
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        {players.length > 0 && (
          <Card className="p-6 bg-white/95 backdrop-blur">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-4">
                {players.map((player, idx) => (
                  <div 
                    key={idx} 
                    className={`px-4 py-2 rounded-lg ${
                      idx === currentPlayer 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105' 
                        : 'bg-gray-200'
                    } transition-all`}
                  >
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-lg">{player.score} очков</p>
                  </div>
                ))}
              </div>
              <Button variant="destructive" onClick={endGame}>
                Завершить игру
              </Button>
            </div>
          </Card>
        )}

        <div className="overflow-x-auto">
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(150px, 1fr))` }}>
            {categories.map(category => (
              <div key={category.id} className="space-y-2">
                <Card className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                  <h3 className="text-xl font-bold text-center">{category.name}</h3>
                </Card>
                {category.questions.map(question => (
                  <Card
                    key={question.id}
                    className={`p-6 text-center cursor-pointer transition-all ${
                      question.isAnswered
                        ? 'bg-gray-300 opacity-50 cursor-not-allowed'
                        : 'bg-gradient-to-br from-orange-400 to-pink-500 hover:scale-105 text-white'
                    }`}
                    onClick={() => !question.isAnswered && selectQuestion(category.id, question.id)}
                  >
                    <p className="text-3xl font-bold">{question.points}</p>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {selectedQuestion?.points} очков
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-purple-100 to-pink-100">
              <p className="text-xl text-center">{selectedQuestion?.question}</p>
            </Card>

            {showAnswer && (
              <Card className="p-8 bg-gradient-to-br from-green-100 to-emerald-100 animate-scale-in">
                <p className="text-lg text-center font-semibold text-green-800">
                  {selectedQuestion?.answer}
                </p>
              </Card>
            )}

            <div className="flex gap-4">
              {!showAnswer ? (
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                  onClick={() => setShowAnswer(true)}
                >
                  Показать ответ
                </Button>
              ) : (
                <>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={markCorrect}
                  >
                    <Icon name="Check" size={20} className="mr-2" />
                    Верно
                  </Button>
                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={markWrong}
                  >
                    <Icon name="X" size={20} className="mr-2" />
                    Неверно
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
