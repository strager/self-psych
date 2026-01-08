import type { Exam } from '../types'

// Frost Multidimensional Perfectionism Scale (FMPS)
// Source: Frost, R. O., Marten, P., Lahart, C., & Rosenblate, R. (1990).
//         The dimensions of perfectionism. Cognitive Therapy and Research,
//         14(5), 449-468.
// https://doi.org/10.1037/t05500-000

export const fmps: Exam = {
  id: 'fmps',
  name: 'Frost Multidimensional Perfectionism Scale',
  scaleMax: 5,
  reversedItems: [],
  excludeFromTotal: ['Organization'],
  subscales: [
    {
      name: 'Concern over Mistakes and Doubts',
      itemIds: [9, 10, 13, 14, 17, 18, 21, 23, 25, 28, 32, 33, 34]
    },
    {
      name: 'Parental Expectations',
      itemIds: [1, 3, 5, 11, 15, 20, 22, 26, 35]
    },
    {
      name: 'Personal Standards',
      itemIds: [4, 6, 12, 16, 19, 24, 30]
    },
    {
      name: 'Organization',
      itemIds: [2, 7, 8, 27, 29, 31]
    }
  ],
  questions: [
    { id: 1, text: 'My parents set very high standards for me.', reversed: false },
    { id: 2, text: 'Organization is very important to me.', reversed: false },
    { id: 3, text: 'As a child, I was punished for doing things less than perfect.', reversed: false },
    { id: 4, text: 'If I do not set the highest standards for myself, I am likely to end up a second-rate person.', reversed: false },
    { id: 5, text: 'My parents never tried to understand my mistakes.', reversed: false },
    { id: 6, text: 'It is important to me that I be thoroughly competent in everything I do.', reversed: false },
    { id: 7, text: 'I am a neat person.', reversed: false },
    { id: 8, text: 'I try to be an organized person.', reversed: false },
    { id: 9, text: 'If I fail at work/school, I am a failure as a person.', reversed: false },
    { id: 10, text: 'I should be upset if I make a mistake.', reversed: false },
    { id: 11, text: 'My parents wanted me to be the best at everything.', reversed: false },
    { id: 12, text: 'I set higher goals than most people.', reversed: false },
    { id: 13, text: 'If someone does a task at work/school better than I, then I feel like I failed the whole task.', reversed: false },
    { id: 14, text: 'If I fail partly, it is as bad as being a complete failure.', reversed: false },
    { id: 15, text: 'Only outstanding performance is good enough in my family.', reversed: false },
    { id: 16, text: 'I am very good at focusing my efforts on attaining a goal.', reversed: false },
    { id: 17, text: 'Even when I do something very carefully, I often feel that it is not quite right.', reversed: false },
    { id: 18, text: 'I hate being less than the best at things.', reversed: false },
    { id: 19, text: 'I have extremely high goals.', reversed: false },
    { id: 20, text: 'My parents have expected excellence from me.', reversed: false },
    { id: 21, text: 'People will probably think less of me if I make a mistake.', reversed: false },
    { id: 22, text: "I never felt like I could meet my parents' expectations.", reversed: false },
    { id: 23, text: 'If I do not do as well as other people, it means I am an inferior human being.', reversed: false },
    { id: 24, text: 'Other people seem to accept lower standards from themselves than I do.', reversed: false },
    { id: 25, text: 'If I do not do well all the time, people will not respect me.', reversed: false },
    { id: 26, text: 'My parents have always had higher expectations for my future than I have.', reversed: false },
    { id: 27, text: 'I try to be a neat person.', reversed: false },
    { id: 28, text: 'I usually have doubts about the simple everyday things I do.', reversed: false },
    { id: 29, text: 'Neatness is very important to me.', reversed: false },
    { id: 30, text: 'I expect higher performance in my daily tasks than most people.', reversed: false },
    { id: 31, text: 'I am an organized person.', reversed: false },
    { id: 32, text: 'I tend to get behind in my work because I repeat things over and over.', reversed: false },
    { id: 33, text: 'It takes me a long time to do something "right."', reversed: false },
    { id: 34, text: 'The fewer mistakes I make, the more people will like me.', reversed: false },
    { id: 35, text: "I never felt like I could meet my parents' standards.", reversed: false }
  ]
}
