const resizeWindow = () => {
  const sizeGuidelines = () => {
    if (window.innerWidth > 1024) {
      $(".betting-area")
        .width(window.innerWidth * 0.75)
        .height(window.innerWidth * 0.28);
    }

    if (window.innerWidth > 414 && window.innerWidth <= 1024) {
      $(".betting-area")
        .width(window.innerHeight - 208)
        .height((window.innerHeight - 192) * 0.45);
    }

    if (window.innerWidth <= 414) {
      $(".betting-area")
        .width(window.innerHeight - 192)
        .height((window.innerHeight - 192) * 0.45);
    }
  };

  if (window.innerWidth <= 1024) {
    $(".website-wrapper").height(window.innerHeight);
  }

  window.addEventListener("resize", () => {
    $(".website-wrapper").height(window.innerHeight);
    sizeGuidelines();
  });

  sizeGuidelines();
};

resizeWindow();

const rouletteNumbersRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const rouletteNumbersBlack = [2, 4, 6, 8, 11, 10, 13, 15, 17, 20, 24, 22, 26, 28, 29, 31, 33, 35];
const rouletteNumbersArray = [
  0,
  32,
  15,
  19,
  4,
  21,
  2,
  25,
  17,
  34,
  6,
  27,
  13,
  36,
  11,
  30,
  8,
  23,
  10,
  5,
  24,
  16,
  33,
  1,
  20,
  14,
  31,
  9,
  22,
  18,
  29,
  7,
  28,
  12,
  35,
  3,
  26
];
const betRangeArray = [
  { name: "column-1st12", rangeStart: 1, rangeEnd: 12 },
  { name: "column-2nd12", rangeStart: 13, rangeEnd: 24 },
  { name: "column-3rd12", rangeStart: 25, rangeEnd: 36 },
  { name: "column-1to18", rangeStart: 1, rangeEnd: 18 },
  { name: "column-19to36", rangeStart: 19, rangeEnd: 36 }
];
const rouletteNumbersAmount = 37;

let activeChip = "betting-chip-menu5";
let activeChipNumber = 5;

let rolledNumbersArray = [];
let rolledNumbersColorArray = [];
const mouseEventType = ["click", "mouseover"];

const chipPutSound = new Audio("sounds/chip-put.mp3");
const selectSound = new Audio("sounds/chip-select.mp3");
const menuSound = new Audio("sounds/menu.mp3");
const ballSpinSound = new Audio("sounds/ball-spin.mp3");
const winSound = new Audio("sounds/win.mp3");
const winChipsSound = new Audio("sounds/win-chips.mp3");
const ambientSound = new Audio("sounds/ambient-sounds.mp3");
const backgroundMusic = new Audio("sounds/background-music.mp3");

var playAudio = true;
var userInteraction = false;

$(".website-wrapper").click(function () {
  userInteraction = true;
  if (playAudio) {
    ambientSound.play();
    backgroundMusic.play();
  }
});

ambientSound.loop = true;
backgroundMusic.loop = true;

const classColorName = (functionType) => {
  let className;
  functionType == "mouseover" ? (className = "white-area") : (className = "marked-area");
  return className;
};

const rowsBetRange = () => {
  for (let className = 1; className <= 3; className++) {
    let divNumber;
    switch (className) {
      case 1:
        divNumber = 0;
        break;
      case 2:
        divNumber = 2;
        break;
      case 3:
        divNumber = 1;
        break;
    }
    mouseEventType.forEach((functionType) => {
      $(`.bet2to1-${className}`).on(functionType, function () {
        for (let i = 1; i < rouletteNumbersAmount; i++) {
          if (i % 3 == divNumber) $(`.number${i}`).addClass(classColorName(functionType));
        }
      });
    });
  }
};

const columnBetRange = () => {
  mouseEventType.forEach((functionType) => {
    betRangeArray.forEach((el) => {
      $(`.${el.name}`).on(functionType, function () {
        for (let i = el.rangeStart; i <= el.rangeEnd; i++) {
          $(`.number${i}`).addClass(classColorName(functionType));
        }
      });
    });
  });
};

const columnEvenOdd = () => {
  ["column-even", "column-odd"].forEach((className) => {
    let index;
    className == "column-even" ? (index = 0) : (index = 1);
    mouseEventType.forEach((functionType) => {
      $(`.${className}`).on(functionType, function () {
        for (let i = 1; i < rouletteNumbersAmount; i++) {
          if (i % 2 == index) {
            $(`.number${i}`).addClass(classColorName(functionType));
          }
        }
      });
    });
  });
};

