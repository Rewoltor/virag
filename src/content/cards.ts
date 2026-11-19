// Ready-to-use card messages by occasion. Used by the card-message guide page and the MCP tool.
export const CARD_MESSAGES: Record<string, { label: string; messages: string[] }> = {
  just_because: {
    label: "Just because",
    messages: [
      "No reason. Just thinking about you.",
      "Saw these and thought of your smile.",
      "A little color for your Tuesday. You make every day better.",
      "Because you deserve flowers on an ordinary day too.",
      "Just a reminder that I'm lucky.",
      "You're my favorite part of every day.",
    ],
  },
  bad_week: {
    label: "She had a hard week",
    messages: [
      "Rough week. You handled it like a legend. I'm proud of you.",
      "For the hardest-working person I know. Tonight, you rest.",
      "Whatever this week threw at you — I'm on your side. Always.",
      "Breathe. You've got this, and you've got me.",
      "These are to remind you that this week will end and I'll still be here.",
      "Sending you a hug in flower form until I can give you the real one.",
    ],
  },
  apology: {
    label: "Apology",
    messages: [
      "I was wrong, and I'm sorry. You deserve better from me, and you'll get it.",
      "No excuses. I'm sorry I hurt you. Can I take you to dinner and listen?",
      "I'm sorry. I'd rather be close to you than right.",
      "I messed up. These won't fix it, but I hope they show I'm trying.",
      "I'm sorry for what I said. It isn't how I feel about you.",
      "You matter more to me than my pride. I'm sorry.",
    ],
  },
  anniversary: {
    label: "Anniversary",
    messages: [
      "Another year of you. Still my favorite decision.",
      "Happy anniversary. I'd choose you again in every lifetime.",
      "Here's to us — and to everything we haven't done yet.",
      "Every year with you is better than the last. Happy anniversary, love.",
      "Thank you for another year of laughing, growing and putting up with me.",
      "You still give me butterflies. Happy anniversary.",
    ],
  },
  birthday: {
    label: "Birthday",
    messages: [
      "Happy birthday to the most beautiful person I know, inside and out.",
      "The world got better the day you were born. Happy birthday.",
      "Another trip around the sun, and you just keep shining. Happy birthday!",
      "Happy birthday, love. Tonight is all about you.",
      "To the girl who makes every year the best one yet — happy birthday.",
      "Make a wish. Mine already came true.",
    ],
  },
  romantic: {
    label: "Romantic / I love you",
    messages: [
      "I love you. That's it, that's the card.",
      "You are my favorite hello and my hardest goodbye.",
      "Of all the places I could be, next to you is the only one I want.",
      "You make ordinary moments feel like something worth remembering.",
      "Thinking of you is my favorite hobby.",
      "I fall for you a little more every day.",
    ],
  },
  new_relationship: {
    label: "Early dating",
    messages: [
      "I had a really great time with you. Same time next week?",
      "Can't stop smiling since our date. Thank you for last night.",
      "Consider this my official request for a second date.",
      "Just wanted to brighten your day the way you brightened mine.",
      "Thinking about you. Is that okay?",
    ],
  },
  congratulations: {
    label: "Congratulations",
    messages: [
      "You did it! I knew you would. So proud of you.",
      "Congratulations — you earned every bit of this.",
      "To the new [job title]! The world is lucky to have you. So am I.",
      "Big win. Bigger celebration tonight. Congratulations!",
    ],
  },
  get_well: {
    label: "Get well",
    messages: [
      "Feel better soon. Soup, blankets and I are on the way.",
      "Sending you sunshine until you're back on your feet.",
      "Rest up, beautiful. I'll take care of everything else.",
    ],
  },
  long_distance: {
    label: "Long distance",
    messages: [
      "Miles apart, but you're always with me.",
      "Counting down the days until I can hand you flowers myself.",
      "Distance means so little when someone means so much.",
    ],
  },
};

export const OCCASIONS = Object.keys(CARD_MESSAGES);
