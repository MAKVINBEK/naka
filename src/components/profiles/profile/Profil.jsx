import { useState } from 'react';
import { Header_Profile } from '../Header_Profile';
import css from './Profile.module.css';
import Sidebar from '../Sidebar';
import user from "../../../img/profile-user.png"
import ReactDOM from "react-dom";
import CodeInput from './CodeInput';
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";



const tabs = [
    { label: 'Основное', },
    { label: 'Верификация', question: "?" },
    { label: 'Безопасность', question: "?" },
    { label: 'Уведомления', },
];

const countryCodes = ["+966", "+7", "+996"];

const Profile = () => {
    const [activeTab, setActiveTab] = useState('Основное');
    const [cod, setCod] = useState(false)
    const [codInput, setCodInput] = useState(false)

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const handleComplete = (code) => {
        console.log("Введённый код:", code);
    };

    const [close, setClose] = useState(false)

    const [code, setCode] = useState("+966");
    const [number, setNumber] = useState("");

    const confirm = number.length === 0 ? css.noConfirm : css.confirm;

    const [verificate, setVerificate] = useState(false)

    const [changePassword, setChangePassword] = useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [changeInput, setChangeInput] = useState(false)



    return (
        <div className={css.parent}>
            <Header_Profile />
            <div className={css.flex}>
                <Sidebar close={close} setClose={setClose} />
                <div className={css.profile}>
                    <button className={css.menu_profile} onClick={() => setClose(true)}><IoIosArrowBack /></button>
                    <h2>Мой профиль</h2>
                    <div className={css.tab_nav}>
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`${css.tab_button} ${activeTab === tab.label ? css.active : ''}`}
                                onClick={() => setActiveTab(tab.label)}
                            >
                                {tab.label} <span>{tab.question}</span>
                            </button>
                        ))}
                    </div>

                    <div className={css.solid}></div>

                    <div className={css.tab_content}>
                        {activeTab === 'Основное' && (
                            <div>
                                <div className={css.block}>
                                    <div className={css.user}>
                                        <img src={user} alt="profile" />
                                        <div>
                                            <h4>Пользователь</h4>
                                            <p>Не верифицирован</p>
                                        </div>
                                    </div>
                                    <div className={css.data_profil}>
                                        <div>
                                            <h4>ID ползователя</h4>
                                            <p>AFSA ASAH SAGH AHGS AGSH  AGSH</p>
                                        </div>
                                        <div className={css.solid_gorizont}></div>
                                        <div>
                                            <h4>Время последней активности</h4>
                                            <p>09.07.2025 12:45</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={css.block}>
                                    <div className={css.vvod}>
                                        <div className={css.inputs}>
                                            <label >Фамилия</label>
                                            <input type="text" placeholder='Введите фамилию' />
                                        </div>
                                        <div className={css.inputs}>
                                            <label >Имя</label>
                                            <input type="text" placeholder='Введите имя' />
                                        </div>
                                        <div className={css.inputs} >
                                            <label >Отчество</label>
                                            <input type="text" placeholder='Введите отчество' />
                                        </div>
                                        <div className={css.inputs}>
                                            <label >Дата рождения</label>
                                            <input type="date" placeholder='DD.MM.YYYY' />
                                        </div>
                                        <div className={css.inputs}>
                                            <label >Страна</label>
                                            <div className={css.from}>
                                                <select>
                                                    <option value="Кыргызстан">Кыргызстан</option>
                                                    <option value="Казакстан">Казакстан</option>
                                                </select>
                                                <IoIosArrowDown className={css.icooo} />
                                            </div>
                                        </div>
                                        <div className={css.inputs}>
                                            <label >Телефон</label>
                                            <div className={css.phone_input}>
                                                <div className={css.dropdown}>
                                                    <IoIosArrowDown className={css.arrow_phone} />
                                                    <select value={code} onChange={(e) => setCode(e.target.value)}>
                                                        {countryCodes.map((c) => (
                                                            <option key={c} value={c}>{c}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <input
                                                    type="number"
                                                    placeholder="000 000 000"
                                                    value={number}
                                                    onChange={(e) => setNumber(e.target.value)}
                                                />
                                                <button className={confirm} onClick={() => {
                                                    if (number.length !== 0) {
                                                        setCod(true);
                                                    }
                                                }}>Подтвердить</button>
                                            </div>
                                        </div>
                                        <button className={css.submit} >Сохранить</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Верификация' && (
                            <div className={css.cards}>
                                <div className={css.block}>
                                    <h4>🔒 Гость (<span>не верифицирован</span>)</h4>
                                    <div className={css.solid + " " + css.sto}></div>
                                    <h5>Возможности</h5>
                                    <p>❌ Обмен валют недоступен<br />❌ Вывод средств недоступен <br /> ❌ Пополнение недоступно<br />❌ Повышенные лимиты недоступны</p>
                                    <div className={css.solid + " " + css.sto}></div>
                                    <h5>Ограничения</h5>
                                    <p>Полный доступ к платформе недоступен</p>
                                    <div className={css.solid + " " + css.sto}></div>
                                    <h5>Требования</h5>
                                    <p>Пройдите регистрацию и выберите тип аккаунта</p>

                                    <button className={css.verificate} onClick={() => setVerificate(true)}>Пройти верификацию</button>
                                </div>
                                <div className={css.block}>
                                    <h4>👤 Частное лицо</h4>
                                    <div className={css.solid + " " + css.sto}></div>
                                    <h5>Возможности</h5>
                                    <p>✅ Обмен валют доступен<br /> ✅ Пополнение и вывод доступны<br />❌ Повышенные лимиты<br />❌ Переводы между пользователями</p>
                                    <div className={css.solid + " " + css.sto}></div>
                                    <h5>Ограничения</h5>
                                    <p>Депозит до $50 000 (всего) <br /> Вывод до $10 000 в сутки</p>
                                    <div className={css.solid + " " + css.sto}></div>
                                    <h5>Требования</h5>
                                    <p>📱 Телефон <br /> 📄 Паспорт <br /> 📸 Селфи с документом</p>

                                    <button className={css.verificate} onClick={() => setVerificate(true)}>Пройти верификацию</button>
                                </div>
                                <div className={css.block}>
                                    <h4>🏢 Юридическое лицо</h4>
                                    <div className={css.solid + " " + css.sto}></div>
                                    <h5>Возможности</h5>
                                    <p>✅ Все функции уровня 1 <br /> ✅ Повышенные лимиты<br />✅ Переводы между пользователями<br />✅ Поддержка больших транзакций</p>
                                    <div className={css.solid + " " + css.sto}></div>
                                    <h5>Ограничения</h5>
                                    <p>Устанавливаются индивидуально по договору</p>
                                    <div className={css.solid + " " + css.sto}></div>
                                    <h5>Требования</h5>
                                    <p>📄 Учредительные документы <br /> 📧 Корпоративная почта <br /> 🏦 Банковские реквизиты <br /> 📜 Подписание договора</p>

                                    <button className={css.verificate} onClick={() => setVerificate(true)}>Пройти верификацию</button>
                                </div>

                            </div>
                        )}
                        {activeTab === 'Безопасность' && (
                            <div>
                                <div className={css.block}>
                                    <div className={css.bezopasnost}>
                                        <div>
                                            <h4>Настройки безопасности</h4>
                                            <h5>Двухфакторная аутентификация</h5>
                                            <p>Чтобы не ждать ОТР-код, получайте проверочные коды через приложение Google Authenticator. Приложение работает, даже если ваш телефон находится в автономном режиме.</p>
                                        </div>
                                        <span>Подключить</span>
                                    </div>
                                </div>
                                <div className={css.block}>
                                    <div className={css.lichny + " " + css.bezopasnost}>
                                        <div>
                                            <h4>Личные данные</h4>
                                            <p>Email:</p>
                                            <h5>maratovarayana00@gmail.com</h5>
                                            <p>Пароль:</p>
                                            <div>{Array.from({ length: 8 }).map((_, index) => (
                                                <GoDotFill key={index} />
                                            ))}</div>
                                        </div>
                                        <span onClick={() => setChangePassword(true)}>Сменить</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Уведомления' && (
                            <div>
                                <div className={css.block}>
                                    <div className={css.bezopas_push}>
                                        <h4>Настройки безопасности</h4>
                                        <div className={css.fleex}>
                                            <label className={css.switch}>
                                                <input type="checkbox" />
                                                <span className={css.slider}></span>
                                            </label>
                                            <p>Всплывающие уведомления в личном кабинете</p>
                                        </div>
                                        <div className={css.fleex}>
                                            <label className={css.switch}>
                                                <input type="checkbox" />
                                                <span className={css.slider}></span>
                                            </label>
                                            <p>Направлять уведомления на e-mail</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={css.block}>
                                    <div className={css.bezopas_push}>
                                        <h4>Настройки безопасности</h4>
                                        <div className={css.fleex}>
                                            <label className={css.switch}>
                                                <input type="checkbox" />
                                                <span className={css.slider}></span>
                                            </label>
                                            <p>Уведомлять о пополнении баланса</p>
                                        </div>
                                        <div className={css.fleex}>
                                            <label className={css.switch}>
                                                <input type="checkbox" />
                                                <span className={css.slider}></span>
                                            </label>
                                            <p>Уведомлять о выводе средств с кошелька</p>
                                        </div>
                                        <div className={css.fleex}>
                                            <label className={css.switch}>
                                                <input type="checkbox" />
                                                <span className={css.slider}></span>
                                            </label>
                                            <p>Уведомлять о входе в личный кабенет </p>
                                        </div>
                                        <div className={css.fleex}>
                                            <label className={css.switch}>
                                                <input type="checkbox" />
                                                <span className={css.slider}></span>
                                            </label>
                                            <p>Уведомлять о совершенных торговых операциях</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {cod && ReactDOM.createPortal(
                <div className={css.overlay} onClick={() => setCod(false)}>
                    <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 >Введите код из смс</h2>
                        <p>Отправили код на {code}{number}</p>
                        <CodeInput length={6} onComplete={handleComplete} />
                        <div className={css.eshe}><button className={css.eshe_submit} onClick={() => { setCod(false); }}>Отправить еще раз</button></div>
                    </div>
                </div>,
                document.body
            )}

            {verificate && ReactDOM.createPortal(
                <div className={css.overlay} onClick={() => setVerificate(false)}>
                    <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 className={css.text_aligt_left}>Верификация: 👤Частное лицо</h2>
                        <form className={css.form_verificate}>
                            <div className={css.inputs}>
                                <label >Фамилия</label>
                                <input type="text" placeholder='Введите фамилию' />
                            </div>
                            <div className={css.inputs}>
                                <label >Имя</label>
                                <input type="text" placeholder='Введите имя' />
                            </div>
                            <div className={css.inputs} >
                                <label >Отчество</label>
                                <input type="text" placeholder='Введите отчество' />
                            </div>
                            <div className={css.inputs}>
                                <label >Страна</label>
                                <div className={css.from}>
                                    <select>
                                        <option value="Кыргызстан">Кыргызстан</option>
                                        <option value="Казакстан">Казакстан</option>
                                    </select>
                                    <IoIosArrowDown className={css.icooo} />
                                </div>
                            </div>
                            <div className={css.inputs}>
                                <label >Телефон</label>
                                <div className={css.phone_input}>
                                    <div className={css.dropdown}>
                                        <IoIosArrowDown className={css.arrow_phone} />
                                        <select value={code} onChange={(e) => setCode(e.target.value)}>
                                            {countryCodes.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="000 000 000"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                    <button className={confirm} onClick={() => {
                                        if (number.length !== 0) {
                                            setCod(true);
                                        }
                                    }}>Подтвердить</button>
                                </div>
                            </div>
                            <div className={css.ff}>
                                <button onClick={() => setVerificate(false)}>Отменить</button>
                                <button className={css.delete_submit} onClick={() => setVerificate(false)}>Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {changePassword && ReactDOM.createPortal(
                <div className={css.overlay} onClick={() => setChangePassword(false)}>
                    <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 >Смена пароля</h2>
                        <form className={css.form_changePassword}>
                            <div className={css.password_wrapper}>
                                <input type="email"
                                    placeholder="Электронная почта"
                                    className={css.password_input} />
                                <span className={css.toggle_icon}> <HiOutlineMail /></span>
                            </div>
                            <div className={css.password_wrapper}>
                                <input
                                    type={visible1 ? "text" : "password"}
                                    placeholder="Пароль"
                                    className={css.password_input}
                                />
                                <span className={css.toggle_icon} onClick={() => setVisible1(!visible1)}>
                                    {visible1 ? <SlEye /> : <FiEyeOff />}
                                </span>
                            </div>
                            <div className={css.password_wrapper}>
                                <input
                                    type={visible2 ? "text" : "password"}
                                    placeholder="Пароль"
                                    className={css.password_input}
                                />
                                <span className={css.toggle_icon} onClick={() => setVisible2(!visible2)}>
                                    {visible2 ? <SlEye /> : <FiEyeOff />}
                                </span>
                            </div>
                            <button className={css.change_password} onClick={() => { setChangePassword(false); setForgotPassword(true) }}>Забыли пароль?</button>
                            <div className={css.ff}>
                                <button onClick={() => setChangePassword(false)}>Отменить</button>
                                <button className={css.delete_submit} onClick={() => setChangePassword(false)}>Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {forgotPassword && ReactDOM.createPortal(
                <div className={css.overlay} onClick={() => setForgotPassword(false)}>
                    <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 >Смена пароля</h2>
                        <p>Мы отправим ссылку на вашу электронную почту</p>
                        <form className={css.form_forgotPassword}>
                            <div className={css.password_wrapper}>
                                <input type="email"
                                    placeholder="Электронная почта"
                                    className={css.password_input} />
                                <span className={css.toggle_icon}> <HiOutlineMail /></span>
                            </div>
                            <div className={css.ff}>
                                <button onClick={() => setForgotPassword(false)}>Отменить</button>
                                <button className={css.delete_submit} onClick={() => { setForgotPassword(false); setChangeInput(true) }}>Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {changeInput && ReactDOM.createPortal(
                <div className={css.overlay} onClick={() => setChangeInput(false)}>
                    <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                        <h2 >Смена пароля</h2>
                        <form className={css.form_changePassword}>
                            <div className={css.password_wrapper}>
                                <input
                                    type={visible1 ? "text" : "password"}
                                    placeholder="Пароль"
                                    className={css.password_input}
                                />
                                <span className={css.toggle_icon} onClick={() => setVisible1(!visible1)}>
                                    {visible1 ? <SlEye /> : <FiEyeOff />}
                                </span>
                            </div>
                            <div className={css.password_wrapper}>
                                <input
                                    type={visible2 ? "text" : "password"}
                                    placeholder="Пароль"
                                    className={css.password_input}
                                />
                                <span className={css.toggle_icon} onClick={() => setVisible2(!visible2)}>
                                    {visible2 ? <SlEye /> : <FiEyeOff />}
                                </span>
                            </div>
                            <div className={css.ff}>
                                <button onClick={() => setChangeInput(false)}>Отменить</button>
                                <button className={css.delete_submit} onClick={() => setChangeInput(false)}>Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

        </div>
    );
};

export default Profile;
