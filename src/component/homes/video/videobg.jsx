import video from "../../../img/files/videobg.mp4"
import css from "./video.module.css"


export const Video = () => {
    return (
        <div className="container">
            <div className={css.content}>
                <video className={css.video} src={video} autoPlay muted loop></video>
                <div className={css.title}>
                    <h2>Получи бонусы от нас!</h2>
                    <p>Просто выполните пару шагов — и получите свои бонусы!</p>
                </div>
            </div>
        </div>
    )
}