const columnRedBlack = () => {
  mouseEventType.forEach((functionType) => {
    ["red", "black"].forEach((className) => {
      $(`.column-${className}`).on(functionType, function () {
        let firstCharUppercase = className[0].toUpperCase() + className.substring(1);
        for (let i = 0; i < 18; i++) {
          $(`.number${eval(`rouletteNumbers${firstCharUppercase}[i]`)}`).addClass(classColorName(functionType));
        }
      });
    });
  });
};

const regularNumbers = () => {
  mouseEventType.forEach((functionType) => {
    $(".regular").on(functionType, function () {
      for (let i = 0; i < rouletteNumbersAmount; i++) {
        if ($(this).hasClass(`regular${i}`)) {
          $(`.number${i}`).addClass(classColorName(functionType));
        }
      }
    });
  });
};

const cornerNumbers = () => {
  mouseEventType.forEach((functionType) => {
    $(".corner").on(functionType, function () {
      for (let i = 1; i < rouletteNumbersAmount; i++) {
        if ($(this).hasClass(`corner${i}`)) {
          switch (i % 3) {
            case 2:
              if (i == 2) {
                for (let a = 0; a < 3; a++) {
                  $(`.number${a}`).addClass(classColorName(functionType));
                }
              } else {
                document
                  .querySelectorAll(`.number${i} ,.number${i - 3}, .number${i - 4}, .number${i - 1}`)
                  .forEach((el) => el.classList.add(classColorName(functionType)));
              }
              break;
            case 0:
              document
                .querySelectorAll(`.number${i} ,.number${i - 3}, .number${i - 4}, .number${i - 1}`)
                .forEach((el) => el.classList.add(classColorName(functionType)));
              break;
            default:
              for (let a = i - 3; a < i + 3; a++) {
                if (i == 1) {
                  for (let c = 0; c < 4; c++) {
                    $(`.number${c}`).addClass(classColorName(functionType));
                  }
                } else {
                  $(`.number${a}`).addClass(classColorName(functionType));
                }
              }
          }
        }
      }
    });
  });
};

const lineNumbers = () => {
  mouseEventType.forEach((functionType) => {
    $(`.line`).on(functionType, function () {
      let index = 0;
      for (let i = 0; i < rouletteNumbersAmount; i++) {
        if ($(this).hasClass(`line${i}`)) {
          $(`.number${i}`).addClass(classColorName(functionType));
          index = i - 3;
          if (i <= 3) {
            index = 0;
          }
          $(`.number${index}`).addClass(classColorName(functionType));
        }
      }
    });
  });
};

const betweenNumbers = (className, functionType) => {
  mouseEventType.forEach((functionType) => {
    $(`.between`).on(functionType, function () {
      for (let i = 0; i < rouletteNumbersAmount; i++) {
        if ($(this).hasClass(`between${i}`)) {
          if (i % 3 == 1) {
            for (let a = i; a < i + 3; a++) {
              $(`.number${a}`).addClass(classColorName(functionType));
            }
          } else {
            document.querySelectorAll(`.number${i} ,.number${i - 1}`).forEach((el) => el.classList.add(classColorName(functionType)));
          }
        }
      }
    });
  });
};

rowsBetRange();
columnBetRange();
columnEvenOdd();
columnRedBlack();
regularNumbers();
cornerNumbers();
lineNumbers();
betweenNumbers();

document.querySelectorAll(`.number, .bottom-column`).forEach((el) => {
  el.addEventListener("mouseover", function () {
    $(this).addClass("white-area");
  });
});

document.querySelectorAll(`.number, .bottom-column`).forEach((el) => {
  el.addEventListener("mouseleave", function () {
    $(this).removeClass("white-area");
  });
});

$(".part").mouseleave(function () {
  $(".number").removeClass("white-area");
});

const chipSelection = () => {
  $(".betting-chip-menu").click(function () {
    $(".betting-chip-menu").removeClass("active-chip");
    $(this).addClass("active-chip");
    activeChipNumber = Number($(this).attr("id").substr(4));
    if (playAudio) {
      selectSound.play();
    }
  });

  $(".betting-chip-menu").mouseover(function () {
    if (playAudio && userInteraction) {
      menuSound.play();
    }
  });

  $(`.${activeChip}`).addClass("active-chip");
};

