import style from "./index.module.less";

export default function Welcome() {
    

    return (
        <div className={style.welcome}>
            <div className={style.content}>
                <div className={style.img}></div>
                <div className={style.subTitle}>Hello, User!</div>
                <h1 className={style.title}>Welcome to the Application!</h1>
                <p className={style.desc}>This is the welcome page. Please navigate using the menu.</p>
            </div>
                       
        </div>
    );
}