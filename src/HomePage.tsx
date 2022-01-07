/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions, QuestionData } from './QuestionsData';
//import { getUnansweredQuestions } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { PrimaryButton } from './Styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   gettingUnansweredQuestionsAction,
//   gotUnansweredQuestionsAction,
//   AppState,
// } from './Store';

export const HomePage = () => {
  // const dispatch = useDispatch();
  // const questions = useSelector(
  //   (state: AppState) => state.questions.unanswered
  // );
  // const questionsLoading = useSelector(
  //   (state: AppState) => state.questions.loading
  // );

  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const [questionsLoading, setQuestionsLoading] = React.useState(true);

  React.useEffect(() => {
    // const doGetUnansweredQuestions = async () => {
    //   dispatch(gettingUnansweredQuestionsAction());
    //   const unansweredQuestions = await getUnansweredQuestions();
    //   dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
    // };

    let cancelled = false;
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      if (!cancelled) {
        setQuestions(unansweredQuestions);
        setQuestionsLoading(false);
      }
    };

    doGetUnansweredQuestions();

    return () => {
      cancelled = true;
    };
  }, []);

  const navigate = useNavigate();
  const handleAskQuestionClick = () => {
    navigate('ask');
  };

  const { isAuthenticated } = useAuth();

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        {isAuthenticated && (
          <PrimaryButton onClick={handleAskQuestionClick}>
            Ask a question
          </PrimaryButton>
        )}
      </div>
      {questionsLoading ? (
        <div>Loading…</div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
