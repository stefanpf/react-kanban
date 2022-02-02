export default function Header() {
    return (
        <header>
            {/* <div className="header-notifications">0</div> */}
            <div className="header-welcome">
                <h1>WeKanBan!</h1>
            </div>
            <div className="header-nav">
                <div className="header-button">
                    <a href="/logout">
                        <button>Logout</button>
                    </a>
                </div>
            </div>
        </header>
    );
}
