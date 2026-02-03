import './index.css';

interface props {
    title?: string;
    children?: React.ReactNode;
    callback?: () => void;
}
export default function Card(props: props) {
    const { title = '标题', children } = props;
    const event = new Event('on-card-click');
    const clickCard = () => {
        window.dispatchEvent(event);
    }
    return (
        <div className="card">
            <header>
                <div>{title}</div>
                <div>副标题</div>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <button onClick={clickCard}>确定</button>
                <button>取消</button>
            </footer>
        </div>
    );
}