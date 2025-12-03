import ReactDom from 'react-dom/client';
import './index.css'
const Message = () => {
  return (
    <div className="message-content">
        这是一个消息提示框
    </div>
  );
};
interface Item {
    root: ReactDom.Root;
    messageContainer: HTMLDivElement;
}
const res: Item[] = [];
window.onShow = () => {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message';
    messageContainer.style.top = `${20 + res.length * 60}px`;
    document.body.appendChild(messageContainer);
    //容器关联
    const root = ReactDom.createRoot(messageContainer);
    root.render(<Message />);

    res.push({
        root,
        messageContainer
    });

    setTimeout(() => {
        const item = res.find((item) => item.messageContainer === messageContainer)!;
        item.root.unmount();
        document.body.removeChild(messageContainer);
        res.splice(res.indexOf(item), 1);
    }, 2000);
};
//声明扩充
declare global {
    interface Window {
        onShow: () => void;
    }
}
export default Message;