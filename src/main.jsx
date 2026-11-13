
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useLocation
} from 'react-router-dom';

import {
  ArrowUpRight, ArrowRight, Shield, Menu, X, Phone,
  MapPin, Clock3, Mail, ChevronRight, Crosshair,
  GraduationCap, Users, FileText, CalendarDays,
  CheckCircle2, Send, BadgeCheck, Zap, BookOpen,
  ClipboardList
} from 'lucide-react';

import './styles.css';

const phone1 = '+7 (910) 647-67-97';
const phone2 = '+7 (920) 162-21-21';
const email = 'centr-b@bk.ru';

const courses = [
  {slug:'bpla',title:'Противодействие БПЛА',tag:'Специализированная подготовка',desc:'Теоретическая и практическая подготовка сотрудников охранных структур по противодействию беспилотным летательным аппаратам и защите объектов.',hours:'36 часов',price:'3 000 ₽',image:'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=85'},
  {slug:'extremism',title:'Противодействие экстремизму и терроризму',tag:'Безопасность объектов',desc:'Подготовка по вопросам профилактики угроз, организации безопасной среды и действий персонала в нештатных ситуациях.',hours:'По программе',price:'По запросу',image:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85'},
  {slug:'tactical-medicine',title:'Тактическая медицина',tag:'Первая помощь',desc:'Практический курс по оказанию первой помощи в условиях повышенного риска и ограниченного времени.',hours:'8 часов',price:'5 000 ₽',image:'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=85'},
  {slug:'weapon-tactics',title:'Курс тактического применения оружия',tag:'Практические занятия',desc:'Практическая подготовка и отработка навыков безопасного обращения с оружием в рамках учебной программы.',hours:'4 часа',price:'5 000 ₽',image:'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=1200&q=85'},
  {slug:'civil-weapon',title:'Безопасное владение гражданским оружием',tag:'Гражданам',desc:'Обучение безопасному обращению с гражданским оружием и подготовка к прохождению установленной проверки знаний.',hours:'6 часов',price:'1 700 ₽',image:'https://images.unsplash.com/photo-1584281722573-2a4c7fef7a1e?auto=format&fit=crop&w=1200&q=85'},
  {slug:'first-aid',title:'Оказание первой помощи',tag:'Практические навыки',desc:'Обучение базовым алгоритмам первой помощи и действиям до прибытия медицинских специалистов.',hours:'8 часов',price:'5 000 ₽',image:'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=1200&q=85'},
  {slug:'guards',title:'Подготовка частных охранников',tag:'4, 5 и 6 разряды',desc:'Профессиональная подготовка частных охранников 4-го, 5-го и 6-го разрядов с теоретическими и практическими занятиями.',hours:'40–80 часов',price:'от 2 000 ₽',image:'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=85'},
  {slug:'guard-refresh',title:'Повышение квалификации охранников',tag:'4, 5 и 6 разряды',desc:'Курсы повышения квалификации частных охранников с учетом требований к соответствующему разряду.',hours:'1–3 дня',price:'от 550 ₽',image:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85'},
  {slug:'management',title:'Подготовка руководителей ЧОО',tag:'Руководителям',desc:'Подготовка и повышение квалификации руководителей частных охранных организаций.',hours:'20–40 часов',price:'от 2 000 ₽',image:'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85'},
  {slug:'departmental',title:'Подготовка ведомственной охраны',tag:'Для организаций',desc:'Профессиональная подготовка сотрудников ведомственной охраны по профильным программам.',hours:'По программе',price:'По запросу',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85'},
  {slug:'bailiffs',title:'Подготовка силовых подразделений ФССП',tag:'Специализированная подготовка',desc:'Учебные программы для сотрудников силовых подразделений судебных приставов.',hours:'По программе',price:'По запросу',image:'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=85'},
  {slug:'cash',title:'Модульная подготовка инкассаторов',tag:'Для организаций',desc:'Модульная подготовка сотрудников инкассаторских подразделений.',hours:'По программе',price:'По запросу',image:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85'}
];

const prices = [
  ['Электронное учебное пособие','—','500 ₽'],
  ['Экзамен по безопасному обращению с оружием','—','800 ₽'],
  ['Безопасное обращение с оружием','1 день / 6 часов','1 700 ₽'],
  ['Тактическая медицина','1 день / 8 часов','5 000 ₽'],
  ['Подготовка охранника 4 разряда','5 дней / 40 часов','2 000 ₽'],
  ['Подготовка охранника 5 разряда','7 дней / 60 часов','3 000 ₽'],
  ['Подготовка охранника 6 разряда','10 дней / 80 часов','4 000 ₽'],
  ['Периодическая проверка — 4 разряд','—','1 000 ₽'],
  ['Периодическая проверка — 5 разряд','—','1 000 ₽'],
  ['Периодическая проверка — 6 разряд','—','1 500 ₽'],
  ['Пересдача экзамена','—','500 ₽'],
  ['Повышение квалификации — 4 разряд','1 день','550 ₽'],
  ['Повышение квалификации — 5 разряд','2 дня','850 ₽'],
  ['Повышение квалификации — 6 разряд','3 дня','1 050 ₽'],
  ['Оказание первой помощи','1 день / 8 часов','5 000 ₽'],
  ['Тактическое применение оружия','1 день / 4 часа','5 000 ₽'],
  ['Подготовка руководителей ЧОО','40 часов','8 000 ₽'],
  ['Повышение квалификации руководителей ЧОО','20 часов','2 000 ₽'],
  ['Противодействие БПЛА','36 часов','3 000 ₽']
];

const nav = [
  ['Направления','/courses'],
  ['Цены','/prices'],
  ['Расписание','/schedule'],
  ['О центре','/about'],
  ['Документы','/documents'],
  ['Новости','/news'],
  ['Контакты','/contacts']
];

function Header() {
  const [open,setOpen] = useState(false);
  const loc = useLocation();

  React.useEffect(() => setOpen(false),[loc]);

  return (
    <header className="header">
      <div className="container nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-mark"><Shield size={24}/></span>
          <span><b>ЦЕНТР<span className="orange">-Б</span></b><small>БЕЗОПАСНОСТЬ · ТВЕРЬ</small></span>
        </Link>
        <nav className={open?'nav open':'nav'}>
          {nav.map(([n,p]) => <NavLink key={p} to={p}>{n}</NavLink>)}
        </nav>
        <a className="nav-phone" href="tel:+79106476797"><Phone size={15}/>{phone1}</a>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Меню">
          {open?<X/>:<Menu/>}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand">
            <span className="brand-mark"><Shield/></span>
            <span><b>ЦЕНТР<span className="orange">-Б</span></b><small>БЕЗОПАСНОСТЬ · ТВЕРЬ</small></span>
          </Link>
          <p className="muted footer-copy">АНО ДПО «Центр-Безопасность». Профессиональная подготовка и повышение квалификации.</p>
        </div>
        <div>
          <h4>Навигация</h4>
          {nav.slice(0,5).map(([n,p]) => <Link className="footer-link" to={p} key={p}>{n}</Link>)}
        </div>
        <div>
          <h4>Контакты</h4>
          <p><MapPin size={15}/> г. Тверь, ул. Ржевская, д. 10, оф. 10</p>
          <p><Clock3 size={15}/> Пн–Пт: 9:30–14:00</p>
          <p><Mail size={15}/> <a href={'mailto:'+email}>{email}</a></p>
        </div>
        <div>
          <h4>Связаться с нами</h4>
          <a className="footer-tel" href="tel:+79106476797">{phone1}</a>
          <a className="footer-tel" href="tel:+79201622121">{phone2}</a>
          <Link className="btn btn-orange btn-small" to="/contacts">Оставить заявку <ArrowUpRight size={15}/></Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} АНО ДПО «Центр-Безопасность»</span>
        <span>Лицензия №326 от 13.09.2016</span>
        <span>Информация сайта не является публичной офертой.</span>
      </div>
    </footer>
  );
}

function PageIntro({eyebrow,title,desc}) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="eyebrow"><span/> {eyebrow}</div>
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
      </div>
    </section>
  );
}

function CourseCard({c,i=0}) {
  return (
    <article className="course-card">
      <Link to={'/courses/'+c.slug} className="course-image">
        <img src={c.image} alt="" loading="lazy"/>
        <span className="image-index">0{i+1}</span>
        <span className="image-arrow"><ArrowUpRight/></span>
      </Link>
      <div className="course-content">
        <span className="tag">{c.tag}</span>
        <h3><Link to={'/courses/'+c.slug}>{c.title}</Link></h3>
        <p>{c.desc}</p>
        <div className="course-meta"><span>{c.hours}</span><b>{c.price}</b></div>
      </div>
    </article>
  );
}

function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-box">
        <div>
          <div className="eyebrow"><span/> СДЕЛАЙТЕ СЛЕДУЮЩИЙ ШАГ</div>
          <h2>Готовы пройти обучение?</h2>
          <p>Свяжитесь с нами — подскажем программу, сроки и порядок записи.</p>
        </div>
        <Link to="/contacts" className="btn btn-orange">Записаться на обучение <ArrowUpRight/></Link>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg"/>
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span/> УЧЕБНЫЙ ЦЕНТР · ТВЕРЬ</div>
            <h1>ПОДГОТОВКА.<br/><em>КОТОРОЙ</em><br/>ДОВЕРЯЮТ.</h1>
            <p>Профессиональное обучение, развитие практических навыков и подготовка специалистов в сфере безопасности.</p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-orange">Выбрать программу <ArrowUpRight/></Link>
              <Link to="/about" className="text-link">О центре <ArrowRight size={17}/></Link>
            </div>
            <div className="hero-note"><span className="note-line"/> Лицензированная образовательная деятельность · №326</div>
          </div>
          <div className="hero-side">
            <div className="hero-stamp"><Shield size={34}/><span>ЗНАНИЯ<br/>И НАВЫКИ<br/>ДЛЯ ДЕЛА</span></div>
            <div className="hero-side-caption">01 / ПРОФЕССИОНАЛЬНАЯ ПОДГОТОВКА</div>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>АНО ДПО «ЦЕНТР-БЕЗОПАСНОСТЬ»</span>
          <span>ПРОФЕССИОНАЛЬНЫЕ РЕШЕНИЯ В СФЕРЕ ОБУЧЕНИЯ</span>
          <span>ТВЕРЬ · РОССИЯ</span>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div><b>№326</b><span>Лицензия на образовательную деятельность</span></div>
          <div><b>12+</b><span>Направлений подготовки</span></div>
          <div><b>4–6</b><span>Квалификационные разряды охранников</span></div>
          <div><b>36 ч</b><span>Программа противодействия БПЛА</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow"><span/> НАПРАВЛЕНИЯ ОБУЧЕНИЯ</div>
              <h2>ПОДГОТОВКА<br/>ПОД РЕАЛЬНЫЕ <em>ЗАДАЧИ</em></h2>
            </div>
            <Link to="/courses" className="text-link">Все программы <ArrowUpRight/></Link>
          </div>
          <div className="course-grid">{courses.slice(0,6).map((c,i) => <CourseCard c={c} i={i} key={c.slug}/>)}</div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container split-section">
          <div>
            <div className="eyebrow"><span/> ПОЧЕМУ «ЦЕНТР-БЕЗОПАСНОСТЬ»</div>
            <h2>ЗНАНИЯ, КОТОРЫЕ<br/><em>РАБОТАЮТ</em></h2>
            <p className="lead">Обучение строится вокруг прикладных задач и требований профессиональной деятельности.</p>
            <Link to="/about" className="btn btn-outline">Подробнее о центре <ArrowUpRight/></Link>
          </div>
          <div className="feature-list">
            <div><BadgeCheck/><span><b>Лицензированная деятельность</b><small>Лицензия №326 от 13.09.2016</small></span></div>
            <div><GraduationCap/><span><b>Разнообразие программ</b><small>Подготовка, переподготовка и повышение квалификации</small></span></div>
            <div><Crosshair/><span><b>Практическая база</b><small>Учебные классы, тренажеры и стрелковый тир</small></span></div>
            <div><Users/><span><b>Опытная команда</b><small>Преподаватели и специалисты профильных направлений</small></span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><div className="eyebrow"><span/> ПЛАНИРУЙТЕ ОБУЧЕНИЕ</div><h2>ВАЖНАЯ <em>ИНФОРМАЦИЯ</em></h2></div>
          </div>
          <div className="info-grid">
            <Link to="/prices" className="info-card"><span><FileText/></span><h3>Стоимость обучения</h3><p>Ознакомьтесь с ценами на основные программы и услуги.</p><b>Посмотреть цены <ArrowUpRight/></b></Link>
            <Link to="/schedule" className="info-card"><span><CalendarDays/></span><h3>Расписание занятий</h3><p>Актуальные даты учебных групп и экзаменов.</p><b>Открыть расписание <ArrowUpRight/></b></Link>
            <Link to="/documents" className="info-card"><span><ClipboardList/></span><h3>Документы центра</h3><p>Сведения об образовательной организации и разрешительные документы.</p><b>Перейти к документам <ArrowUpRight/></b></Link>
          </div>
        </div>
      </section>
      <CTA/>
    </>
  );
}

