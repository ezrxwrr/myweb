import type { Language } from './translations'

export interface BilingualText {
  ID: string
  EN: string
}

export interface GalleryImage {
  src: string
  alt: BilingualText
  type?: 'image' | 'pdf'
}

export interface PortfolioItem {
  id: string
  title: BilingualText
  roleOrCategory: BilingualText
  description: BilingualText
  credit?: BilingualText
  imageSrc: string
  mediaType?: GalleryImage['type']
  galleryImages?: GalleryImage[]
  externalUrl?: string
  year: string
}

export interface ProjectItem extends PortfolioItem {
  repository: string
  tags: string[]
}

export type EraKind = 'university' | 'highschool'
export type EraCategory = 'work' | 'awards'

export function localized(text: BilingualText, language: Language): string {
  return text[language]
}

const github = 'https://github.com/ezrxwrr'

export const featuredProjects: ProjectItem[] = [
  {
    id: 'trajectory-planning',
    title: { ID: 'Prediksi Trajektori & Pathfinding', EN: 'Trajectory Prediction & Pathfinding' },
    roleOrCategory: { ID: 'RISET · PERENCANAAN LINTASAN', EN: 'RESEARCH · PATH PLANNING' },
    description: {
      ID: 'Mengeksplorasi perencanaan lintasan dengan A* dan prediksi pergerakan rintangan berbasis Bi-LSTM untuk membantu menghasilkan jalur yang lebih adaptif.',
      EN: 'Explores trajectory planning with A* and Bi-LSTM-based obstacle motion prediction to help produce more adaptive paths.',
    },
    imageSrc: '/image/projects/trajectory.svg',
    galleryImages: [{ src: '/image/projects/trajectory.svg', alt: { ID: 'Visualisasi proyek prediksi trajektori', EN: 'Trajectory prediction project visual' } }],
    externalUrl: `${github}/Bi-LSTMxA_Star_For_Pathfinding`,
    repository: 'Bi-LSTMxA_Star_For_Pathfinding',
    year: '2026',
    tags: ['Python', 'A*', 'Bi-LSTM', 'Pathfinding'],
  },
  {
    id: 'plate-recognition',
    title: { ID: 'Pengenalan Plat Nomor Indonesia', EN: 'Indonesian License Plate Recognition' },
    roleOrCategory: { ID: 'COMPUTER VISION · OCR', EN: 'COMPUTER VISION · OCR' },
    description: {
      ID: 'Pipeline deteksi plat kendaraan Indonesia yang menggabungkan YOLOv8 untuk menemukan area plat dan EasyOCR untuk membaca karakter.',
      EN: 'An Indonesian vehicle plate detection pipeline combining YOLOv8 to locate plates and EasyOCR to read their characters.',
    },
    imageSrc: '/image/projects/plate-recognition.svg',
    galleryImages: [{ src: '/image/projects/plate-recognition.svg', alt: { ID: 'Placeholder hasil deteksi plat nomor', EN: 'License plate detection preview placeholder' } }],
    externalUrl: `${github}?tab=repositories`,
    repository: 'GitHub profile · repository link to be confirmed',
    year: '2026',
    tags: ['Python', 'YOLOv8', 'EasyOCR', 'OpenCV'],
  },
  {
    id: 'cofweb',
    title: { ID: 'CofWeb — Reservasi & Pre-order', EN: 'CofWeb — Reservations & Pre-orders' },
    roleOrCategory: { ID: 'WEB APP · COFFEESHOP', EN: 'WEB APP · COFFEESHOP' },
    description: {
      ID: 'Website coffeeshop untuk menyatukan alur reservasi meja dan pre-order menu dalam satu pengalaman digital.',
      EN: 'A coffeeshop website bringing table reservations and menu pre-orders together in one digital experience.',
    },
    imageSrc: '/image/projects/cofweb.png',
    galleryImages: [{ src: '/image/projects/cofweb.png', alt: { ID: 'Screenshot antarmuka CofWeb', EN: 'CofWeb interface screenshot' } }],
    externalUrl: `${github}/CofWeb`,
    repository: 'CofWeb',
    year: '2026',
    tags: ['Laravel', 'PHP', 'REST API', 'Web'],
  },
]

