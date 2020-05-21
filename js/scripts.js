if (window.innerWidth <= 1024) {
  $(".website-wrapper").height(window.innerHeight);
}

window.addEventListener("resize", () => {
  $(".website-wrapper").height(window.innerHeight);

  if (window.innerWidth > 1024) {
    $(".betting-area").width(window.innerWidth * 0.75);
    $(".betting-area").height(window.innerWidth * 0.28);
  }

  if (window.innerWidth > 414 && window.innerWidth <= 1024) {
    $(".betting-area").width(window.innerHeight - 208);
    $(".betting-area").height((window.innerHeight - 192) * 0.45);
  }

  if (window.innerWidth <= 414) {
    $(".betting-area").width(window.innerHeight - 192);
    $(".betting-area").height((window.innerHeight - 192) * 0.45);
  }
});
if (window.innerWidth > 1024) {
  $(".betting-area").width(window.innerWidth * 0.75);
  $(".betting-area").height(window.innerWidth * 0.28);
}

if (window.innerWidth > 414 && window.innerWidth <= 1024) {
  $(".betting-area").width(window.innerHeight - 208);
  $(".betting-area").height((window.innerHeight - 192) * 0.45);
}

if (window.innerWidth <= 414) {
  $(".betting-area").width(window.innerHeight - 192);
  $(".betting-area").height((window.innerHeight - 192) * 0.45);
}

var rouletteNumbersRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

var rouletteNumbersBlack = [2, 4, 6, 8, 11, 10, 13, 15, 17, 20, 24, 22, 26, 28, 29, 31, 33, 35];

var rouletteNumbersArray = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

var rolledNumbersArray = [];

var rolledNumbersColorArray = [];

//sound effects start
var chipPutSound = new Audio("sounds/chip-put.mp3");
var selectSound = new Audio("sounds/chip-select.mp3");
var menuSound = new Audio("sounds/menu.mp3");
var ballSpinSound = new Audio("sounds/ball-spin.mp3");
var winSound = new Audio("sounds/win.mp3");
var winChipsSound = new Audio("sounds/win-chips.mp3");
var ambientSound = new Audio("sounds/ambient-sounds.mp3");
var backgroundMusic = new Audio("sounds/background-music.mp3");

$(".website-wrapper").click(function () {
  ambientSound.play();
  backgroundMusic.play();
});

ambientSound.loop = true;
backgroundMusic.loop = true;

function defaultVolume() {
  ambientSound.volume = 0.15;
  backgroundMusic.volume = 0.2;
  menuSound.volume = 0.3;
  selectSound.volume = 0.3;
  chipPutSound.volume = 0.2;
  ballSpinSound.volume = 0.5;
  winSound.volume = 0.4;
  winChipsSound.volume = 0.4;
}

defaultVolume();

//sound effects end

function classColorName(functionType) {
  if (functionType == "mouseover") {
    var className = "white-area";
  } else {
    var className = "marked-area";
  }
  return className;
}

function rowsBetRange(className, functionType) {
  if (className == 1) {
    var divNumber = 0;
  } else if (className == 2) {
    var divNumber = 2;
  } else if (className == 3) {
    var divNumber = 1;
  }

  $(".bet2to1-" + className).on(functionType, function () {
    for (var i = 1; i < 37; i++) {
      if (i % 3 == divNumber) {
        $(".number" + i).addClass(classColorName(functionType));
      }
    }
  });
}

function columnBetRange(className, functionType, rangeFrom, rangeTo) {
  $("." + className).on(functionType, function () {
    for (var i = rangeFrom; i <= rangeTo; i++) {
      $(".number" + i).addClass(classColorName(functionType));
    }
  });
}

function columnEvenOdd(className, functionType) {
  if (className == "column-even") {
    var index = 0;
  } else {
    var index = 1;
  }
  $("." + className).on(functionType, function () {
    for (var i = 1; i < 37; i++) {
      if (i % 2 == index) {
        $(".number" + i).addClass(classColorName(functionType));
      }
    }
  });
}

function columnRedBlack(className, functionType) {
  $(".column-" + className).on(functionType, function () {
    var firstCharUppercase = className[0].toUpperCase() + className.substring(1);
    for (var i = 0; i < 18; i++) {
      $(".number" + eval("rouletteNumbers" + firstCharUppercase + "[i]")).addClass(classColorName(functionType));
    }
  });
}

function regularNumbers(className, functionType) {
  $("." + className).on(functionType, function () {
    for (var i = 0; i < 37; i++) {
      if ($(this).hasClass(className + i)) {
        $(".number" + i).addClass(classColorName(functionType));
      }
    }
  });
}

