export type Lang = 'en' | 'ar';

type Translations = Record<string, { en: string; ar: string }>;

export const translations: Translations = {
  // Navbar
  // Navbar
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.shop': { en: 'Shop', ar: 'المتجر' },
  'nav.collections': { en: 'Collections', ar: 'التجميعات' },
  'nav.about': { en: 'About', ar: 'من نحن' },
  'nav.terms': { en: 'Terms', ar: 'الشروط والأحكام' },
  'nav.privacy': { en: 'Privacy', ar: 'الخصوصية' },
  'nav.wishlist': { en: 'Wishlist', ar: 'المفضلة' },
  'nav.cart': { en: 'Cart', ar: 'السلة' },
  'nav.signin': { en: 'Sign in', ar: 'تسجيل الدخول' },
  'nav.createAccount': { en: 'Create account', ar: 'إنشاء حساب' },
  'navbar.tagline': { en: 'Global Streetwear', ar: 'ستريت وير عالمي' },

  // Common Actions
  'actions.viewAll': { en: 'View all', ar: 'عرض الكل' },

  // Shop Categories
  'categories.pants': { en: 'Pants', ar: 'بناطيل' },
  'categories.all': { en: 'All', ar: 'الكل' },

  // Hero
  'hero.kicker': {
    en: 'New drop • Youth-first fashion',
    ar: 'إصدار جديد • أزياء شبابية أولاً',
  },
  'hero.title': {
    en: 'Wear the next wave, not last season.',
    ar: 'البس الموجة القادمة، مش موضة السنة اللي فاتت.',
  },
  'hero.subtitle': {
    en: 'A curated streetwear experience built for your world — bold fits and global drops.',
    ar: 'تجربة ملابس شارع مختارة بعناية لعالمك — بقصّات جريئة وإصدارات عالمية.',
  },
  'hero.shopNow': { en: 'Shop latest drop', ar: 'تسوّق الإصدار الجديد' },
  'hero.buildFit': { en: 'Build your fit', ar: 'نسّق إطلالتك' },

  // Sections
  'section.newArrivals': { en: 'New arrivals', ar: 'الواصل حديثاً' },
  'section.flashSale': { en: 'Flash sale • Limited time', ar: 'فلاش سيل • لفترة محدودة' },
  'section.community': { en: 'Community', ar: 'آراء المجتمع' },
  'section.communityTitle': {
    en: 'What people say about the platform.',
    ar: 'ماذا يقول الناس عن المنصّة.',
  },
  'section.about': { en: 'About us', ar: 'من نحن' },
  'section.aboutTitle': {
    en: 'Built by friends, designed for the new generation.',
    ar: 'منصة مبنية بين أصدقاء، ومصممة للجيل الجديد.',
  },
  'section.aboutParagraph1': {
    en: 'This platform is a collaboration between Fisal and a partner from abroad — mixing local culture with a global mindset. The goal: streetwear and essentials that feel premium, but stay reachable.',
    ar: 'هذه المنصة نتيجة تعاون بين فيصل وشريك من الخارج — نمزج فيها الثقافة المحلية مع رؤية عالمية. الهدف: ستريت وير وقطع أساسية بجودة عالية وأسعار في المتناول.',
  },
  'section.aboutParagraph2': {
    en: "From day one, we're designing this as if it's a global brand: clean tech stack, backend-powered theming, room for wholesale partners, variants, sizes, and all the details serious brands need.",
    ar: 'من اليوم الأول نعامل المشروع كعلامة عالمية: تكنولوجيا نظيفة، ثيمات قادمة من الباك إند، مساحة للشغل بالجملة، مقاسات وفارينتس، وكل التفاصيل اللي أي براند محترم يحتاجها.',
  },
  'section.aboutCardTitle': {
    en: "What we're building",
    ar: 'ماذا نبني؟',
  },
  'section.aboutCardLine1': {
    en: '• A store that works for single-piece shoppers and wholesale buyers.',
    ar: '• متجر يخدم مشتري القطعة الواحدة وتجار الجملة في نفس الوقت.',
  },
  'section.aboutCardLine2': {
    en: '• Backend-driven themes, so the brand can visually evolve over time.',
    ar: '• ثيمات يتحكم فيها الباك إند، عشان شكل البراند يتطوّر بسهولة مع الوقت.',
  },
  'section.aboutCardLine3': {
    en: '• Clean product architecture with categories, tags, and variants.',
    ar: '• هيكلة منتجات نظيفة تعتمد على التصنيفات والوسوم والفارينتس.',
  },
  'section.aboutCardLine4': {
    en: '• A foundation ready for global shipping, currencies, and languages.',
    ar: '• أساس مجهّز للشحن العالمي، والعملات المتعددة، وتعدد اللغات.',
  },

  // Community / testimonials
  'community.addComment': { en: 'Add your comment', ar: 'أضف تعليقك' },
  'community.nameOptional': { en: 'Name (optional)', ar: 'الاسم (اختياري)' },
  'community.comment': { en: 'Comment', ar: 'التعليق' },
  'community.submit': { en: 'Submit', ar: 'إرسال' },
  'community.cancel': { en: 'Cancel', ar: 'إلغاء' },
  'community.modalTitle': { en: 'Community comments', ar: 'تعليقات المجتمع' },

  // Product
  'product.details': { en: 'Product details', ar: 'تفاصيل المنتج' },
  'product.reviews': { en: 'Product reviews', ar: 'تقييمات المنتج' },
  'product.writeReview': { en: 'Write your review...', ar: 'اكتب تقييمك...' },
  'product.yourName': { en: 'Your name (optional)', ar: 'اسمك (اختياري)' },
  'product.postReview': { en: 'Post review', ar: 'إرسال التقييم' },
  'product.availableSizes': { en: 'Available sizes:', ar: 'المقاسات المتاحة:' },
  'product.colors': { en: 'Colors:', ar: 'الألوان:' },
  'product.hashtags': { en: 'Hashtags', ar: 'الوسوم' },
  'product.backToShop': { en: 'Back to shop', ar: 'الرجوع للمتجر' },

  // Flash sale
  'flash.title': {
    en: '24-hour drop with extra discounts on selected pieces.',
    ar: 'عرض لمدة ٢٤ ساعة بخصومات إضافية على قطع مختارة.',
  },
  'flash.description': {
    en: 'This is a demo flash sale banner. Later you can control its visibility and countdown directly from the backend.',
    ar: 'هذا مجرد نموذج لعرض فلاش سيل. لاحقاً يمكنك التحكم في ظهوره والعداد التنازلي من لوحة التحكم في الباك إند.',
  },
  'flash.shopNow': { en: 'Shop flash sale', ar: 'تسوّق عروض الفلاش سيل' },

  // Topbar
  'topbar.tagline': {
    en: 'Youth-built streetwear. Made in Egypt, worn everywhere.',
    ar: 'براند ستريت وير شبابي من مصر للعالم — أسعار قريبة منكم، ستايل يعبّر عنكم.',
  },
  'topbar.social.facebook': {
    en: 'Facebook',
    ar: 'فيسبوك',
  },
  'topbar.social.instagram': {
    en: 'Instagram',
    ar: 'إنستجرام',
  },
  'topbar.social.tiktok': {
    en: 'TikTok',
    ar: 'تيك توك',
  },
  'topbar.social.email': {
    en: 'Email',
    ar: 'البريد الإلكتروني',
  },
  // Footer
  'footer.taglineShort': {
    en: 'Global streetwear',
    ar: 'ستريت وير عالمي',
  },
  'footer.about': {
    en: 'NEXTWAV is a streetwear platform built by friends for the new generation – global mindset, youth-first energy, and a backend ready to scale themes, drops, and wholesale partners.',
    ar: 'NEXTWAV هي منصة ستريت وير مبنية بين أصدقاء ومن أجل الجيل الجديد — برؤية عالمية، وطاقة شبابية، وباك إند جاهز لتوسيع الثيمات والإصدارات والشغل بالجملة.',
  },
  'footer.explore': {
    en: 'Explore',
    ar: 'استكشف',
  },
  'footer.support': {
    en: 'Support',
    ar: 'الدعم',
  },
  'footer.contactSupport': {
    en: 'Contact support',
    ar: 'تواصل مع الدعم',
  },
  // Hero extra
  'hero.feature1.title': {
    en: 'Wholesale & retail ready',
    ar: 'جاهز للجملة والقطاعي',
  },
  'hero.feature1.desc': {
    en: 'From single fits to full collection stock for your own brand.',
    ar: 'من قطعة واحدة حتى مخزون مجموعة كاملة لبراندك الخاص.',
  },
  'hero.feature2.title': {
    en: 'Backend powered theming',
    ar: 'ثيمات مدعومة من الباك إند',
  },
  'hero.feature2.desc': {
    en: 'Colors, fonts and vibes controlled directly from your admin panel.',
    ar: 'الألوان والخطوط والمود يتم التحكّم فيها مباشرة من لوحة التحكم.',
  },

  // Hero banner / ads
  'hero.banner.meta': {
    en: 'Next drop · NEXTWAV Studio',
    ar: 'الإصدار القادم · استوديو NEXTWAV',
  },
  'hero.banner.live': {
    en: 'Live now',
    ar: 'متاح الآن',
  },
  'hero.banner.spotlight': {
    en: 'Spotlight',
    ar: 'إعلان مميز',
  },

  'hero.banner1.title': {
    en: 'Oversized hoodies for late nights.',
    ar: 'هوديز أوفر سايز لليالي المتأخرة.',
  },
  'hero.banner1.subtitle': {
    en: 'Heavyweight fleece, youth-first cuts, ready for your next drop.',
    ar: 'خامة تقيلة بقصّات شبابية جاهزة للإصدار القادم.',
  },

  'hero.banner2.title': {
    en: 'Street sets for your crew.',
    ar: 'طقم ستريت كامل لصحابك.',
  },
  'hero.banner2.subtitle': {
    en: 'Co-ords built for everyday wear, from campus to downtown.',
    ar: 'أطقم متناسقة للاستخدام اليومي، من الجامعة لوسط البلد.',
  },

  'hero.banner3.title': {
    en: 'Graphic tees that tell your story.',
    ar: 'تيشيرتات جرافيك بتحكي قصتك.',
  },
  'hero.banner3.subtitle': {
    en: 'Bold prints, clean cuts, and room for your own brand logo later.',
    ar: 'طباعة جريئة، قصات نظيفة، ومساحة تضيف لوجو براندك بعدين.',
  },

  // Hero tech footer
  'hero.tech.line1': {
    en: 'Built for mobile · React + Tailwind',
    ar: 'مبني للموبايل · React + Tailwind',
  },

  // CTA Section
  'cta.brand.kicker': { en: 'For brand owners', ar: 'لأصحاب البراندات' },
  'cta.brand.title': { en: 'Need full collection stock or custom tags?', ar: 'محتاج كوليكشن كامل أو تصنيع خاص لبراندك؟' },
  'cta.brand.desc': {
    en: "We're building this platform to serve both single-piece shoppers and wholesale partners. Soon, you'll be able to manage your orders, colors, sizes, and drops from one clean dashboard.",
    ar: 'احنا بنبني المنصة دي عشان تخدم المتسوقين والشركاء في نفس الوقت. قريباً هتقدر تدير طلبياتك، ألوانك، مقاساتك، وإصداراتك كلها من لوحة تحكم واحدة.'
  },
  'cta.brand.waitlist': { en: 'Join wholesale waitlist', ar: 'انضم لويت ليست الجملة' },
  'cta.brand.contact': { en: 'Talk to our team', ar: 'تكلم مع الفريق' },

  // Categories section
  'categories.browseKicker': {
    en: 'Browse',
    ar: 'تصفّح',
  },
  'categories.title': {
    en: 'Pick your lane, or mix all of them.',
    ar: 'اختر المسار اللي يناسبك، أو امزج بينهم كلهم.',
  },
  'categories.subtitle': {
    en: 'These are just placeholders — once backend is ready, categories will be fully dynamic.',
    ar: 'هذه أقسام تجريبية فقط — بعد تجهيز الباك إند ستصبح الأقسام ديناميكية بالكامل.',
  },

  'categories.graphicTees': {
    en: 'Graphic tees',
    ar: 'تيشيرتات جرافيك',
  },
  'categories.oversizedHoodies': {
    en: 'Oversized hoodies',
    ar: 'هوديز أوفر سايز',
  },
  'categories.coordSets': {
    en: 'Co-ords & sets',
    ar: 'أطقم متناسقة (Sets)',
  },
  'categories.wholesaleBundles': {
    en: 'Wholesale bundles',
    ar: 'بكجات جملة لبراندك',
  },

  'categories.tag.everydayHeat': {
    en: 'Everyday heat',
    ar: 'ستايل يومي ناري',
  },
  'categories.tag.streetEssential': {
    en: 'Street essential',
    ar: 'أساسيات الشارع',
  },
  'categories.tag.fullFits': {
    en: 'For full fits',
    ar: 'لإطلالات كاملة',
  },
  'categories.tag.forYourBrand': {
    en: 'For your own brand',
    ar: 'لبراندك الخاص',
  },

  'categories.chip.youthReady': {
    en: 'Youth-ready',
    ar: 'جاهز للشباب',
  },
  'categories.action.viewAll': {
    en: 'View all',
    ar: 'عرض الكل',
  },
  'promo.title': {
    en: 'Special promos',
    ar: 'عروض مميّزة',
  },
  'promo.subtitle': {
    en: 'Short campaigns and highlights from the platform.',
    ar: 'حملات سريعة وهايلايتس مميّزة من المنصّة.',
  },

  'promo.top1.kicker': {
    en: 'Exclusive offer',
    ar: 'عرض حصري',
  },
  'promo.top1.title': {
    en: 'Watch your favorite drops anywhere',
    ar: 'تابع إصداراتك المفضلة من أي مكان',
  },
  'promo.top1.desc': {
    en: 'Create a free account and get early access to the next streetwear drop.',
    ar: 'أنشئ حساب مجاني وخد أسبقية الوصول للإصدار القادم من الملابس الشبابية.',
  },
  'promo.top1.cta': {
    en: 'Get started',
    ar: 'ابدأ الآن',
  },

  'promo.top2.kicker': {
    en: 'Members only',
    ar: 'للاعضاء فقط',
  },
  'promo.top2.title': {
    en: 'Extra perks for the community',
    ar: 'مزايا إضافية لأعضاء الكوميونيتي',
  },
  'promo.top2.desc': {
    en: 'Join the insiders list and unlock extra discounts on selected pieces.',
    ar: 'انضم لقائمة الـ Insiders وخد خصومات إضافية على قطع مختارة.',
  },
  'promo.top2.cta': {
    en: 'Join now',
    ar: 'انضم الآن',
  },

  'promo.bottom.title': {
    en: 'New fall collection',
    ar: 'تشكيلة الخريف الجديدة',
  },
  'brands.title': {
    en: 'Shop by brands',
    ar: 'تسوّق حسب البراند',
  },
  'brands.viewAll': {
    en: 'View all',
    ar: 'عرض الكل',
  },

  // Shop Page elements
  'shop.filter': { en: 'Filter', ar: 'تصفية' },
  'shop.searchPlaceholder': { en: 'Search products...', ar: 'ابحث عن منتج...' },
  'shop.category': { en: 'Category', ar: 'القسم' },
  'shop.all': { en: 'All', ar: 'الكل' },
  'shop.priceRange': { en: 'Price range', ar: 'نطاق السعر' },
  'shop.to': { en: 'to', ar: 'إلى' },
  'shop.resetFilters': { en: 'Reset filters', ar: 'إلغاء التصفيات' },
  'shop.explore': { en: 'Explore', ar: 'استكشف' },
  'shop.title': { en: 'Shop all products', ar: 'كل المنتجات' },
  'shop.showing': { en: 'Showing', ar: 'عرض' },
  'shop.of': { en: 'of', ar: 'من' },
  'shop.items': { en: 'items', ar: 'منتجات' },

  // Product Detail Page
  'product.notFound': { en: 'Product not found.', ar: 'المنتج غير موجود.' },
  'product.goBack': { en: 'Go back', ar: 'العودة للخلف' },
  'product.off': { en: 'OFF', ar: 'خصم' },
  'product.rating': { en: 'Rating', ar: 'التقييم' },
  'product.placeholderReview': { en: 'Share your thoughts...', ar: 'شاركنا رأيك...' },
  'product.addToCart': { en: 'Add to Cart', ar: 'أضف للسلة' },
  'product.anonymous': { en: 'Anonymous', ar: 'مجهول' },
  'product.justNow': { en: 'Just now', ar: 'الآن' },
  'product.reviewsCount': { en: 'reviews', ar: 'تقييم' },

  // Collections Page
  'collections.title': { en: 'Collections', ar: 'التجميعات' },
  'collections.subtitle': { en: 'Discover our seasonal drops and exclusive curations.', ar: 'اكتشف إصداراتنا الموسمية وتشكيلاتنا الحصرية.' },
  'collections.summer2025': { en: 'Summer Collection 2025', ar: 'كوليكشن صيف 2025' },
  'collections.winter2025': { en: 'Winter Collection 2025', ar: 'كوليكشن شتاء 2025' },
  'collections.exclusive': { en: 'Exclusive Drops', ar: 'إصدارات حصرية' },
  'collections.viewCollection': { en: 'View Collection', ar: 'عرض الكوليكشن' },
  'collections.heroTitle': { en: 'The Archives & Future Drops', ar: 'الأرشيف والإصدارات القادمة' },
  'collections.heroSubtitle': { en: 'Explore the seasons that defined us and the drops that are coming next.', ar: 'اكتشف المواسم اللي ميزتنا والإصدارات اللي جاية في الطريق.' },
  'collections.featured': { en: 'Featured Drop', ar: 'الإصدار المميز' },
  'collections.summerDesc': {
    en: 'Lightweight fabrics, bold graphics, and cuts breathable enough for the heat. The 2025 Summer drop is all about movement.',
    ar: 'خامات خفيفة، جرافيكس جريئة، وقصّات مريحة للصيف. كوليكشن صيف 2025 معمول عشان الحركة.'
  },
  'collections.winterDesc': {
    en: 'Heavyweight cotton, oversized silhouettes, and layers designed for late nights. Warmth without compromising the fit.',
    ar: 'قطن تقيل، قصّات أوفر سايز، وطبقات معمولة لليالي المتأخرة. دفا من غير ما تيجي على الستايل.'
  },
  'collections.exclusiveDesc': {
    en: 'One-off pieces and limited collaborations. Once they are gone, they are gone forever.',
    ar: 'قطع فريدة وتعاونات محدودة. لو راحت عليك، مش هترجع تاني.'
  },
  'collections.exploreDrop': { en: 'Explore Drop', ar: 'تصفّح الإصدار' },
  'collections.pieces': { en: 'Pieces', ar: 'قطعة' },
  'collections.mood': { en: 'Mood', ar: 'المود' },

  // About Page (Extended)
  'about.story.title': { en: 'The Story', ar: 'قصتنا' },
  'about.story.desc': {
    en: 'It started with a simple idea: streetwear should be accessible without losing its soul. We are bridging the gap between local culture and global trends.',
    ar: 'بدأت بفكرة بسيطة: الستريت وير لازم يكون متاح للكل من غير ما يفقد روحه. احنا بنبني جسر بين ثقافتنا المحلية وصحيات الموضة العالمية.'
  },
  'about.values.title': { en: 'Our Values', ar: 'قيمنا' },
  'about.contact.title': { en: 'Get in Touch', ar: 'تواصل معنا' },
  'about.contact.desc': { en: 'Questions, collabs, or just want to say hi? We are always open.', ar: 'عندك سؤال، فكرة تعاون، أو بس عايز تسلم؟ احنا دايماً موجودين.' },
  'about.contact.email': { en: 'Email us', ar: 'ابعتلنا إيميل' },
  'about.contact.whatsapp': { en: 'WhatsApp', ar: 'واتساب' },
  'about.contact.location': { en: 'Location', ar: 'المكان' },
  'about.value1.title': { en: 'Quality First', ar: 'الجودة أولاً' },
  'about.value1.desc': { en: 'Fabrics that last. Fits that matter.', ar: 'خامات تعيش، وقصّات تفرق.' },
  'about.value2.title': { en: 'Community Driven', ar: 'بقيادة المجتمع' },
  'about.value2.desc': { en: 'We build what you ask for.', ar: 'بنصمم اللي انتوا تطلبوه.' },
  'about.value3.title': { en: 'Global Vision', ar: 'رؤية عالمية' },
  'about.value3.desc': { en: 'Local roots, worldwide standards.', ar: 'جذور محلية، بمعايير عالمية.' },

  // Cart Page
  'cart.title': { en: 'Shopping Cart', ar: 'سلة التسوق' },
  'cart.empty': { en: 'Your cart is empty', ar: 'سلة التسوق فارغة' },
  'cart.emptyDesc': { en: 'Looks like you haven\'t added any drops yet. Go explore the collection.', ar: 'شكلك لسه ما ضفتش أي قطع. روح استكشف الكوليكشن.' },
  'cart.continueShopping': { en: 'Continue Shopping', ar: 'تكملة التسوق' },
  'cart.summary': { en: 'Order Summary', ar: 'ملخص الطلب' },
  'cart.subtotal': { en: 'Subtotal', ar: 'المجموع الفرعي' },
  'cart.shipping': { en: 'Shipping', ar: 'الشحن' },
  'cart.shippingDesc': { en: 'Calculated at checkout', ar: 'يتم حسابه عند الدفع' },
  'cart.total': { en: 'Total', ar: 'الإجمالي' },
  'cart.checkout': { en: 'Proceed to Checkout', ar: 'إتمام الشراء' },
  'cart.qty': { en: 'Qty', ar: 'الكمية' },
  'cart.size': { en: 'Size', ar: 'المقاس' },
  'cart.color': { en: 'Color', ar: 'اللون' },
  'cart.promoCode': { en: 'Promo code', ar: 'كود الخصم' },
  'cart.apply': { en: 'Apply', ar: 'تطبيق' },
  'cart.secureCheckout': { en: 'Secure Checkout', ar: 'دفع آمن' },

  // Profile Page
  'profile.title': { en: 'Your Account', ar: 'حسابك' },
  'profile.nav.info': { en: 'Personal Info', ar: 'المعلومات الشخصية' },
  'profile.nav.orders': { en: 'My Orders', ar: 'طلباتي' },
  'profile.nav.addresses': { en: 'Addresses', ar: 'العناوين' },
  'profile.nav.logout': { en: 'Logout', ar: 'تسجيل خروج' },

  'profile.info.title': { en: 'Personal Information', ar: 'المعلومات الشخصية' },
  'profile.info.name': { en: 'Full Name', ar: 'الاسم الكامل' },
  'profile.info.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'profile.info.phone': { en: 'Phone Number', ar: 'رقم الهاتف' },
  'profile.info.save': { en: 'Save Changes', ar: 'حفظ التغييرات' },

  'profile.password.title': { en: 'Change Password', ar: 'تغيير كلمة المرور' },
  'profile.password.current': { en: 'Current Password', ar: 'كلمة المرور الحالية' },
  'profile.password.new': { en: 'New Password', ar: 'كلمة المرور الجديدة' },
  'profile.password.confirm': { en: 'Confirm Password', ar: 'تأكيد كلمة المرور' },

  'profile.orders.title': { en: 'Order History', ar: 'سجل الطلبات' },
  'profile.orders.empty': { en: 'No orders yet.', ar: 'لا يوجد طلبات حتى الآن.' },
  'profile.orders.id': { en: 'Order ID', ar: 'رقم الطلب' },
  'profile.orders.date': { en: 'Date', ar: 'التاريخ' },
  'profile.orders.status': { en: 'Status', ar: 'الحالة' },
  'profile.orders.total': { en: 'Total', ar: 'الإجمالي' },
  'profile.orders.items': { en: 'items', ar: 'منتجات' },
  'profile.orders.view': { en: 'View Details', ar: 'عرض التفاصيل' },

  'profile.addresses.title': { en: 'Saved Addresses', ar: 'العناوين المحفوظة' },
  'profile.addresses.add': { en: 'Add New Address', ar: 'إضافة عنوان جديد' },
  'profile.addresses.default': { en: 'Default', ar: 'الافتراضي' },
  'profile.addresses.edit': { en: 'Edit', ar: 'تعديل' },
  'profile.addresses.delete': { en: 'Delete', ar: 'حذف' },
  'profile.addresses.street': { en: 'Street Address', ar: 'اسم الشارع' },
  'profile.addresses.city': { en: 'City', ar: 'المدينة' },
  'profile.addresses.country': { en: 'Country', ar: 'الدولة' },
  'profile.addresses.governorate': { en: 'Governorate', ar: 'المحافظة' },
  'profile.addresses.detail': { en: 'Detailed Address', ar: 'العنوان بالتفصيل' },
  'profile.addresses.phone1': { en: 'Phone Number 1', ar: 'رقم الهاتف ١' },
  'profile.addresses.phone2': { en: 'Phone Number 2', ar: 'رقم الهاتف ٢' },
  'profile.addresses.save': { en: 'Save Address', ar: 'حفظ العنوان' },
  'profile.addresses.cancel': { en: 'Cancel', ar: 'إلغاء' },

  // Order Details
  'order.details.title': { en: 'Order Details', ar: 'تفاصيل الطلب' },
  'order.details.items': { en: 'Items', ar: 'المنتجات' },
  'order.details.shipping': { en: 'Shipping Address', ar: 'عنوان الشحن' },
  'order.details.payment': { en: 'Payment Method', ar: 'طريقة الدفع' },
  'order.details.summary': { en: 'Order Summary', ar: 'ملخص الطلب' },
  'order.details.subtotal': { en: 'Subtotal', ar: 'المجموع الفرعي' },
  'order.details.total': { en: 'Total Amount', ar: 'المبلغ الإجمالي' },
  'order.details.status': { en: 'Order Status', ar: 'حالة الطلب' },
  'profile.info.image': { en: 'Profile Picture', ar: 'الصورة الشخصية' },
  'profile.info.upload': { en: 'Upload New', ar: 'رفع صورة جديدة' },

  // Wishlist Page
  'wishlist.title': { en: 'Your Wishlist', ar: 'قائمة الأمنيات' },
  'wishlist.empty': { en: 'Your wishlist is empty', ar: 'قائمة الأمنيات فارغة' },
  'wishlist.emptyDesc': { en: 'Save items you love here to buy them later.', ar: 'احفظ المنتجات اللي بتحبها هنا عشان تشتريها بعدين.' },
  'wishlist.remove': { en: 'Remove', ar: 'حذف' },
  'wishlist.addToCart': { en: 'Add to Cart', ar: 'أضف للسلة' },
  'wishlist.stock': { en: 'In Stock', ar: 'متوفر' },
  'wishlist.outOfStock': { en: 'Out of Stock', ar: 'غير متوفر' },
  'wishlist.promo.title': { en: 'Complete Your Look', ar: 'كمّل الطقم' },
  'wishlist.promo.desc': { en: 'Check out the latest accessories to match your wishlist items.', ar: 'شوف أحدث الاكسسوارات اللي تليق على اختياراتك.' },
  'wishlist.promo.cta': { en: 'View Accessories', ar: 'عرض الاكسسوارات' },

  // Login Page
  'login.title': { en: 'Sign in', ar: 'تسجيل الدخول' },
  'login.subtitle': { en: 'Log into your account to track orders, manage favorites, and save your sizes.', ar: 'سجّل دخولك لمتابعة طلباتك، وإدارة مفضلاتك، وحفظ مقاساتك.' },
  'login.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'login.password': { en: 'Password', ar: 'كلمة المرور' },
  'login.rememberMe': { en: 'Remember me', ar: 'تذكرني' },
  'login.forgotPassword': { en: 'Forgot password?', ar: 'نسيت كلمة المرور؟' },
  'login.submit': { en: 'Sign in', ar: 'دخول' },
  'login.noAccount': { en: "Don't have an account?", ar: 'ليس لديك حساب؟' },
  'login.createAccount': { en: 'Create one', ar: 'أنشئ حساباً جديداً' },

  // Register Page
  'register.title': { en: 'Create account', ar: 'إنشاء حساب جديد' },
  'register.subtitle': { en: 'Join the community to save your favorites, manage orders, and get early access to new drops.', ar: 'انضم للكوميونيتي عشان تحفظ مفضلاتك، وتتابع طلباتك، وتكون أول واحد يوصله الجديد.' },
  'register.fullName': { en: 'Full Name', ar: 'الاسم بالكامل' },
  'register.governorate': { en: 'Governorate', ar: 'المحافظة' },
  'register.city': { en: 'City', ar: 'المدينة' },
  'register.selectGovernorate': { en: 'Select Governorate', ar: 'اختر المحافظة' },
  'register.selectCity': { en: 'Select City', ar: 'اختر المدينة' },
  'register.phone': { en: 'Phone Number', ar: 'رقم الهاتف' },
  'register.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'register.password': { en: 'Password', ar: 'كلمة المرور' },
  'register.submit': { en: 'Create account', ar: 'إنشاء حساب' },
  'register.hasAccount': { en: 'Already have an account?', ar: 'لديك حساب بالفعل؟' },
  'register.signIn': { en: 'Sign in', ar: 'تسجيل الدخول' },
  'register.disclaimer': { en: "After you sign up, we'll ask you to verify your email to protect your account.", ar: 'بعد التسجيل، سنطلب منك تأكيد بريدك الإلكتروني لحماية حسابك.' },

  // Verify Page
  'verify.title': { en: 'Verify Account', ar: 'تفعيل الحساب' },
  'verify.subtitle': { en: "We've sent a code to your email. Enter it below to verify your account.", ar: 'بعتنا كود تفعيل على إيميلك. دخله هنا عشان تفعل حسابك.' },
  'verify.enterCode': { en: 'Enter Code', ar: 'أدخل الكود' },
  'verify.submit': { en: 'Verify Account', ar: 'تفعيل الحساب' },
  'verify.resend': { en: 'Resend Code', ar: 'إعادة إرسال الكود' },
  'verify.codePlaceholder': { en: '000000', ar: '٠٠٠٠٠٠' },

  // Forgot Password
  'forgot.title': { en: 'Forgot Password', ar: 'نسيت كلمة المرور؟' },
  'forgot.subtitle': { en: "Enter your email and we'll send you a code to reset your password.", ar: 'اكتب إيميلك وهنبعتلك كود عشان تغير الباسورد.' },
  'forgot.emailLabel': { en: 'Email Address', ar: 'البريد الإلكتروني' },
  'forgot.submit': { en: 'Send Reset Code', ar: 'إرسال كود الاستعادة' },
  'forgot.otpTitle': { en: 'Enter Reset Code', ar: 'أدخل كود الاستعادة' },
  'forgot.otpSubtitle': { en: 'Check your email for the 6-digit code.', ar: 'افحص إيميلك، بعتنا كود مكون من ٦ أرقام.' },
  'forgot.verify': { en: 'Verify Code', ar: 'تأكيد الكود' },
  'forgot.resetTitle': { en: 'Reset Password', ar: 'تعيين كلمة مرور جديدة' },
  'forgot.resetSubtitle': { en: 'Enter your new password below.', ar: 'اكتب الباسورد الجديد.' },
  'forgot.newPassword': { en: 'New Password', ar: 'كلمة المرور الجديدة' },
  'forgot.confirmPassword': { en: 'Confirm Password', ar: 'تأكيد كلمة المرور' },
  'forgot.resetButton': { en: 'Reset Password', ar: 'تغيير كلمة المرور' },
  'forgot.back': { en: 'Back to Login', ar: 'العودة لتسجيل الدخول' },

  // Privacy Policy
  'privacy.title': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'privacy.lastUpdated': { en: 'Last Updated: December 2025', ar: 'آخر تحديث: ديسمبر 2025' },
  'privacy.intro': {
    en: 'Your privacy is critically important to us. This policy outlines how we collect, use, and protect your personal information when you interact with our platform.',
    ar: 'خصوصيتك أمر بالغ الأهمية بالنسبة لنا. توضح هذه السياسة كيف نجمع ونستخدم ونحمي معلوماتك الشخصية عندما تتفاعل مع منصتنا.'
  },
  'privacy.section1.title': { en: '1. Information We Collect', ar: '١. المعلومات التي نجمعها' },
  'privacy.section1.content': {
    en: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support.',
    ar: 'نجمع المعلومات التي تقدمها لنا مباشرة، مثل عند إنشاء حساب، أو إجراء عملية شراء، أو التواصل مع خدمة العملاء.'
  },
  'privacy.section2.title': { en: '2. How We Use Your Information', ar: '٢. كيف نستخدم معلوماتك' },
  'privacy.section2.content': {
    en: 'We use this information to process orders, provide customer support, and improve your shopping experience.',
    ar: 'نستخدم هذه المعلومات لمعالجة الطلبات، وتقديم دعم العملاء، وتحسين تجربة التسوق الخاصة بك.'
  },
  'privacy.section3.title': { en: '3. Data Security', ar: '٣. أمان البيانات' },
  'privacy.section3.content': {
    en: 'We implement variety of security measures to maintain the safety of your personal information.',
    ar: 'نطبق مجموعة متنوعة من تدابير الأمان للحفاظ على سلامة معلوماتك الشخصية.'
  },

  // Terms & Conditions
  'terms.title': { en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
  'terms.lastUpdated': { en: 'Last Updated: December 2025', ar: 'آخر تحديث: ديسمبر 2025' },
  'terms.intro': {
    en: 'Welcome to NEXTWAV. These terms and conditions outline the rules and regulations for the use of our website and services.',
    ar: 'مرحباً بك في NEXTWAV. توضح هذه الشروط والأحكام القواعد واللوائح الخاصة باستخدام موقعنا وخدماتنا.'
  },
  'terms.section1.title': { en: '1. Acceptance of Terms', ar: '١. قبول الشروط' },
  'terms.section1.content': {
    en: 'By accessing this website we assume you accept these terms and conditions. Do not continue to use NEXTWAV if you do not agree to all of the terms stated on this page.',
    ar: 'بوصولك إلى هذا الموقع، نفترض قبولك لهذه الشروط والأحكام. لا تستمر في استخدام NEXTWAV إذا كنت لا توافق على جميع الشروط المذكورة في هذه الصفحة.'
  },
  'terms.section2.title': { en: '2. User Accounts', ar: '٢. حسابات المستخدمين' },
  'terms.section2.content': {
    en: 'When you create an account with us, you must provide us information that is accurate, complete, and current at all times.',
    ar: 'عند إنشاء حساب معنا، يجب عليك تزويدنا بمعلومات دقيقة وكاملة وحديثة في جميع الأوقات.'
  },
  'terms.section3.title': { en: '3. Purchases', ar: '٣. المشتريات' },
  'terms.section3.content': {
    en: 'If you wish to purchase any product, you may be asked to supply certain information relevant to your purchase including your credit card number and billing address.',
    ar: 'إذا كنت ترغب في شراء أي منتج، قد يُطلب منك تقديم معلومات معينة تتعلق بعملية الشراء الخاصة بك بما في ذلك رقم بطاقة الائتمان وعنوان الفواتير.'
  },
  'footer.newsletter.title': { en: 'Stay in the loop', ar: 'خليك متابع' },
  'footer.newsletter.subtitle': { en: 'Get early access to new drops and exclusive offers.', ar: 'احصل على وصول مبكر للإصدارات الجديدة والعروض الحصرية.' },
  'footer.newsletter.placeholder': { en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' },
  'footer.newsletter.button': { en: 'Subscribe', ar: 'اشتراك' },
};

export function t(key: string, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return lang === 'ar' ? entry.ar : entry.en;
}