function Courses() {
  return (
    <>
      <PageIntro eyebrow="ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ" title={<>НАПРАВЛЕНИЯ<br/><em>ПОДГОТОВКИ</em></>} desc="Выберите программу обучения. Для уточнения условий, дат и комплекта документов свяжитесь с учебным центром."/>
      <section className="section"><div className="container"><div className="course-grid">{courses.map((c,i) => <CourseCard c={c} i={i} key={c.slug}/>)}</div></div></section>
      <CTA/>
    </>
  );
}

function CourseDetail() {
  const {slug} = useParams();
  const c = courses.find(x => x.slug === slug);
  if (!c) return <NotFound/>;

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-grid">
          <div>
            <div className="eyebrow"><span/> ОБРАЗОВАТЕЛЬНАЯ ПРОГРАММА</div>
            <h1>{c.title}</h1>
            <p>{c.desc}</p>
            <div className="detail-facts">
              <div><small>Продолжительность</small><b>{c.hours}</b></div>
              <div><small>Стоимость</small><b>{c.price}</b></div>
            </div>
            <Link to="/contacts" className="btn btn-orange">Записаться на курс <ArrowUpRight/></Link>
          </div>
          <img src={c.image} alt={c.title}/>
        </div>
      </section>
      <section className="section">
        <div className="container narrow">
          <div className="eyebrow"><span/> О ПРОГРАММЕ</div>
          <h2>ПОЛУЧИТЕ ЗНАНИЯ<br/>И <em>ПРАКТИЧЕСКИЕ НАВЫКИ</em></h2>
          <p className="body-copy">{c.desc} Содержание, сроки и условия обучения уточняются у администрации центра в соответствии с действующей образовательной программой.</p>
          <div className="notice"><CheckCircle2/><span>Запись на обучение осуществляется по предварительной записи. Для уточнения перечня документов и ближайших дат позвоните нам.</span></div>
          <h3 className="subheading">Как записаться</h3>
          <ol className="steps">
            <li>Свяжитесь с учебным центром по телефону или через форму заявки.</li>
            <li>Уточните требования к слушателям и список необходимых документов.</li>
            <li>Согласуйте дату начала занятий и порядок оформления.</li>
          </ol>
        </div>
      </section>
      <CTA/>
    </>
  );
}

