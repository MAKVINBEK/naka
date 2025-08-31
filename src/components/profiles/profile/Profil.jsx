import { useEffect, useRef, useState } from 'react';
import { Header_Profile } from './header_profile/Header_Profile';
import css from './Profile.module.css';
import Sidebar from '../Sidebar';
import user from "../../../img/profile-user.png"
import ReactDOM from "react-dom";
import { FiEyeOff } from "react-icons/fi";
import { SlEye } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { get, post } from '../../../api/ApiRoutes';
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import { TbCopy, TbChecks } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';




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
    const [visible3, setVisible3] = useState(false);
    const navigate = useNavigate();

    const handleComplete = (code) => {
        console.log("Введённый код:", code);
    };

    const [close, setClose] = useState(false)

    const [verificate, setVerificate] = useState(false)

    const [changePassword, setChangePassword] = useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [changeInput, setChangeInput] = useState(false)
    const [info, setInfo] = useState([])

    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [country, setCountry] = useState("");
    const [codes, setCode] = useState("+996");
    const [number, setNumber] = useState("");

    const confirm = number.length === 0 ? css.noConfirm : css.confirm;

    const [redirectUrl, setRedirectUrl] = useState("https://naka.kz/profile")


    const CODE_LENGTH = 6;
    const [authentication, setAuthentication] = useState(false)
    const [values, setValues] = useState(Array(CODE_LENGTH).fill(""));
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmError, setConfirmError] = useState("");
    const inputsRef = useRef([]);
    const [qrImage, setQrImage] = useState('')
    const [secretKey, setSecretKey] = useState('')
    const [copied, setCopied] = useState(false);
    const [cood, setCood] = useState("");
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const payload = {
            first_name: name,
            last_name: surname,
            surname: patronymic,
            phone: `${codes}${number}`,
            birth_date: startDate ? startDate.toISOString().split("T")[0] : null,
            country,
        };

        try {
            const token = localStorage.getItem("access");

            const res = await post.personal_info(payload,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Отправлено")
            setName("");
            setSurname("");
            setPatronymic("");
            setStartDate(null);
            setCountry("Кыргызстан");
            setCode("+996");
            setNumber("");

        } catch (err) {
            console.error("❌ Ошибка:", err.response?.data || err.message);
        } finally {
            setLoading(false)
        }
    };

  

    const handleVerificate = async (e) => {
        setLoading1(false)
        setLoading2(false)
        setLoading3(false)
        try {
            const token = localStorage.getItem("access");
            setLoading1(true)
            setLoading2(true)
            setLoading3(true)
            const res = await post.verification({ redirect_url: redirectUrl },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const formUrl = res.form_url;
            if (formUrl) {
                window.location.href = formUrl;
            } else {
                console.error("❌ form_url отсутствует в ответе");
            }
        } catch (err) {
            console.error("❌ Ошибка:", err.response?.data || err.message);
        } finally {
            setLoading1(false)
            setLoading2(false)
            setLoading3(false)
        }
    };


    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const data = await get.personalInfo();
                setInfo(data)
            } catch (err) {
                console.log(err);
                
                if (err.status === 401) {
                    toast.error("Сессия истекла, войдите снова");
                    localStorage.removeItem("access");
                    navigate("/login");
                } else {
                }
            }
        };

        fetchInfo();
    }, []);

    useEffect(() => {
        if (authentication) {
            setTimeout(() => inputsRef.current[0]?.focus(), 100);
        }
    }, [authentication]);

    useEffect(() => {
        const codeStr = values.join("");
        if (codeStr.length === CODE_LENGTH && !values.includes("")) {
            confirmCode(codeStr);
        }
    }, [values]);

    const confirmCode = async (code) => {
        setConfirmLoading(true);
        setConfirmError('');
        const token = localStorage.getItem("access");
        const fullPhone = `${codes}${number}`;

        try {
            const res = await post.confirm_phone_code(
                { phone: fullPhone, code },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setValues(Array(CODE_LENGTH).fill(""));
            setNumber("")
            setCod(false);
            toast.success('Ваш номер успешно потверждено')
            setConfirmError('');
        } catch (err) {
            setConfirmError(
                err.code[0] || "Неверный код"
            );

            setValues(Array(CODE_LENGTH).fill(""));
            inputsRef.current[0]?.focus();
        } finally {
            setConfirmLoading(false);
        }
    };


    const requestPhoneCode = async () => {
        const fullPhone = `${codes}${number}`;

        if (number.length > 1) {
            try {
                const token = localStorage.getItem("access");
                const response = await post.request_phone_code({ phone: fullPhone },
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setConfirmError("")
                setCod(true);
            } catch (error) {
                toast.error("Ошибка при отправке кода, попробуйте позже")
                console.error(error.response?.data || error.message||"❌ Ошибка при отправке кода:");
            }
        } else {

        }

    };

    const handleChange = (index, e) => {
        const val = e.target.value;
        if (!/^[0-9a-zA-Z]$/.test(val)) return;
        const newValues = [...values];
        newValues[index] = val;
        setValues(newValues);
        if (index < CODE_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            const newValues = [...values];
            if (newValues[index] === "") {
                if (index > 0) inputsRef.current[index - 1]?.focus();
            } else {
                newValues[index] = "";
                setValues(newValues);
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData("text")
            .replace(/\s/g, "")
            .slice(0, CODE_LENGTH)
            .split("");
        const newValues = Array(CODE_LENGTH).fill("");
        pasted.forEach((char, i) => {
            if (/^[0-9a-zA-Z]$/.test(char)) newValues[i] = char;
        });
        setValues(newValues);
        inputsRef.current[Math.min(pasted.length - 1, CODE_LENGTH - 1)]?.focus();
    };

    useEffect(() => {
        const fetch2FA = async () => {
            try {
                const token = localStorage.getItem("access");

                const res = await post.setup(
                    {},
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                setQrImage(res.qr_code);
                setSecretKey(res.secret);

            } catch (error) {
                console.error("❌ Ошибка при получении 2FA данных:", error.response?.data || error.message);
            }
        };

        fetch2FA();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(secretKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("access");

            const response = await post.verify(
                { code: cood },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success('Двухфакторная аутентификация успешно подключена');
            setAuthentication(false)
            setCood("")
        } catch (error) {
            if(error.status == 400){
                toast.error("Неверный код");
            }
            setCood("")
        } finally {
            setLoading(false);
        }
    };

    const changePasswordRequest = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("Пожалуйста, заполните все поля");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Пароли не совпадают");
            return;
        }

        const payload = {
            old_password: oldPassword,
            password: newPassword,
            confirm_password: confirmPassword,
        };

        try {
            const token = localStorage.getItem("access");

            const res = await post.new_password(
                payload,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Пароль успешно изменён");

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setChangePassword(false);

        } catch (err) {
            console.error("❌ Ошибка:", err.response?.data || err.message);
            toast.error("Ошибка при смене пароля");
        } finally {
            setLoading(false);
        }

    };    

    useEffect(() => {
        if (info) {
            setName(info.first_name||"")
            setSurname(info.last_name||"")
            setPatronymic(info.surname||"")
            setStartDate(info.birth_date||null)
        }
    }, [info]);

    const detectCode = (phone) => {
        for (const c of countryCodes) {
            if (phone.startsWith(c.replace('+', ''))) {
                return c;
            }
        }
        return '+996';
    };
    
    useEffect(() => {
        if (info?.phone) {
            const digits = info.phone.replace('+', '');
            const code = detectCode(digits);
            const nationalNumber = digits.replace(code.replace('+', ''), '');
            setCode(code);
            setNumber(nationalNumber);
        }
    }, [info]);

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
                                            <h4>{info.last_name} {info.first_name} {info.surname}</h4>
                                            <p style={{ color: info.is_2fa_enabled ? 'green' : 'red' }}>
                                                {info.is_2fa_enabled ? 'Верифицирован' : 'Не верифицирован'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={css.data_profil}>
                                        <div>
                                            <h4>ID ползователя</h4>
                                            <p>{info.uuid}</p>
                                        </div>
                                        <div className={css.solid_gorizont}></div>
                                        <div>
                                            <h4>Время последней активности</h4>
                                            <p>{info.last_activity}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={css.osnovnoy}>
                                    <div className={css.block}>
                                        <form className={css.vvod} onSubmit={handleSubmit} autoComplete="on">
                                            <div className={css.inputs}>
                                                <label>Фамилия</label>
                                                <input
                                                    name="last_name"
                                                    type="text"
                                                    placeholder="Введите фамилию"
                                                    value={surname}
                                                    onChange={(e) => setSurname(e.target.value)}
                                                    autoComplete="family-name"
                                                    required
                                                />
                                            </div>

                                            <div className={css.inputs}>
                                                <label>Имя</label>
                                                <input
                                                    name="first_name"
                                                    type="text"
                                                    placeholder="Введите имя"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    autoComplete="given-name"
                                                    required
                                                />
                                            </div>

                                            <div className={css.inputs}>
                                                <label>Отчество</label>
                                                <input
                                                    name="patronymic"
                                                    type="text"
                                                    placeholder="Введите отчество"
                                                    value={patronymic}
                                                    onChange={(e) => setPatronymic(e.target.value)}
                                                    autoComplete="additional-name"
                                                />
                                            </div>

                                            <div className={css.inputs}>
                                                <label>Дата рождения</label>
                                                <DatePicker
                                                    locale={ru}
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    dateFormat="dd.MM.yyyy"
                                                    placeholderText="ДД.ММ.ГГГГ"
                                                    className={css.datepicer}
                                                    autoComplete="bday"
                                                />
                                            </div>

                                            <div className={css.inputs}>
                                                <label>Страна</label>
                                                <div className={css.from}>
                                                    <select
                                                        value={country}
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        autoComplete="country-name"
                                                    >
                                                        <option value="">Страна</option>
                                                        <option value="Кыргызстан">Кыргызстан</option>
                                                        <option value="Казакстан">Казакстан</option>
                                                    </select>
                                                    <IoIosArrowDown className={css.icooo} />
                                                </div>
                                            </div>

                                            <div className={css.inputs}>
                                                <label>Телефон</label>
                                                <div className={css.phone_input}>
                                                    <div className={css.dropdown}>
                                                        <IoIosArrowDown className={css.arrow_phone} />
                                                        <select
                                                            value={codes}
                                                            onChange={(e) => setCode(e.target.value)}
                                                            autoComplete="tel-country-code"
                                                        >
                                                            {countryCodes.map((c) => (
                                                                <option key={c} value={c}>
                                                                    {c}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <input
                                                        name="phone"
                                                        minLength="9"
                                                        type="number"
                                                        placeholder="000 000 000"
                                                        value={number}
                                                        onChange={(e) => setNumber(e.target.value)}
                                                        autoComplete="tel-national"
                                                    />
                                                    <button
                                                        className={confirm}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            requestPhoneCode();
                                                        }}
                                                    >
                                                        Подтвердить
                                                    </button>
                                                </div>
                                            </div>

                                            <button className={css.submit} type="submit">
                                                {loading ? <div className="spinner"></div> : "Сохранить"}
                                            </button>
                                        </form>

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

                                    <button className={css.verificate} onClick={(e) => {
                                        e.preventDefault(); handleVerificate()
                                    }}>{loading1 ? <div className='spinner'></div> : "Пройти верификацию"}</button>
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

                                    <button className={css.verificate} onClick={(e) => {
                                        e.preventDefault(); handleVerificate()
                                    }}>{loading2 ? <div className='spinner'></div> : "Пройти верификацию"}</button>
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

                                    <Link to="/verification" className={css.verificate} >{loading3 ? <div className='spinner'></div> : "Пройти верификацию"}</Link>
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
                                        <span onClick={() => setAuthentication(true)}>Подключить</span>
                                    </div>
                                </div>
                                <div className={css.block}>
                                    <div className={css.lichny + " " + css.bezopasnost}>
                                        <div>
                                            <h4>Личные данные</h4>
                                            <p>Email:</p>
                                            <h5>{info.email}</h5>
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
                                                <input type="checkbox" defaultChecked={true}/>
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
                                                <input type="checkbox" defaultChecked={true}/>
                                                <span className={css.slider}></span>
                                            </label>
                                            <p>Уведомлять о выводе средств с кошелька</p>
                                        </div>
                                        <div className={css.fleex}>
                                            <label className={css.switch}>
                                                <input type="checkbox" defaultChecked={true}/>
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
                        <p>Отправили код на {codes}{number}</p>
                        <div className={css.code_input_wrapper}>
                            {values.map((value, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputsRef.current[i] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleChange(i, e)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    onPaste={handlePaste}
                                    className={css.input}
                                    disabled={confirmLoading}
                                />
                            ))}
                        </div>
                        {confirmError && <p style={{ color: 'red', marginBottom: '0px', }}>{confirmError}</p>}
                        {confirmLoading && <p>Проверка кода...</p>}
                        <div className={css.eshe}><button className={css.eshe_submit} >Отправить еще раз</button></div>
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
                        <form className={css.form_changePassword} onSubmit={changePasswordRequest}>
                            <div className={css.password_wrapper}>
                                <input
                                    type={visible1 ? "text" : "password"}
                                    placeholder="Старый пароль"
                                    className={css.password_input}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <span className={css.toggle_icon} onClick={() => setVisible1(!visible1)}>
                                    {visible1 ? <SlEye /> : <FiEyeOff />}
                                </span>
                            </div>

                            <div className={css.password_wrapper}>
                                <input
                                    type={visible2 ? "text" : "password"}
                                    placeholder="Новый пароль"
                                    className={css.password_input}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span className={css.toggle_icon} onClick={() => setVisible2(!visible2)}>
                                    {visible2 ? <SlEye /> : <FiEyeOff />}
                                </span>
                            </div>

                            <div className={css.password_wrapper}>
                                <input
                                    type={visible3 ? "text" : "password"}
                                    placeholder="Подтвердите пароль"
                                    className={css.password_input}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span className={css.toggle_icon} onClick={() => setVisible3(!visible3)}>
                                    {visible3 ? <SlEye /> : <FiEyeOff />}
                                </span>
                            </div>

                            <button
                                type="button"
                                className={css.change_password}
                                onClick={() => {
                                    setChangePassword(false);
                                    setForgotPassword(true);
                                }}
                            >
                                Забыли пароль?
                            </button>

                            <div className={css.ff}>
                                <button type="button" onClick={() => setChangePassword(false)}>Отменить</button>
                                <button className={css.delete_submit} type="submit" disabled={loading}>
                                    {loading ? "Сохранение..." : "Сохранить"}
                                </button>
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

            {authentication && ReactDOM.createPortal(
                <div className={css.overlay} >
                    <div className={css.modal_auth} >
                        <button className={css.modal_close} onClick={() => setAuthentication(false)}><IoClose /></button>
                        <h2>Верификация с помощью Google <br /> Authenticator</h2>
                        <div className={css.pages}>
                            <div>1</div>
                            <p>Чтобы не ждать ОТР-код, получайте проверочные коды через приложение Google Authenticator. Приложение работает, даже если ваш телефон находится в автономном режиме.</p>
                        </div>
                        <div className={css.qr_block}>
                            <div className={css.qr}>
                                <img src={qrImage} alt="qr" />
                            </div>
                            <div className={css.url_qr}>
                                <p>Отсканируйте QR-код или скопируйте 16-значный ключ</p>
                                <div><h4>{secretKey}</h4> <span onClick={handleCopy}>{copied ? <TbChecks color="green" /> : <TbCopy />}</span></div>
                            </div>
                        </div>
                        <div className={css.pages}>
                            <div>2</div>
                            <p>Откройте Google Authenticator и добавьте новый аутентификатор, используя 16-значный ключ, который вы только что скопировали.</p>
                        </div>

                        <div className={css.pages}>
                            <div>3</div>
                            <p>Вернитесь и подтвердите новый аутентификатор в личном кабинете XRuby. Убедитесь, что вы завершили шаг 2, прежде чем продолжить.</p>
                        </div>
                        <form onSubmit={handleVerify}>
                            <div className={css.inputik}>
                                <label >Код из Google Authenticator</label>
                                <input
                                    type="text"
                                    placeholder="Введите 6-значный код"
                                    value={cood}
                                    onChange={(e) => setCood(e.target.value)}
                                    maxLength={6}
                                    required
                                    className={css.input}
                                />
                            </div>
                            <div className={css.ff}>
                                <button onClick={() => setAuthentication(false)}>Отменить</button>
                                <button type="submit" disabled={loading} className={css.button}>
                                    {loading ? <div className='spinner'></div> : "Отправить"}
                                </button>
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
