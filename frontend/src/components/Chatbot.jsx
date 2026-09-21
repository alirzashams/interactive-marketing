import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import './Chatbot.css';

const Chatbot = () => {
  // Information from menu (copied from your project)
  const fullMenuData = [
    { name: 'پيتزا رست بيض', cat: 'پيتزا', price: 990000, desc: 'رسته گوساله با قارچ و پنیر ویژه', icon: '🍕', tags: ['heavy', 'meat'] },
    { name: 'پيتزا كربونارا', cat: 'پيتزا', price: 890000, desc: 'بیکن دودي، سس مخصوص و پنير', icon: '🍕', tags: ['heavy', 'meat'] },
    { name: 'پيتزا مرغ و پستو', cat: 'پيتزا', price: 850000, desc: 'مرغ با سس پستوي معطر', icon: '🍕', tags: ['heavy', 'savory'] },
    { name: 'پيتزا پپروني', cat: 'پيتزا', price: 690000, desc: 'پپروني تند با هالوپينو و پنير', icon: '🍕', tags: ['heavy', 'spicy'] },
    { name: 'پيتزا مارگريتا', cat: 'پيتزا', price: 550000, desc: 'گوجه، ريحان تازه و پنير موزارلا', icon: '🍕', tags: ['light', 'savory'] },
    { name: 'دبل चीزبورگر', cat: 'پيتزا', price: 890000, desc: 'دو لایه گوشت خالص با دبل چدار', icon: '🔥', tags: ['heavy', 'meat'] },
    { name: 'گدار برگر', cat: 'پيتزا', price: 830000, desc: 'برگر اختصاصي با سس اسموکی غار', icon: '🏔️', tags: ['heavy', 'meat'] },
    { name: 'رست بيض', cat: 'ساندويچ stor', price: 380000, desc: 'گوشت ريش در نان چاباتا', icon: '🥪', tags: ['meat', 'savory'] },
    { name: 'پستو بیکن', cat: 'ساندويچ stor', price: 350000, desc: 'بیکن برشته با سس پستو و پنير', icon: '🥪', tags: ['savory', 'meat'] },
    { name: 'چيلي بوقلمون', cat: 'ساندويچ stor', price: 290000, desc: 'بوقلمون با چيلي و هالوپينو', icon: '🥪', tags: ['spicy', 'light'] },
    { name: 'پاستا كاربونارا', cat: 'ساندويچ stor', price: 600000, desc: 'پاستا با بیکن و پارمسان', icon: '🍝', tags: ['creamy', 'heavy'] },
    { name: 'پاستا آلفردو', cat: 'ساندويچ stor', price: 570000, desc: 'پنه با مرغ، قارچ و خامه غليظ', icon: '🍝', tags: ['creamy', 'heavy'] },
    { name: 'بلک مامبا', cat: 'نوشيدني stor', price: 350000, desc: 'نوشيدني اختصاصي تيره و razazolود غار', icon: '🍸', tags: ['cold', 'dark'] },
    { name: 'مونتاني', cat: 'نوشيدني stor', price: 280000, desc: 'طلاوت كوهستان با عصاره‌های ميوه‌ای سرد', icon: '🍹', tags: ['cold', 'sweet'] },
    { name: 'موهيتو', cat: 'نوشيدني stor', price: 250000, desc: 'نعناع تازه كوبيده، ليمو و سودا', icon: '🧊', tags: ['cold', 'sour'] },
    { name: 'فراپه ماچا', cat: 'نوشيدني stor', price: 310000, desc: 'ماچا اعلا با خامه، شیر و يخ', icon: '🍵', tags: ['cold', 'creamy'] },
    { name: 'فراپه قهوه', cat: 'نوشيدني stor', price: 300000, desc: 'اسپرسو دوبل با خامه و شیر', icon: '🧋', tags: ['cold', 'caffeine'] },
    { name: 'فيزي لايم', cat: 'اسپرسو بار', price: 330000, desc: 'اسپرسو با سودا و ليمو', icon: '☕', tags: ['caffeine', 'sour', 'cold'] },
    { name: 'آیس کارامل ماکیاتو', cat: 'اسپرسو بار', price: 300000, desc: 'اسپرسو با شیر و سیروپ کارامل', icon: '🍯', tags: ['caffeine', 'cold'] },
    { name: 'اسپرسو', cat: 'اسپرسو بار', price: 230000, desc: 'شات عصاره قهوه ۱۰۰٪ خالص', icon: '☕', tags: ['caffeine', 'bitter'] },
    { name: 'چای کرک', cat: 'چای بار', price: 250000, desc: 'چای غليظ با شیر عسلي و ادويه', icon: '🫖', tags: ['warm', 'sweet'] },
    { name: 'چای دمی گدار', cat: 'چای بار', price: 150000, desc: 'چای لاهيجان در استكان شیاردار', icon: '🫖', tags: ['warm', 'calm'] },
    { name: 'کیک روز', cat: 'چای بار', price: 390000, desc: 'کيك تازه شکلاتی گدار', icon: '🍰', tags: ['sweet', 'dessert'] }
  ];

  // exatamente ۴ سؤال ارزیابی (براساس نظر شما)
  const quizQuestions = [
    {
      step: "گام ۱ از ۴: حالت روحی فعلی",
      title: "حالا چه حالتی در تو حاکم است؟ (یکی را انتخاب کنید)",
      options: [
        { text: "خسته و نیاز به استراحت", tag: "tired", icon: "😴" },
        { text: "پرانرژی و مستعد عمل", tag: "energetic", icon: "⚡" },
        { text: "گرسنه و نیاز به تغذیه", tag: "hungry", icon: "🍴" },
        { text: "تحت استرس و نیاز به کنترل", tag: "stressed", icon: "😣" }
      ]
    },
    {
      step: "گام ۲ از ۴: سلیقه طعم مورد علاقه",
      title: "چه طعمی را در این لحن ترجیح می‌دهید؟ (یکی را انتخاب کنید)",
      options: [
        { text: "شیرین و خوشمزه", tag: "sweet", icon: "🍯" },
        { text: "ترش و منعطف", tag: "sour", icon: "🍋" },
        { text: "تیخ و umami", tag: "salty", icon: "🧂" },
        { text: "مر و پیچیده", tag: "bitter", icon: "☕" }
      ]
    },
    {
      step: "گام ۳ از ۴: زمان و مکان",
      title: "حالا کجا و چه زمانی هستید؟ (یکی را انتخاب کنید)",
      options: [
        { text: "در خانه، عصر/شب آرام", tag: "home_evening", icon: "🏠" },
        { text: "در کار یا دانشگاه، نیاز به تركيز", tag: "work_focus", icon: "💼" },
        { text: "در جاده یا سفر، نیاز به انرژی", tag: "travel_energy", icon: "🛣️" },
        { text: "با دوستان، برای-distraction و تفریح", tag: "friends_fun", icon: "👥" }
      ]
    },
    {
      step: "گام ۴ از ۴: هدف مصرف",
      title: "از این نوشیدنی یا غذا چه انتظاری دارید؟ (یکی را انتخاب کنید)",
      options: [
        { text: "انرژی و الحيوية", tag: "energy_boost", icon: "💥" },
        { text: "سکون و سكونت درونی", tag: "calm_mind", icon: "🧘" },
        { text: "لوکس و récompense", tag: "luxury_treat", icon: "💎" },
        { text: "همشغلی و به اشتراک گذاری", tag: "social_share", icon: "🥂" }
      ]
    }
  ];

  // Mapping ترکیبات به آیتم‌های منو با تخفیف
  const recommendationMap = {
    "tired-sweet-home_evening-energy_boost": {
      item: "پيتزا كربونارا",
      price: 890000,
      discount: "20٪",
      desc: "بیکن دودي، سس مخصوص و پنير - برایpensajj energie shirin baad az yek roz khaste"
    },
    "energetic-sour-work_focus-calm_mind": {
      item: "فيزي لايم",
      price: 330000,
      discount: "20٪",
      desc: "اسپرسو با سودا و ليمو - 中 و 冲眠位置高效性"
    },
    "hungry-salty-travel_energy-luxury_treat": {
      item: "گدار برگر",
      price: 830000,
      discount: "20٪",
      desc: "برگر اختصاصي با سس اسموکی غار - لوکس در مسیر سفر"
    },
    "stressed-bitter-friends_fun-social_share": {
      item: "کیک روز",
      price: 390000,
      discount: "20٪",
      desc: "کیک تازه شکلاتی گدار - برای به اشتراک گذاری سعادتي با دوستان پس از روز stres"
    },
    "default": {
      item: "آیس کارامل ماکیاتو",
      price: 300000,
      discount: "20٪",
      desc: "اسپرسو با شیر و سیروپ کارامل - گزینha امن و خوشمزه برای اکثر موارد"
    }
  };

  // وضعیت چت بات
  const [state, setState] = useState({
    step: 0, // 0=start, 1-4=questions, 5=result, 6=secret
    answers: [],
    waitingForSecret: false,
    messages: [] // هر پیام: {text: string, type: 'user' | 'bot'}
  });

  const addMessage = (text, type) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, { text, type }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    // پردازش بر اساس وضعیت
    if (state.waitingForSecret) {
      handleSecretInput(text);
    } else {
      handleNormalFlow(text);
    }
  };

  const handleNormalFlow = (text) => {
    // مرحله ۰ : شروع مکالمه -> به مرحله سوال اول می‌رویم
    if (state.step === 0) {
      setState(prev => ({ ...prev, step: 1 }));
      addMessage(
        "درود بر تو ای رهگستر. به دیوارهای سنگی گدار خوش آمدی. من، شَمَن این غار، آماده‌ام تا با خرد سنگ‌ها و آتش اجاق، طعم درخورت را پیشنهاد دهم.\n\nبرای شروع، بگو چه حالی در سر داری؟ (مثال: 'خسته ام'، 'گرسنه ام'، ' یونان دارم' یا یک کلمه ساده مثل 'انرژی' یا 'طعم').",
        'bot'
      );
      return;
    }

    // مراحل سوال (1 تا 4)
    if (state.step >= 1 && state.step <= 4) {
      const qIndex = state.step - 1;
      const question = quizQuestions[qIndex];
      const selectedOption = question.options.find(opt =>
        opt.text.toLowerCase().includes(text.toLowerCase()) ||
        text.toLowerCase().includes(opt.text.toLowerCase()) ||
        opt.tag.toLowerCase() === text.toLowerCase()
      );

      if (selectedOption) {
        setState(prev => ({
          ...prev,
          answers: [...prev.answers, {
            step: prev.step,
            tag: selectedOption.tag,
            text: selectedOption.text
          }],
          step: prev.step + 1
        }));

        if (state.step > 4) {
          // تمام سوالات پاسخ داده شد، نتیجه را محاسبه و نمایش می‌دهیم
          calculateAndShowResult();
        } else {
          // به سوال بعدی می‌رویم
          showNextQuestion();
        }
      } else {
        addMessage("لطفاً یکی از گزینه‌های نمایش داده شده را عدد (۱، ۲، ۳ یا ۴) یا به صورت کامل پاسخ دهید.", 'bot');
      }
      return;
    }

    // مرحله ۵ : بعد از مشاهده نتیجه، می‌توانید منوی مخفی رو درخواست کنید یا مکالمه رو تموم کنید
    if (state.step === 5) {
      if (text.toLowerCase().includes('منوی مخفی') || text.toLowerCase().includes('secret') ||
          text.toLowerCase().includes('رمز') || text.toLowerCase().includes('عبور')) {
        setState(prev => ({ ...prev, waitingForSecret: true }));
        addMessage("برای دسترسی به منوی نهان گدار، بگو چه رمز شفاهی در ذهنت است؟ (Hint: ما関する狼と炎と炎のストーリー)", 'bot');
        return;
      }

      // در غیر این صورت، مکالمه را پایان می‌دهیم
      addMessage("خدا نگهدار！ هرگز فراموش نکن که گدار همیشه در انتظارت است. برای دوباره امتحان کردن، صفحه را رفرش کن.", 'bot');
      setState(prev => ({ ...prev, step: 6 }));
      return;
    }
  };

  const calculateAndShowResult = () => {
    // شبیه‌سازی تاخیر برای suspense
    setTimeout(() => {
      const key = state.answers.map(a => a.tag).join('-');
      const recommendation = recommendationMap[key] || recommendationMap.default;
      const couponCode = `GODAR-${Math.floor(1000 + Math.random() * 9000)}`;

      // ذخیره در localStorage (برای شبیه‌سازی جلوگیری از استفاده مجدد)
      const usedCoupons = JSON.parse(localStorage.getItem('godar_used_coupons') || '[]');
      usedCoupons.push({
        code: couponCode,
        item: recommendation.item,
        timestamp: new Date().toISOString(),
        used: false
      });
      localStorage.setItem('godar_used_coupons', JSON.stringify(usedCoupons));

      const discountAmount = Math.round(recommendation.price * 0.2);
      const finalPrice = recommendation.price - discountAmount;

      const resultMessage =
        `✨ توتم شما کشف شد! ✨\n\n` +
        `🎯 آیتم پیشنهادی: ${recommendation.item}\n` +
        `📝 توضیح: ${recommendation.desc}\n` +
        `💰 قیمت اصلی: ${recommendation.price.toLocaleString('fa-IR')} تومان\n` +
        `🔥 تخفیف ۲۰٪: ${discountAmount.toLocaleString('fa-IR')} تومان\n` +
        `💰 قیمت نهایی پس از تخفیف: ${finalPrice.toLocaleString('fa-IR')} تومان\n\n` +
        `🎁 کد تخفیف تک‌بار مصرف:\n` +
        `   ${couponCode}\n\n` +
        `📝 نحوه استفاده:\n` +
        `   ۱. این کارت را اسکرین‌شات کنید\n` +
        `   ۲. در صندوق کافه کد را به باریستا نشان دهید\n` +
        `   ۳. کد تا پایان امشب معتبر است و فقط یک بار قابل استفاده\n\n` +
        `💬 اکنون می‌توانید:\n` +
        `   - بگویید 'منوی مخفی' برای دسترسی به آیتم‌های نهان گدار\n` +
        `   - بگویید 'خداحافظ' یا هر چیزی دیگر برای پایان مکالمه\n` +
        `   - تا وقتی می‌خواهید با شمن继续 همسویه کنید.`;

      addMessage(resultMessage, 'bot');
      setState(prev => ({ ...prev, step: 5 }));
    }, 1500);
  };

  const showNextQuestion = () => {
    if (state.step > 4) return;
    const qIndex = state.step - 1;
    const question = quizQuestions[qIndex];

    let optionsText = question.options.map((opt, idx) =>
      `${idx + 1}. ${opt.icon} ${opt.text}`
    ).join('\n');

    addMessage(`${question.step}\n${question.title}\n\n${optionsText}\n\nعدد انتخاب خود را بنویسد (مثل: ۲) یا به صورت کامل جواب بدهید.`, 'bot');
  };

  const handleSecretInput = (text) => {
    setState(prev => ({ ...prev, waitingForSecret: false }));

    const secretPhrase = "آتش در شکاف گدار";

    if (text.trim() === secretPhrase ||
        text.toLowerCase().includes('آتش در شکاف گدار') ||
        text.toLowerCase().includes('fire in the cleft') ||
        text.toLowerCase().includes('secret menu')) {

      addMessage(
        "🔓 رمز صحیح است! به منوی نهان گدار خوش آمدی.\n\n" +
        "🔮 آیتم‌های exclusif که فقط با این رمز قابل دسترس می‌شوند:\n\n" +
        "1️⃣ عصاره شمن (Shaman Black) - ۳۵۰,۰۰۰ ت\n" +
        "   کولدبرو غلیظ، سیروپ تمشک کوهی و زغال فعال\n\n" +
        "2️⃣ گدازه صخره (Molten Rock) - ۳۹۰,۰۰۰ ت\n" +
        "   لاوا کیک خالص با HEKŠtet شکلات مذاب و ادویه غار\n\n" +
        "📌 برای سفارش، کافیست به باریستا بگویی: «آتش در شکاف گدار» و یکی از این دو آیتم را نام ببر.\n\n" +
        "💫 این تجربه unique مثل توتمت است - فقط برای امروز و تنها برای تو.",
        'bot'
      );
    } else {
      addMessage(
        "❌ رمز اشتباه است. اما نگران نب!\n" +
        "شمن مشورت می‌کند: فردا امروز serão melhor para tentar novamente.\n" +
        "برای دریافت توتمت از جديد، صفحه را رفرش کن و سؤال‌ها را پاسخ بده.",
        'bot'
      );
    }
    setState(prev => ({ ...prev, step: 6 }));
  };

  // الرسائل اولیه
  React.useEffect(() => {
    if (state.messages.length === 0) {
      addMessage(
        "درود بر تو ای رهگستر. به دیوارهای سنگی گدار خوش آمدی. من، شَمَن این غار، آماده‌ام تا با خرد سنگ‌ها و آتش اجاق، طعم درخورت را پیشنهاد دهم.\n\nبرای شروع، بگو چه حالی در سر داری؟ (مثال: 'خسته ام'، 'گرسنه ام'، ' يونان دارم' یا یک کلمه ساده مثل 'انرژی' یا 'طعم').",
        'bot'
      );
    }
  }, []);

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {state.messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-message ${msg.type === 'user' ? 'user' : 'bot'}`}>
            {msg.type === 'user' ? (
              <>
                <span className="chatbot-avatar-user">👤</span>
                <div className="chatbot-bubble-user">{msg.text}</div>
              </>
            ) : (
              <>
                <span className="chatbot-avatar-bot">🪨</span>
                <div className="chatbot-bubble-bot">{msg.text.replace(/\n/g, '<br>')}</div>
              </>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chatbot-input-area">
        <input
          type="text"
          id="chatbot-input"
          placeholder="پیام خود را بنویسید (مثال: 'سلام' یا 'خسته ام')..."
          className="chatbot-input"
          autoComplete="off"
        />
        <button type="submit" className="chatbot-send-button">
          <AiOutlineSend /> ارسال
        </button>
      </form>
    </div>
  );
};

export default Chatbot;