function Prices() {
  return (
    <>
      <PageIntro eyebrow="ПРОЗРАЧНЫЕ УСЛОВИЯ" title={<>ЦЕНЫ НА <em>ОБУЧЕНИЕ</em></>} desc="Стоимость основных образовательных программ и услуг учебного центра. Для уточнения актуальности цен свяжитесь с администрацией."/>
      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Наименование услуги</th><th>Срок обучения</th><th>Стоимость</th></tr></thead>
              <tbody>{prices.map((r,i) => <tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td className="price-cell">{r[2]}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="fineprint">Информация о ценах носит информационный характер и не является публичной офертой. Актуальную стоимость и условия уточняйте по телефонам учебного центра.</p>
        </div>
      </section>
      <CTA/>
    </>
  );
}

function Schedule() {
  return (
    <>
      <PageIntro eyebrow="ПЛАНИРУЙТЕ СВОЕ ОБУЧЕНИЕ" title={<>РАСПИСАНИЕ <em>ЗАНЯТИЙ</em></>} desc="Расписание учебных групп и экзаменов. Перед посещением рекомендуем подтвердить дату по телефону."/>
      <section className="section">
        <div className="container">
          <div className="schedule-banner"><CalendarDays/><div><b>Ноябрь — декабрь 2026</b><span>Данные опубликованы на исходном сайте. Уточняйте возможные изменения у администратора.</span></div></div>
          <div className="schedule-grid">
            <div className="schedule-card">
              <h3>Ноябрь 2026</h3>
              <p><b>Охранники 4 разряда</b> — 02–06.11, 09–13.11, 16–20.11, 23–27.11, 30.11–04.12</p>
              <p><b>Охранники 5 разряда</b> — 26.10–04.11, 09–18.11, 23.11–02.12</p>
              <p><b>Охранники 6 разряда</b> — 26.10–06.11, 09–20.11, 23.11–04.12</p>
              <p><b>Периодическая проверка</b> — 02.11 и 23.11</p>
              <p><b>Гражданское оружие</b> — 19.11, 21.11, 26.11</p>
            </div>
            <div className="schedule-card">
              <h3>Декабрь 2026</h3>
              <p><b>Охранники 4 разряда</b> — 30.11–04.12, 07–11.12, 14–18.12, 21–25.12</p>
              <p><b>Охранники 5 разряда</b> — 23.11–02.12, 07–16.12</p>
              <p><b>Охранники 6 разряда</b> — 23.11–04.12, 07–18.12</p>
              <p><b>Периодическая проверка</b> — 14.12</p>
              <p><b>Гражданское оружие</b> — 17.12, 19.12, 24.12</p>
            </div>
          </div>
          <div className="notice"><Clock3/><span>Повышение квалификации частных охранников: по будням с 09:30 до 13:00. Даты экзаменов и свободные места необходимо подтвердить у администратора.</span></div>
        </div>
      </section>
      <CTA/>
    </>
  );
}

function About() {
  return (
    <>
      <PageIntro eyebrow="ОБРАЗОВАТЕЛЬНАЯ ОРГАНИЗАЦИЯ" title={<>ЦЕНТР, ГДЕ ФОРМИРУЮТ<br/><em>ПРОФЕССИОНАЛИЗМ</em></>} desc="АНО ДПО «Центр-Безопасность» — учебный центр дополнительного профессионального образования в Твери."/>
      <section className="section">
        <div className="container about-grid">
          <div className="about-photo"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85" alt="Учебная команда"/></div>
          <div>
            <div className="eyebrow"><span/> ОРГАНИЗАЦИЯ</div>
            <h2>ОБУЧЕНИЕ ДЛЯ <em>ПРОФЕССИОНАЛОВ</em></h2>
            <p className="body-copy">Автономная некоммерческая организация дополнительного профессионального образования «Центр-Безопасность» реализует программы профессионального обучения, дополнительного профессионального образования и дополнительного образования.</p>
            <p className="body-copy">Обучение проводится в очной форме. В зависимости от программы используются учебные классы, наглядные пособия, компьютерное и проекционное оборудование, стрелковый тир и тренажеры.</p>
            <div className="license-box"><Shield/><span><b>Лицензия №326</b><small>от 13 сентября 2016 года</small></span></div>
          </div>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container">
          <div className="eyebrow"><span/> НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ</div>
          <h2>КОМПЕТЕНЦИИ ДЛЯ <em>БЕЗОПАСНОСТИ</em></h2>
          <div className="feature-grid">
            <div><GraduationCap/><h3>Профессиональное обучение</h3><p>Подготовка, переподготовка и повышение квалификации.</p></div>
            <div><Crosshair/><h3>Практическая подготовка</h3><p>Практические занятия и учебная материальная база.</p></div>
            <div><Users/><h3>Работа с организациями</h3><p>Программы для охранных и ведомственных структур.</p></div>
          </div>
        </div>
      </section>
      <CTA/>
    </>
  );
}

function Documents() {
  const docs = [
    'Основные сведения об организации',
    'Лицензия на осуществление образовательной деятельности',
    'Устав организации',
    'Документы и локальные нормативные акты',
    'Образование и реализуемые программы',
    'Руководство и педагогический состав',
    'Материально-техническое обеспечение',
    'Платные образовательные услуги',
    'Финансово-хозяйственная деятельность',
    'Вакантные места для приема'
  ];

  return (
    <>
      <PageIntro eyebrow="ОТКРЫТАЯ ИНФОРМАЦИЯ" title={<>ДОКУМЕНТЫ И <em>СВЕДЕНИЯ</em></>} desc="Информация об образовательной организации в соответствии с требованиями к размещению сведений на официальном сайте."/>
      <section className="section">
        <div className="container doc-list">
          {docs.map((d,i) => (
            <a key={d} href="https://centr-b.com/svedeniya-ob-obrazovatelnoy-deyatelnosti/" target="_blank" rel="noreferrer" className="doc-row">
              <span className="doc-icon"><FileText/></span>
              <span><small>РАЗДЕЛ {String(i+1).padStart(2,'0')}</small><b>{d}</b></span>
              <ArrowUpRight/>
            </a>
          ))}
          <p className="fineprint">Официальные документы и актуальные версии файлов доступны в соответствующих разделах исходного сайта организации.</p>
        </div>
      </section>
      <CTA/>
    </>
  );
}

function News() {
  const items = [
    ['08 октября 2025','День призывника','Участие в мероприятии, посвященном военно-патриотическому воспитанию молодежи.'],
    ['08 октября 2025','Противодействие БПЛА','Знакомство с актуальными направлениями подготовки по защите объектов от беспилотных угроз.'],
    ['18 декабря 2024','Занятие по программе ОБЗР','Практическое занятие в рамках образовательной программы основ безопасности и защиты Родины.']
  ];

  return (
    <>
      <PageIntro eyebrow="СОБЫТИЯ И ОБЪЯВЛЕНИЯ" title={<>НОВОСТИ <em>ЦЕНТРА</em></>} desc="События, учебные мероприятия и новости образовательной организации."/>
      <section className="section">
        <div className="container news-list">
          {items.map((n,i) => (
            <article className="news-row" key={n[1]}>
              <div className="news-date">{n[0]}<span>НОВОСТЬ / 0{i+1}</span></div>
              <div><h2>{n[1]}</h2><p>{n[2]}</p></div>
              <ArrowUpRight/>
            </article>
          ))}
        </div>
      </section>
      <CTA/>
    </>
  );
}

function Contacts() {
  const [sent,setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = encodeURIComponent('Заявка с сайта Центр-Безопасность');
    const body = encodeURIComponent(
      `Имя: ${f.get('name')}\nТелефон: ${f.get('phone')}\nПрограмма: ${f.get('course')}\nКомментарий: ${f.get('message')}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <PageIntro eyebrow="МЫ НА СВЯЗИ" title={<>КОНТАКТЫ И <em>ЗАПИСЬ</em></>} desc="Свяжитесь с нами, чтобы узнать подробности программ, уточнить расписание и записаться на обучение."/>
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <div className="contact-line"><Phone/><span><small>ТЕЛЕФОНЫ</small><a href="tel:+79106476797">{phone1}</a><a href="tel:+79201622121">{phone2}</a><a href="tel:+74822476797">47-67-97</a></span></div>
            <div className="contact-line"><Mail/><span><small>ЭЛЕКТРОННАЯ ПОЧТА</small><a href={'mailto:'+email}>{email}</a></span></div>
            <div className="contact-line"><MapPin/><span><small>АДРЕС</small><b>г. Тверь, ул. Ржевская, д. 10, оф. 10</b></span></div>
            <div className="contact-line"><Clock3/><span><small>РЕЖИМ РАБОТЫ</small><b>Пн–Пт: 9:30–14:00<br/>Сб–Вс: выходные</b></span></div>
            <div className="map-placeholder">
              <MapPin/><b>Мы находимся в Твери</b><span>ул. Ржевская, д. 10, офис 10</span>
              <a href="https://yandex.ru/maps/?text=Тверь%20ул.%20Ржевская%2010" target="_blank" rel="noreferrer">Открыть карту <ArrowUpRight size={15}/></a>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <div className="eyebrow"><span/> ФОРМА ОБРАТНОЙ СВЯЗИ</div>
            <h2>ОСТАВИТЬ <em>ЗАЯВКУ</em></h2>
            <label>Ваше имя<input name="name" required placeholder="Как к вам обращаться"/></label>
            <label>Номер телефона<input name="phone" type="tel" required placeholder="+7 (___) ___-__-__"/></label>
            <label>Интересующая программа
              <select name="course">
                <option>Не определился(ась)</option>
                {courses.map(c => <option key={c.slug}>{c.title}</option>)}
              </select>
            </label>
            <label>Комментарий<textarea name="message" rows="4" placeholder="Ваш вопрос или удобное время для звонка"/></label>
            <button className="btn btn-orange" type="submit">Отправить заявку <Send size={16}/></button>
            <p className="fineprint">Нажимая кнопку, вы подготовите письмо в почтовой программе. Отправка произойдет после подтверждения с вашей стороны.</p>
            {sent && <p className="form-success">Почтовое приложение должно открыться с подготовленной заявкой.</p>}
          </form>
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return <PageIntro eyebrow="404" title={<>СТРАНИЦА НЕ <em>НАЙДЕНА</em></>} desc="Возможно, адрес изменился или страница была удалена."/>;
}

function App() {
  return (
    <BrowserRouter basename="/centr-b">
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/courses/:slug" element={<CourseDetail/>}/>
          <Route path="/prices" element={<Prices/>}/>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/documents" element={<Documents/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
