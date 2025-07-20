const Header = () => {
    return (
        <div
            style={{
                height: 80,
                background: '#1890ff',
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                flexShrink: 0,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            }}
        >
            <div style={{ width:'90vw', height: '80px', marginTop:'22px'}}>
                <h1>Новости</h1>
            </div>
        </div>
    )
}

export default Header;