function TodoFilter({ filter, setFilter }) {
    const filters = [
        { key: "all", label: "Tất cả" },
        { key: "active", label: "Chưa xong" },
        { key: "completed", label: "Đã xong" }
    ];
    
    return (
        <div style={{ 
            display: "flex", 
            marginBottom: "15px",
            gap: "8px"
        }}>
            {filters.map(f => (
                <button 
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    style={{ 
                        flex: 1,
                        padding: "10px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        background: filter === f.key ? "#3498db" : "#f5f6f7",
                        color: filter === f.key ? "white" : "#555",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        boxShadow: filter === f.key ? "0 3px 6px rgba(52,152,219,0.3)" : "none",
                        transition: "all 0.2s"
                    }}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}

export default TodoFilter;