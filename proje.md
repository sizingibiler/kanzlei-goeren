Elbette. Warp AI gibi kod odaklı bir yapay zeka IDE'sine projeyi anlatmak için, talebi çok daha yapısal, teknik ve detaylı bir formata dönüştürmemiz gerekiyor. Bu, AI'ın dosya yapısını, bileşenleri, özellikleri ve stilleri net bir şekilde anlamasını sağlar.

İşte Warp AI'a verilebilecek detaylı bir proje tanımı (prompt):

---

### **SYSTEM PROMPT**

You are an expert full-stack developer specializing in Next.js and Tailwind CSS. Your task is to generate a complete, production-ready codebase for a professional, multi-lingual law firm website for "Kanzlei Gören". The project must be fully responsive, accessible, and follow modern web development best practices.

### **PROJECT OVERVIEW**

*   **Project Name:** Kanzlei Gören Website
*   **Core Technologies:** Next.js 14 (with App Router), Tailwind CSS, TypeScript.
*   **Key Features:**
    1.  Multi-lingual support (German, English, Turkish) using URL-based routing (`/de`, `/en`, `/tr`).
    2.  Fully responsive design for mobile, tablet, and desktop.
    3.  Static Site Generation (SSG) for high performance and SEO.
    4.  A clean, professional, and modern user interface.

---

### **1. PROJECT SETUP & STRUCTURE**

Initialize a new Next.js project with TypeScript and Tailwind CSS.

**Folder Structure:**

```
/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx             // Home Page
│   │   ├── about/page.tsx
│   │   ├── practice-areas/page.tsx
│   │   ├── team/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx
│   └── global.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Icon.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSummarySection.tsx
│       └── ... (other page-specific sections)
├── content/
│   └── translations.json       // All text content for i18n
├── public/
│   ├── logo.svg
│   └── images/
│       ├── hero-background.jpg
│       └── meral-goren.jpg
├── i18n.ts                     // Configuration for next-intl
└── middleware.ts               // For handling locale routing
```

**Internationalization (i18n):**
Use the `next-intl` library for internationalization.
*   **`i18n.ts`**: Configure it to support locales `['de', 'en', 'tr']` with `de` as the default.
*   **`middleware.ts`**: Implement the middleware from `next-intl` to handle locale detection and routing.
*   **`content/translations.json`**: Store all website text here. Structure it by language, then by page, then by key.

**Example `translations.json`:**
```json
{
  "de": {
    "navigation": {
      "home": "Startseite",
      "about": "Über Uns",
      "areas": "Rechtsgebiete",
      "team": "Unser Team",
      "contact": "Kontakt"
    },
    "home": {
      "heroTitle": "Wir verhelfen Ihnen zu Ihrem Recht!",
      "heroSubtitle": "Moderne und effektive Lösungen für Ihre rechtlichen Probleme."
    }
  },
  "en": {
    "navigation": {
      "home": "Home",
      "about": "About Us",
      "areas": "Practice Areas",
      "team": "Our Team",
      "contact": "Contact"
    },
    "home": {
      "heroTitle": "We Help You To Your Right!",
      "heroSubtitle": "Modern and effective solutions for your legal problems."
    }
  },
  "tr": {
    "navigation": {
      "home": "Ana Sayfa",
      "about": "Hakkımızda",
      "areas": "Uzmanlık Alanları",
      "team": "Ekibimiz",
      "contact": "İletişim"
    },
    "home": {
      "heroTitle": "Haklarınız İçin Buradayız!",
      "heroSubtitle": "Hukuki sorunlarınıza modern ve etkili çözümler."
    }
  }
}
```

---

### **2. DESIGN SYSTEM & GLOBAL STYLES**

**`tailwind.config.js`:**
*   **Colors:**
    *   `primary`: `#0A2342` (Deep Navy Blue)
    *   `secondary`: `#2C5D8E` (Steel Blue)
    *   `accent`: `#D4AF37` (Gold)
    *   `background`: `#F8F9FA` (Off-white)
    *   `text-primary`: `#1A1A1A` (Dark Gray)
    *   `text-secondary`: `#6C757D` (Medium Gray)
