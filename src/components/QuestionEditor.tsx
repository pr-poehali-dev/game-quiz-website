import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

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

interface QuestionEditorProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export default function QuestionEditor({ categories, setCategories }: QuestionEditorProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const { toast } = useToast();

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        questions: [
          { id: `${Date.now()}-1`, points: 100, question: '', answer: '', isAnswered: false },
          { id: `${Date.now()}-2`, points: 200, question: '', answer: '', isAnswered: false },
          { id: `${Date.now()}-3`, points: 300, question: '', answer: '', isAnswered: false },
          { id: `${Date.now()}-4`, points: 400, question: '', answer: '', isAnswered: false },
          { id: `${Date.now()}-5`, points: 500, question: '', answer: '', isAnswered: false },
        ]
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      toast({
        title: "Категория добавлена",
        description: `Категория "${newCategory.name}" успешно создана`,
      });
    }
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter(c => c.id !== categoryId));
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    }
    toast({
      title: "Категория удалена",
      variant: "destructive",
    });
  };

  const updateQuestion = (categoryId: string, questionId: string, updates: Partial<Question>) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          questions: category.questions.map(q =>
            q.id === questionId ? { ...q, ...updates } : q
          )
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const saveQuestion = () => {
    if (editingQuestion && selectedCategory) {
      updateQuestion(selectedCategory, editingQuestion.id, {
        question: editingQuestion.question,
        answer: editingQuestion.answer
      });
      setEditingQuestion(null);
      toast({
        title: "Вопрос сохранен",
        description: "Изменения успешно применены",
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 bg-white/95 backdrop-blur">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Категории</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex gap-2">
            <Input
              placeholder="Название новой категории"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCategory()}
            />
            <Button onClick={addCategory}>
              <Icon name="Plus" size={20} />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {categories.map(category => (
            <Card
              key={category.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCategory(category.id);
                  }}
                  className={selectedCategory === category.id ? 'text-white hover:text-white' : ''}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white/95 backdrop-blur">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {selectedCategory ? 'Вопросы категории' : 'Выберите категорию'}
        </h2>

        {selectedCategory && (
          <div className="space-y-3">
            {categories
              .find(c => c.id === selectedCategory)
              ?.questions.map(question => (
                <Card
                  key={question.id}
                  className={`p-4 cursor-pointer transition-all ${
                    editingQuestion?.id === question.id
                      ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setEditingQuestion({ ...question })}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{question.points} очков</p>
                      <p className="text-sm truncate max-w-[250px]">
                        {question.question || 'Вопрос не задан'}
                      </p>
                    </div>
                    <Icon name="Edit" size={16} />
                  </div>
                </Card>
              ))}
          </div>
        )}

        {editingQuestion && (
          <Card className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 animate-scale-in">
            <h3 className="font-bold text-lg mb-4">
              Редактирование вопроса ({editingQuestion.points} очков)
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="question">Вопрос</Label>
                <Textarea
                  id="question"
                  value={editingQuestion.question}
                  onChange={(e) =>
                    setEditingQuestion({ ...editingQuestion, question: e.target.value })
                  }
                  placeholder="Введите текст вопроса"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="answer">Ответ</Label>
                <Input
                  id="answer"
                  value={editingQuestion.answer}
                  onChange={(e) =>
                    setEditingQuestion({ ...editingQuestion, answer: e.target.value })
                  }
                  placeholder="Введите правильный ответ"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={saveQuestion} className="flex-1">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingQuestion(null)}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}
