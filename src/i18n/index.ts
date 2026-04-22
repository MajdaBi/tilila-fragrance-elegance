import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: { home: "Home", collection: "Collection", cart: "Cart", login: "Login", logout: "Logout", signup: "Sign Up" },
      hero: {
        title: "Tilila Fragrance",
        subtitle: "Luxury perfumes inspired by elegance",
        cta: "Discover Collection",
      },
      collection: {
        title: "Our Collection",
        subtitle: "Handpicked fragrances crafted for the modern woman",
        viewDetails: "View Details",
        currency: "DH",
      },
      product: {
        addToCart: "Add to Cart",
        whatsapp: "Order via WhatsApp",
        description: "Description",
        notFound: "Product not found",
      },
      products: {
        herrera: { name: "Inspired Herrera 50ml", desc: "Vanilla harmony — a warm, sensual signature scent that lingers with grace." },
        kayali: { name: "Inspired Kayali 50ml", desc: "Candy & feminine — a playful, sweet bouquet that captivates the senses." },
        kayali33: { name: "Inspired Kayali 33 50ml", desc: "Vanilla soft musk — a creamy, soft-spoken essence of pure refinement." },
      },
      cart: {
        title: "Your Cart",
        empty: "Your cart is empty",
        total: "Total",
        checkout: "Proceed to Checkout",
        remove: "Remove",
        quantity: "Qty",
        continue: "Continue Shopping",
      },
      checkout: {
        title: "Checkout",
        fullName: "Full Name",
        phone: "Phone Number",
        address: "Address",
        payment: "Payment Method",
        cod: "Cash on Delivery",
        place: "Place Order",
        success: "Order placed successfully!",
      },
      auth: {
        loginTitle: "Welcome Back",
        loginSubtitle: "Sign in to your account",
        signupTitle: "Create Account",
        signupSubtitle: "Join the Tilila family",
        email: "Email",
        password: "Password",
        fullName: "Full Name",
        login: "Login",
        signup: "Sign Up",
        noAccount: "Don't have an account?",
        haveAccount: "Already have an account?",
        loginRequired: "Please login to continue",
        welcome: "Welcome",
      },
      footer: { rights: "All rights reserved" },
    },
  },
  fr: {
    translation: {
      nav: { home: "Accueil", collection: "Collection", cart: "Panier", login: "Connexion", logout: "Déconnexion", signup: "S'inscrire" },
      hero: { title: "Tilila Fragrance", subtitle: "Parfums de luxe inspirés par l'élégance", cta: "Découvrir la Collection" },
      collection: { title: "Notre Collection", subtitle: "Fragrances soigneusement sélectionnées pour la femme moderne", viewDetails: "Voir Détails", currency: "DH" },
      product: { addToCart: "Ajouter au Panier", whatsapp: "Commander via WhatsApp", description: "Description", notFound: "Produit introuvable" },
      products: {
        herrera: { name: "Inspiré Herrera 50ml", desc: "Harmonie vanillée — un parfum signature chaleureux et sensuel." },
        kayali: { name: "Inspiré Kayali 50ml", desc: "Bonbon & féminin — un bouquet sucré qui captive les sens." },
        kayali33: { name: "Inspiré Kayali 33 50ml", desc: "Vanille musc doux — une essence crémeuse d'un raffinement pur." },
      },
      cart: { title: "Votre Panier", empty: "Votre panier est vide", total: "Total", checkout: "Passer à la Caisse", remove: "Retirer", quantity: "Qté", continue: "Continuer vos Achats" },
      checkout: { title: "Commande", fullName: "Nom Complet", phone: "Téléphone", address: "Adresse", payment: "Méthode de Paiement", cod: "Paiement à la Livraison", place: "Confirmer la Commande", success: "Commande passée avec succès !" },
      auth: { loginTitle: "Bon Retour", loginSubtitle: "Connectez-vous à votre compte", signupTitle: "Créer un Compte", signupSubtitle: "Rejoignez la famille Tilila", email: "Email", password: "Mot de passe", fullName: "Nom Complet", login: "Connexion", signup: "S'inscrire", noAccount: "Pas de compte ?", haveAccount: "Déjà un compte ?", loginRequired: "Veuillez vous connecter pour continuer", welcome: "Bienvenue" },
      footer: { rights: "Tous droits réservés" },
    },
  },
  ar: {
    translation: {
      nav: { home: "الرئيسية", collection: "المجموعة", cart: "السلة", login: "تسجيل الدخول", logout: "تسجيل الخروج", signup: "إنشاء حساب" },
      hero: { title: "تليلة فراغرانس", subtitle: "عطور فاخرة مستوحاة من الأناقة", cta: "اكتشف المجموعة" },
      collection: { title: "مجموعتنا", subtitle: "عطور مختارة بعناية للمرأة العصرية", viewDetails: "عرض التفاصيل", currency: "درهم" },
      product: { addToCart: "أضف إلى السلة", whatsapp: "اطلب عبر واتساب", description: "الوصف", notFound: "المنتج غير موجود" },
      products: {
        herrera: { name: "مستوحى من هيريرا 50مل", desc: "تناغم الفانيليا — عطر دافئ وحسي يدوم بأناقة." },
        kayali: { name: "مستوحى من كيالي 50مل", desc: "حلوى وأنوثة — باقة عطرية حلوة تأسر الحواس." },
        kayali33: { name: "مستوحى من كيالي 33 50مل", desc: "فانيليا ومسك ناعم — عطر كريمي بلمسة راقية." },
      },
      cart: { title: "سلتك", empty: "سلتك فارغة", total: "المجموع", checkout: "إتمام الطلب", remove: "إزالة", quantity: "الكمية", continue: "متابعة التسوق" },
      checkout: { title: "إتمام الشراء", fullName: "الاسم الكامل", phone: "رقم الهاتف", address: "العنوان", payment: "طريقة الدفع", cod: "الدفع عند الاستلام", place: "تأكيد الطلب", success: "تم تقديم الطلب بنجاح!" },
      auth: { loginTitle: "مرحبا بعودتك", loginSubtitle: "سجل الدخول إلى حسابك", signupTitle: "إنشاء حساب", signupSubtitle: "انضم إلى عائلة تليلة", email: "البريد الإلكتروني", password: "كلمة المرور", fullName: "الاسم الكامل", login: "دخول", signup: "تسجيل", noAccount: "ليس لديك حساب؟", haveAccount: "لديك حساب بالفعل؟", loginRequired: "يرجى تسجيل الدخول للمتابعة", welcome: "مرحبا" },
      footer: { rights: "جميع الحقوق محفوظة" },
    },
  },
};

const saved = typeof window !== "undefined" ? localStorage.getItem("tilila_lang") : null;

i18n.use(initReactI18next).init({
  resources,
  lng: saved || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const applyDir = (lng: string) => {
  if (typeof document !== "undefined") {
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  }
};
applyDir(i18n.language);
i18n.on("languageChanged", (lng) => {
  applyDir(lng);
  if (typeof window !== "undefined") localStorage.setItem("tilila_lang", lng);
});

export default i18n;