*   **Fonts:**
    *   Import 'Montserrat' for headings and 'Lato' for body text from Google Fonts in `app/[locale]/layout.tsx`.
    *   `fontFamily`: `sans: ['Lato', 'sans-serif']`, `serif: ['Montserrat', 'serif']`.

**`global.css`:**
Apply base styles, including font smoothing and background color. Set `font-sans` on the `body`.

---

### **3. COMPONENT & PAGE IMPLEMENTATION**

#### **A. Layout Components (`/components/layout`)**

*   **`Header.tsx`:**
    *   **Structure:** A flex container with `justify-between` and `items-center`.
    *   **Left Side:** Logo (`/public/logo.svg`) using `next/image`.
    *   **Right Side:**
        *   Desktop: Navigation links (`navigation` keys from JSON) using `next-intl/link`. The active link should have a gold underline.
        *   Mobile: A hamburger menu icon that toggles a full-screen overlay menu.
        *   **`LanguageSwitcher.tsx`** component at the end.
*   **`LanguageSwitcher.tsx`:**
    *   Displays the current locale (e.g., "DE").
    *   On hover or click, it shows a dropdown with links to the other locales (`EN`, `TR`). Use `useLocale` and `useTranslations` hooks from `next-intl`.
*   **`Footer.tsx`:**
    *   A grid with 3 columns on desktop, stacking on mobile.
    *   **Column 1:** Logo and a short mission statement.
    *   **Column 2:** Quick Links (Home, About, Contact, Impressum).
    *   **Column 3:** Office Addresses (Weinheim, Mannheim, Worms).
    *   A bottom bar with copyright info: `© 2025 Kanzlei Gören. Alle Rechte vorbehalten.`

#### **B. UI Components (`/components/ui`)**

*   **`Button.tsx`:** A reusable button component with variants (e.g., `primary`, `secondary`). Primary buttons should have a `primary` background and `accent` hover effect.
*   **`Card.tsx`:** A simple container with a subtle box shadow, border-radius, and padding for displaying content blocks like practice areas.

#### **C. Pages (`/app/[locale]`)**

*   **`layout.tsx`:**
    *   The root layout for all pages.
    *   Renders `<Header />`, `{children}`, and `<Footer />`.
    *   Fetches translations using `getMessages` and provides them to the `NextIntlClientProvider`.
*   **`page.tsx` (Home Page):**
    *   **Hero Section:** Full-width section with a background image (`/public/images/hero-background.jpg`). Centered text overlay with `heroTitle` and `heroSubtitle` from JSON. A primary `Button` linking to the contact page.
    *   **About Summary Section:** A two-column grid. Left: Meral Gören's photo. Right: A short bio and a `Button` linking to the `/about` page.
    *   **Practice Areas Highlight:** A section with a title like "Our Expertise". Display 3 `Card` components for the main practice areas (e.g., Family Law, Labor Law, Immigration Law), each with an icon and a short description.
*   **`about/page.tsx`:**
    *   A detailed page about Meral Gören and the firm's philosophy. Use the text content from the original website. Include sections for "Biography" and "Our Mission".
*   **`practice-areas/page.tsx`:**
    *   List all practice areas (Zivilrecht, Arbeitsrecht, Ausländerrecht, Familienrecht, Straßenverkehrsrecht).
    *   Each area should be a clickable item that reveals a more detailed description below it (accordion style).
*   **`team/page.tsx`:**
    *   A section for "Rechtsanwältin Meral Gören" with her photo and detailed bio.
    *   A section for "Bürogemeinschaft" describing the partnership with "Rechtsanwalt Jörg Armbruster", including his photo and specialization.
