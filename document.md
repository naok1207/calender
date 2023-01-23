# カレンダー作成ドキュメント

開始月の1日を固定で取得
```js
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);
```

```js
// 翌月を取得
showDate.setMonth(showDate.getMonth() - 1);
// 次月を取得
showDate.setMonth(showDate.getMonth() + 1);
```

```js
// 月を取得
function collectMonth(date){}

// カレンダー表示
/* 画面へ描写 */
function showPorcess(date){}

// カレンダー作成
/* htmlを生成 */
function createProcess(year, month){}
```

html案
```slim
#calender
  div.calender-header
    .calender-header-row
      .calender-header-cell
      .calender-header-cell
      .calender-header-cell
      .calender-header-cell
      .calender-header-cell
      .calender-header-cell
      .calender-header-cell
  div.calender-body
    // 5列分繰り返す  セルの要素の並びでcssを適用
    .calender-body-row
      .calender-body-cell
      .calender-body-cell
      .calender-body-cell
      .calender-body-cell
      .calender-body-cell
      .calender-body-cell
      .calender-body-cell
```


/users/:id
/users/:id/settings
