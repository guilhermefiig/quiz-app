import { useState } from "react";
import styles from "./QuestionCard.module.css";

export default function QuestionCard({ question, number }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  function handleSelect(optionId) {
    if (answered) return;
    setSelected(optionId);
    setAnswered(true);
  }

  function handleReset() {
    setSelected(null);
    setAnswered(false);
  }

  const isCorrect = selected === question.correct;

  return (
    <div className={styles.card}>
      <p className={styles.questionNumber}>Questão {number}</p>
      <p className={styles.questionText}>{question.text}</p>

      <div className={styles.options}>
        {question.options.map((option) => {
          let optionClass = styles.option;

          if (answered) {
            if (option.id === question.correct) {
              optionClass = `${styles.option} ${styles.correct}`;
            } else if (option.id === selected && !isCorrect) {
              optionClass = `${styles.option} ${styles.wrong}`;
            } else {
              optionClass = `${styles.option} ${styles.dimmed}`;
            }
          } else if (selected === option.id) {
            optionClass = `${styles.option} ${styles.selected}`;
          }

          return (
            <button
              key={option.id}
              className={optionClass}
              onClick={() => handleSelect(option.id)}
              disabled={answered}
            >
              <span className={styles.optionLetter}>{option.id}</span>
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
              <strong>{question.correct}</strong>:{" "}
              {question.options.find((o) => o.id === question.correct)?.text}
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
