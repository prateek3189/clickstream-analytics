// [left option, right option, key]
const QUESTIONS = [
  ['tabs', 'spaces', 'tabs_spaces'],
  ['vim', 'emacs', 'vim_emacs'],
];
let vote = {};

$(window).on("load", function() {
  loadQuestions();
});

function loadQuestions() {
  for (var i = 0; i < QUESTIONS.length; i++) {
    $('#body').append(' \
      <div id="q' + i + '" class="question"> \
        <div id="q' + i + '-left" class="option option-left">' + QUESTIONS[i][0] + '<div class="option-stats"></div></div> \
        <div class="spacer"></div> \
        <div class="prompt"> \
          <div>⟵ (press h)</div> \
          <div class="centered">vote to see results</div> \
          <div>(press l) ⟶</div> \
        </div> \
        <div class="results"> \
          <div class="bar left"><div class="stats"></div></div> \
          <div class="bar right"><div class="stats"></div></div> \
        </div> \
        <div id="q' + i + '-right" class="option option-right">' + QUESTIONS[i][1] + '<div class="option-stats"></div></div> \
      </div> \
    ');
  
    $('#q' + i + '-left').click(handleClickFalse(i));
    $('#q' + i + '-right').click(handleClickTrue(i));
  }
}

function handleClickFalse(index) {
  return () => { applyVote(index, false) };
}

function handleClickTrue(index) {
  return () => { applyVote(index, true) };
}

function applyVote(index, value) {
  vote[QUESTIONS[index][2]] = value;
  saveVote();
}

function saveVote() {
  // Save to Rockset
  $.ajax({
    url: 'https://clickstream-analytics.firebaseio.com/survey.json',
    type: 'POST',
    data: JSON.stringify(vote)
  });
}
