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
  },
  {
    id: '3',
    name: 'Конный спорт и лошади',
    questions: [
      { 
        id: '3-1', 
        points: 100, 
        question: 'Как называется "домик" для лошади?', 
        answer: 'Денник', 
        isAnswered: false 
      },
      { 
        id: '3-2', 
        points: 200, 
        question: 'Какой масти бывают лошади цвета песка с черными гривой и хвостом?', 
        answer: 'Соловая', 
        isAnswered: false 
      },
      { 
        id: '3-3', 
        points: 300, 
        question: 'Как называется дисциплина конного спорта, где всадник и лошадь выполняют различные элементы высшей школы верховой езды?', 
        answer: 'Выездка', 
        isAnswered: false 
      },
      { 
        id: '3-4', 
        points: 400, 
        question: 'АУКЦИОН! Кто предложит больше?\n\nВопрос: Что определяется по зубам лошади?', 
        answer: 'Возраст', 
        isAnswered: false,
        specialType: 'auction'
      },
      { 
        id: '3-5', 
        points: 500, 
        question: 'Какой аллюр является самым быстрым?', 
        answer: 'Галоп', 
        isAnswered: false 
      },
    ]
  },
  {
    id: '4',
    name: 'Новый год',
    questions: [
      { 
        id: '4-1', 
        points: 200, 
        question: 'В какой стране Новый год встречают, осыпая друг друга лепестками роз?', 
        answer: 'Бразилия', 
        isAnswered: false 
      },
      { 
        id: '4-2', 
        points: 400, 
        question: 'Кто, согласно советской традиции, является внучкой Деда Мороза?', 
        answer: 'Снегурочка', 
        isAnswered: false 
      },
      { 
        id: '4-3', 
        points: 600, 
        question: 'Как называется старый Новый год по-научному?', 
        answer: 'Новогодье по юлианскому календарю', 
        isAnswered: false 
      },
      { 
        id: '4-4', 
        points: 800, 
        question: 'В каком городе России официально "прописаны" Дед Мороз и Снегурочка?', 
        answer: 'Великий Устюг и Кострома соответственно', 
        isAnswered: false 
      },
      { 
        id: '4-5', 
        points: 1000, 
        question: 'Кот в мешке! Вопрос надо отдать сопернику.\n\nВопрос из темы "ENHYPEN": Как зовут самого старшего участника группы?', 
        answer: 'Хисын', 
        isAnswered: false,
        specialType: 'cat-in-bag'
      },
    ]
  },
  {
    id: '5',
    name: 'На 5+',
    questions: [
      { 
        id: '5-1', 
        points: 200, 
        question: 'Сколько падежей в русском языке?', 
        answer: '6', 
        isAnswered: false 
      },
      { 
        id: '5-2', 
        points: 400, 
        question: 'Как называется треугольник, у которого все стороны равны?', 
        answer: 'Равносторонний', 
        isAnswered: false 
      },
      { 
        id: '5-3', 
        points: 600, 
        question: 'Какой газ поглощают растения в процессе фотосинтеза?', 
        answer: 'Углекислый газ, CO2', 
        isAnswered: false 
      },
      { 
        id: '5-4', 
        points: 800, 
        question: 'Что такое "сказуемое"?', 
        answer: 'Главный член предложения, обозначающий действие предмета', 
        isAnswered: false 
      },
      { 
        id: '5-5', 
        points: 1000, 
        question: 'Кот в мешке! Вопрос уходит сопернику.\n\nТема: Корейский язык. Как будет "спасибо" по-корейски?', 
        answer: 'Кампсахамнида', 
        isAnswered: false,
        specialType: 'cat-in-bag'
      },
    ]
  },
  {
    id: '6',
    name: 'Животные',
    questions: [
      { 
        id: '6-1', 
        points: 100, 
        question: 'Какое животное является символом России?', 
        answer: 'Медведь', 
        isAnswered: false 
      },
      { 
        id: '6-2', 
        points: 200, 
        question: 'Сколько ног у паука?', 
        answer: '8', 
        isAnswered: false 
      },
      { 
        id: '6-3', 
        points: 300, 
        question: 'Как называется детёныш коровы?', 
        answer: 'Телёнок', 
        isAnswered: false 
      },
      { 
        id: '6-4', 
        points: 400, 
        question: 'Какое животное самое большое на планете?', 
        answer: 'Синий кит', 
        isAnswered: false 
      },
      { 
        id: '6-5', 
        points: 500, 
        question: 'Как называется наука, изучающая животных?', 
        answer: 'Зоология', 
        isAnswered: false 
      },
    ]
  },
  {
    id: '7',
    name: 'Мультфильмы',
    questions: [
      { 
        id: '7-1', 
        points: 100, 
        question: 'Как зовут снеговика из мультфильма "Холодное сердце"?', 
        answer: 'Олаф', 
        isAnswered: false 
      },
      { 
        id: '7-2', 
        points: 200, 
        question: 'Кто живёт в ананасе на дне океана?', 
        answer: 'Губка Боб', 
        isAnswered: false 
      },
      { 
        id: '7-3', 
        points: 300, 
        question: 'Как называется город, где живут Симпсоны?', 
        answer: 'Спрингфилд', 
        isAnswered: false 
      },
      { 
        id: '7-4', 
        points: 400, 
        question: 'Какой цвет волос у Русалочки Ариэль?', 
        answer: 'Рыжий (красный)', 
        isAnswered: false 
      },
      { 
        id: '7-5', 
        points: 500, 
        question: 'Кот в мешке! Передай вопрос сопернику.\n\nТема: Спорт. Сколько игроков в футбольной команде на поле?', 
        answer: '11', 
        isAnswered: false,
        specialType: 'cat-in-bag'
      },
    ]
  },
  {
    id: '8',
    name: 'Еда и напитки',
    questions: [
      { 
        id: '8-1', 
        points: 100, 
        question: 'Из чего делают попкорн?', 
        answer: 'Из кукурузы', 
        isAnswered: false 
      },
      { 
        id: '8-2', 
        points: 200, 
        question: 'Какой фрукт называют "королём фруктов"?', 
        answer: 'Дуриан', 
        isAnswered: false 
      },
      { 
        id: '8-3', 
        points: 300, 
        question: 'АУКЦИОН! Торгуйтесь за вопрос!\n\nВопрос: Какая страна является родиной пиццы?', 
        answer: 'Италия', 
        isAnswered: false,
        specialType: 'auction'
      },
      { 
        id: '8-4', 
        points: 400, 
        question: 'Какой овощ называют "вторым хлебом"?', 
        answer: 'Картофель', 
        isAnswered: false 
      },
      { 
        id: '8-5', 
        points: 500, 
        question: 'Из какого растения делают шоколад?', 
        answer: 'Какао', 
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