chipSelection();

//Chips placing start
var betSum = 0;
var cashSum = 1000;
var minBet = 5;
var maxBet = 1000;
var areaChipCount = 0;
var bankSum = cashSum;
$(".cash-total").html(`${cashSum}.00`);

$(".part").click(function () {
  if (bankSum >= betSum + activeChipNumber) {
    if (maxBet >= betSum + activeChipNumber) {
      if (playAudio) {
        chipPutSound.play();
      }

      betSum = betSum + activeChipNumber;
      cashSum = cashSum - activeChipNumber;
      $(".bet-total").html(`${betSum}.00`);
      $(".cash-total").html(`${cashSum}.00`);

      if ($(this).has(".betting-chip").length) {
        areaChipCount = Number(jQuery(this).children(".betting-chip").attr("id"));
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
        $(this).html(
          `<div id="${areaChipCount}" class="betting-chip betting-chip-shadow betting-chip${activeChip}">${areaChipCount}</div>`
        );
      } else {
        $(this).html(
          `<div id="${activeChipNumber}" class="betting-chip betting-chip-shadow betting-chip${activeChipNumber}">${activeChipNumber}</div>`
        );
      }
    } else {
      $(".alert-max-bet").addClass("alert-message-visible");
    }
  } else {
    $(".alert-money").addClass("alert-message-visible");
  }
});

$(".circle-overlay").mouseover(function () {
  if (playAudio && userInteraction) {
    menuSound.play();
  }
});

$(".circle-overlay").click(function () {
  if (playAudio) {
    selectSound.play();
  }
});

$(".button-sound").click(function () {
  if ($(".cross-line").hasClass("cross-line-display")) {
    $(".cross-line").removeClass("cross-line-display");
    playAudio = true;
  } else {
    $(".cross-line").addClass("cross-line-display");
    playAudio = false;
    ambientSound.pause();
    backgroundMusic.pause();
  }
});

