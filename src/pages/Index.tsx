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
  specialType?: 'cat-in-bag' | 'auction';
}

const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Ох уж эта школа',
    questions: [
      { 
        id: '1-1', 
        points: 100, 
        question: 'Какой частью речи является слово "бегать"?', 
        answer: 'Глагол', 
        isAnswered: false 
      },
      { 
        id: '1-2', 
        points: 200, 
        question: 'Сколько будет 7²?', 
        answer: '49', 
        isAnswered: false 
      },
      { 
        id: '1-3', 
        points: 300, 
        question: 'Кот в мешке! Вопрос надо отдать другому игроку.\n\nВопрос из темы "Животные": Какое млекопитающее умеет летать?', 
        answer: 'Летучая мышь', 
        isAnswered: false,
        specialType: 'cat-in-bag'
      },
      { 
        id: '1-4', 
        points: 400, 
        question: 'Как называется самая большая планета Солнечной системы?', 
        answer: 'Юпитер', 
        isAnswered: false 
      },
      { 
        id: '1-5', 
        points: 500, 
        question: 'АУКЦИОН! Вопрос уходит тому, кто пообещает больше всего очков. Стартовая цена – ваши текущие очки.\n\nВопрос: Кто автор стихотворения "Бородино"?', 
        answer: 'Михаил Юрьевич Лермонтов', 
        isAnswered: false,
        specialType: 'auction'
      },
    ]
  },
  {
    id: '2',
    name: 'ENHYPEN',
    questions: [
      { 
        id: '2-1', 
        points: 100, 
        question: 'Как называется фандом ENHYPEN?', 
        answer: 'ENGENE', 
        isAnswered: false 
      },
      { 
        id: '2-2', 
        points: 200, 
        question: 'Какой дебютный сингл-альбом группы вышел в 2020 году?', 
        answer: 'BORDER : DAY ONE', 
        isAnswered: false 
      },
      { 
        id: '2-3', 
        points: 300, 
        question: 'Назовите двух участников группы, которые являются австралийцем и японцем.', 
        answer: 'Джейк и НиКи', 
        isAnswered: false 
      },
      { 
        id: '2-4', 
        points: 400, 
        question: 'Кот в мешке! Вопрос надо отдать другому участнику.\n\nВопрос из темы "Школьная программа": Что измеряют в амперах?', 
        answer: 'Силу электрического тока', 
        isAnswered: false,
        specialType: 'cat-in-bag'
      },
      { 
        id: '2-5', 
        points: 500, 
        question: 'В каком популярном шоу на выживание образовалась группа ENHYPEN?', 
        answer: 'I-LAND', 
        isAnswered: false 
      },
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