*   **`contact/page.tsx`:**
    *   A two-column layout.
    *   **Left Column:** A contact form with fields for Name, Email, Phone, Subject, and Message.
    *   **Right Column:** Contact details for all three offices (Weinheim, Mannheim, Worms). Include addresses, phone numbers, and a Google Maps embed for the main office (Weinheim).

---

### **4. FINAL INSTRUCTIONS**

Generate the complete codebase based on this detailed plan.
*   Ensure all text is dynamically rendered from `content/translations.json` using the `useTranslations` hook.
*   Use the `next-intl/link` component for all internal navigation to preserve the locale.
*   Implement smooth transitions and hover effects for a polished user experience.
*   The code must be well-structured, commented where necessary, and strictly follow TypeScript best practices.


Harika bir proje! Avukat Meral Gören için modern, 3 dilli (Almanca, İngilizce, Türkçe), mobil uyumlu ve görsel olarak etkileyici bir web sitesi oluşturmak için detaylı bir plan hazırladım.

### 1. Web Sitesi Tasarım ve Bölüm Yapısı

Modern bir avukatlık bürosu web sitesi, güvenilirlik, profesyonellik ve kolay erişilebilirlik sunmalıdır. İşte bu prensiplere dayanan bir bölüm yapısı:

**Header (Üst Kısım):**
*   **Logo:** Sol tarafta yer alacak modern ve minimalist bir logo.
*   **Navigasyon Menüsü:** Sağ tarafta, aşağıdaki linkler yer alacak:
    *   Ana Sayfa (DE: Startseite, EN: Home, TR: Ana Sayfa)
    *   Hakkımızda (DE: Über Uns, EN: About Us, TR: Hakkımızda)
    *   Uzmanlık Alanları (DE: Rechtsgebiete, EN: Practice Areas, TR: Uzmanlık Alanları)
    *   Ekibimiz (DE: Unser Team, EN: Our Team, TR: Ekibimiz)
    *   İletişim (DE: Kontakt, EN: Contact, TR: İletişim)
*   **Dil Seçimi:** Navigasyonun en sağında bayrak ikonları veya "DE | EN | TR" şeklinde bir dil değiştirme menüsü.

**Ana Sayfa (Home):**
1.  **Hero Bölümü:**
    *   Arka planda ofisin içinden veya modern bir hukuk konseptini yansıtan profesyonel bir görsel.
    *   Ana başlık: "Haklarınız İçin Buradayız" (DE: Wir verhelfen Ihnen zu Ihrem Recht!, EN: We Help You To Your Right!).
    *   Alt başlık: "Hukuki sorunlarınıza modern, etkili ve kişiye özel çözümler." (DE: Moderne, effektive und maßgeschneiderte Lösungen für Ihre rechtlichen Probleme., EN: Modern, effective, and tailored solutions for your legal problems.).
    *   Buton: "Ücretsiz Danışma Talep Edin" (DE: Kostenlose Erstberatung anfragen, EN: Request a Free Consultation) -> İletişim sayfasına yönlendirme.
2.  **Hakkımızda Özeti (Kısa Tanıtım):**
    *   Meral Gören'in profesyonel bir fotoğrafı.
    *   Yanında kısa bir tanıtım metni: "Kanzlei Gören, müvekkillerine en yüksek kalitede hukuki danışmanlık sunmayı hedefler. Tecrübemiz ve kararlılığımızla yanınızdayız."
    *   Buton: "Daha Fazla Bilgi" (DE: Mehr erfahren, EN: Learn More) -> Hakkımızda sayfasına yönlendirme.
3.  **Uzmanlık Alanları (Öne Çıkanlar):**
    *   İkonlarla desteklenmiş 3-4 ana uzmanlık alanı (Aile Hukuku, İş Hukuku, Yabancılar Hukuku vb.).
    *   Her bir alanın üzerine gelindiğinde kısa bir açıklama belirmesi (hover efekti).
    *   Buton: "Tüm Alanları Gör" (DE: Alle Rechtsgebiete, EN: See All Practice Areas) -> Uzmanlık Alanları sayfasına yönlendirme.
