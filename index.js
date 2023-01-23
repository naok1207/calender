"use strict";

class Calender {
  /* 前月の最終日 */
  getBeforeDate(date) {
    return Date(date.getFullYear(), date.getMonth(), 0);
  }

  /* 当月の開始日 */
  getFirstDate(date) {
    var returnDate = new Date(date.getFullYear(), date.getMonth(), 1);
    return returnDate;
  }

  /* 当月の最終日 */
  getLastDate(date) {
    var returnDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return returnDate;
  }

  /* 翌月の開始日 */
  getAfterDate(date) {
    return Date(date.getFullYear(), date.getMonth() + 1, 1);
  }

  /* 4週後の日 */
  getNextMonthDate(date) {
    var returnDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 4 * 7
    );
    return returnDate;
  }

  /* メイン呼び出し */
  /*
   *  html を出力
   */
  generate(setDate, str) {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const calender = '<div class="calender">';
    const title = '<div class="calender-title">';
    const titleYear = '<div class="calender-title-year">';
    const titleMonth = '<div class="calender-title-month">';
    const monthDecorate = '<span class="calender-title-month-span">';
    const titleImg =
      '<div class="calender-title-logo"><img src="logo.jpg" class="logo" /></div>';
    const header = '<div class="calender-header">';
    const headerRow = '<div class="calender-header-row">';
    const headerCell = '<div class="calender-header-cell">';
    const body = '<div class="calender-body">';
    const bodyRow = '<div class="calender-body-row">';
    const bodyCell = '<div class="calender-body-cell">';
    const holidayCell = '<div class="calender-body-cell holiday">';
    const withoutBodyCell = '<div class="calender-body-cell without">';
    const mainCell = '<div class="calender-maincell">';
    const subCell = '<div class="calender-subcell">';
    const endDiv = "</div>";
    const endSpan = "</span>";
    const singleLine = '<div class="calnder-lines-item"></div>';
    const lineDiv =
      '<div class="calender-lines">' +
      singleLine +
      singleLine +
      singleLine +
      singleLine +
      singleLine +
      "</div>";

    var date = new Date(setDate);

    var firstDate = this.getFirstDate(date);
    var firstDateDay = firstDate.getDay();
    var lastDate = this.getLastDate(date);
    var lastDateDay = lastDate.getDay();

    var allDate = [];
    var pushDate;
    var html = "";

    // 前月分格納
    for (var i = firstDateDay; i > 0; i--) {
      pushDate = new Date(date.getFullYear(), date.getMonth(), 1 - i);
      allDate.push(pushDate);
    }

    // 当月分格納
    for (var i = 1; i <= lastDate.getDate(); i++) {
      if (allDate.length / 7 >= 5) {
        break;
      }
      pushDate = new Date(date.getFullYear(), date.getMonth(), i);
      allDate.push(pushDate);
    }

    // 翌月分格納
    for (var i = 1; i < week.length - lastDateDay; i++) {
      if (allDate.length / 7 >= 5) {
        break;
      }
      pushDate = new Date(date.getFullYear(), date.getMonth() + 1, i);
      allDate.push(pushDate);
    }

    html += calender;
    html += title;
    html += titleYear + date.getFullYear() + "年" + endDiv;
    html +=
      titleMonth +
      monthDecorate +
      (date.getMonth() + 1) +
      endSpan +
      "月" +
      endDiv;
    html += titleImg;
    html += endDiv;
    // calender-header html 作成
    html += header + headerRow;
    for (var i = 0; i < week.length; i++) {
      html += headerCell + week[i] + endDiv;
    }
    html += endDiv + endDiv;

    // calender-body html 作成
    html += body;
    for (var i = 0; i < allDate.length; i++) {
      var renderDate = new Date(allDate[i]);
      if (renderDate.getDay() == 0) html += bodyRow;
      if (isHoliday(renderDate, str)) {
        html += holidayCell;
      } else if (renderDate.getMonth() != date.getMonth()) {
        html += withoutBodyCell;
      } else {
        html += bodyCell;
      }
      html +=
        mainCell +
        renderDate.getDate() +
        endDiv +
        subCell +
        this.getNextMonthDate(renderDate).getDate() +
        endDiv +
        lineDiv +
        endDiv;
      if (renderDate.getDay() == 6) html += endDiv;
    }
    html += endDiv;
    html += endDiv;

    return html;
  }
}

function showCalender(str) {
  var cal = new Calender();
  var date = new Date(2023, 11, 1);
  // var date = new Date();
  console.log(date.getMonth() + 1 + "月");
  var html = cal.generate(date, str);
  var calenderElement = document.getElementById("calender");
  calenderElement.innerText = "";
  calenderElement.innerHTML = html;
}

function isHoliday(date, str) {
  var checkDate =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  var dateList = str.split("\n");
  // 1行目はヘッダーのため、初期値1で開始
  for (var i = 1; i < dateList.length; i++) {
    if (dateList[i].split(",")[0] === checkDate) {
      // return [true, dateList[i].split(',')[1]];
      return true;
    }
  }
  // return [false, ""];
  return false;
}

window.onload = function () {
  var req = new XMLHttpRequest();
  req.open("get", "syukujitsu.csv", true);
  req.send(null);
  req.onload = function () {
    showCalender(req.responseText);
  };
};