$(".button-reset").click(function () {
  $(".number").removeClass("marked-area");
  $(".part").html("");
  $(".bet-total").html("0.00");
  cashSum = cashSum + betSum;
  $(".cash-total").html(`${cashSum}.00`);
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
    if (playAudio) {
      ballSpinSound.play();
    }
    winAmount = 0;
    winAmountOnScreen = 0;
    cashSumBefore = cashSum;

    rouletteNumber = Math.floor(Math.random() * rouletteNumbersAmount + 0);

    function areaBetCheck(columnName, columnNumber, equation, winMultiplier) {
      if ($(`.${columnName}${columnNumber} div`).hasClass("betting-chip")) {
        var areaChipCount = Number(jQuery(`.${columnName}${columnNumber}`).children(".betting-chip").attr("id"));
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

    for (let i = 0; i <= 36; i++) {
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
          areaBetCheck(
            "corner",
            i,
            rouletteNumber == i || rouletteNumber == i + 1 || rouletteNumber == i + 2 || rouletteNumber == i - 1,
            9
          );
        } else if (i == 2 || i == 3) {
          areaBetCheck("corner", i, rouletteNumber == i || rouletteNumber == i - 1 || rouletteNumber == 0, 12);
        } else if (i > 3) {
          areaBetCheck(
            "corner",
            i,
            rouletteNumber == i || rouletteNumber == i - 3 || rouletteNumber == i - 4 || rouletteNumber == i - 1,
            9
          );
        }
      }
    }

    //Marking roulette wheel with number glow start
    var tableNumbersWithChips = [];
    for (let i = 0; i <= 36; i++) {
      if ($(`.number${i}`).hasClass("marked-area")) {
        tableNumbersWithChips.push(i);
      }
    }

    for (let a = 0; a <= 36; a++) {
      for (let b = 0; b < tableNumbersWithChips.length; b++) {
        if (tableNumbersWithChips[b] == rouletteNumbersArray[a]) {
          $(".number-glow-container").append(`<div class="number-glow number-glow${a}"></div>`);
          let rotateAngle = (360 / rouletteNumbersAmount) * a;
          document.querySelector(`.number-glow${a}`).style.transform = `rotate(${rotateAngle}deg)`;
        }
      }
    }
    //Marking roulette wheel with number glow ends

    let rouletteWheelAnimation = () => {
      $(".ball-container").html('<div class="ball-spinner"><div class="ball"></div></div>');
      var ballContainer = document.querySelector(".ball-spinner");
      var sheet = document.createElement("style");

      for (let i = 0; i < rouletteNumbersAmount; i++) {
        if (rouletteNumber == rouletteNumbersArray[i]) {
          var ballLandingNumber = i;
        }
      }

      sheet.textContent = `
      @-webkit-keyframes ball-container-animation{
        0%{ 
          transform: rotate(1440deg);
        }
        100%{
          transform: rotate(${(360 / rouletteNumbersAmount) * ballLandingNumber}deg);
        }`;

      ballContainer.appendChild(sheet);

      $(".roulette-wheel-container").addClass("z-index-visible").addClass("roulette-wheel-visible");
      $(".roulette-wheel-main").addClass("roulette-wheel-spin");
      $(".roulette-cross-shadow").addClass("roulette-wheel-spin");
      $(".roulette-cross").addClass("roulette-wheel-spin");
    };

    rouletteWheelAnimation();

    const lastRollColor = () => {
      let lastRoll;
      for (let a = 0; a < 18; a++) {
        if (rouletteNumber == rouletteNumbersRed[a]) {
          lastRoll = "red";
        }
        if (rouletteNumber == rouletteNumbersBlack[a]) {
          lastRoll = "black";
        }
        if (rouletteNumber == 0) {
          lastRoll = "green";
        }
      }
      return lastRoll;
    };

    const lastRollDisplay = () => {
      rolledNumbersColorArray.splice(0, 0, lastRollColor());

      rolledNumbersArray.splice(0, 0, rouletteNumber);

      if (rolledNumbersArray.length > 5) {
        rolledNumbersArray.splice(-1, 1);
        rolledNumbersColorArray.splice(-1, 1);
      }

      setTimeout(function () {
        for (i = 0; i < rolledNumbersArray.length; i++) {
          let rolledNumberIndex = i + 1;
          $(`.roll${rolledNumberIndex}`).html(rolledNumbersArray[i]);

          switch (rolledNumbersColorArray[i]) {
            case "red":
              $(`.roll${rolledNumberIndex}`).removeClass("roll-black").removeClass("roll-green").addClass("roll-red");
              break;
            case "black":
              $(`.roll${rolledNumberIndex}`).removeClass("roll-red").removeClass("roll-green").addClass("roll-black");
              break;
            case "green":
              $(`.roll${rolledNumberIndex}`).removeClass("roll-red").removeClass("roll-black").addClass("roll-green");
              break;
          }
        }
      }, 5000);

      return lastRollColor;
    };

    const resultsDisplay = () => {
      setTimeout(function () {
        $(".alert-spin-result").addClass("alert-message-visible");
        $(".results").addClass("alert-message-opacity");
      }, 5000);

      $(".results").addClass(`roll-${lastRollColor()}`);

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
          if (playAudio) {
            winSound.play();
          }
        }, 5300);
      } else {
        $(".win-lose").html("NO WIN");
      }

      if (winAmountOnScreen > 0) {
        $(".win-amount").html(`$${winAmountOnScreen}.00`);
      } else {
        $(".win-amount").html("");
      }
      bankSum = cashSum;
    };
    lastRollDisplay();
    resultsDisplay();
  }
});

$(".alert-message-container").click(function () {
  $(".alert-message-container").removeClass("alert-message-visible");
});

$(".alert-spin-result").click(function () {
  for (let i = 1; i <= 10; i++) {
    (function (i) {
      setTimeout(function () {
        cashSumBefore = cashSumBefore + winAmountOnScreen / 10;
        $(".cash-total").html(`${Math.round(cashSumBefore)}.00`);
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
      if (playAudio) {
        winChipsSound.play();
      }
    }, 500);
  }

  $(".roulette-wheel-main").removeClass("roulette-wheel-spin");
  $(".roulette-cross-shadow").removeClass("roulette-wheel-spin");
  $(".roulette-cross").removeClass("roulette-wheel-spin");

  $(".number-glow-container").html("");

  setTimeout(function () {
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
  if (playAudio) {
    menuSound.play();
  }
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
  $(".cash-total").html(`${cashSum}.00`);
  $(".bet-total").html(`${betSum}.00`);
});

$(".answer-no").click(function () {
  $(".alert-game-over").removeClass("alert-message-visible");
});