function cornerNumbers(className, functionType) {
  $("." + className).on(functionType, function () {
    var index = 1;
    for (var i = 1; i < 37; i++) {
      if ($(this).hasClass(className + i)) {
        if (i % 3 == 2) {
          if (i == 2) {
            for (var a = 0; a < 3; a++) {
              $(".number" + a).addClass(classColorName(functionType));
            }
          } else {
            index = i;
            $(".number" + index).addClass(classColorName(functionType));
            index = index - 3;
            $(".number" + index).addClass(classColorName(functionType));
            index = index - 1;
            $(".number" + index).addClass(classColorName(functionType));
            index = index + 3;
            $(".number" + index).addClass(classColorName(functionType));
          }
        } else if (i % 3 == 0) {
          index = i;
          $(".number" + index).addClass(classColorName(functionType));
          index = index - 3;
          $(".number" + index).addClass(classColorName(functionType));
          index = index - 1;
          $(".number" + index).addClass(classColorName(functionType));
          index = index + 3;
          $(".number" + index).addClass(classColorName(functionType));
        } else {
          for (var a = i - 3; a < i + 3; a++) {
            if (i == 1) {
              for (var c = 0; c < 4; c++) {
                $(".number" + c).addClass(classColorName(functionType));
              }
            } else {
              $(".number" + a).addClass(classColorName(functionType));
            }
          }
        }
      }
    }
  });
}

function lineNumbers(className, functionType) {
  $("." + className).on(functionType, function () {
    var index = 0;
    for (var i = 0; i < 37; i++) {
      if ($(this).hasClass(className + i)) {
        $(".number" + i).addClass(classColorName(functionType));
        index = i - 3;
        if (i <= 3) {
          index = 0;
        }
        $(".number" + index).addClass(classColorName(functionType));
      }
    }
  });
}

function betweenNumbers(className, functionType) {
  $("." + className).on(functionType, function () {
    var index = 0;
    for (var i = 0; i < 37; i++) {
      if ($(this).hasClass(className + i)) {
        if (i % 3 == 1) {
          for (var a = i; a < i + 3; a++) {
            $(".number" + a).addClass(classColorName(functionType));
          }
        } else {
          index = i;
          $(".number" + index).addClass(classColorName(functionType));
          index = i - 1;
          $(".number" + index).addClass(classColorName(functionType));
        }
      }
    }
  });
}

rowsBetRange(1, "click");
rowsBetRange(2, "click");
rowsBetRange(3, "click");

rowsBetRange(1, "mouseover");
rowsBetRange(2, "mouseover");
rowsBetRange(3, "mouseover");

$(".number").mouseover(function () {
  $(this).addClass("white-area");
});

$(".bottom-column").mouseover(function () {
  $(this).addClass("white-area");
});

columnBetRange("column-1st12", "click", 1, 12);
columnBetRange("column-2nd12", "click", 13, 24);
columnBetRange("column-3rd12", "click", 25, 36);

columnBetRange("column-1st12", "mouseover", 1, 12);
columnBetRange("column-2nd12", "mouseover", 13, 24);
columnBetRange("column-3rd12", "mouseover", 25, 36);

columnBetRange("column-1to18", "click", 1, 18);
columnBetRange("column-19to36", "click", 19, 36);

columnBetRange("column-1to18", "mouseover", 1, 18);
columnBetRange("column-19to36", "mouseover", 19, 36);

columnEvenOdd("column-even", "click");
columnEvenOdd("column-odd", "click");

columnEvenOdd("column-even", "mouseover");
columnEvenOdd("column-odd", "mouseover");

columnRedBlack("red", "click");
columnRedBlack("black", "click");

columnRedBlack("red", "mouseover");
columnRedBlack("black", "mouseover");

regularNumbers("regular", "mouseover");
regularNumbers("regular", "click");

cornerNumbers("corner", "mouseover");
cornerNumbers("corner", "click");

lineNumbers("line", "mouseover");
lineNumbers("line", "click");

betweenNumbers("between", "mouseover");
betweenNumbers("between", "click");

$(".bottom-column").mouseleave(function () {
  $(".number").removeClass("white-area");
});

$(".number").mouseleave(function () {
  $(".number").removeClass("white-area");
});

$(".bottom-column").mouseleave(function () {
  $(".bottom-column").removeClass("white-area");
});

$(".part").mouseleave(function () {
  $(".number").removeClass("white-area");
});