export const portfolioItems: Record<EraKind, Record<EraCategory, PortfolioItem[]>> = {
  university: {
    work: [
      {
        id: 'interface-trailer',
        title: { ID: 'Trailer INTERFACE', EN: 'INTERFACE Trailer' },
        roleOrCategory: { ID: 'HIMA ILMU KOMPUTER · TRAILER', EN: 'COMPUTER SCIENCE STUDENT ASSOCIATION · TRAILER' },
        credit: { ID: 'Lead Editor, Color Grader & Co-Cameraman', EN: 'Lead Editor, Color Grader & Co-Cameraman' },
        description: {
          ID: 'Lead Editor, Color Grader & Co-Cameraman. Pratinjau ini disiapkan untuk screenshot hasil akhir dan proses editing di DaVinci Resolve.',
          EN: 'Lead Editor, Color Grader & Co-Cameraman. This preview slot is ready for the final cut and DaVinci Resolve editing screenshots.',
        },
        imageSrc: '/image/kuliah/foto/interface-trailer.png',
        galleryImages: [
          { src: '/image/kuliah/foto/interface-trailer.png', alt: { ID: 'Screenshot teaser INTERFACE 2025', EN: 'INTERFACE 2025 teaser screenshot' } },
          { src: '/image/kuliah/foto/davinci-trailer.svg', alt: { ID: 'Placeholder timeline DaVinci Resolve trailer', EN: 'DaVinci Resolve trailer timeline placeholder' } },
        ],
        externalUrl: 'https://www.instagram.com/p/DOQmY0Livwo/?hl=en',
        year: '2025',
      },
      {
        id: 'interface-aftermovie',
        title: { ID: 'After-Movie INTERFACE', EN: 'INTERFACE After-Movie' },
        roleOrCategory: { ID: 'HIMA ILMU KOMPUTER · AFTER-MOVIE', EN: 'COMPUTER SCIENCE STUDENT ASSOCIATION · AFTER-MOVIE' },
        credit: { ID: 'Sole Video Editor', EN: 'Sole Video Editor' },
        description: {
          ID: 'Sole Video Editor. Slot preview untuk film rangkuman kegiatan, lengkap dengan ruang dokumentasi timeline DaVinci Resolve.',
          EN: 'Sole Video Editor. A preview slot for the event recap film, with room for DaVinci Resolve timeline documentation.',
        },
        imageSrc: '/image/kuliah/foto/interface-aftermovie.png',
        galleryImages: [
          { src: '/image/kuliah/foto/interface-aftermovie.png', alt: { ID: 'Screenshot after-movie INTERFACE 2025', EN: 'INTERFACE 2025 after-movie screenshot' } },
          { src: '/image/kuliah/foto/davinci-aftermovie.svg', alt: { ID: 'Placeholder timeline DaVinci Resolve after-movie', EN: 'DaVinci Resolve after-movie timeline placeholder' } },
        ],
        externalUrl: 'https://www.instagram.com/p/DQjQOsHipA5/?hl=en',
        year: '2025',
      },
      {
        id: 'university-documentation',
        title: { ID: 'Dokumentasi Proyek', EN: 'Project Documentation' },
        roleOrCategory: { ID: 'KARYA · ILMU KOMPUTER', EN: 'WORK · COMPUTER SCIENCE' },
        description: {
          ID: 'Ruang siap isi untuk dokumentasi proses, hasil proyek, dan eksperimen selama kuliah.',
          EN: 'A ready-to-fill space for process notes, project outcomes, and experiments from university.',
        },
        imageSrc: '/image/kuliah/foto/university-work.svg',
        galleryImages: [{ src: '/image/kuliah/foto/university-work.svg', alt: { ID: 'Placeholder dokumentasi karya kuliah', EN: 'University work documentation placeholder' } }],
        year: '2025–26',
      },
    ],
    awards: [
      {
        id: 'university-obesity-project',
        title: { ID: 'Website Prediksi Obesitas', EN: 'Obesity Prediction Website' },
        roleOrCategory: { ID: 'PEMBERDAYAAN KESEJAHTERAAN KELUARGA', EN: 'FAMILY WELFARE EMPOWERMENT' },
        description: {
          ID: 'Sertifikat proyek web prediksi obesitas untuk kegiatan Pemberdayaan Kesejahteraan Keluarga.',
          EN: 'Certificate for an obesity-prediction web project created for a family welfare empowerment initiative.',
        },
        imageSrc: '/image/kuliah/sertif/obesity-prediction-project-2025.pdf',
        mediaType: 'pdf',
        galleryImages: [{ src: '/image/kuliah/sertif/obesity-prediction-project-2025.pdf', type: 'pdf', alt: { ID: 'Sertifikat proyek prediksi obesitas, 2025', EN: 'Obesity prediction project certificate, 2025' } }],
        year: '2025',
      },
      {
        id: 'university-hima-certificate',
        title: { ID: 'Sertifikat HIMA Ilkom UNNES', EN: 'UNNES Computer Science Association Certificate' },
        roleOrCategory: { ID: 'ORGANISASI · ILMU KOMPUTER', EN: 'ORGANIZATION · COMPUTER SCIENCE' },
        description: {
          ID: 'Sertifikat keterlibatan dalam Himpunan Mahasiswa Ilmu Komputer UNNES.',
          EN: 'Certificate recognizing involvement with the UNNES Computer Science Student Association.',
        },
        imageSrc: '/image/kuliah/sertif/hima-ilkom-certificate-2025.pdf',
        mediaType: 'pdf',
        galleryImages: [{ src: '/image/kuliah/sertif/hima-ilkom-certificate-2025.pdf', type: 'pdf', alt: { ID: 'Sertifikat HIMA Ilkom UNNES, 2025', EN: 'UNNES Computer Science Association certificate, 2025' } }],
        year: '2025',
      },
      {
        id: 'university-samsung-sic7',
        title: { ID: 'Samsung Innovation Campus SIC7', EN: 'Samsung Innovation Campus SIC7' },
        roleOrCategory: { ID: 'PELATIHAN · TEKNOLOGI', EN: 'TRAINING · TECHNOLOGY' },
        description: {
          ID: 'Dokumen sertifikat Samsung Innovation Campus angkatan SIC7.',
          EN: 'Samsung Innovation Campus SIC7 program certificate.',
        },
        imageSrc: '/image/kuliah/sertif/samsung-sic7-2025.pdf',
        mediaType: 'pdf',
        galleryImages: [{ src: '/image/kuliah/sertif/samsung-sic7-2025.pdf', type: 'pdf', alt: { ID: 'Sertifikat Samsung Innovation Campus SIC7, 2025', EN: 'Samsung Innovation Campus SIC7 certificate, 2025' } }],
        year: '2025',
      },
      {
        id: 'university-workshop',
        title: { ID: 'Sertifikat Workshop', EN: 'Workshop Certificate' },
        roleOrCategory: { ID: 'WORKSHOP · KULIAH', EN: 'WORKSHOP · UNIVERSITY' },
        description: {
          ID: 'Sertifikat partisipasi workshop tahun 2026.',
          EN: 'Certificate of participation in a workshop in 2026.',
        },
        imageSrc: '/image/kuliah/sertif/workshop-certificate-2026.pdf',
        mediaType: 'pdf',
        galleryImages: [{ src: '/image/kuliah/sertif/workshop-certificate-2026.pdf', type: 'pdf', alt: { ID: 'Sertifikat workshop, 2026', EN: 'Workshop certificate, 2026' } }],
        year: '2026',
      },
    ],
  },
  highschool: {
    work: [
      {
        id: 'highschool-athena-winner-photo',
        title: { ID: 'Juara ATHENA Basketball', EN: 'ATHENA Basketball Winner' },
        roleOrCategory: { ID: 'BASKET · ATHENA 2024', EN: 'BASKETBALL · ATHENA 2024' },
        description: {
          ID: 'Dokumentasi kemenangan juara pertama turnamen basket ATHENA 2024.',
          EN: 'A photo documenting the first-place win at the 2024 ATHENA basketball tournament.',
        },
        imageSrc: '/image/sma/foto/athena-basket-winner-2024.jpg',
        galleryImages: [{ src: '/image/sma/foto/athena-basket-winner-2024.jpg', alt: { ID: 'Foto juara ATHENA Basketball 2024', EN: 'ATHENA Basketball winner photo, 2024' } }],
        year: '2024',
      },
      {
        id: 'highschool-athena-team-photo',
        title: { ID: 'Tim Basket ATHENA', EN: 'ATHENA Basketball Team' },
        roleOrCategory: { ID: 'FOTO TIM · BASKET', EN: 'TEAM PHOTO · BASKETBALL' },
        description: {
          ID: 'Foto bersama tim dan pendamping setelah kegiatan basket ATHENA.',
          EN: 'A team and staff photo after the ATHENA basketball event.',
        },
        imageSrc: '/image/sma/foto/athena-basket-team-2024.jpg',
        galleryImages: [{ src: '/image/sma/foto/athena-basket-team-2024.jpg', alt: { ID: 'Foto tim basket ATHENA 2024', EN: 'ATHENA basketball team photo, 2024' } }],
        year: '2024',
      },
    ],
    awards: [
      {
        id: 'highschool-athena-award',
        title: { ID: 'Juara 1 Basket ATHENA', EN: 'ATHENA Basketball — 1st Place' },
        roleOrCategory: { ID: 'PENGHARGAAN · BASKET', EN: 'AWARD · BASKETBALL' },
        description: {
          ID: 'Sertifikat juara pertama Basketball Tournament ATHENA, 11 Mei 2024.',
          EN: 'First-place certificate from the ATHENA Basketball Tournament, May 11, 2024.',
        },
        imageSrc: '/image/sma/sertif/athena-basket-first-place-2024.png',
        galleryImages: [{ src: '/image/sma/sertif/athena-basket-first-place-2024.png', alt: { ID: 'Sertifikat juara pertama ATHENA Basketball 2024', EN: 'ATHENA Basketball first-place certificate, 2024' } }],
        year: '2024',
      },
      {
        id: 'highschool-fuso-biology',
        title: { ID: 'Olimpiade Biologi FUSO', EN: 'FUSO Biology Olympiad' },
        roleOrCategory: { ID: 'PENGHARGAAN · BIOLOGI', EN: 'AWARD · BIOLOGY' },
        description: {
          ID: 'Piagam peraih medali perunggu pada Future Scientist Olympiad (FUSO) 2023 bidang Biologi.',
          EN: 'Bronze medal certificate in Biology at the 2023 Future Scientist Olympiad (FUSO).',
        },
        imageSrc: '/image/sma/sertif/fuso-biology-bronze-2023.png',
        galleryImages: [{ src: '/image/sma/sertif/fuso-biology-bronze-2023.png', alt: { ID: 'Piagam medali perunggu FUSO Biologi 2023', EN: 'FUSO Biology bronze medal certificate, 2023' } }],
        year: '2023',
      },
      {
        id: 'highschool-indiefest',
        title: { ID: 'Film Pelajar INDIEFEST', EN: 'INDIEFEST Student Film' },
        roleOrCategory: { ID: 'SERTIFIKAT · FILM', EN: 'CERTIFICATE · FILM' },
        description: {
          ID: 'Sertifikat partisipasi festival film pelajar INDIEFEST 2023 untuk film “Kotak Ajaib”.',
          EN: 'Certificate of participation in the 2023 INDIEFEST student film festival for “Kotak Ajaib”.',
        },
        imageSrc: '/image/sma/sertif/indiefest-film-2023.png',
        galleryImages: [{ src: '/image/sma/sertif/indiefest-film-2023.png', alt: { ID: 'Sertifikat INDIEFEST untuk film Kotak Ajaib, 2023', EN: 'INDIEFEST certificate for Kotak Ajaib, 2023' } }],
        year: '2023',
      },
      {
        id: 'highschool-it-preneur',
        title: { ID: 'Program IT Preneur', EN: 'IT Preneur Program' },
        roleOrCategory: { ID: 'SERTIFIKAT · TEKNOLOGI', EN: 'CERTIFICATE · TECHNOLOGY' },
        description: {
          ID: 'Sertifikat hasil sangat baik dalam Pendidikan IT Preneur tahun ajaran 2023–2024.',
          EN: 'Certificate for a very good result in the 2023–2024 IT Preneur education program.',
        },
        imageSrc: '/image/sma/sertif/it-preneur-2024.png',
        galleryImages: [{ src: '/image/sma/sertif/it-preneur-2024.png', alt: { ID: 'Sertifikat IT Preneur 2023–2024', EN: 'IT Preneur certificate, 2023–2024' } }],
        year: '2024',
      },
      {
        id: 'highschool-magnificient-basket',
        title: { ID: 'Juara 2 Magnificent Festival', EN: 'Magnificent Festival — 2nd Place' },
        roleOrCategory: { ID: 'PENGHARGAAN · BASKET', EN: 'AWARD · BASKETBALL' },
        description: {
          ID: 'Sertifikat juara kedua kompetisi basket SMA dalam Magnificent Festival 2024.',
          EN: 'Second-place certificate in the senior high school basketball competition at Magnificent Festival 2024.',
        },
        imageSrc: '/image/sma/sertif/magnificient-basket-second-place-2024.png',
        galleryImages: [{ src: '/image/sma/sertif/magnificient-basket-second-place-2024.png', alt: { ID: 'Sertifikat juara kedua Magnificent Festival Basketball 2024', EN: 'Magnificent Festival basketball second-place certificate, 2024' } }],
        year: '2024',
      },
    ],
  },
}
