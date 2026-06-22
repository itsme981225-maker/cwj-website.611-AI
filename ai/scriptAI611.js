// 🔄 網頁載入時，自動向使用者請求通知權限
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Notification !== "undefined" && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});

// 設定通知內容
function notifyUser(task, time) {
    if (Notification.permission === "granted") {
        new Notification("⏰ 待辦事項提醒", { 
            body: `記得做：${task}\n設定時間：${new Date(time).toLocaleString()}`,
            icon: "https://flaticon.com" // 可選：加入通知圖示
        });
    }
}

// 計算何時跳出通知
function scheduleReminder(task, time) {
    const now = new Date();
    const reminderTime = new Date(time);
    const delay = reminderTime - now;

    if (delay > 0) {
        setTimeout(() => notifyUser(task, time), delay);
    }
}

// 新增待辦事項的主函式
function addTodo() {
    const input = document.getElementById('todo-input');
    const timeInput = document.getElementById('todo-time');
    
    const newTodoText = input.value.trim(); 
    const reminderTime = timeInput.value;

    if (newTodoText === '') return; // 如果沒輸入文字則直接中斷，不執行後面程式

    // 建立 li 項目
    const li = document.createElement('li');
    li.className = 'todo-item'; 

    // 建立文字區塊
    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = newTodoText; 

    // 建立時間區塊
    const timeSpan = document.createElement('span');
    timeSpan.className = 'todo-date';
    timeSpan.textContent = reminderTime 
        ? `⏰ ${new Date(reminderTime).toLocaleString()}`
        : '無定時提醒';

    // 組合元素
    li.appendChild(textSpan);
    li.appendChild(timeSpan);

    // 單擊：切換完成狀態
    li.onclick = function() {
        this.classList.toggle('completed');
    };

    // 雙擊：刪除項目
    li.ondblclick = function() {
        this.remove();
    };

    // 將新項目加到清單最上方 (也可以用 appendChild 加到最下方)
    const todoList = document.getElementById('todo-list');
    todoList.insertBefore(li, todoList.firstChild);

    // 清空輸入欄位
    input.value = ''; 
    timeInput.value = ''; 

    // 啟動定時通知
    if (reminderTime) {
        scheduleReminder(newTodoText, reminderTime);
    }
}
