import { useState, useMemo } from "react";
import { aulas } from "./data/questions";
import QuestionCard from "./components/QuestionCard";
import styles from "./App.module.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [activeAula, setActiveAula] = useState(1);

  const shuffledAulas = useMemo(
    () => aulas.map((aula) => ({ ...aula, questions: shuffle(aula.questions) })),
    []
  );

  const currentAula = shuffledAulas.find((a) => a.id === activeAula);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Quiz de Revisão</h1>
          <p className={styles.subtitle}>Odontologia – Pacientes com Necessidades Especiais</p>
        </div>
      </header>

      <div className={styles.tabs}>
        {aulas.map((aula) => (
          <button
            key={aula.id}
            className={`${styles.tab} ${activeAula === aula.id ? styles.tabActive : ""}`}
            onClick={() => setActiveAula(aula.id)}
          >
            {aula.title}
            {aula.questions.length > 0 && (
              <span className={styles.badge}>{aula.questions.length}</span>
            )}
          </button>
        ))}
      </div>

      <main className={styles.main}>
        <div className={styles.aulaHeader}>
          <h2 className={styles.aulaTitle}>{currentAula.title}</h2>
          {currentAula.subtitle && (
            <p className={styles.aulaSubtitle}>{currentAula.subtitle}</p>
          )}
        </div>

        {currentAula.questions.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📚</div>
            <p className={styles.emptyText}>Questões em breve</p>
            <p className={styles.emptyHint}>O conteúdo desta aula ainda não foi adicionado.</p>
          </div>
        ) : (
          <div className={styles.questionList}>
            {currentAula.questions.map((q, index) => (
              <QuestionCard key={q.id} question={q} number={index + 1} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
