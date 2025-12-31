import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface LeaderboardProps {
  scores: { name: string; score: number }[];
}

export default function Leaderboard({ scores }: LeaderboardProps) {
  const topScores = [...scores].sort((a, b) => b.score - a.score).slice(0, 10);

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Icon name="Award" size={32} className="text-yellow-500" />;
      case 1:
        return <Icon name="Award" size={28} className="text-gray-400" />;
      case 2:
        return <Icon name="Award" size={24} className="text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 bg-white/95 backdrop-blur">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Icon name="Trophy" size={40} className="text-yellow-500" />
          <h2 className="text-4xl font-bold text-gray-800">Таблица лидеров</h2>
        </div>

        {topScores.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Users" size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">Пока никто не играл</p>
            <p className="text-gray-400 mt-2">Сыграйте первую игру, чтобы попасть в рейтинг!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {topScores.map((entry, index) => (
              <Card
                key={index}
                className={`p-4 transition-all ${
                  index < 3
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 flex items-center justify-center">
                      {getMedalIcon(index) || (
                        <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{entry.name}</p>
                      <p className="text-sm text-gray-600">Игрок</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {entry.score}
                    </p>
                    <p className="text-sm text-gray-600">очков</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
