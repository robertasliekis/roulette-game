// function defaultVolume() {
//   ambientSound.volume = 0.15;
//   backgroundMusic.volume = 0.2;
//   menuSound.volume = 0.3;
//   selectSound.volume = 0.3;
//   chipPutSound.volume = 0.2;
//   ballSpinSound.volume = 0.5;
//   winSound.volume = 0.4;
//   winChipsSound.volume = 0.4;
// }

//defaultVolume();

$(".button-sound").click(function () {
  if ($(".cross-line").hasClass("cross-line-display")) {
    $(".cross-line").removeClass("cross-line-display");
    playAudio = true;
    // defaultVolume();
  } else {
    $(".cross-line").addClass("cross-line-display");
    playAudio = false;
    ambientSound.pause();
    backgroundMusic.pause();
    // ambientSound.volume = 0;
    // backgroundMusic.volume = 0;
    // menuSound.volume = 0;
    // selectSound.volume = 0;
    // chipPutSound.volume = 0;
    // ballSpinSound.volume = 0;
    // winSound.volume = 0;
    // winChipsSound.volume = 0;
  }
});

if ($(".column-red div").hasClass("betting-chip")) {
  var areaChipCount = Number(jQuery(".column-red").children(".betting-chip").attr("id"));
  if (rouletteNumber % 2 == 0 && rouletteNumber != 0) {
    win = true;
    winAmount = areaChipCount;
    winAmountOnScreen = winAmountOnScreen + areaChipCount * 2;
  } else {
    winAmount = -areaChipCount;
  }
  cashSum = cashSum + winAmount;
}

if ($(".column-black div").hasClass("betting-chip")) {
  var areaChipCount = Number(jQuery(".column-black").children(".betting-chip").attr("id"));
  if (rouletteNumber % 2 == 1) {
    win = true;
    winAmount = areaChipCount;
    winAmountOnScreen = winAmountOnScreen + areaChipCount * 2;
  } else {
    winAmount = -areaChipCount;
  }
  cashSum = cashSum + winAmount;
}

if ($(".column-even div").hasClass("betting-chip")) {
  var areaChipCount = Number(jQuery(".column-red").children(".betting-chip").attr("id"));
  if (rouletteNumber % 2 == 0 && rouletteNumber != 0) {
    win = true;
    winAmount = areaChipCount;
    winAmountOnScreen = winAmountOnScreen + areaChipCount * 2;
  } else {
    winAmount = -areaChipCount;
  }
  cashSum = cashSum + winAmount;
}

if ($(".column-odd div").hasClass("betting-chip")) {
  var areaChipCount = Number(jQuery(".column-odd").children(".betting-chip").attr("id"));
  if (rouletteNumber % 2 == 1) {
    win = true;
    winAmount = areaChipCount;
    winAmountOnScreen = winAmountOnScreen + areaChipCount * 2;
  } else {
    winAmount = -areaChipCount;
  }
  cashSum = cashSum + winAmount;
}

$(".bet2to1-1").mouseover(function () {
  for (var i = 1; i < 37; i++) {
    if (i % 3 == 0) {
      $(".number" + i).addClass("white-area");
    }
  }
});

$(".bet2to1-2").mouseover(function () {
  for (var i = 1; i < 37; i++) {
    if (i % 3 == 2) {
      $(".number" + i).addClass("white-area");
    }
  }
});

$(".bet2to1-3").mouseover(function () {
  for (var i = 1; i < 37; i++) {
    if (i % 3 == 1) {
      $(".number" + i).addClass("white-area");
    }
  }
});

$(".column-1st12").mouseover(function () {
  for (var i = 1; i < 13; i++) {
    $(".number" + i).addClass("white-area");
  }
});

$(".column-2nd12").mouseover(function () {
  for (var i = 13; i < 25; i++) {
    $(".number" + i).addClass("white-area");
  }
});

$(".column-3rd12").mouseover(function () {
  for (var i = 25; i < 37; i++) {
    $(".number" + i).addClass("white-area");
  }
});

$(".column-1to18").mouseover(function () {
  for (var i = 1; i < 19; i++) {
    $(".number" + i).addClass("white-area");
  }
});

$(".column-19to36").mouseover(function () {
  for (var i = 19; i < 37; i++) {
    $(".number" + i).addClass("white-area");
  }
});

$(".column-even").mouseover(function () {
  for (var i = 1; i < 37; i++) {
    if (i % 2 == 0) {
      $(".number" + i).addClass("white-area");
    }
  }
});

$(".column-odd").mouseover(function () {
  for (var i = 1; i < 37; i++) {
    if (i % 2 == 1) {
      $(".number" + i).addClass("white-area");
    }
  }
});

$(".column-red").mouseover(function () {
  for (var i = 0; i < 18; i++) {
    $(".number" + rouletteNumbersRed[i]).addClass("white-area");
  }
});

