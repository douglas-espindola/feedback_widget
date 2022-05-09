import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendEmailSpy }
)

describe('submit feedback', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,idufsdfsdfsdf',
    })).resolves.not.toThrow();
  });

  it('should not be able to submit a feedback without type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,idufsdfsdfsdf',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,idufsdfsdfsdf',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback invalid screenshot', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'tá tudo bugado',
      screenshot: 'teste.jpg',
    })).rejects.toThrow();
  });
});