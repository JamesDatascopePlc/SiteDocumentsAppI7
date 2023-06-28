import { memoize } from "lodash-es";
import { Question } from "../models";
import { ReplaySubject } from "rxjs";

export interface Branch {
  Answer: string,
  QuestionIndex: number
}

export const useBranching = memoize(() => {
  const questions: Question[] = [];
  const show = new ReplaySubject<Question[]>(1);
  const hide = new ReplaySubject<Question[]>(1);

  const update = ({ answer, branches }: { answer: string, branches: Branch[] }) => {
    const branchIndexes = branches.map(b => b.QuestionIndex);
    
    const showQuestions = questions.filter(q => branchIndexes.includes(q.Index));

    const questionBranchIndexes = branches
      .filter(b => b.Answer === answer)
      .map(b => b.QuestionIndex);

    const visibleQuestions = showQuestions.filter(q => questionBranchIndexes.includes(q.Index));
    const hiddenQuestions = showQuestions.filter(q => !questionBranchIndexes.includes(q.Index));

    show.next(visibleQuestions);
    hide.next(hiddenQuestions);
  }

  return {
    show,
    hide,
    update
  }
});