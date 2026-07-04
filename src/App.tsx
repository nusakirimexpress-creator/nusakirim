import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Users, 
  HandCoins, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  Plus, 
  Minus, 
  Phone, 
  Clock, 
  MapPin, 
  ShieldCheck,
  ArrowRight,
  Check,
  Sparkles,
  X,
  HelpCircle,
  Settings,
  Edit,
  Trash2,
  Image,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Service definition
interface Service {
  id: string;
  title: string;
  shortDesc: string;
  tagline: string;
  longDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
  howItWorks: string[];
  priceEst: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// Reusable premium Nusa Kirim Express Logo Component (Pixel-perfect matching user-uploaded branding image)
interface NusaKirimLogoProps {
  className?: string;
  iconSize?: string;
  textSizeClass?: string;
  subTextSizeClass?: string;
  pillSizeClass?: string;
}

function NusaKirimLogo({ 
  className = "", 
  iconSize = "w-11 h-11", 
  textSizeClass = "text-[16px] sm:text-[18px]",
  subTextSizeClass = "text-[8px]",
  pillSizeClass = "text-[8px] px-1.5 py-0.5 rounded",
}: NusaKirimLogoProps) {
  // Map iconSize to clean heights for responsive rendering of the high-quality logo.png
  let heightClass = "h-11 sm:h-12";
  if (iconSize.includes("w-9")) {
    heightClass = "h-8.5 sm:h-9.5";
  } else if (iconSize.includes("w-8.5")) {
    heightClass = "h-8 sm:h-9";
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/src/assets/images/logo.png" 
        alt="Nusa Kirim Express Logo" 
        className={`${heightClass} w-auto object-contain select-none`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

const translations = {
  ID: {
    faqTitle: 'FAQ',
    promoBadge: 'Promo Khusus Hari Ini',
    titleMain: 'Hemat Ongkir',
    titleSub: 'Ternate - Sofifi',
    subTitleQuery: '🤔 Belanja online & Ongkir ke Sofifi mahal?',
    discountSlogan1: 'Kami bantu hemat hingga',
    discountSlogan2: '50%',
    gratisAntar: 'Gratis Antar',
    bisaCod: 'Bisa COD',
    hubungiKami: 'Hubungi Kami',
    sameday: 'Sameday',
    satuHariSampai: 'Satu Hari Sampai',
    amanRapi: 'Aman & Rapi',
    pelindungKhusus: 'Pelindung Khusus',
    antarPulau: 'Antar Pulau',
    ternateSofifiPP: 'Ternate - Sofifi PP',
    layananLogistik: 'Layanan Logistik Kami',
    klikLayanan: 'Klik Layanan Untuk Detail',
    detailInfoLayanan: 'Detail Informasi Layanan',
    tutupDetail: 'Tutup detail',
    kelebihan: 'Kelebihan:',
    caraKerja: 'Cara Kerja:',
    estimasiTarif: 'Estimasi Tarif',
    pesanJasa: 'Pesan Jasa',
    pertanyaanUmum: 'Pertanyaan Umum',
    faqTitleNk: 'FAQ - NK Express',
    tutupFaq: 'Tutup FAQ',
    punyaPertanyaan: 'Punya pertanyaan lain?',
    tanyaAdmin: 'Tanya Admin',
    footerDesc: 'Solusi pengiriman logistik Sameday harian paling hemat rute Ternate - Sofifi PP.',
    hubungiKamiFooter: 'Hubungi Kami',
    hakCipta: 'NK Express. Semua Hak Cipta Dilindungi.',
    syaratKetentuan: 'Syarat & Ketentuan',
    kebijakanPrivasi: 'Kebijakan Privasi',
  },
  ZH: {
    faqTitle: '常见问题',
    promoBadge: '今日特惠促销',
    titleMain: '省钱快递',
    titleSub: '特尔纳特 - 索菲菲',
    subTitleQuery: '🤔 网上购物和寄往索菲菲的运费很贵吗？',
    discountSlogan1: '我们帮您省下高达',
    discountSlogan2: '50%',
    gratisAntar: '免费送货',
    bisaCod: '支持货到付款 (COD)',
    hubungiKami: '联系我们',
    sameday: '当日达',
    satuHariSampai: '一日送达',
    amanRapi: '安全整洁',
    pelindungKhusus: '特制保护箱',
    antarPulau: '跨岛配送',
    ternateSofifiPP: '特尔纳特 - 索菲菲往返',
    layananLogistik: '我们的物流服务',
    klikLayanan: '点击服务查看详情',
    detailInfoLayanan: '服务详细信息',
    tutupDetail: '关闭详情',
    kelebihan: '服务优势：',
    caraKerja: '工作流程：',
    estimasiTarif: '预估费用',
    pesanJasa: '立即预约',
    pertanyaanUmum: '常见问题',
    faqTitleNk: '常见问题 - NK Express',
    tutupFaq: '关闭常见问题',
    punyaPertanyaan: '还有其他问题吗？',
    tanyaAdmin: '咨询客服',
    footerDesc: '特尔纳特 - 索菲菲往返，每日最省钱的当日达物流解决方案。',
    hubungiKamiFooter: '联系我们',
    hakCipta: 'NK Express. 保留所有权利。',
    syaratKetentuan: '条款与条件',
    kebijakanPrivasi: '隐私政策',
  }
};

export default function App() {
  const [lang, setLang] = useState<'ID' | 'ZH'>(() => {
    try {
      const saved = localStorage.getItem('nk_lang');
      if (saved === 'ID' || saved === 'ZH') return saved;
    } catch (_) {}
    return 'ID';
  });

  useEffect(() => {
    try {
      localStorage.setItem('nk_lang', lang);
    } catch (_) {}
  }, [lang]);

  // Promo Banners with newly generated professional asset designs and dynamic addition support
  const [promoBanners, setPromoBanners] = useState(() => {
    const defaultBanners = [
      {
        id: 1,
        image: '/src/assets/images/nusa.png',
        badge: 'PROMO UTAMA',
        badgeZH: '主要促销',
        title: 'Hemat Ongkir Ternate - Sofifi',
        titleZH: '特尔纳特 - 索菲菲 运费超省',
        highlight: 'Mulai dari 30.000',
        highlightZH: '3万印尼盾起',
        desc: 'Kirim paket barang dagangan, belanjaan online, atau titipan dokumen kini jauh lebih hemat dan praktis.',
        descZH: '寄送商品、网购包裹或文件，现在更省钱、更便捷。',
      },
      {
        id: 2,
        image: '/src/assets/images/kirim.png',
        badge: 'GARANSI KEAMANAN',
        badgeZH: '安全保证',
        title: 'Pengiriman Aman & Rapi',
        titleZH: '安全整洁的递送',
        highlight: 'Ekstra Aman',
        highlightZH: '额外安全',
        desc: 'Paket terlindungi sepenuhnya dari hujan dan cipratan air laut menggunakan pelindung khusus.',
        descZH: '使用特制保护箱，包裹完全免受雨水和海水溅洒的影响。',
      },
      {
        id: 3,
        image: '/src/assets/images/express.png',
        badge: 'SAMEDAY SERVICE',
        badgeZH: '当日达服务',
        title: 'Satu Hari Sampai (Sameday)',
        titleZH: '一日送达 (当日达)',
        highlight: 'Tiap Hari Kirim',
        highlightZH: '每日发车',
        desc: 'Kirim barang langsung sampai hari ini dengan kurir andal kami.',
        descZH: '使用我们可靠的快递服务，今天寄件今天送达。',
      }
    ];

    try {
      const saved = localStorage.getItem('nk_promo_banners');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (_) {}
    return defaultBanners;
  });

  const saveBanners = (updatedBanners: typeof promoBanners) => {
    setPromoBanners(updatedBanners);
    try {
      localStorage.setItem('nk_promo_banners', JSON.stringify(updatedBanners));
    } catch (_) {}
  };

  const getBannerProp = (banner: any, prop: 'badge' | 'title' | 'highlight' | 'desc') => {
    if (lang === 'ZH') {
      const zhKey = prop + 'ZH';
      if (banner[zhKey]) return banner[zhKey];
    }
    return banner[prop] || '';
  };

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<number | null>(null);
  const [isAddingBanner, setIsAddingBanner] = useState(false);

  // Form states
  const [formImage, setFormImage] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formBadgeZH, setFormBadgeZH] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formTitleZH, setFormTitleZH] = useState('');
  const [formHighlight, setFormHighlight] = useState('');
  const [formHighlightZH, setFormHighlightZH] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formDescZH, setFormDescZH] = useState('');

  const handleStartAdd = () => {
    setIsAddingBanner(true);
    setEditingBannerId(null);
    setFormImage('/src/assets/images/nusa.png');
    setFormBadge('');
    setFormBadgeZH('');
    setFormTitle('');
    setFormTitleZH('');
    setFormHighlight('');
    setFormHighlightZH('');
    setFormDesc('');
    setFormDescZH('');
  };

  const handleStartEdit = (banner: any) => {
    setEditingBannerId(banner.id);
    setIsAddingBanner(false);
    setFormImage(banner.image);
    setFormBadge(banner.badge || '');
    setFormBadgeZH(banner.badgeZH || '');
    setFormTitle(banner.title || '');
    setFormTitleZH(banner.titleZH || '');
    setFormHighlight(banner.highlight || '');
    setFormHighlightZH(banner.highlightZH || '');
    setFormDesc(banner.desc || '');
    setFormDescZH(banner.descZH || '');
  };

  const handleSaveBanner = () => {
    if (!formImage) return;

    if (isAddingBanner) {
      const newBanner = {
        id: Date.now(),
        image: formImage,
        badge: formBadge || 'PROMO',
        badgeZH: formBadgeZH || '促销',
        title: formTitle || 'Promo Baru',
        titleZH: formTitleZH || '新促销',
        highlight: formHighlight || 'Hemat',
        highlightZH: formHighlightZH || '超省',
        desc: formDesc || '',
        descZH: formDescZH || '',
      };
      saveBanners([...promoBanners, newBanner]);
      setIsAddingBanner(false);
    } else if (editingBannerId !== null) {
      const updated = promoBanners.map((b) => {
        if (b.id === editingBannerId) {
          return {
            ...b,
            image: formImage,
            badge: formBadge,
            badgeZH: formBadgeZH,
            title: formTitle,
            titleZH: formTitleZH,
            highlight: formHighlight,
            highlightZH: formHighlightZH,
            desc: formDesc,
            descZH: formDescZH,
          };
        }
        return b;
      });
      saveBanners(updated);
      setEditingBannerId(null);
    }
  };

  const handleDeleteBanner = (id: number) => {
    const updated = promoBanners.filter((b) => b.id !== id);
    saveBanners(updated);
    if (activeBanner >= updated.length) {
      setActiveBanner(Math.max(0, updated.length - 1));
    }
  };

  const handleResetBanners = () => {
    if (window.confirm('Reset semua banner ke default?')) {
      const defaultBanners = [
        {
          id: 1,
          image: '/src/assets/images/nusa.png',
          badge: 'PROMO UTAMA',
          badgeZH: '主要促销',
          title: 'Hemat Ongkir Ternate - Sofifi',
          titleZH: '特尔纳特 - 索菲菲 运费超省',
          highlight: 'Mulai dari 30.000',
          highlightZH: '3万印尼盾起',
          desc: 'Kirim paket barang dagangan, belanjaan online, atau titipan dokumen kini jauh lebih hemat dan praktis.',
          descZH: '寄送商品、网购包裹或文件，现在更省钱、更便捷。',
        },
        {
          id: 2,
          image: '/src/assets/images/kirim.png',
          badge: 'GARANSI KEAMANAN',
          badgeZH: '安全保证',
          title: 'Pengiriman Aman & Rapi',
          titleZH: '安全整洁的递送',
          highlight: 'Ekstra Aman',
          highlightZH: '额外安全',
          desc: 'Paket terlindungi sepenuhnya dari hujan dan cipratan air laut menggunakan pelindung khusus.',
          descZH: '使用特制保护箱，包裹完全免受雨水和海水溅洒的影响。',
        },
        {
          id: 3,
          image: '/src/assets/images/express.png',
          badge: 'SAMEDAY SERVICE',
          badgeZH: '当日达服务',
          title: 'Satu Hari Sampai (Sameday)',
          titleZH: '一日送达 (当日达)',
          highlight: 'Tiap Hari Kirim',
          highlightZH: '每日发车',
          desc: 'Kirim barang langsung sampai hari ini dengan kurir andal kami.',
          descZH: '使用我们可靠 di-pack 快递服务，今天寄件今天送达。',
        }
      ];
      saveBanners(defaultBanners);
      setActiveBanner(0);
    }
  };

  const [activeBanner, setActiveBanner] = useState(0);

  // Currently active selected service for detail modal (null means closed)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  
  // FAQ Accordion state
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  // 4 Consolidated Services with icons matching user's requested scope
  const services: Service[] = [
    {
      id: 'terima-paket',
      title: lang === 'ID' ? 'Terima Paket Online' : '代收网购包裹',
      shortDesc: lang === 'ID' ? 'Alamat transit aman belanja online Anda.' : '为您网购提供安全的转运地址。',
      tagline: lang === 'ID' ? 'Transit Belanja Aman' : '安全购物转运',
      longDesc: lang === 'ID'
        ? 'Gunakan alamat transit NK Express sebagai tujuan pengiriman belanja online Anda (Shopee, Tokopedia, TikTok Shop, dll). Kami akan menerima, mengamankan di gudang transit kami, dan mengantarkannya langsung ke tangan Anda.'
        : '使用 NK Express 转运地址作为您网购（Shopee, Tokopedia, TikTok Shop 等）的收货地址。我们将在转运仓库代收、妥善保管，并直接送达您手中。',
      icon: Package,
      benefits: lang === 'ID' ? [
        'Penyimpanan aman di gudang tertutup',
        'Notifikasi instan begitu barang mendarat',
        'Sangat membantu jika kurir utama e-commerce tidak menjangkau alamat Anda'
      ] : [
        '在封闭式仓库内安全保管',
        '货物到达后立即发送通知',
        '如果电商平台的主要快递无法送达您的地址，此服务非常有帮助'
      ],
      howItWorks: lang === 'ID' ? [
        'Belanja online di e-commerce pilihan Anda.',
        'Masukkan alamat Gudang Transit NK Express Ternate/Sofifi sebagai alamat tujuan.',
        'Kirimkan nomor resi belanja ke Admin WhatsApp kami agar langsung dipantau.'
      ] : [
        '在您首选的电商平台上进行网购。',
        '将 NK Express 特尔纳特/索菲菲转运仓库地址设为收货地址。',
        '将网购快递单号发送给我们的 WhatsApp 客服，以便实时监控。'
      ],
      priceEst: lang === 'ID' ? 'Mulai Rp 5.000 / paket' : '每件包裹 5,000 印尼盾起'
    },
    {
      id: 'patungan',
      title: lang === 'ID' ? 'Patungan Ongkir' : '拼单省运费',
      shortDesc: lang === 'ID' ? 'Kirim barang barengan, bayar patungan harian.' : '大家一起拼单寄货，分摊每日运费。',
      tagline: lang === 'ID' ? 'Hemat 60%, Kirim Barengan' : '省运费高达 60%，拼单一起寄',
      longDesc: lang === 'ID'
        ? 'Solusi kirim paket harian tanpa harus menyewa satu armada speedboat atau mobil penuh. Paket Anda digabungkan dengan paket pelanggan lain ke dalam pengiriman terjadwal harian sehingga biaya kirim menjadi super hemat.'
        : '每日寄送包裹的解决方案，无需单独租用整艘快艇或整辆货车。您的包裹将与其他客户的包裹合并，进行每日定时配送，让运费超级便宜。',
      icon: Users,
      benefits: lang === 'ID' ? [
        'Hemat ongkos kirim hingga 60% dibanding sewa armada mandiri',
        'Jadwal keberangkatan tetap dari Ternate ke Sofifi (PP)',
        'Ideal untuk pengiriman barang kecil, belanja harian, & UMKM'
      ] : [
        '与单独包车/包船相比，可节省高达 60% 的运费',
        '特尔纳特往返索菲菲的固定发车时间',
        '非常适合小件物品、日常采购和中小微企业（UMKM）发货'
      ],
      howItWorks: lang === 'ID' ? [
        'Bawa paket Anda ke counter terdekat atau request kurir pickup.',
        'Paket Anda kami kelompokkan dengan rute pengiriman harian sejenis.',
        'Pengiriman dilakukan bersama dan biaya dibagi rata otomatis.'
      ] : [
        '将您的包裹带到最近的网点或申请上门取件。',
        '我们将您的包裹按类似的每日配送路线进行分类。',
        '统一配送，运费自动均摊。'
      ],
      priceEst: lang === 'ID' ? 'Mulai Rp 30.000 / pengiriman' : '每次配送 30,000 印尼盾起'
    },
    {
      id: 'titip-beli-cod',
      title: lang === 'ID' ? 'Titip Beli & Layanan COD' : '代购与货到付款 (COD) 服务',
      shortDesc: lang === 'ID' ? 'Kami belikan barang atau bantu transaksi bayar di tempat.' : '我们帮您买货，或帮您在目的地收款。',
      tagline: lang === 'ID' ? 'Titip Beli & COD Praktis' : '实用的代购和货到付款服务',
      longDesc: lang === 'ID'
        ? 'Butuh membeli barang penting di Ternate atau Sofifi tetapi Anda tidak bisa menyeberang? Atau ingin berjualan online lokal dengan sistem bayar di tempat? Tim NK Express siap mencarikan, membeli, serta mengirimkan paket Anda sekaligus menangani penagihan COD terpercaya langsung ke pembeli.'
        : '需要在特尔纳特或索菲菲购买重要物品，但您无法亲自跨岛？或者想以货到付款的方式在本地销售商品？NK Express 团队随时准备为您寻找、购买并寄送包裹，同时直接向买家提供安全可靠的货到付款收款服务。',
      icon: ShoppingBag,
      benefits: lang === 'ID' ? [
        'Sangat menghemat waktu, tenaga, dan ongkos speedboat pribadi Anda',
        'Pencairan dana COD cepat, transparan, & langsung disalurkan harian',
        'Transparansi harga belanja sesuai struk asli dari toko tujuan'
      ] : [
        '极大节省您的时间、精力以及个人快艇费用',
        'COD 资金回款快速、透明，每日直接结算',
        '价格完全透明，购买价格严格按照目标商店的原版小票计算'
      ],
      howItWorks: lang === 'ID' ? [
        'Kirim daftar belanjaan atau detail transaksi COD Anda ke WhatsApp Admin.',
        'Kami carikan/beli barang belanjaan atau menjemput paket jualan Anda.',
        'Paket dikirimkan ke alamat tujuan dan penagihan COD diselesaikan di tempat.'
      ] : [
        '将您的购物清单或 COD 交易详情发送至客服 WhatsApp。',
        '我们为您寻找/购买物品，或上门收取您要售卖的包裹。',
        '包裹寄送至目的地，并在现场完成货到付款收款。'
      ],
      priceEst: lang === 'ID' ? 'Jasa Titip mulai Rp 20.000 / Fee COD 2%' : '代购费 20,000 印尼盾起 / 货到付款手续费 2%'
    },
    {
      id: 'pickup-retur',
      title: lang === 'ID' ? 'Pickup & Retur Paket' : '上门取件与退货服务',
      shortDesc: lang === 'ID' ? 'Kurir jemput paket ke rumah & bantu proses retur e-commerce.' : '快递员上门取件，并协助处理电商平台退货。',
      tagline: lang === 'ID' ? 'Jemput & Retur Paket Bebas Repot' : '轻松取件与无忧退货',
      longDesc: lang === 'ID'
        ? 'Tidak punya waktu untuk pergi ke counter, atau merasa kesulitan memproses pengembalian barang belanja online (retur)? Kurir sigap NK Express siap menjemput paket Anda langsung di rumah sekaligus membantu pengurusan berkas, pengemasan ulang, dan pengembalian barang retur ke counter utama.'
        : '没有时间去寄件网点，或者觉得处理网购退货（退回商家）太麻烦？NK Express 专业的快递员可以随时上门直接取件，同时帮您处理条码、重新包装，并将退货送回主要的合作网点。',
      icon: Truck,
      benefits: lang === 'ID' ? [
        'Hemat waktu & tenaga tanpa perlu keluar rumah atau ke counter pengiriman',
        'Bantuan pengurusan barcode, alamat retur, & standar kemasan yang aman',
        'Tanpa batas minimum jumlah barang untuk penjemputan langsung'
      ] : [
        '无需出门或前往寄件网点，省时又省力',
        '协助处理条形码、退货地址及安全的包装标准',
        '上门取件无最低件数限制'
      ],
      howItWorks: lang === 'ID' ? [
        'Hubungi Admin kami dan bagikan titik lokasi jemput atau berkas retur Anda.',
        'Kurir kami datang menjemput barang serta memverifikasi detail pengiriman.',
        'Paket ditimbang di tempat dan segera diproses kirim atau retur.'
      ] : [
        '联系我们的客服，分享取件地址或退货文件。',
        '我们的快递员上门取货，并核对配送详情。',
        '包裹当场称重，并立即办理寄送或退货。'
      ],
      priceEst: lang === 'ID' ? 'Pickup GRATIS / Retur mulai Rp 10.000' : '上门取件免费 / 退货 10,000 印尼盾起'
    }
  ];

  // FAQ list (collapsed by default)
  const faqs: FAQ[] = [
    {
      id: 1,
      question: lang === 'ID' ? 'Apakah bisa kirim barang dari Ternate ke Sofifi atau sebaliknya?' : '可以从特尔纳特寄送物品到索菲菲，或者反过来寄送吗？',
      answer: lang === 'ID' ? 'Ya, tentu saja! NK Express melayani pengiriman rute pulang-pergi (PP) dari Ternate ke Sofifi setiap hari menggunakan rute kapal harian tercepat kami.' : '当然可以！NK Express 每天使用我们最快的固定船只路线，提供特尔纳特至索菲菲的双向（往返）寄送服务。'
    },
    {
      id: 2,
      question: lang === 'ID' ? 'Berapa lama estimasi pengiriman paket sampai di lokasi?' : '包裹寄送预计需要多长时间送达？',
      answer: lang === 'ID' ? 'Kami mengutamakan pengiriman Sameday. Selama paket diserahkan ke counter kami sebelum jadwal keberangkatan kapal harian, paket Anda akan mendarat and siap diantarkan di hari yang sama.' : '我们优先提供当日达（Sameday）服务。只要包裹在每日班船出发前交到我们的网点，您的包裹就能在当天送达并准备派送。'
    },
    {
      id: 3,
      question: lang === 'ID' ? 'Bagaimana sistem pembayaran untuk Layanan COD NK Express?' : 'NK Express 货到付款（COD）服务如何结款？',
      answer: lang === 'ID' ? 'Kurir kami akan menagih total nominal harga barang beserta ongkos kirim ke penerima saat paket diserahkan. Setelah dana tunai terkumpul, tim kami akan mencairkannya langsung ke rekening penjual/toko mitra setiap sore hari.' : '我们的快递员会在派送包裹时，向收件人收取货物全额以及运费。收到现金后，我们的团队会在每天下午直接将货款汇入卖家/合作商家的账户。'
    },
    {
      id: 5,
      question: lang === 'ID' ? 'Berapa tarif dasar pengiriman paket di NK Express?' : 'NK Express 的基础寄送费用是多少？',
      answer: lang === 'ID' ? 'Tarif dasar patungan hemat mulai dari Rp 30.000 saja per pengantaran, menjadikannya pilihan paling ramah kantong untuk bisnis, personal, dan UMKM.' : '拼单省钱的基础费每次配送仅需 30,000 印尼盾起，是商家、个人以及中小微企业最省钱的选择。'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-500 flex flex-col font-sans relative antialiased">
      
      {/* 1. HEADER ATAS - Logo & Menu Quick Action */}
      <header className="bg-white border-b border-slate-100 py-3 px-4 sm:px-6 sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
          <NusaKirimLogo 
            className="cursor-pointer" 
            iconSize="w-9 h-9" 
            textSizeClass="text-[14px] sm:text-[15px]" 
            subTextSizeClass="text-[7px]" 
            pillSizeClass="text-[7px] px-1 py-0.5 rounded"
          />
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Buttons */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setLang('ID')}
                className={`text-[10px] font-black px-2 py-1 rounded-md transition-all ${
                  lang === 'ID' 
                    ? 'bg-white text-black shadow-3xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                id="lang-btn-id"
              >
                Indo
              </button>
              <button
                onClick={() => setLang('ZH')}
                className={`text-[10px] font-black px-2 py-1 rounded-md transition-all ${
                  lang === 'ZH' 
                    ? 'bg-[#B91C1C] text-white shadow-3xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                id="lang-btn-zh"
              >
                中文
              </button>
            </div>

            <motion.button
              onClick={() => setIsFaqModalOpen(true)}
              className="text-xs text-black hover:text-slate-700 font-bold flex items-center transition-colors px-1"
              id="header-faq-button"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{translations[lang].faqTitle}</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* 2. AREA KONTEN UTAMA */}
      <main className="flex-grow max-w-xl w-full mx-auto px-4 py-4 space-y-5">

        {/* Headline Hemat Ongkir Atas */}
        <div className="text-center bg-white rounded-2xl p-3 sm:p-4 border border-slate-150 shadow-sm space-y-2 relative overflow-hidden" id="top-promo-headline">
          {/* Subtle top red border accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#B91C1C]" />

          {/* Title Ternate - Sofifi */}
          <h1 className="text-base sm:text-lg font-sans font-black text-black tracking-tight leading-none uppercase">
            {translations[lang].titleMain} <span className="text-[#B91C1C]">{translations[lang].titleSub}</span>
          </h1>

          {/* Styled Problem & Solution container */}
          <div className="py-1.5 px-2.5 bg-slate-50 rounded-xl border border-slate-100 max-w-sm mx-auto space-y-1 shadow-3xs text-[11px] sm:text-xs">
            <div className="text-slate-700 font-semibold font-sans">
              {translations[lang].subTitleQuery}
            </div>
            <div className="text-xs sm:text-sm text-black font-extrabold leading-tight font-sans">
              {translations[lang].discountSlogan1} <span className="text-white bg-[#B91C1C] px-1.5 py-0.5 rounded-md font-black inline-block shadow-sm">{translations[lang].discountSlogan2}</span>
            </div>
          </div>

          {/* Service features with modern icons */}
          <div className="flex flex-wrap items-center justify-center gap-1 text-[10px] font-bold">
            <span className="bg-blue-50/80 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100 shadow-3xs flex items-center gap-1">
              <Truck className="w-3 h-3 text-blue-500" />
              {translations[lang].gratisAntar}
            </span>
            <span className="bg-blue-50/80 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100 shadow-3xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-500" />
              {translations[lang].bisaCod}
            </span>
          </div>

          {/* Action button */}
          <div className="pt-0.5 flex justify-center">
            <a 
              href="https://wa.me/628215046568?text=Halo%20NK%20Express,%20saya%20ingin%20konsultasi%20pengiriman"
              target="_blank" 
              rel="noreferrer"
              className="bg-[#B91C1C] text-white hover:bg-red-800 text-[11px] sm:text-xs font-black px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto justify-center"
              id="headline-wa-button"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.848.502 3.578 1.378 5.067L2 22l5.093-1.336c1.437.78 3.076 1.22 4.815 1.22 5.524 0 10.004-4.48 10.004-10.004C21.912 6.48 17.528 2 12.004 2zm5.834 14.28c-.244.685-1.218 1.25-1.724 1.312-.464.057-1.066.082-1.706-.122-.403-.13-1.025-.373-1.768-.698-3.153-1.383-5.187-4.576-5.344-4.787-.158-.212-1.275-1.693-1.275-3.23 0-1.536.804-2.294 1.092-2.597.288-.303.626-.378.835-.378.208 0 .416.002.6.012.197.01.464-.04.723.585.267.644.912 2.223.992 2.386.08.162.133.35.026.563-.107.213-.16.347-.32.532-.16.185-.335.414-.479.555-.16.155-.327.324-.14.646.186.32 1.042 1.708 2.234 2.772 1.144 1.02 2.103 1.336 2.398 1.482.295.145.467.122.643-.082.176-.204.75-.873.947-1.173.197-.3.395-.25.666-.15.27.1.1.72 1.723.82.912.08 1.472.073 1.745.337.27.264.135 1.15-.108 1.835z"/>
              </svg>
              <span>{translations[lang].hubungiKami}</span>
            </a>
          </div>
        </div>

        {/* 2a. BANNER BESAR PROMO / DISKON (SLIDER GAMBAR INTERAKTIF) */}
        <div className="bg-white rounded-2xl border border-slate-150 shadow-sm overflow-hidden" id="promo-banner-card">
          {/* Carousel Slider Wrapper */}
          <div className="relative aspect-[16/9] w-full bg-slate-950 group overflow-hidden">
            {promoBanners.length > 0 ? (
              (() => {
                const safeActiveBanner = activeBanner >= promoBanners.length ? 0 : activeBanner;
                const currentBanner = promoBanners[safeActiveBanner];
                return (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={safeActiveBanner}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full"
                      >
                        {/* Promo Image */}
                        <img
                          src={currentBanner.image}
                          alt={getBannerProp(currentBanner, 'title')}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Gradient Overlay for Text Legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
                        
                        {/* Text Content Overlay */}
                        <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
                          {/* Top Controls Overlay */}
                          <div className="flex justify-end items-start">
                            {/* Slide counter indicator */}
                            <span className="text-[8px] sm:text-[9px] font-bold text-white/80 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-xs">
                              {safeActiveBanner + 1} / {promoBanners.length}
                            </span>
                          </div>
                          
                          {/* Bottom Text */}
                          <div className="space-y-1.5 text-left">
                            <h2 className="text-sm sm:text-base font-black text-white tracking-tight leading-snug drop-shadow-sm flex flex-wrap items-center gap-1.5">
                              <span>{getBannerProp(currentBanner, 'title')}</span> 
                              {getBannerProp(currentBanner, 'highlight') && (
                                <span className="text-white text-[9px] sm:text-[10px] font-extrabold bg-[#B91C1C] px-1.5 py-0.5 rounded border border-red-500/35">
                                  {getBannerProp(currentBanner, 'highlight')}
                                </span>
                              )}
                            </h2>
                            {getBannerProp(currentBanner, 'desc') && (
                              <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed max-w-md font-medium">
                                {getBannerProp(currentBanner, 'desc')}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {promoBanners.length > 1 && (
                      <>
                        {/* Navigation Arrows */}
                        <button
                          onClick={() => setActiveBanner((prev) => (prev - 1 + promoBanners.length) % promoBanners.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-6.5 h-6.5 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all focus:outline-none backdrop-blur-xs group-hover:opacity-100 opacity-90 md:opacity-0 md:group-hover:opacity-100"
                          aria-label="Previous Promo"
                        >
                          <span className="text-xs sm:text-sm font-bold">❮</span>
                        </button>
                        <button
                          onClick={() => setActiveBanner((prev) => (prev + 1) % promoBanners.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-6.5 h-6.5 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all focus:outline-none backdrop-blur-xs group-hover:opacity-100 opacity-90 md:opacity-0 md:group-hover:opacity-100"
                          aria-label="Next Promo"
                        >
                          <span className="text-xs sm:text-sm font-bold">❯</span>
                        </button>

                        {/* Indicator Dots at Bottom */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {promoBanners.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveBanner(idx)}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                safeActiveBanner === idx ? 'w-4 bg-[#B91C1C]' : 'w-1.5 bg-white/40 hover:bg-white'
                              }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                );
              })()
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950 text-white">
                <Image className="w-10 h-10 text-slate-500 mb-2" />
                <p className="text-sm font-extrabold text-slate-300">Belum ada banner promo</p>
                <p className="text-xs text-slate-500 mt-1">Gunakan panel kelola di bawah untuk menambahkan banner baru.</p>
              </div>
            )}
          </div>

          {/* Core Trust Badges directly underneath the banner */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1.5 py-1">
              <Clock className="w-4 h-4 text-[#B91C1C] shrink-0" />
              <div className="text-left">
                <p className="text-[9px] font-extrabold text-slate-500 leading-none">{translations[lang].sameday}</p>
                <p className="text-[7.5px] text-slate-400 mt-0.5">{translations[lang].satuHariSampai}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1 border-x border-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#B91C1C] shrink-0" />
              <div className="text-left">
                <p className="text-[9px] font-extrabold text-slate-500 leading-none">{translations[lang].amanRapi}</p>
                <p className="text-[7.5px] text-slate-400 mt-0.5">{translations[lang].pelindungKhusus}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1">
              <MapPin className="w-4 h-4 text-[#B91C1C] shrink-0" />
              <div className="text-left">
                <p className="text-[9px] font-extrabold text-slate-500 leading-none">{translations[lang].antarPulau}</p>
                <p className="text-[7.5px] text-slate-400 mt-0.5">{translations[lang].ternateSofifiPP}</p>
              </div>
            </div>
          </div>
        </div>



        {/* 2b. KARTU LAYANAN BISNIS DI DALAM BORDER BOX (TAMPILAN MENU BULATAN MANDIRI) */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-150 shadow-sm space-y-3" id="business-services-section">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-xs font-black text-slate-700 uppercase tracking-wider">
              {translations[lang].layananLogistik}
            </h2>
            <span className="text-[8.5px] text-slate-400 font-extrabold bg-slate-50 px-1.5 py-0.5 rounded-md border border-slate-100">
              {translations[lang].klikLayanan}
            </span>
          </div>

          {/* Menu Row / Grid: Balanced 4 columns for mobile-banking style menus */}
          <div 
            className="grid grid-cols-4 gap-1.5 pt-1"
            id="grid-services-container"
          >
            {services.map((service) => {
              const IconComp = service.icon;
              const isSelected = selectedServiceId === service.id;
              
              let labelText = '';
              if (lang === 'ID') {
                if (service.id === 'terima-paket') labelText = 'Terima Paket';
                else if (service.id === 'patungan') labelText = 'Patungan';
                else if (service.id === 'titip-beli-cod') labelText = 'Titip & COD';
                else if (service.id === 'pickup-retur') labelText = 'Pickup & Retur';
              } else {
                if (service.id === 'terima-paket') labelText = '代收包裹';
                else if (service.id === 'patungan') labelText = '拼单省钱';
                else if (service.id === 'titip-beli-cod') labelText = '代购与COD';
                else if (service.id === 'pickup-retur') labelText = '取件退货';
              }

              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className="flex flex-col items-center text-center focus:outline-none group relative"
                  id={`service-card-${service.id}`}
                >
                  {/* Circle Icon Container */}
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 relative shrink-0 ${
                    isSelected 
                      ? 'bg-[#B91C1C] text-white shadow-md shadow-[#B91C1C]/20 ring-4 ring-[#B91C1C]/15 scale-[1.05]' 
                      : 'bg-red-50 text-[#B91C1C] hover:bg-red-100/70 border border-red-100/50 hover:scale-[1.03] active:scale-95'
                  }`}>
                    <IconComp className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                    
                    {/* Subtle pulse indicator for selected menu item */}
                    {isSelected && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white animate-pulse" />
                    )}
                  </div>

                  {/* Text Label Below the Circle */}
                  <span className={`text-[9px] sm:text-[9.5px] font-extrabold tracking-tight leading-tight mt-1.5 text-center transition-colors break-words max-w-[76px] line-clamp-2 min-h-[22px] sm:min-h-[24px] ${
                    isSelected ? 'text-[#B91C1C] font-black' : 'text-slate-600 group-hover:text-slate-800'
                  }`}>
                    {labelText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2c. DETAIL PENJELASAN SINGKAT YANG DIKLIK - DIUBAH MENJADI MODAL DI LAYAR */}
        <AnimatePresence>
          {selectedServiceId && (() => {
            const activeService = services.find(s => s.id === selectedServiceId);
            if (!activeService) return null;
            const ActiveIcon = activeService.icon;

            return (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" id="detail-modal-overlay">
                {/* Backdrop Blur overlay with standard motion animation */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedServiceId(null)}
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-100/80 relative overflow-hidden z-10 flex flex-col max-h-[85vh]"
                  id={`detail-modal-${activeService.id}`}
                >
                  {/* Top Header Background Color Accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B91C1C]" />

                  {/* Header */}
                  <div className="p-5 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 mt-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center shrink-0">
                        <ActiveIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] font-extrabold text-[#B91C1C] uppercase tracking-widest block">
                          {translations[lang].detailInfoLayanan}
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-500">
                          {activeService.title}
                        </h4>
                      </div>
                    </div>

                    {/* Close Button */}
                    <button 
                      onClick={() => setSelectedServiceId(null)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      aria-label={translations[lang].tutupDetail}
                      id="close-modal-btn"
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Scrollable Modal Content */}
                  <div className="p-5 space-y-4.5 overflow-y-auto max-h-[calc(85vh-140px)]">
                    {/* Main Long Description */}
                    <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                      {activeService.longDesc}
                    </p>

                    <div className="space-y-4">
                      {/* Benefits Section */}
                      <div className="space-y-1.5">
                        <h5 className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">
                          {translations[lang].kelebihan}
                        </h5>
                        <ul className="space-y-2">
                          {activeService.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-400 font-medium">
                              <span className="w-4.5 h-4.5 rounded-full bg-red-50 text-[#B91C1C] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3" />
                              </span>
                              <span className="leading-snug">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* How It Works Section */}
                      <div className="space-y-1.5 pt-1">
                        <h5 className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">
                          {translations[lang].caraKerja}
                        </h5>
                        <ol className="space-y-2">
                          {activeService.howItWorks.map((step, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-400 font-medium">
                              <span className="w-4.5 h-4.5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[9px] font-extrabold shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="leading-snug">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer with Estimasi & Button */}
                  <div className="p-4.5 border-t border-slate-100 bg-[#FAFBFD] flex flex-row items-center justify-between gap-3 shrink-0">
                    <div className="leading-tight text-left">
                      <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wide">{translations[lang].estimasiTarif}</p>
                      <p className="text-[11px] font-extrabold text-slate-500 mt-0.5">{activeService.priceEst}</p>
                    </div>
                    
                    <a
                      href={`https://wa.me/628215046568?text=Halo%20NK%20Express,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(activeService.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold bg-[#B91C1C] text-white hover:bg-red-800 py-2 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      id="modal-order-cta-button"
                    >
                      <span>{translations[lang].pesanJasa}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </AnimatePresence>

        {/* FAQ Modal */}
        <AnimatePresence>
          {isFaqModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" id="faq-modal-overlay">
              {/* Backdrop Blur overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFaqModalOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-100/80 relative overflow-hidden z-10 flex flex-col max-h-[85vh]"
                id="faq-modal"
              >
                {/* Top Header Background Color Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B91C1C]" />

                {/* Header */}
                <div className="p-5 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 mt-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold text-[#B91C1C] uppercase tracking-widest block">
                        {translations[lang].pertanyaanUmum}
                      </span>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-500">
                        {translations[lang].faqTitleNk}
                      </h4>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button 
                    onClick={() => setIsFaqModalOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    aria-label={translations[lang].tutupFaq}
                    id="close-faq-modal-btn"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Scrollable Modal Content (Accordions inside) */}
                <div className="p-5 space-y-3 overflow-y-auto max-h-[calc(85vh-120px)] bg-slate-50/50">
                  <div className="space-y-2.5">
                    {faqs.map((faq) => {
                      const isOpen = openFaqId === faq.id;
                      
                      return (
                        <div 
                          key={faq.id} 
                          className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
                            isOpen ? 'border-red-100 ring-1 ring-red-100/50 shadow-xs' : 'border-slate-150'
                          }`}
                        >
                          {/* Accordion Trigger Header */}
                          <button
                            onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                            className={`w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none transition-colors ${
                              isOpen ? 'bg-red-50/10' : 'hover:bg-slate-50/50'
                            }`}
                            id={`modal-faq-btn-${faq.id}`}
                          >
                            <span className={`text-xs font-bold pr-3 transition-colors ${isOpen ? 'text-slate-600' : 'text-slate-500'}`}>
                              {faq.question}
                            </span>
                            <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center transition-all shrink-0 ${
                              isOpen ? 'bg-[#B91C1C] text-white' : 'bg-slate-100 text-slate-400'
                            }`}>
                              {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                            </div>
                          </button>

                          {/* Accordion Panel Content */}
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="overflow-hidden bg-white"
                              >
                                <div className="px-4 pb-3 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-50 font-medium">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* FAQ Footer CTA */}
                <div className="p-4 border-t border-slate-100 bg-[#FAFBFD] flex items-center justify-between gap-3 shrink-0">
                  <span className="text-[10px] text-slate-400 font-semibold leading-tight">{translations[lang].punyaPertanyaan}</span>
                  <a
                    href="https://wa.me/628215046568?text=Halo%20NK%20Express,%20saya%20mau%20bertanya%20mengenai..."
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-extrabold bg-[#B91C1C] text-white hover:bg-red-800 py-1.5 px-3 rounded-lg transition-colors shadow-xs"
                  >
                    {translations[lang].tanyaAdmin}
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>



      </main>

      {/* 3. FOOTER / BAWAH */}
      <footer className="bg-white border-t border-slate-200 mt-8 py-8 px-4 sm:px-6 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4 pb-4 border-b border-slate-100">
          <div className="flex justify-center">
            <NusaKirimLogo 
              iconSize="w-8.5 h-8.5" 
              textSizeClass="text-[13px]" 
              subTextSizeClass="text-[6.5px]" 
              pillSizeClass="text-[6.5px] px-1.2 py-0.5 rounded"
            />
          </div>
          <p className="text-[11px] text-slate-400 max-w-sm">
            {translations[lang].footerDesc}
          </p>

        </div>

        <div className="max-w-xl mx-auto pt-4 flex flex-col items-center justify-center gap-2.5 text-[10px] text-slate-400">
          <p>&copy; {new Date().getFullYear()} {translations[lang].hakCipta}</p>
          <div className="flex gap-4">
            <span className="hover:text-[#B91C1C] cursor-pointer transition-colors">{translations[lang].syaratKetentuan}</span>
            <span className="hover:text-[#B91C1C] cursor-pointer transition-colors">{translations[lang].kebijakanPrivasi}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
