import { NavLink, useNavigate } from 'react-router-dom';
import css from './Sidebar.module.css';
import user from "../../img/profile-user.png"
import { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";
import { RiUser3Line } from "react-icons/ri";
import { BiFileBlank } from "react-icons/bi";
import { TbHistory } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { LuArrowLeftToLine } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from 'react-toastify';
import { get, post } from '../../api/ApiRoutes';

const Sidebar = ({close,setClose}) => {
  const [delet, setDelet] = useState(false);
  const [accountExit, setAccountExit]= useState(false)
  const [open,setOpen]= useState(false)
  const navigate = useNavigate();
  const [info,setInfo]= useState([])


  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("access"); 
  
      if (!token) {
        toast.error("Пользователь не авторизован");
        return;
      }
  
      const response = await post.delete_account({},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      toast.success("Аккаунт успешно удалён");
      localStorage.removeItem('access');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при удалении аккаунта");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    navigate('/');
  };

  useEffect(() => {
          const fetchInfo = async () => {
            try {
              const data = await get.personalInfo();
              setInfo(data)
            } catch (err) {
            }
          };
        
          fetchInfo();
        }, []);

  return (
    <div className={`${css.sidebar} ${open?css.open:""} ${close?css.close:""}`}>
      <h2 className={css.h2}>Личный кабинет</h2>
      <div className={css.user}>
        <img src={user} alt="profile" />
        <div>
          <h4>{info.last_name} {info.first_name} {info.surname}</h4>
          <p>{info.email}</p>
        </div>
      </div>
      <div className={css.solid}></div>
      <nav className={css.menu}>
        <NavLink to="/profile" className={({ isActive }) => isActive ? css.active : css.button} onClick={()=>setClose(false)}> <span><RiUser3Line/></span> <p>Профиль</p> <IoIosArrowForward className={css.arrow}/></NavLink>
        <div className={css.solid}></div>
        <NavLink to="/applications" className={({ isActive }) => isActive ? css.active : css.button} onClick={()=>setClose(false)}> <span><BiFileBlank /></span> <p>Мои заявки</p><IoIosArrowForward className={css.arrow}/></NavLink>
        <NavLink to="/operations" className={({ isActive }) => isActive ? css.active :css.button} onClick={()=>setClose(false)}> <span><TbHistory /></span> <p>История операций</p><IoIosArrowForward className={css.arrow}/></NavLink>
        <div className={css.solid}></div>
        <NavLink onClick={() => setDelet(true)}  className={css.button}> <span><FaRegTrashAlt /> </span><p>Удалить аккаунт</p><IoIosArrowForward className={css.arrow}/></NavLink>
        <NavLink onClick={() => setAccountExit(true)}  className={ css.button}> <span><TbLogout2 /></span><p>Выйти</p><IoIosArrowForward className={css.arrow}/></NavLink>

        <button className={css.collapse} onClick={()=> setOpen(!open)}><span className={open?css.rotate:''}><LuArrowLeftToLine /></span><p>Свернуть</p></button>
      </nav>

      {delet && ReactDOM.createPortal(
        <div className={css.overlay} onClick={() => setDelet(false)}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <button className={css.close_button} onClick={() => setDelet(false)}>
              <IoClose size={24} />
            </button>

            <h2>Удалить аккаунт?</h2>
            <p>Ваш аккаунт удалится навсегда, и вам придется заново зарегистрироваться
            </p>
            <div className={css.ff}>
              <button onClick={() => setDelet(false)}>Отменить</button>
              <button className={css.delete_submit} onClick={handleDeleteAccount}>Удалить</button>
            </div>
          </div>
        </div>,
        document.body
      )}

{accountExit && ReactDOM.createPortal(
        <div className={css.overlay} onClick={() => setAccountExit(false)}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <button className={css.close_button} onClick={() => setAccountExit(false)}>
              <IoClose size={24} />
            </button>

            <h2 >выйти с аккаунта?</h2>
            <p >Вам придется повторно выполнить авторизацию </p>
            <div className={css.ff}>
              <button onClick={() => setAccountExit(false)}>Отменить</button>
              <button className={css.delete_submit} onClick={handleLogout}>Выйти</button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default Sidebar;
