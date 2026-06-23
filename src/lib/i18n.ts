// 多言語化基盤（土台）。MVPでは EN / VN / ID の3言語。
// 本格運用では i18next + AI翻訳に置換予定（事業計画書 §5 ツールスタック）。
import type { Locale } from "./characters";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
];

export const DEFAULT_LOCALE: Locale = "en";

type Dict = {
  // Landing
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaStart: string;
  ctaLogin: string;
  charactersTitle: string;
  charactersSubtitle: string;
  featuresTitle: string;
  featChatTitle: string;
  featChatBody: string;
  featLessonsTitle: string;
  featLessonsBody: string;
  featCareerTitle: string;
  featCareerBody: string;
  footerNote: string;
  // Auth
  signupTitle: string;
  loginTitle: string;
  email: string;
  password: string;
  signupCta: string;
  loginCta: string;
  haveAccount: string;
  noAccount: string;
  // Chat
  chooseSenpai: string;
  chatPlaceholder: string;
  send: string;
  thinking: string;
  back: string;
};

export const DICTIONARIES: Record<Locale, Dict> = {
  en: {
    heroBadge: "Your first step to Japan",
    heroTitle: "Talk with your Senpai. Learn Japanese. Work in Japan.",
    heroSubtitle:
      "Chat with anime-style senpai AIs, study for the JLPT, and get matched with jobs in Japan — all in one place.",
    ctaStart: "Start free",
    ctaLogin: "Log in",
    charactersTitle: "Meet your Senpai",
    charactersSubtitle: "Four senpai at Yamato Academy, each with their own style.",
    featuresTitle: "Everything for your journey to Japan",
    featChatTitle: "Senpai Chat",
    featChatBody: "Practice real conversations 24/7 with four AI senpai who correct you kindly.",
    featLessonsTitle: "Senpai Lessons",
    featLessonsBody: "JLPT N5–N1 study with AI scoring that adapts to your level.",
    featCareerTitle: "Senpai Career",
    featCareerBody: "Career diagnosis, interview practice, and matching with Japanese employers.",
    footerNote: "Senpai — a SEA-to-Japan learning & career platform. Original characters, AI-generated.",
    signupTitle: "Create your account",
    loginTitle: "Welcome back",
    email: "Email",
    password: "Password",
    signupCta: "Sign up",
    loginCta: "Log in",
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    chooseSenpai: "Choose your Senpai",
    chatPlaceholder: "Type in Japanese or your language…",
    send: "Send",
    thinking: "is typing…",
    back: "Back",
  },
  vi: {
    heroBadge: "Bước đầu tiên đến Nhật Bản",
    heroTitle: "Trò chuyện với Senpai. Học tiếng Nhật. Làm việc tại Nhật.",
    heroSubtitle:
      "Trò chuyện với các senpai AI phong cách anime, ôn thi JLPT và được kết nối việc làm tại Nhật — tất cả ở một nơi.",
    ctaStart: "Bắt đầu miễn phí",
    ctaLogin: "Đăng nhập",
    charactersTitle: "Gặp gỡ Senpai của bạn",
    charactersSubtitle: "Bốn senpai tại Học viện Yamato, mỗi người một phong cách.",
    featuresTitle: "Mọi thứ cho hành trình đến Nhật Bản",
    featChatTitle: "Senpai Chat",
    featChatBody: "Luyện hội thoại thật 24/7 với bốn senpai AI sửa lỗi nhẹ nhàng.",
    featLessonsTitle: "Senpai Lessons",
    featLessonsBody: "Học JLPT N5–N1 với chấm điểm AI thích ứng theo trình độ của bạn.",
    featCareerTitle: "Senpai Career",
    featCareerBody: "Chẩn đoán nghề nghiệp, luyện phỏng vấn và kết nối với nhà tuyển dụng Nhật.",
    footerNote: "Senpai — nền tảng học tập & nghề nghiệp từ Đông Nam Á đến Nhật. Nhân vật gốc, tạo bởi AI.",
    signupTitle: "Tạo tài khoản",
    loginTitle: "Chào mừng trở lại",
    email: "Email",
    password: "Mật khẩu",
    signupCta: "Đăng ký",
    loginCta: "Đăng nhập",
    haveAccount: "Đã có tài khoản?",
    noAccount: "Chưa có tài khoản?",
    chooseSenpai: "Chọn Senpai của bạn",
    chatPlaceholder: "Nhập tiếng Nhật hoặc ngôn ngữ của bạn…",
    send: "Gửi",
    thinking: "đang nhập…",
    back: "Quay lại",
  },
  id: {
    heroBadge: "Langkah pertamamu ke Jepang",
    heroTitle: "Ngobrol dengan Senpai. Belajar bahasa Jepang. Bekerja di Jepang.",
    heroSubtitle:
      "Ngobrol dengan AI senpai bergaya anime, belajar JLPT, dan dicocokkan dengan pekerjaan di Jepang — semua di satu tempat.",
    ctaStart: "Mulai gratis",
    ctaLogin: "Masuk",
    charactersTitle: "Kenali Senpai-mu",
    charactersSubtitle: "Empat senpai di Akademi Yamato, masing-masing dengan gayanya.",
    featuresTitle: "Semua untuk perjalananmu ke Jepang",
    featChatTitle: "Senpai Chat",
    featChatBody: "Latihan percakapan nyata 24/7 dengan empat AI senpai yang mengoreksi dengan ramah.",
    featLessonsTitle: "Senpai Lessons",
    featLessonsBody: "Belajar JLPT N5–N1 dengan penilaian AI yang menyesuaikan levelmu.",
    featCareerTitle: "Senpai Career",
    featCareerBody: "Diagnosis karier, latihan wawancara, dan pencocokan dengan perusahaan Jepang.",
    footerNote: "Senpai — platform belajar & karier dari Asia Tenggara ke Jepang. Karakter orisinal, dibuat AI.",
    signupTitle: "Buat akunmu",
    loginTitle: "Selamat datang kembali",
    email: "Email",
    password: "Kata sandi",
    signupCta: "Daftar",
    loginCta: "Masuk",
    haveAccount: "Sudah punya akun?",
    noAccount: "Belum punya akun?",
    chooseSenpai: "Pilih Senpai-mu",
    chatPlaceholder: "Ketik dalam bahasa Jepang atau bahasamu…",
    send: "Kirim",
    thinking: "sedang mengetik…",
    back: "Kembali",
  },
};

export function getDict(locale: Locale): Dict {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}