4.  **Neden Biz? (Değer Önerisi):**
    *   **Güvenilirlik:** "Yılların tecrübesi."
    *   **Müvekkil Odaklılık:** "Size özel çözümler."
    *   **Ulaşılabilirlik:** "Her zaman yanınızdayız."
5.  **Müvekkil Yorumları (Testimonials):**
    *   Varsa, müvekkillerden alınmış kısa ve etkili yorumlar. Bu bölüm güveni artırır.
6.  **İletişim Bilgileri ve Harita:**
    *   Tüm ofislerin (Weinheim, Mannheim, Worms) adresleri, telefon numaraları ve Google Maps entegrasyonu.

**Hakkımızda (About Us):**
*   **Meral Gören'in Detaylı Biyografisi:** Eğitim hayatı, kariyer basamakları, vizyonu ve misyonu.
*   **Büronun Felsefesi:** Müvekkil ilişkileri, çalışma prensipleri ve hedefler.

**Uzmanlık Alanları (Practice Areas):**
*   Tüm hukuki alanların (Genel Medeni Hukuk, İş Hukuku, Yabancılar Hukuku, Aile Hukuku, Trafik Hukuku) listesi.
*   Her bir alana tıklandığında, o alanla ilgili detaylı açıklamaların, sıkça sorulan soruların ve ilgili yasal süreçlerin anlatıldığı bir alt sayfa açılmalı.

**Ekibimiz (Our Team):**
*   **Avukat Meral Gören:** Profesyonel fotoğrafı, unvanı ve kısa biyografisi.
*   **Avukat Jörg Armbruster:** "Bürogemeinschaft" (Ofis Ortaklığı) olduğu belirtilerek, onun da fotoğrafı, unvanı (İş ve Sosyal Hukuk Uzmanı) ve kısa bir açıklaması.

**İletişim (Contact):**
*   **İletişim Formu:** Ad, Soyad, E-posta, Telefon, Konu ve Mesaj alanları.
*   **Adres Bilgileri:** Weinheim (Hauptsitz), Mannheim ve Worms şubelerinin adresleri, telefon/faks numaraları ve e-posta adresleri.
*   **İnteraktif Harita:** Her bir ofisin konumunu gösteren Google Maps entegrasyonu.
*   **Çalışma Saatleri.**

**Footer (Alt Kısım):**
*   Logo ve kısa bir slogan.
*   Hızlı linkler (Ana Sayfa, Hakkımızda, İletişim).
*   Sosyal medya ikonları (varsa).
*   Telif Hakkı Bilgisi: "© 2025 Kanzlei Gören. Tüm hakları saklıdır."
*   Yasal Uyarılar: Impressum (Künye) ve Datenschutz (Gizlilik Politikası) linkleri.

---

### 2. Logo ve Görsel Üretimi İçin Diffusion Promptları

Bu promptları, Midjourney, Stable Diffusion veya benzeri bir yapay zeka görsel üretim aracında kullanabilirsiniz.

**Logo İçin Promptlar:**

*   **Prompt 1 (Modern & Minimalist):**
    > `logo for a law firm named "Gören", minimalist design, vector art, monogram using the letter 'G', scales of justice subtly integrated, deep navy blue and gold colors, clean lines, professional, on a white background --no text`

*   **Prompt 2 (Soyut & Güven Veren):**
    > `abstract logo for a lawyer, representing protection and justice, shield or a stylized pillar shape, geometric, elegant, metallic silver and dark teal colors, high-end, sophisticated, flat design`

*   **Prompt 3 (Tipografik):**
    > `wordmark logo, "Kanzlei Gören", modern sans-serif font, elegant and strong typography, perfect kerning, the letter 'ö' is stylized as a subtle design element, professional, timeless, black and white`

**Web Sitesi Görselleri İçin Promptlar:**