//Chips selection start
var activeChip = "betting-chip-menu5";
var activeChipNumber = 5;

$(".betting-chip-menu").click(function () {
  $(".betting-chip-menu").removeClass("active-chip");
  $(this).addClass("active-chip");
  activeChipNumber = Number($(this).attr("id").substr(4));
  selectSound.play();
});

$(".betting-chip-menu").mouseover(function () {
  menuSound.play();
});

$("." + activeChip).addClass("active-chip");
//Chips selection end

//Chips placing start
var betSum = 0;
var cashSum = 1000;
var minBet = 5;
var maxBet = 1000;
$(".cash-total").html(cashSum + ".00");
var areaChipCount = 0;
var bankSum = cashSum;

$(".part").click(function () {
  if (bankSum >= betSum + activeChipNumber) {
    if (maxBet >= betSum + activeChipNumber) {
      chipPutSound.play();

      betSum = betSum + activeChipNumber;
      cashSum = cashSum - activeChipNumber;
      $(".bet-total").html(betSum + ".00");
      $(".cash-total").html(cashSum + ".00");

      if ($(this).has(".betting-chip").length) {
        var areaChipCount = Number(jQuery(this).children(".betting-chip").attr("id"));
        areaChipCount = areaChipCount + activeChipNumber;
        if (areaChipCount == 5) {
          activeChip = 10;
        } else if (areaChipCount >= 10 && areaChipCount < 20) {
          activeChip = 10;
        } else if (areaChipCount >= 20 && areaChipCount < 50) {
          activeChip = 20;
        } else if (areaChipCount >= 50 && areaChipCount < 100) {
          activeChip = 50;
        } else if (areaChipCount >= 100 && areaChipCount < 200) {
          activeChip = 100;
        } else if (areaChipCount >= 200) {
          activeChip = 200;
        }
        $(this).html('<div id="' + areaChipCount + '" class="betting-chip betting-chip-shadow betting-chip' + activeChip + '">' + areaChipCount + "</div>");
      } else {
        $(this).html('<div id="' + activeChipNumber + '" class="betting-chip betting-chip-shadow betting-chip' + activeChipNumber + '">' + activeChipNumber + "</div>");
      }
    } else {
      $(".alert-max-bet").addClass("alert-message-visible");
    }
  } else {
    $(".alert-money").addClass("alert-message-visible");
  }
});

$(".circle-overlay").mouseover(function () {
  menuSound.play();
});

$(".circle-overlay").click(function () {
  selectSound.play();
});

var timesClicked = 0;
$(".button-sound").click(function () {
  if (timesClicked % 2 == 0) {
    $(".cross-line").addClass("cross-line-display");
    ambientSound.volume = 0;
    backgroundMusic.volume = 0;
    menuSound.volume = 0;
    selectSound.volume = 0;
    chipPutSound.volume = 0;
    ballSpinSound.volume = 0;
    winSound.volume = 0;
    winChipsSound.volume = 0;
  } else {
    $(".cross-line").removeClass("cross-line-display");
    defaultVolume();
  }
  timesClicked++;
});

$(".button-reset").click(function () {
  $(".number").removeClass("marked-area");
  $(".part").html("");
  $(".bet-total").html("0.00");
  cashSum = cashSum + betSum;
  $(".cash-total").html(cashSum + ".00");
  betSum = 0;
});
//Chips placing end

var cashSumBefore = 0;
var winAmountOnScreen;