$(".column-black").mouseover(function () {
  for (var i = 0; i < 18; i++) {
    $(".number" + rouletteNumbersBlack[i]).addClass("white-area");
  }
});

$(".regular").mouseover(function () {
  for (var i = 1; i < 37; i++) {
    if ($(this).hasClass("regular" + i)) {
      $(".number" + i).addClass("white-area");
    }
  }
});

$(".corner").mouseover(function () {
  var index = 1;
  for (var i = 2; i < 37; i++) {
    if ($(this).hasClass("corner" + i)) {
      if (i % 3 == 2) {
        index = i;
        $(".number" + index).addClass("white-area");
        index = index - 3;
        $(".number" + index).addClass("white-area");
        index = index - 1;
        $(".number" + index).addClass("white-area");
        index = index + 3;
        $(".number" + index).addClass("white-area");
      } else if (i % 3 == 0) {
        index = i;
        $(".number" + index).addClass("white-area");
        index = index - 3;
        $(".number" + index).addClass("white-area");
        index = index - 1;
        $(".number" + index).addClass("white-area");
        index = index + 3;
        $(".number" + index).addClass("white-area");
      } else {
        for (var a = i - 3; a < i + 3; a++) {
          $(".number" + a).addClass("white-area");
        }
      }
    }
  }
});

$(".corner1").mouseover(function () {
  for (var i = 0; i < 4; i++) {
    $(".number" + i).addClass("white-area");
  }
});

$(".corner2").mouseover(function () {
  for (var i = 0; i < 3; i++) {
    $(".number" + i).addClass("white-area");
  }
});

$(".corner3").mouseover(function () {
  $(".number0").addClass("white-area");
  $(".number2").addClass("white-area");
  $(".number3").addClass("white-area");
});

$(".line").mouseover(function () {
  var index = 0;
  for (var i = 0; i < 37; i++) {
    if ($(this).hasClass("line" + i)) {
      $(".number" + i).addClass("white-area");
      index = i - 3;
      if (i <= 3) {
        index = 0;
      }
      $(".number" + index).addClass("white-area");
    }
  }
});

$(".between").mouseover(function () {
  var index = 0;
  for (var i = 0; i < 37; i++) {
    if ($(this).hasClass("between" + i)) {
      if (i % 3 == 1) {
        for (var a = i; a < i + 3; a++) {
          $(".number" + a).addClass("white-area");
        }
      } else {
        index = i;
        $(".number" + index).addClass("white-area");
        index = i - 1;
        $(".number" + index).addClass("white-area");
      }
    }
  }
});

function columnBets(columnName, equation, winMultiplier) {
  if ($("." + columnName + " div").hasClass("betting-chip")) {
    var areaChipCount = Number(
      jQuery("." + columnName + "")
        .children(".betting-chip")
        .attr("id")
    );

    if (equation) {
      win = true;
      winAmount = areaChipCount * winMultiplier;
      winAmountOnScreen = winAmountOnScreen + areaChipCount * winMultiplier;
    } else {
      //winAmount = -areaChipCount;
    }
    cashSum = cashSum + winAmount;
  }
}

for (i = 1; i <= 36; i++) {
  if (i > 3) {
    areaBetCheck("line", i, rouletteNumber == i || rouletteNumber == i - 3, 18);
  } else {
    areaBetCheck("line", i, rouletteNumber == i || rouletteNumber == 0, 18);
  }
}

for (i = 1; i <= 36; i++) {
  if (i % 3 == 1) {
    areaBetCheck("between", i, rouletteNumber == i || rouletteNumber == i + 1 || rouletteNumber == i + 2, 12);
  } else {
    areaBetCheck("between", i, rouletteNumber == i || rouletteNumber == i - 1, 18);
  }
}

for (i = 1; i <= 36; i++) {
  if (i == 1) {
    areaBetCheck("corner", i, rouletteNumber == i || rouletteNumber == i + 1 || rouletteNumber == i + 2 || rouletteNumber == i - 1, 9);
  } else if (i == 2 || i == 3) {
    areaBetCheck("corner", i, rouletteNumber == i || rouletteNumber == i - 1 || rouletteNumber == 0, 12);
  } else if (i > 3) {
    areaBetCheck("corner", i, rouletteNumber == i || rouletteNumber == i - 3 || rouletteNumber == i - 4 || rouletteNumber == i - 1, 9);
  }
}

function areaBetCheck(columnName, columnNumber, equation, winMultiplier) {
  if ($("." + columnName + columnNumber + " div").hasClass("betting-chip")) {
    var areaChipCount = Number(
      jQuery("." + columnName + columnNumber + "")
        .children(".betting-chip")
        .attr("id")
    );
    if (equation) {
      win = true;
      winAmount = areaChipCount * winMultiplier;
      winAmountOnScreen = winAmountOnScreen + areaChipCount * winMultiplier;
    } else {
      //winAmount = -areaChipCount;
    }
    cashSum = cashSum + winAmount;
    winAmount = 0;
  }
}

ambi;