*   **Hero Bölümü Arka Planı:**
    > `photorealistic image of a modern and bright law office interior, minimalist design, large windows with a city view, empty conference room with a large wooden table and stylish chairs, clean aesthetic, soft morning light, professional and welcoming atmosphere, 4K resolution`

*   **Hakkımızda Sayfası İçin Konsept Görsel:**
    > `symbolic photograph, a single golden key on a dark wooden desk next to a law book, representing finding a solution, shallow depth of field, warm and cinematic lighting, sense of trust and expertise`

*   **Uzmanlık Alanları İçin İkon Seti:**
    > `a set of 6 minimalist line icons for a law firm, vector style, consistent stroke weight, topics: family, work contract, immigration passport, car accident, handshake for civil law, courthouse. deep navy blue on a light grey background, clean and modern`

*   **İletişim Sayfası Banner'ı:**
    > `professional and friendly woman (Turkish-German ethnicity) in a business suit, smiling warmly, holding a modern smartphone, blurred office background, approachable and trustworthy, high-quality stock photo style`

---

### 3. GitHub için README.md Dosyası

Aşağıdaki içeriği projenizin `README.md` dosyası olarak kullanabilirsiniz.

````markdown
# Kanzlei Gören - Modern Hukuk Bürosu Web Sitesi

Bu proje, Weinheim, Mannheim ve Worms'ta faaliyet gösteren Avukat Meral Gören'in hukuk bürosu için geliştirilmiş modern, duyarlı ve çok dilli bir web sitesidir.

## ✨ Özellikler

*   **Modern Tasarım:** Temiz, profesyonel ve kullanıcı odaklı arayüz.
*   **%100 Mobil Uyumlu (Responsive):** Tüm cihazlarda (masaüstü, tablet, mobil) kusursuz bir deneyim sunar.
*   **Çok Dilli Destek:** Almanca (DE), İngilizce (EN) ve Türkçe (TR) dillerinde içerik.
*   **SEO Optimizasyonu:** Arama motorlarında daha iyi sıralamalar için en iyi SEO uygulamalarıyla geliştirilmiştir.
*   **İnteraktif Haritalar:** Google Maps entegrasyonu ile ofis konumlarına kolay ulaşım.
*   **Hızlı ve Performanslı:** Modern teknolojiler kullanılarak optimize edilmiş yükleme süreleri.

## 🛠️ Kullanılan Teknolojiler

*   **Frontend:** React (Next.js) veya modern bir statik site oluşturucu (Astro, Hugo).
*   **Styling:** Tailwind CSS veya Styled Components.
*   **Deployment:** Vercel ile kolay ve hızlı canlıya alma.
*   **Dil Yönetimi:** `i18next` veya benzeri bir kütüphane.

## 🚀 Kurulum ve Başlatma

1.  **Projeyi klonlayın:**
    ```bash
    git clone https://github.com/sizingibiler/kanzlei-goeren-website.git
    ```

2.  **Proje dizinine gidin:**
    ```bash
    cd kanzlei-goeren-website
    ```

3.  **Gerekli paketleri yükleyin:**
    ```bash
    npm install
    ```

4.  **Geliştirme sunucusunu başlatın:**
    ```bash
    npm run dev
    ```

    Siteyi tarayıcınızda `http://localhost:3000` adresinde görüntüleyebilirsiniz.

##  Vercel ile Canlıya Alma

Bu proje, Vercel ile kolayca canlıya alınabilir:

1.  Projenizi GitHub'a push edin.
2.  Vercel hesabınıza giriş yapın ve "New Project" butonuna tıklayın.
3.  GitHub reponuzu seçin ve "Import" edin.
4.  Vercel, projeyi otomatik olarak tanıyacak ve build ayarlarını yapılandıracaktır. "Deploy" butonuna tıklamanız yeterlidir.

Projeniz kısa süre içinde canlıya alınacaktır!
````

