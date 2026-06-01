function UserCard({ name, email, avatar }) {
    return (
        <div style={{
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "20px",
            margin: "15px",
            width: "250px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            textAlign: "center"
        }}>
            <img 
                src={avatar} 
                alt={name} 
                style={{ 
                    width: "80px", 
                    height: "80px", 
                    borderRadius: "50%", 
                    objectFit: "cover",
                    border: "3px solid #3498db",
                    marginBottom: "12px"
                }} 
            />
            <h3 style={{ margin: "5px 0", color: "#2c3e50" }}>{name}</h3>
            <p style={{ margin: "5px 0", color: "#7f8c8d", fontSize: "14px" }}>{email}</p>
        </div>
    );
}

export default UserCard;