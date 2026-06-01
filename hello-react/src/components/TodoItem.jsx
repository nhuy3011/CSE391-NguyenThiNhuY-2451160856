function TodoItem({ todo, onToggle, onDelete }) {
    // Định dạng thời gian tạo cho dễ nhìn (Thử thách Level 1)
    const formattedTime = new Date(todo.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div style={{ 
            display: "flex",
            alignItems: "center",
            padding: "12px 15px",
            margin: "8px 0",
            background: todo.done ? "#f4fdf7" : "#fff",
            border: todo.done ? "1px solid #c8e6c9" : "1px solid #eaeaea",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
            transition: "all 0.2s"
        }}>
            <input 
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                style={{ marginRight: "12px", width: "18px", height: "18px", cursor: "pointer" }}
            />
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <span style={{ 
                    textDecoration: todo.done ? "line-through" : "none",
                    color: todo.done ? "#bbb" : "#2c3e50",
                    fontWeight: todo.done ? "normal" : "500",
                    fontSize: "15px"
                }}>
                    {todo.text}
                </span>
                {/* Thử thách Level 1: Hiển thị thời gian tạo nhỏ gọn ở góc */}
                <span style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>
                    🕒 Tạo lúc: {formattedTime}
                </span>
            </div>

            <button 
                onClick={() => onDelete(todo.id)}
                style={{ 
                    background: "#ffebee",
                    color: "#c62828",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.background = "#ffcdd2"}
                onMouseLeave={(e) => e.target.style.background = "#ffebee"}
            >
                🗑️
            </button>
        </div>
    );
}

export default TodoItem;