//Play button start
$(".button-spin").click(function () {
  win = false;

  if (betSum == 0) {
    $(".alert-bets").addClass("alert-message-visible");
  } else {
    ballSpinSound.play();
    winAmount = 0;
    winAmountOnScreen = 0;
    cashSumBefore = cashSum;

    rouletteNumber = Math.floor(Math.random() * 37 + 0);

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
        }
        cashSum = cashSum + winAmount;
        winAmount = 0;
      }
    }

    areaBetCheck("column-even", "", rouletteNumber % 2 == 0 && rouletteNumber != 0, 2);
    areaBetCheck("column-odd", "", rouletteNumber % 2 == 1, 2);

    areaBetCheck("column-1to18", "", rouletteNumber <= 18 && rouletteNumber != 0, 2);
    areaBetCheck("column-19to36", "", rouletteNumber >= 19, 2);

    areaBetCheck("column-1st12", "", rouletteNumber <= 12 && rouletteNumber != 0, 3);
    areaBetCheck("column-2nd12", "", rouletteNumber >= 13 && rouletteNumber <= 24, 3);
    areaBetCheck("column-3rd12", "", rouletteNumber >= 25, 3);

    areaBetCheck("bet2to1-1", "", rouletteNumber % 3 == 0 && rouletteNumber != 0, 3);
    areaBetCheck("bet2to1-2", "", rouletteNumber % 3 == 2, 3);
    areaBetCheck("bet2to1-3", "", rouletteNumber % 3 == 1, 3);

    for (i = 0; i <= 36; i++) {
      //Black and red numbers check
      if (i < 18) {
        areaBetCheck("column-red", "", rouletteNumber == rouletteNumbersRed[i], 2);
        areaBetCheck("column-black", "", rouletteNumber == rouletteNumbersBlack[i], 2);
      }
      //Regular numbers check
      areaBetCheck("regular", i, rouletteNumber == i, 36);

      if (i > 0) {
        //Line check
        if (i > 3) {
          areaBetCheck("line", i, rouletteNumber == i || rouletteNumber == i - 3, 18);
        } else {
          areaBetCheck("line", i, rouletteNumber == i || rouletteNumber == 0, 18);
        }

        //Between check
        if (i % 3 == 1) {
          areaBetCheck("between", i, rouletteNumber == i || rouletteNumber == i + 1 || rouletteNumber == i + 2, 12);
        } else {
          areaBetCheck("between", i, rouletteNumber == i || rouletteNumber == i - 1, 18);
        }

        //Corners check
        if (i == 1) {
          areaBetCheck("corner", i, rouletteNumber == i || rouletteNumber == i + 1 || rouletteNumber == i + 2 || rouletteNumber == i - 1, 9);
        } else if (i == 2 || i == 3) {
          areaBetCheck("corner", i, rouletteNumber == i || rouletteNumber == i - 1 || rouletteNumber == 0, 12);
        } else if (i > 3) {
          areaBetCheck("corner", i, rouletteNumber == i || rouletteNumber == i - 3 || rouletteNumber == i - 4 || rouletteNumber == i - 1, 9);
        }
      }
    }

    //Marking roulette wheel with number glow start
    var tableNumbersWithChips = [];
    for (i = 0; i <= 36; i++) {
      if ($(".number" + i).hasClass("marked-area")) {
        tableNumbersWithChips.push(i);
      }
    }

    for (a = 0; a <= 36; a++) {
      for (b = 0; b < tableNumbersWithChips.length; b++) {
        if (tableNumbersWithChips[b] == rouletteNumbersArray[a]) {
          $(".number-glow-container").append('<div class="number-glow number-glow' + a + '"></div>');
          var rotateAngle = (360 / 37) * a;
          document.querySelector(".number-glow" + a).style.transform = "rotate(" + rotateAngle + "deg)";
        }
      }
    }
    //Marking roulette wheel with number glow ends

    $(".ball-container").html('<div class="ball-spinner"><div class="ball"></div></div>');
    var ballContainer = document.querySelector(".ball-spinner");
    var sheet = document.createElement("style");

    for (i = 0; i < 37; i++) {
      if (rouletteNumber == rouletteNumbersArray[i]) {
        var ballLandingNumber = i;
      }
    }
    sheet.textContent =
      "" + "@-webkit-keyframes ball-container-animation" + " {" + "0% { transform: rotate(1440deg);" + "}" + "100% { transform: rotate(" + (360 / 37) * ballLandingNumber + "deg);" + "}";

    ballContainer.appendChild(sheet);

    $(".roulette-wheel-container").addClass("z-index-visible");
    $(".roulette-wheel-container").addClass("roulette-wheel-visible");

    $(".roulette-wheel-main").addClass("roulette-wheel-spin");
    $(".roulette-cross-shadow").addClass("roulette-wheel-spin");
    $(".roulette-cross").addClass("roulette-wheel-spin");

    //Last roll info at the top bar
    for (a = 0; a < 18; a++) {
      if (rouletteNumber == rouletteNumbersRed[a]) {
        rolledNumbersColorArray.splice(0, 0, "red");
        var lastRollColor = "red";
      }
      if (rouletteNumber == rouletteNumbersBlack[a]) {
        rolledNumbersColorArray.splice(0, 0, "black");
        var lastRollColor = "black";
      }
      if (rouletteNumber == 0) {
        rolledNumbersColorArray.splice(0, 0, "green");
        var lastRollColor = "green";
      }
    }

    rolledNumbersArray.splice(0, 0, rouletteNumber);

    if (rolledNumbersArray.length > 5) {
      rolledNumbersArray.splice(-1, 1);
      rolledNumbersColorArray.splice(-1, 1);
    }

    setTimeout(function () {
      for (i = 0; i < rolledNumbersArray.length; i++) {
        var rolledNumberIndex = i + 1;
        $(".roll" + rolledNumberIndex).html(rolledNumbersArray[i]);
        if (rolledNumbersColorArray[i] == "red") {
          $(".roll" + rolledNumberIndex).removeClass("roll-black");
          $(".roll" + rolledNumberIndex).removeClass("roll-green");
          $(".roll" + rolledNumberIndex).addClass("roll-red");
        } else if (rolledNumbersColorArray[i] == "black") {
          $(".roll" + rolledNumberIndex).removeClass("roll-red");
          $(".roll" + rolledNumberIndex).removeClass("roll-green");
          $(".roll" + rolledNumberIndex).addClass("roll-black");
        } else if (rolledNumbersColorArray[i] == "green") {
          $(".roll" + rolledNumberIndex).removeClass("roll-red");
          $(".roll" + rolledNumberIndex).removeClass("roll-black");
          $(".roll" + rolledNumberIndex).addClass("roll-green");
        }
      }
    }, 5000);
    //Last roll info at the top bar

    setTimeout(function () {
      $(".alert-spin-result").addClass("alert-message-visible");
      $(".results").addClass("alert-message-opacity");
    }, 5000);

    $(".results").addClass("roll-" + lastRollColor);

    if (rouletteNumber < 19) {
      $(".high-low").html("LOW");
    } else {
      $(".high-low").html("HIGH");
    }

    if (rouletteNumber % 2 == 1) {
      $(".odd-even").html("ODD");
    } else {
      $(".odd-even").html("EVEN");
    }

    $(".roll-number").html(rouletteNumber);

    if (win == true) {
      $(".win-lose").html("YOU WON");
      setTimeout(function () {
        winSound.play();
      }, 5300);
    } else {
      $(".win-lose").html("NO WIN");
    }

    if (winAmountOnScreen > 0) {
      $(".win-amount").html("$" + winAmountOnScreen + ".00");
    } else {
      $(".win-amount").html("");
    }
    bankSum = cashSum;
  }
});

