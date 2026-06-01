import { useState } from "react";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

function App() {
    // Thử thách Level 2: Đọc dữ liệu từ localStorage lên làm State ban đầu khi khởi chạy App
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("CAMPUS_TODOS");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");
    
    // Hàm trung gian giúp đồng bộ mảng State mới vào localStorage
    function saveAndSyncTodos(newTodos) {
        setTodos(newTodos);
        localStorage.setItem("CAMPUS_TODOS", JSON.stringify(newTodos));
    }
    
    // ===== 1. Thêm công việc mới (CREATE) =====
    function addTodo() {
        if (inputValue.trim() === "") return;
        
        const newTodo = {
            id: Date.now(),
            text: inputValue.trim(),
            done: false,
            createdAt: Date.now() // Thử thách Level 1: Lưu mốc thời gian tạo
        };
        
        const updatedTodos = [...todos, newTodo];
        saveAndSyncTodos(updatedTodos); // Lưu vào state lẫn bộ nhớ trình duyệt
        setInputValue("");
    }
    
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            addTodo();
        }
    }
    
    // ===== 2. Đổi trạng thái Đã xong / Chưa xong (UPDATE) =====
    function toggleTodo(id) {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        );
        saveAndSyncTodos(updatedTodos);
    }
    
    // ===== 3. Xóa công việc (DELETE) =====
    function deleteTodo(id) {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        saveAndSyncTodos(updatedTodos);
    }
    
    // ===== 4. Lọc dữ liệu hiển thị (READ với Filter) =====
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true;
    });
    
    // ===== 5. Các biến tính toán dữ liệu (Computed Values) =====
    const totalCount = todos.length; // Thử thách Level 1: Tổng số việc
    const activeCount = todos.filter(todo => !todo.done).length;
    const completedCount = todos.filter(todo => todo.done).length;
    
    // Thử thách Level 1: Tự động đổi placeholder linh hoạt dựa theo bộ lọc được chọn
    const getPlaceholderText = () => {
        if (filter === "active") return "Nhập việc cần làm gấp...";
        if (filter === "completed") return "Nhập việc bạn đã hoàn thành...";
        return "Nhập công việc cần làm mới...";
    };
    
    return (
        <div style={{ 
            maxWidth: "460px", 
            margin: "30px auto", 
            padding: "25px",
            fontFamily: "Arial, sans-serif",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
            backgroundColor: "#fff"
        }}>
            <h1 style={{ textAlign: "center", color: "#2c3e50", margin: "0 0 5px 0", fontSize: "26px" }}>📋 Todo List</h1>
            <p style={{ textAlign: "center", color: "#7f8c8d", fontSize: "14px", marginTop: 0, marginBottom: "20px" }}>
                Ứng dụng quản lý mục tiêu cá nhân
            </p>
            
            {/* VÙNG NHẬP LIỆU */}
            <div style={{ display: "flex", marginBottom: "20px" }}>
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={getPlaceholderText()} // Khớp thử thách Level 1
                    style={{ 
                        flex: 1, 
                        padding: "12px", 
                        fontSize: "15px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "6px 0 0 6px",
                        outline: "none",
                        transition: "border-color 0.2s"
                    }}
                />
                <button 
                    onClick={addTodo}
                    style={{ 
                        padding: "12px 20px", 
                        fontSize: "15px",
                        fontWeight: "bold",
                        background: "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "0 6px 6px 0",
                        cursor: "pointer",
                        transition: "background 0.2s"
                    }}
                >
                    Thêm
                </button>
            </div>
            
            {/* THÀNH PHẦN BỘ LỌC CONTAINER */}
            <TodoFilter filter={filter} setFilter={setFilter} />
            
            {/* VÙNG IN DANH SÁCH COMPONENT CON */}
            <div style={{ minHeight: "150px" }}>
                {filteredTodos.length === 0 ? (
                    <div style={{ 
                        textAlign: "center", 
                        padding: "45px 20px",
                        color: "#a0aec0",
                        border: "2px dashed #edf2f7",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontStyle: "italic"
                    }}>
                        {todos.length === 0 
                            ? "📝 Kho dữ liệu trống. Hãy thêm việc cần làm đầu tiên!" 
                            : "🔍 Không tìm thấy công việc nào khớp bộ lọc."}
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem 
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))
                )}
            </div>
            
            {/* BẢNG THỐNG KÊ CHI TIẾT FOOTER */}
            {totalCount > 0 && (
                <div style={{ 
                    marginTop: "20px",
                    padding: "12px 15px",
                    background: "#f8fafc",
                    borderTop: "3px solid #cbd5e1",
                    borderRadius: "4px",
                    fontSize: "13px",
                    color: "#64748b",
                    lineHeight: "1.6"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>📊 Tổng số công việc:</span>
                        <strong style={{ color: "#2c3e50" }}>{totalCount} việc</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                        <span>⏳ Chưa hoàn thành:</span>
                        <strong style={{ color: "#e74c3c" }}>{activeCount} việc</strong>
                    </div>
                    {completedCount > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", color: "#2e7d32" }}>
                            <span>🎉 Đã hoàn thành xuất sắc:</span>
                            <strong>{completedCount} việc</strong>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;