import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Calendar, Target, User, Bell, TrendingUp, Book, Award, Clock, Flame, ChevronDown, ChevronUp } from 'lucide-react';

const StudyTracker = () => {
  const [studentName, setStudentName] = useState('');
  const [nameSet, setNameSet] = useState(false);
  const [completedTopics, setCompletedTopics] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [expandedSubjects, setExpandedSubjects] = useState({});

  const examDate = new Date('2025-08-24');
  const today = new Date();
  const daysUntilExam = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));

  const studyContent = {
    "MÓDULO I – CONHECIMENTOS BÁSICOS": {
      "LÍNGUA PORTUGUESA / INTERPRETAÇÃO DE TEXTOS": [
        "Compreensão e interpretação de textos",
        "Reconhecimento de tipos e gêneros textuais",
        "Ortografia oficial",
        "Acentuação gráfica",
        "Emprego das classes de palavras",
        "Emprego/correlação de tempos e modos verbais",
        "Emprego do sinal indicativo de crase",
        "Sintaxe da oração e do período",
        "Sinais de pontuação",
        "Concordância nominal e verbal",
        "Regência nominal e verbal",
        "Significação das palavras",
        "Comunicações oficiais: o padrão ofício e tipos de documentos"
      ],
      "MATEMÁTICA / RACIOCÍNIO LÓGICO": [
        "Operações com números naturais, inteiros, racionais, irracionais e reais",
        "Problemas de contagem",
        "Sistema legal de medidas (comprimento, área, massa e volume)",
        "Razões e proporções; divisão proporcional",
        "Regras de três simples e composta",
        "Porcentagens",
        "Equações e inequações do 1º e 2º graus",
        "Sistemas lineares",
        "Funções do 1º e 2º graus",
        "Gráficos",
        "Sequências numéricas",
        "Progressão aritmética e geométrica",
        "Noções de probabilidade e estatística",
        "Raciocínio lógico: problemas aritméticos e geométricos",
        "Raciocínio verbal, matemático, sequencial, orientação espacial/temporal",
        "Operações com conjuntos",
        "Geometria plana"
      ],
      "ATUALIDADES / HISTÓRIA DO CEARÁ": [
        "Fatos relevantes de 2024 e 2025 sobre: cultura, economia, educação",
        "Fatos relevantes: energias renováveis, esporte, guerras",
        "Fatos relevantes: mudanças climáticas, povos originários",
        "Fatos relevantes: segurança pública e tecnologia digital",
        "Período colonial: ocupação do território, sesmarias e economia pecuária",
        "Período imperial: Confederação do Equador, economia do algodão, escravidão",
        "República Velha: coronelismo, clientelismo, movimentos sociais e banditismo",
        "1930–1964: Estado Novo, redemocratização, Dnocs e Sudene",
        "Regime militar: coronelismo e modernização conservadora",
        "Nova República: \"governos das mudanças\""
      ],
      "NOÇÕES DE ADMINISTRAÇÃO PÚBLICA / ÉTICA NO SERVIÇO PÚBLICO": [
        "Estrutura organizacional: tipos, finalidades, departamentalização",
        "Organização administrativa: centralização, descentralização etc.",
        "Princípios da Administração Pública",
        "Poderes administrativos: vinculado, discricionário, hierárquico, disciplinar",
        "Direitos dos usuários dos serviços públicos (Lei 13.460/2017)",
        "Relações humanas no trabalho",
        "Ética e cidadania",
        "Lei de Improbidade Administrativa (Lei 8.429/1992)"
      ]
    },
    "MÓDULO II – CONHECIMENTOS ESPECÍFICOS": {
      "LEGISLAÇÃO PERTINENTE AO CBMCE": [
        "Lei Estadual nº 13.407/2003 (Código Disciplinar da PMCE e CBMCE)",
        "Lei Estadual nº 13.556/2004 (Segurança contra Incêndios)",
        "Lei Estadual nº 13.729/2006 (Estatuto dos Militares Estaduais)",
        "Lei Estadual nº 15.797/2015 (Promoções dos Militares)",
        "Decreto Estadual nº 31.804/2015 (Regulamento das promoções)"
      ],
      "NOÇÕES DE DIREITO CONSTITUCIONAL": [
        "Conceitos e fontes do Direito Constitucional",
        "Constituição: conceito e classificação",
        "Poder Constituinte",
        "Princípios fundamentais",
        "Sujeitos e classificação dos direitos fundamentais",
        "Direitos e garantias fundamentais",
        "Limites e restrições aos direitos fundamentais",
        "Ações constitucionais: HC, HD, MS, MI, Ação Popular, Ação Civil Pública",
        "Poderes Executivo, Legislativo e Judiciário",
        "Chefia de Estado e de Governo",
        "Funções essenciais à justiça",
        "Segurança pública: conceito e órgãos"
      ],
      "NOÇÕES DE DIREITO PENAL MILITAR / PROCESSUAL PENAL MILITAR": [
        "Aplicação da lei penal militar (arts. 1º ao 9º, 11–14, 23–28 do CPM)",
        "Crime militar (arts. 29–47, CPM)",
        "Imputabilidade penal (arts. 48–50, CPM)",
        "Concurso de agentes (arts. 53–54, CPM)",
        "Penas: principais, acessórias, efeitos, suspensão, livramento",
        "Extinção da punibilidade (arts. 123–125, CPM)",
        "Crimes militares em tempo de paz (arts. 136–354, CPM)",
        "Lei Processual Penal (arts. 1º–6º, CPPM)",
        "Polícia Judiciária Militar (arts. 7º–8º, CPPM)",
        "Inquérito Policial Militar (arts. 9º–28, CPPM)"
      ],
      "FÍSICA": [
        "Sistema Internacional de Unidades",
        "Cinemática escalar e vetorial",
        "Movimento circular",
        "Leis de Newton",
        "Trabalho, energia, potência, impulso e quantidade de movimento",
        "Estática dos corpos rígidos",
        "Estática dos fluidos",
        "Princípios de Pascal, Arquimedes e Stevin",
        "Escalas termométricas",
        "Transmissão de calor, calorimetria, mudanças de estado, dilatação",
        "Entropia, entalpia",
        "Corrente elétrica, tensão, resistência",
        "Lei de Ohm, efeito Joule",
        "Propriedades elétricas e magnéticas dos materiais"
      ],
      "QUÍMICA": [
        "Tabela periódica: classificação, propriedades",
        "Radioatividade: emissões, fissão, fusão, riscos",
        "Ligações químicas: intra/intermoleculares",
        "Separação de misturas",
        "Gases ideais e leis dos gases",
        "Termoquímica: entalpia, entropia, energia livre",
        "Eletroquímica: potencial redox, pilhas, eletrólise, corrosão",
        "Funções inorgânicas: ácidos, bases, sais e óxidos",
        "Soluções e unidades de concentração"
      ],
      "BIOLOGIA / PRIMEIROS SOCORROS": [
        "Posição e divisões do corpo humano",
        "Quadrantes abdominais",
        "Sistemas: tegumentar, esquelético, muscular, respiratório",
        "Sistemas: cardiovascular, geniturinário, digestório e nervoso",
        "Hemorragias e estado de choque",
        "Traumas em extremidades",
        "Traumatismos (crânio, face, tórax, coluna)",
        "Queimaduras: tipos, extensão, gravidade, químicas e elétricas",
        "Parada cardiorrespiratória",
        "Equipamentos de proteção individual (EPI)"
      ]
    }
  };

  const totalTopics = Object.values(studyContent).reduce((acc, module) =>
    acc + Object.values(module).reduce((acc2, subjects) => acc2 + subjects.length, 0), 0
  );

  const completedCount = Object.keys(completedTopics).filter(key => completedTopics[key]).length;
  const progressPercentage = (completedCount / totalTopics) * 100;

  // Calcula o streak baseado no número atual de tópicos concluídos
  const currentStreak = completedCount;

  useEffect(() => {
    const saved = localStorage.getItem('studyProgress');
    if (saved) {
      setCompletedTopics(JSON.parse(saved));
    }

    const savedName = localStorage.getItem('studentName');
    if (savedName) {
      setStudentName(savedName);
      setNameSet(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(completedTopics).length > 0) {
      localStorage.setItem('studyProgress', JSON.stringify(completedTopics));
    }
  }, [completedTopics]);

  const handleNameSubmit = (e) => {
    if (e) e.preventDefault();
    if (studentName.trim()) {
      setNameSet(true);
      localStorage.setItem('studentName', studentName);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const toggleTopic = (topicId) => {
    setCompletedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const toggleSubject = (subjectId) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  const getSubjectId = (moduleName, subjectName) => {
    return `${moduleName}-${subjectName}`;
  };

  const getTopicId = (moduleName, subjectName, topicName) => {
    return `${moduleName}-${subjectName}-${topicName}`;
  };

  const getMotivationalMessage = () => {
    if (progressPercentage < 25) return "Você está começando! Cada passo conta! 🚀";
    if (progressPercentage < 50) return "Ótimo progresso! Continue assim! 💪";
    if (progressPercentage < 75) return "Você está na metade do caminho! 🎯";
    if (progressPercentage < 95) return "Quase lá! Você está arrasando! 🔥";
    return "Parabéns! Você dominou todo o conteúdo! 🏆";
  };

  if (!nameSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Cronograma de Estudos</h1>
            <p className="text-gray-600">CBMCE - Corpo de Bombeiros Militar do Ceará</p>
          </div>

          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Como você gostaria de ser chamado?
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Digite seu nome..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:from-red-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Começar Estudos
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-gray-600 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Cronograma CBMCE</h1>
                <p className="text-sm text-gray-600">Olá, {studentName}! 👋</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{daysUntilExam} dias para a prova</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-red-600">
                  <Flame className="w-4 h-4" />
                  <span>Tópicos concluídos: {currentStreak}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Bem-vindo(a), {studentName}! Vamos estudar! 🎯</span>
          </div>
        </div>
      )}

      {/* Progress Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Progresso Geral</p>
                <p className="text-2xl font-bold text-red-600">{progressPercentage.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-500 to-gray-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tópicos Concluídos</p>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">de {totalTopics} tópicos</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dias Restantes</p>
                <p className="text-2xl font-bold text-gray-600">{daysUntilExam}</p>
              </div>
              <Clock className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">até 24/08/2025</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Estudado</p>
                <p className="text-2xl font-bold text-red-600">{currentStreak}</p>
              </div>
              <Flame className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">tópicos concluídos</p>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-red-500 to-gray-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Mensagem Motivacional</h3>
              <p className="text-red-100">{getMotivationalMessage()}</p>
            </div>
          </div>
        </div>

        {/* Study Content */}
        <div className="space-y-8">
          {Object.entries(studyContent).map(([moduleName, subjects]) => (
            <div key={moduleName} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-gray-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Book className="w-6 h-6 mr-3" />
                  {moduleName}
                </h2>
              </div>

              <div className="p-6">
                {Object.entries(subjects).map(([subjectName, topics]) => {
                  const subjectId = getSubjectId(moduleName, subjectName);
                  const isExpanded = expandedSubjects[subjectId];
                  const completedInSubject = topics.filter(topic =>
                    completedTopics[getTopicId(moduleName, subjectName, topic)]
                  ).length;

                  return (
                    <div key={subjectName} className="mb-6 last:mb-0">
                      <div
                        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 border border-gray-200"
                        onClick={() => toggleSubject(subjectId)}
                      >
                        <div className="flex items-center space-x-3">
                          <Book className="w-5 h-5 text-red-600" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {subjectName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {completedInSubject} de {topics.length} tópicos concluídos
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-red-500 to-gray-600 transition-all duration-300"
                              style={{ width: `${(completedInSubject / topics.length) * 100}%` }}
                            ></div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 space-y-2 pl-4">
                          {topics.map((topic, index) => {
                            const topicId = getTopicId(moduleName, subjectName, topic);
                            const isCompleted = completedTopics[topicId];

                            return (
                              <div
                                key={index}
                                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                  isCompleted
                                    ? 'bg-green-50 border-l-4 border-green-400'
                                    : 'bg-white hover:bg-red-50 border-l-4 border-transparent hover:border-red-400 shadow-sm'
                                }`}
                                onClick={() => toggleTopic(topicId)}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                                <span className={`text-sm ${isCompleted ? 'text-green-800 line-through' : 'text-gray-700'}`}>
                                  {topic}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyTracker;
