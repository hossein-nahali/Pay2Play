import './assets/css/header.scss'
import {NavLink} from "react-router";
import MyIcon from './assets/img/logo.svg?react'
import MenuIcon from './assets/img/menu.svg?react'
import InstagramIcon from './assets/img/instagram.svg?react'
import WhatsappIcon from './assets/img/whatsapp.svg?react'
import TelegramIcon from './assets/img/telegram.svg?react'
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import myProfile from './assets/img/myProfile.png'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleClose = () => setIsMenuOpen(false)
    return (
        <>
            <header className={'header-container'}>
                <NavLink to={'/'}>
                    <MyIcon/>
                    <span className={'header-title'}>پی2پلی</span>
                </NavLink>
                <MenuIcon onClick={() => setIsMenuOpen(true)}/>
            </header>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className="menu-overlay"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={handleClose}
                        />

                        <motion.div
                            className="bottom-menu"
                            initial={{y: "100%"}}
                            animate={{y: "0"}}
                            exit={{y: "100%"}}
                            transition={{type: "spring", stiffness: 100, damping: 20}}
                        >
                            <div className="my-info">
                                <img src={myProfile} alt="profile"/>
                                <div className="data">
                                    <h3>حسین نهالی</h3>
                                    <h3>nahali.dev@gmail.com</h3>
                                </div>
                            </div>
                            <div className="content">
                                <h2>درباره پروژه</h2>
                                <p>پروژه محاسبه قیمت گیم‌نت یک ابزار ساده برای تعیین هزینهٔ نهایی استفاده از خدمات
                                    گیم‌نت است. کاربر با وارد کردن مدت زمان بازی و نرخ تعرفه، هزینهٔ پایه را مشاهده
                                    می‌کند. در صورت نیاز، امکان افزودن آیتم‌های جانبی مانند خوراکی یا خدمات اضافه نیز
                                    فراهم است. این ابزار برای تسهیل مدیریت مالی و شفاف‌سازی هزینه‌ها طراحی شده است. </p>
                            </div>
                            <div className="social-media">
                                <h3>درباره ما</h3>
                                <ul>
                                    <li><NavLink to={'https://www.instagram.com/hosseinnahali/'}><InstagramIcon/></NavLink></li>
                                    <li><NavLink to={'https://wa.me/+989369079925/'}><WhatsappIcon/></NavLink></li>
                                    <li><NavLink to={'https://t.me/nahali_dev/'}><TelegramIcon/></NavLink></li>
                                </ul>
                            </div>
                            <NavLink to={'https://reymit.ir/nahali'}>حمایت مالی</NavLink>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}