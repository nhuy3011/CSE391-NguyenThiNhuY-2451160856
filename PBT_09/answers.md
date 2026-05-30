# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
## Câu A1 (5đ) — DOM Tree
- DOM tree (sơ đồ cây)
```
                        Document
                           |
                        div#app
                       /       \
                  header        main
                 /      \      /    \
               h1       nav  form#todoForm   ul#todoList
                         |     /       \         /      \
                         a     input  button    li      li
                         a                     (.todo-item) (.todo-item.completed)
                         a

```

- querySelector cho:
    + Chọn thẻ ```<h1>```:  ```document.querySelector('h1');```
    + Chọn input trong form: ```document.querySelector('#todoForm input');```
    + Chọn tất cả .todo-item:```document.querySelectorAll('.todo-item');```
    + Chọn link đang active:```document.querySelector('nav a.active');```
    + Chọn ```<li>``` đầu tiên trong #todoList:```document.querySelector('#todoList li');```
    + Chọn tất cả ```<a>``` bên trong ```<nav>```: ```document.querySelectorAll('nav a');```