$(".alert-bets").click(function () {
  $(".alert-bets").removeClass("alert-message-visible");
});

$(".alert-money").click(function () {
  $(".alert-money").removeClass("alert-message-visible");
});

$(".alert-max-bet").click(function () {
  $(".alert-max-bet").removeClass("alert-message-visible");
});

$(".alert-spin-result").click(function () {
  for (var i = 1; i <= 10; i++) {
    (function (i) {
      setTimeout(function () {
        cashSumBefore = cashSumBefore + winAmountOnScreen / 10;
        $(".cash-total").html(cashSumBefore + ".00");
      }, 50 * i);
    })(i);
  }

  $(".roulette-wheel-container").removeClass("roulette-wheel-visible");
  setTimeout(function () {
    $(".roulette-wheel-container").removeClass("z-index-visible");
  }, 1000);
  $(".number").removeClass("marked-area");

  $(".results").removeClass("alert-message-opacity");
  setTimeout(function () {
    $(".alert-spin-result").removeClass("alert-message-visible");
  }, 1000);

  if (win == true) {
    setTimeout(function () {
      winChipsSound.play();
    }, 500);
  }

  $(".roulette-wheel-main").removeClass("roulette-wheel-spin");
  $(".roulette-cross-shadow").removeClass("roulette-wheel-spin");
  $(".roulette-cross").removeClass("roulette-wheel-spin");

  $(".number-glow-container").html("");

  var timeout = setTimeout(function () {
    $(".results").removeClass("roll-red roll-black roll-green");
  }, 1000);

  $(".ball-container").html("");
  $(".part").html("");

  $(".bet-total").html("0.00");
  betSum = 0;
  if (cashSum <= 0) {
    $(".alert-game-over").addClass("alert-message-visible");
  }
});

$(".answer").mouseover(function () {
  menuSound.play();
});

$(".answer-yes").click(function () {
  $(".alert-game-over").removeClass("alert-message-visible");
  rolledNumbersArray = [];
  rolledNumbersColorArray = [];
  cashSum = 1000;
  bankSum = cashSum;
  betSum = 0;
  $(".roll").html("");
  $(".roll").removeClass("roll-red roll-black roll-green");
  $(".cash-total").html(cashSum + ".00");
  $(".bet-total").html(betSum + ".00");
});

$(".answer-no").click(function () {
  $(".alert-game-over").removeClass("alert-message-visible");
});

//Play button end
