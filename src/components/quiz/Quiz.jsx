import { useState, useRef } from "react";
import { data } from "../../assets/data";

import "./Quiz.css";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [ansClicked, setAnsClicked] = useState(false);
  let [score, setScore] = useState(0);
  let [finalResult, setfinalResult] = useState(false);
  const optionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  function answerClick(e, ans) {
    if(!ansClicked){

        if (question.ans === ans) {
          e.target.classList.add("correct");
          setAnsClicked(true);
          setScore((prevscore)=> prevscore+1)
        } else {
          e.target.classList.add("wrong");
          optionRefs[question.ans - 1].current.classList.add("correct");
          setAnsClicked(true);
        }
    }
  }

  function nextQuestion() {
if(ansClicked){
    if(index===data.length-1){
        setfinalResult(true)
        return;
    }
    
    setIndex(++index)
    setQuestion(data[index])
    setAnsClicked(false)
    optionRefs.map((option)=> option.current.classList.remove('correct'))
    optionRefs.map((option)=> option.current.classList.remove('wrong'))
}
  }

  function resetQuiz(){
    setIndex(0)
    setQuestion(data[index])
    setScore(0)
    setAnsClicked(false)
    setfinalResult(false)
    optionRefs.map((option)=> option.current.classList.remove('correct'))
    optionRefs.map((option)=> option.current.classList.remove('wrong'))
  }
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {finalResult? <>
      You scored {score} out of {data.length}
      <button onClick={resetQuiz}>Reset</button>
      </>: <> 
       <h2>
        {index + 1}. {question.question}
      </h2>
      <ul>
        <li ref={optionRefs[0]} onClick={(e) => answerClick(e, 1)}>{question.option1}</li>
        <li ref={optionRefs[1]} onClick={(e) => answerClick(e, 2)}>{question.option2}</li>
        <li ref={optionRefs[2]} onClick={(e) => answerClick(e, 3)}>{question.option3}</li>
        <li ref={optionRefs[3]} onClick={(e) => answerClick(e, 4)}>{question.option4}</li>
      </ul>

      <button onClick={nextQuestion}>Next</button>

      <div className="index">{index+1} of {data.length} questions</div>
      </>}
     
    </div>
  );
};

export default Quiz;