Bu planla, hem görsel olarak çekici hem de işlevsel olarak güçlü bir web sitesi oluşturmak için sağlam bir temeliniz var. Başarılar dilerim

Harika, görsellerle birlikte proje planını son haline getirelim. `proje.md` dosyasının sonuna eklenecek şekilde, görsellerin dosya yapısındaki yerlerini ve kullanım amaçlarını netleştiren bölüm aşağıdadır.

---

*(Mevcut `proje.md` dosyasının sonuna bu bölümü ekleyin)*

### **5. GÖRSEL VARLIKLARIN KULLANIMI VE SON TALİMATLAR**

Bu bölümde, sağlanan görsel materyallerin proje yapısı içinde nasıl kullanılacağı ve adlandırılacağı belirtilmiştir.

#### **A. Seçilen Logo**

*   **`logo1.jpeg`** ana logo olarak kullanılacaktır. Proje klasöründe **`public/logo.jpeg`** olarak yeniden adlandırılmalıdır. Kaliteyi artırmak için SVG formatına dönüştürülmesi tavsiye edilir, ancak zorunlu değildir.

#### **B. Güncellenmiş Klasör Yapısı**

Sağlanan görselleri yansıtacak şekilde `public` klasörünün yapısı aşağıdaki gibi güncellenmelidir:

```
/
├── public/
│   ├── logo.jpeg               // logo1.jpeg'den gelen ana logo
│   └── images/
│       ├── hero-background.jpeg  // "Hero Bölümü Arka Planı.jpeg"
│       ├── about-concept.jpeg    // "Hakkımızda Sayfası İçin Konsept Görsel.jpeg"
│       ├── meral.jpg             // Avukat Meral Gören'in resmi
│       └── icons/
│           ├── car-accident.jpeg
│           ├── civil-law.jpeg
│           ├── family-law.jpeg
│           ├── immigration.jpeg
│           └── work-contract.jpeg
```

#### **C. Görsel Kullanım Eşleştirmesi**

*   **`Header.tsx` & `Footer.tsx`:**
    *   Logo olarak `<Image src="/logo.jpeg" ... />` kullanılacak.

*   **`page.tsx` (Ana Sayfa):**
    *   **Hero Bölümü:** Arka plan görseli olarak `images/hero-background.jpeg` kullanılacak.
    *   **Hakkımızda Özeti:** Avukat Meral Gören'in fotoğrafı olarak `images/meral.jpg` kullanılacak.
    *   **Uzmanlık Alanları:**
        *   Aile Hukuku için `images/icons/family-law.jpeg`
        *   İş Hukuku için `images/icons/work-contract.jpeg`
        *   Trafik Hukuku için `images/icons/car-accident.jpeg`
        *   Yabancılar Hukuku için `images/icons/immigration.jpeg`
        *   Medeni Hukuk için `images/icons/civil-law.jpeg` ikonları `Card` bileşenleri içinde kullanılacak.

*   **`about/page.tsx` (Hakkımızda Sayfası):**
    *   Sayfanın üst kısmında veya metinlerin yanında konsept görseli olarak `images/about-concept.jpeg` kullanılabilir.
    *   Meral Gören'in biyografisinin yanında yine `images/meral.jpg` kullanılacak.

*   **`team/page.tsx` (Ekibimiz Sayfası):**
    *   Meral Gören'in tanıtımında `images/meral.jpg` kullanılacak.

#### **D. Son Notlar**

*   Tüm görsellerin web için optimize edildiğinden (boyutlarının küçültüldüğünden) emin olun. Next.js'in `<Image>` bileşeni bu konuda otomatik optimizasyonlar sağlayacaktır.
*   İkonların tutarlı bir görünüm sergilemesi için CSS ile boyutlarının ve stillerinin (örneğin `border-radius`) eşitlendiğinden emin olun.
*   Warp AI'a bu güncellenmiş dosya yapısını ve varlık adlarını vererek kod üretimini başlatın.