import type { Exam } from '../types'

// Perfectionistic Self-Presentation Scale (PSPS)
// Source: Hewitt, P. L., Flett, G. L., Sherry, S. B., Habke, M., Parkin, M.,
//         Lam, R. W., McMurtry, B., Ediger, E., Fairlie, P., & Stein, M. B. (2003).
//         The interpersonal expression of perfection: Perfectionistic self-presentation
//         and psychological distress. Journal of Personality and Social Psychology,
//         84(6), 1303-1325.
// https://hewittlab.sites.olt.ubc.ca/files/2014/11/2003-Hewitt-et-al.-The-interpersonal-expression-of-perfection-perfectionistic-self-presentation-and-psychological-distress.pdf

export const psps: Exam = {
  id: 'psps',
  name: 'Perfectionistic Self-Presentation Scale',
  reversedItems: [1, 11, 16, 18, 22],
  subscales: [
    {
      name: 'Perfectionistic Self-Promotion',
      itemIds: [5, 7, 11, 15, 17, 18, 23, 25, 26, 27]
    },
    {
      name: 'Nondisplay of Imperfection',
      itemIds: [2, 3, 4, 6, 8, 10, 12, 20, 22, 24]
    },
    {
      name: 'Nondisclosure of Imperfection',
      itemIds: [1, 9, 13, 14, 16, 19, 21]
    }
  ],
  questions: [
    { id: 1, text: 'It is okay to show others that I am not perfect', reversed: true },
    { id: 2, text: 'I judge myself based on the mistakes I make in front of other people', reversed: false },
    { id: 3, text: 'I will do almost anything to cover up a mistake', reversed: false },
    { id: 4, text: 'Errors are much worse if they are made in public rather than in private', reversed: false },
    { id: 5, text: 'I try always to present a picture of perfection', reversed: false },
    { id: 6, text: 'It would be awful if I made a fool of myself in front of others', reversed: false },
    { id: 7, text: 'If I seem perfect, others will see me more positively', reversed: false },
    { id: 8, text: 'I brood over mistakes that I have made in front of others', reversed: false },
    { id: 9, text: 'I never let others know how hard I work on things', reversed: false },
    { id: 10, text: 'I would like to appear more competent than I really am', reversed: false },
    { id: 11, text: "It doesn't matter if there is a flaw in my looks", reversed: true },
    { id: 12, text: 'I do not want people to see me do something unless I am very good at it', reversed: false },
    { id: 13, text: 'I should always keep my problems to myself', reversed: false },
    { id: 14, text: 'I should solve my own problems rather than admit them to others', reversed: false },
    { id: 15, text: 'I must appear to be in control of my actions at all times', reversed: false },
    { id: 16, text: 'It is okay to admit mistakes to others', reversed: true },
    { id: 17, text: 'It is important to act perfectly in social situations', reversed: false },
    { id: 18, text: "I don't really care about being perfectly groomed", reversed: true },
    { id: 19, text: 'Admitting failure to others is the worst possible thing', reversed: false },
    { id: 20, text: 'I hate to make errors in public', reversed: false },
    { id: 21, text: 'I try to keep my faults to myself', reversed: false },
    { id: 22, text: 'I do not care about making mistakes in public', reversed: true },
    { id: 23, text: 'I need to be seen as perfectly capable in everything I do', reversed: false },
    { id: 24, text: 'Failing at something is awful if other people know about it', reversed: false },
    { id: 25, text: 'It is very important that I always appear to be "on top of things"', reversed: false },
    { id: 26, text: 'I must always appear to be perfect', reversed: false },
    { id: 27, text: 'I strive to look perfect to others', reversed: false }
  ]
}

export const exams: Exam[] = [psps]
