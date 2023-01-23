'use strict';
// const week = ["日", "月", "火", "水", "木", "金", "土"];
// const today = new Date();
// // 月末だとずれる可能性があるため、1日固定で取得
// var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// // 初期表示
// window.onload = function () {
//   showProcess(today, calendar);
// };
// // 前の月表示
// function prev() {
//   showDate.setMonth(showDate.getMonth() - 1);
//   showProcess(showDate);
// }

// // 次の月表示
// function next() {
//   showDate.setMonth(showDate.getMonth() + 1);
//   showProcess(showDate);
// }

// // カレンダー表示
// function showProcess(date) {
//   var year = date.getFullYear();
//   var month = date.getMonth();
//   document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

//   var calendar = createProcess(year, month);
//   document.querySelector('#calendar').innerHTML = calendar;
// }

// // カレンダー作成
// function createProcess(year, month) {
//   // 曜日
//   var calendar = "<table><tr class='dayOfWeek'>";
//   for (var i = 0; i < week.length; i++) {
//     calendar += "<th>" + week[i] + "</th>";
//   }
//   calendar += "</tr>";

//   var count = 0;
//   var startDayOfWeek = new Date(year, month, 1).getDay();
//   var endDate = new Date(year, month + 1, 0).getDate();
//   var lastMonthEndDate = new Date(year, month, 0).getDate();
//   var row = Math.ceil((startDayOfWeek + endDate) / week.length);

//   // 1行ずつ設定
//   for (var i = 0; i < row; i++) {
//     calendar += "<tr>";
//     // 1colum単位で設定
//     for (var j = 0; j < week.length; j++) {
//       if (i == 0 && j < startDayOfWeek) {
//         // 1行目で1日まで先月の日付を設定
//         calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
//       } else if (count >= endDate) {
//         // 最終行で最終日以降、翌月の日付を設定
//         count++;
//         calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
//       } else {
//         // 当月の日付を曜日に照らし合わせて設定
//         count++;
//         if (year == today.getFullYear()
//           && month == (today.getMonth())
//           && count == today.getDate()) {
//           calendar += "<td class='today'>" + count + "</td>";
//         } else {
//           calendar += "<td>" + count + "</td>";
//         }
//       }
//     }
//     calendar += "</tr>";
//   }
//   return calendar;
// }

// カレンダークラス
/* Calender.generate(date) */
export class Calender {
  week = ["Sun", "Mon", "Tue", "Wed", "The", "Fri", "Sat"];

  /* 前月の最終日 */
  getBeforeDate(date) { return Date(date.getFullYear(), date.getMonth(), 0) }

  /* 当月の開始日 */
  getFirstDate(date) { return Date(date.getFullYear(), date.getMonth(), 1) }

  /* 当月の最終日 */
  getLastDate(date) { return Date(date.getFullYear(), date.getMonth() + 1, 0) }

  /* 翌月の開始日 */
  getAfterDate(date) { return Date(date.getFullYear(), date.getMonth() + 1, 1) }

  /* 4週後の日 */
  getNextMonthDate(date) { return Date(date.getFullYear(), date.getMonth(), date.getDate() + 4 * 7) }

  /* メイン呼び出し */
  /*
   *  html を出力
   */
  generate(setDate) {
    const header = '<div class="calender-header">';
    const headerRow = '<div class="calender-header-row">'
    const headerCell = '<div class="calender-header-cell">';
    const body = '<div class="calender-body">';
    const bodyRow = '<div class="calender-body-row">';
    const bodyCell = '<div class="calender-body-cell>"';
    const endDiv = '</div>';

    var date = new Date(setDate);

    var firstDate = this.getFirstDate(date);
    var firstDateDay = firstDate.getDay();
    var lastDate = this.getLastDate(date);
    var lastDateDay = lastDate.getDay();

    var allDate = [];
    var pushDate;
    var html;

    // 前月分格納
    for (var i = firstDateDay; i >= 0; i--) {
      pushDate = new Date(date.getFullYear(), date.getMonth(), 1 - i);
      allDate.push(pushDate.getDate());
    }

    // 当月分格納
    for (var i = 1; i < lasteDate.getDate(); i++) {
      pushDate = new Date(date.getFullYear(), date.getMonth(), i);
      allDate.push(pushDate.getDate());
    }

    // 翌月分格納
    for (var i = week.length() - lastDateDay; i < week.length(); i++) {
      pushDate = new Date(date.getFullYear(), date.getMonth(), i);
      allDate.push(pushDate.getDate());
    }

    // calender-header html 作成
    html += header + headerRow;
    for (var i = 0; i < week.length(); i++) {
      html += headerCell + week[i] + endDiv;
    }
    html += endDiv + endDiv;

    // calender-body html 作成
    html += body;
    for (var i = 0; i < allDate.length(); i++) {
      renderDate = allDate[i];
      if (renderDate.getDay() == 0) html += bodyRow;
      html += bodyCell + renderDate.getDate() + endDiv;
      if (renderDate.getDay() == 6) html += endDiv;
    }
    html += endDiv;

    return html;
  }
}
