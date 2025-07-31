import css from "./Header.module.css"
import logo from "../../img/svg/favicon.svg"
import { Link, useLocation } from "react-router-dom"
import flagRU from "../../img/svg/RU.svg"
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react"
import { Squash as Hamburger } from 'hamburger-react'
export const Header = () => {

    const [language, setLanguage] = useState(false)
    const menuRef = useRef(null);
    const [open, setOpen] = useState(false)

    const location = useLocation();
    const [lineStyle, setLineStyle] = useState({});
    const menuRefs = useRef([]);

    const menuItems = [
        { name: "Правила обмена", path: "/exchange_rules" },
        { name: "Партнерам", path: "/w" },
        { name: "Новости", path: "/all_news" },
        { name: "О сервисе", path: "/service" },
        { name: "Контакты", path: "/contacts" },
    ];

    useEffect(() => {
        const currentIndex = menuItems.findIndex(item => item.path === location.pathname);
        const activeEl = menuRefs.current[currentIndex];

        if (activeEl) {
            setLineStyle({
                width: `${activeEl.offsetWidth}px`,
                left: `${activeEl.offsetLeft}px`,
            });
        }

        const handleResize = () => {
            const active = menuRefs.current[currentIndex];
            if (active) {
                setLineStyle({
                    width: `${active.offsetWidth}px`,
                    left: `${active.offsetLeft}px`,
                });
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setLanguage(false);
                setOpen(false)
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setLanguage, setOpen]);

    const locations = useLocation();

    const isRestPage = () => {
        return locations.pathname.startsWith('/All_Review') ||
            locations.pathname.startsWith('/all_news') ||
            locations.pathname.startsWith('/faq') ||
            locations.pathname.startsWith('/service')||
            locations.pathname.startsWith('/news/')||
            locations.pathname.startsWith('/exchange_rules')||
            locations.pathname.startsWith('/contacts')||
            locations.pathname.startsWith('/registration')||
            locations.pathname.startsWith('/login')||
            locations.pathname.startsWith('/forgot_your_password')||
            locations.pathname.startsWith('/new_password')||
            locations.pathname.startsWith('/terms-of-service')
    };
``
    const Alink = () => isRestPage() ? css.menu_item_rest : 'header-default';
    const Langtop = () => isRestPage() ? css.blockOne_rest : 'header-default';
    const Entrance = () => isRestPage() ? css.acount_rest : 'header-default';
    const Burgerr = () => isRestPage() ? css.burgerr : 'header-default';
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    return (
        <div className={css.parent}>
            <div className={`${css.content} container`}>
                <Link to="/" className={css.logo}><img src={logo} alt="logo" /></Link>
                <div className={open ? css.blur : ""}>
                    <div ref={menuRef} className={`${css.burgMenu} ${open ? css.close : ""}`}>
                        <div className={css.flex}>
                            <div className={`${css.burger} ${css.burgerclose}`} onClick={() => setOpen(!open)}>
                                <Hamburger toggled={open} toggle={setOpen} distance="sm" rounded />
                            </div>
                            <div className={`${css.language} ${css.languageclose}`}>
                                <div className={css.blockOne} onClick={() => setLanguage(!language)}>
                                    <img src={flagRU} alt="flag" />
                                    <IoIosArrowDown className={`${css.icons} ${language ? css.rotate : ""}`} />
                                </div>
                                {language &&
                                    <div className={css.dropDown}>
                                        <div>
                                            <img src={flagRU} alt="flag" />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={css.menu}>
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    ref={el => menuRefs.current[index] = el}
                                    className={`${css.menu_item} ${Alink()} ${location.pathname === item.path ? css.active : ""}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className={css.line} style={lineStyle} />
                        </div>
                        <Link to="/login" className={`${css.acount} ${css.languageclose} ${Entrance()}`}> Войти</Link>
                    </div>
                </div>



                <div className={css.block}>
                    <div className={css.language}>
                        <div  className={`${css.blockOne} ${Langtop()}`} onClick={() => setLanguage(!language)}>
                            <img src={flagRU} alt="flag" />
                            <IoIosArrowDown className={`${css.icons} ${language ? css.rotate : ""}`} />
                        </div>
                        {language &&
                            <div className={css.dropDown}>
                                <div>
                                    <img src={flagRU} alt="flag" />
                                </div>
                            </div>
                        }
                    </div>
                    <Link to="/login" className={`${css.acount} ${Entrance()}`}> Войти</Link>
                </div>

                <div className={`${css.burger} ${Burgerr()}`} onClick={() => setOpen(!open)}>
                    <Hamburger toggled={open} toggle={setOpen} distance="sm" rounded />
                </div>
            </div>
        </div>
    )
}

