import './index.css';

interface props {
    title?: string;
    children?: React.ReactNode;
    callback?: () => void;
}
export default function Card(props: props) {
    const { title = '标题', children, callback } = props;
    window.addEventListener('on-card-click', (e) => {
        console.log(e,'Card2组件监听到点击事件');
    });
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
                <button>确定</button>
                <button>取消</button>
            </footer>
        </div>
    );
}