import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import GameBoard from '@/components/GameBoard';
import QuestionEditor from '@/components/QuestionEditor';
import Leaderboard from '@/components/Leaderboard';

type Page = 'home' | 'game' | 'editor' | 'leaderboard';

interface Category {
  id: string;
  name: string;
  questions: Question[];
}

interface Question {
  id: string;
  points: number;
  question: string;
  answer: string;
  isAnswered: boolean;
}

const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'История',
    questions: [
      { id: '1-1', points: 100, question: 'В каком году основана Москва?', answer: '1147', isAnswered: false },
      { id: '1-2', points: 200, question: 'Кто был первым императором России?', answer: 'Петр I', isAnswered: false },
      { id: '1-3', points: 300, question: 'В каком году началась Первая мировая война?', answer: '1914', isAnswered: false },
      { id: '1-4', points: 400, question: 'Какое событие произошло в 1917 году?', answer: 'Октябрьская революция', isAnswered: false },
      { id: '1-5', points: 500, question: 'Когда закончилась Вторая мировая война?', answer: '1945', isAnswered: false },
    ]
  },
  {
    id: '2',
    name: 'География',
    questions: [
      { id: '2-1', points: 100, question: 'Столица Франции?', answer: 'Париж', isAnswered: false },
      { id: '2-2', points: 200, question: 'Самая длинная река в мире?', answer: 'Амазонка', isAnswered: false },
      { id: '2-3', points: 300, question: 'На каком континенте находится Египет?', answer: 'Африка', isAnswered: false },
      { id: '2-4', points: 400, question: 'Самая высокая гора в мире?', answer: 'Эверест', isAnswered: false },
      { id: '2-5', points: 500, question: 'Сколько океанов на Земле?', answer: '5', isAnswered: false },
    ]
  },
  {
    id: '3',
    name: 'Наука',
    questions: [
      { id: '3-1', points: 100, question: 'Сколько планет в Солнечной системе?', answer: '8', isAnswered: false },
      { id: '3-2', points: 200, question: 'Химический символ золота?', answer: 'Au', isAnswered: false },
      { id: '3-3', points: 300, question: 'Кто открыл закон всемирного тяготения?', answer: 'Ньютон', isAnswered: false },
      { id: '3-4', points: 400, question: 'Скорость света в вакууме?', answer: '300 000 км/с', isAnswered: false },
      { id: '3-5', points: 500, question: 'Что такое ДНК?', answer: 'Дезоксирибонуклеиновая кислота', isAnswered: false },
    ]
  },
  {
    id: '4',
    name: 'Литература',
    questions: [
      { id: '4-1', points: 100, question: 'Автор "Евгения Онегина"?', answer: 'Пушкин', isAnswered: false },
      { id: '4-2', points: 200, question: 'В каком романе героиня Наташа Ростова?', answer: 'Война и мир', isAnswered: false },
      { id: '4-3', points: 300, question: 'Кто написал "Мастер и Маргарита"?', answer: 'Булгаков', isAnswered: false },
      { id: '4-4', points: 400, question: 'Имя главного героя романа "Преступление и наказание"?', answer: 'Родион Раскольников', isAnswered: false },
      { id: '4-5', points: 500, question: 'Кто автор поэмы "Медный всадник"?', answer: 'Пушкин', isAnswered: false },
    ]
  },
  {
    id: '5',
    name: 'Кино',
    questions: [
      { id: '5-1', points: 100, question: 'Режиссер фильма "Титаник"?', answer: 'Джеймс Кэмерон', isAnswered: false },
      { id: '5-2', points: 200, question: 'В каком году вышел первый фильм о Гарри Поттере?', answer: '2001', isAnswered: false },
      { id: '5-3', points: 300, question: 'Кто сыграл Железного человека?', answer: 'Роберт Дауни-младший', isAnswered: false },
      { id: '5-4', points: 400, question: 'Сколько фильмов в саге "Звездные войны"?', answer: '9 основных', isAnswered: false },
      { id: '5-5', points: 500, question: 'Какой фильм получил Оскар в 2020 году?', answer: 'Паразиты', isAnswered: false },
    ]
  }
];

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [scores, setScores] = useState<{ name: string; score: number }[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <div className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-white animate-fade-in">
            <h1 className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100 drop-shadow-2xl">
              Своя игра
            </h1>
            <p className="text-2xl mb-12 text-purple-100">Создай свою викторину и играй с друзьями!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              <Card 
                className="p-8 hover:scale-105 transition-transform cursor-pointer bg-white/95 backdrop-blur"
                onClick={() => setCurrentPage('game')}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                    <Icon name="Gamepad2" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">Начать игру</h3>
                  <p className="text-gray-600">Играй с готовыми вопросами или своими</p>
                </div>
              </Card>

              <Card 
                className="p-8 hover:scale-105 transition-transform cursor-pointer bg-white/95 backdrop-blur"
                onClick={() => setCurrentPage('editor')}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center mb-4">
                    <Icon name="Edit" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">Редактор вопросов</h3>
                  <p className="text-gray-600">Создай свои категории и вопросы</p>
                </div>
              </Card>

              <Card 
                className="p-8 hover:scale-105 transition-transform cursor-pointer bg-white/95 backdrop-blur md:col-span-2"
                onClick={() => setCurrentPage('leaderboard')}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-4">
                    <Icon name="Trophy" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">Рейтинг</h3>
                  <p className="text-gray-600">Таблица лучших игроков</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {currentPage === 'game' && (
          <div className="animate-fade-in">
            <Button 
              variant="ghost" 
              className="mb-6 text-white hover:bg-white/20"
              onClick={() => setCurrentPage('home')}
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              На главную
            </Button>
            <GameBoard 
              categories={categories} 
              setCategories={setCategories}
              scores={scores}
              setScores={setScores}
            />
          </div>
        )}

        {currentPage === 'editor' && (
          <div className="animate-fade-in">
            <Button 
              variant="ghost" 
              className="mb-6 text-white hover:bg-white/20"
              onClick={() => setCurrentPage('home')}
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              На главную
            </Button>
            <QuestionEditor categories={categories} setCategories={setCategories} />
          </div>
        )}

        {currentPage === 'leaderboard' && (
          <div className="animate-fade-in">
            <Button 
              variant="ghost" 
              className="mb-6 text-white hover:bg-white/20"
              onClick={() => setCurrentPage('home')}
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              На главную
            </Button>
            <Leaderboard scores={scores} />
          </div>
        )}
      </div>
    </div>
  );
}
