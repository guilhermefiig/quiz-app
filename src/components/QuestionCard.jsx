import { useState, useMemo } from "react";
import styles from "./QuestionCard.module.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuestionCard({ question, number }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  // Shuffle options once on mount, then relabel A, B, C, D, E in visual order
  const shuffledOptions = useMemo(() => {
    const shuffled = shuffle([...question.options]);
    return shuffled.map((opt, i) => ({
      ...opt,
      label: String.fromCharCode(65 + i), // A, B, C, D, E
    }));
  }, [question.id]);

  // Find which new label corresponds to the correct answer
  const correctLabel = shuffledOptions.find((o) => o.id === question.correct)?.label;

  function handleSelect(label) {
    if (answered) return;
    setSelected(label);
    setAnswered(true);
  }

  function handleReset() {
    setSelected(null);
    setAnswered(false);
  }

  const isCorrect = selected === correctLabel;

  return (
    <div className={styles.card}>
      <p className={styles.questionNumber}>Questão {number}</p>
      <p className={styles.questionText}>{question.text}</p>

      <div className={styles.options}>
        {shuffledOptions.map((option) => {
          let optionClass = styles.option;

          if (answered) {
            if (option.label === correctLabel) {
              optionClass = `${styles.option} ${styles.correct}`;
            } else if (option.label === selected && !isCorrect) {
              optionClass = `${styles.option} ${styles.wrong}`;
            } else {
              optionClass = `${styles.option} ${styles.dimmed}`;
            }
          } else if (selected === option.label) {
            optionClass = `${styles.option} ${styles.selected}`;
          }

          return (
            <button
              key={option.label}
              className={optionClass}
              onClick={() => handleSelect(option.label)}
              disabled={answered}
            >
              <span className={styles.optionLetter}>{option.label}</span>
              <span className={styles.optionText}>{option.text}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}>
          {isCorrect ? (
            <span>Correto!</span>
          ) : (
            <span>
              Errado! A resposta correta é a alternativa{" "}
              <strong>{correctLabel}</strong>:{" "}
              {shuffledOptions.find((o) => o.label === correctLabel)?.text}
            </span>
          )}
          <button className={styles.resetBtn} onClick={handleReset}>
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
}
