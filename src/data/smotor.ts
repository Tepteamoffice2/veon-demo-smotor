// Facts for the homepage. Source: veon/client.json (ids in comments). Nothing here is invented:
// a service without a published price has price: null and shows «ціну назве майстер».

export interface Station {
  id: "kyiv" | "vyshneve";
  city: string;
  cityIn: string;
  street: string;
  address: string;
  phone: string;       // E.164
  phoneText: string;   // as written on the page
  viber: string;
  route: string;
  schemaName: string;
}

const mapsQuery = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// B-F004 addresses; company.contacts.phones / B-F006 phones; B-F009 Viber
export const stations: Station[] = [
  {
    id: "kyiv",
    city: "Київ",
    cityIn: "у Києві",
    street: "Сирецька, 33 Х",
    address: "м. Київ, вул. Сирецька, 33 Х",
    phone: "+380975030505",
    phoneText: "097 503 05 05",
    viber: "viber://chat?number=%2B380975030505",
    route: mapsQuery("Київ, вулиця Сирецька, 33Х"),
    schemaName: "SMOTOR, СТО на Сирецькій",
  },
  {
    id: "vyshneve",
    city: "Вишневе",
    cityIn: "у Вишневому",
    street: "Київська, 2",
    address: "м. Вишневе, вул. Київська, 2",
    phone: "+380675030545",
    phoneText: "067 503 05 45",
    viber: "viber://chat?number=%2B380675030545",
    route: mapsQuery("Вишневе, вулиця Київська, 2"),
    schemaName: "SMOTOR, СТО у Вишневому",
  },
];

export const telegram = "https://t.me/smotor_sto";           // B-F009
export const email = "sto@smotor.ua";                         // W-F001
export const qualityEmail = "skkr@smotor.ua";                 // W-F001
export const hours = { weekdays: "Пн–Пт 9:00–20:00", saturday: "Сб 9:00–18:00", sunday: "Нд вихідний" }; // W-F002, B-F011

// socials[].status = confirmed only (Facebook is probable: not shown)
export const socials = [
  { name: "Instagram", url: "https://www.instagram.com/smotor_/" },
  { name: "TikTok", url: "https://www.tiktok.com/@sto_smotor" },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCwXftlrMKhynxrp1U_EFn8A" },
];

export const marques = ["Kia", "Hyundai", "SsangYong", "Toyota", "Lexus"]; // B-F002, B-F003

export interface Service { name: string; price: number | null; }
export interface ServiceGroup { id: string; title: string; note?: string; items: Service[]; }

// B-F013 services, B-F020 prices «від» (smotor.com.ua)
export const serviceGroups: ServiceGroup[] = [
  {
    id: "to",
    title: "ТО",
    items: [
      { name: "ТО та заміна мастила", price: 720 },
      { name: "Заміна охолоджуючої рідини", price: 750 },
      { name: "Обслуговування кондиціонера", price: 720 },
      { name: "Заміна мастила КПП/АКПП", price: null },
      { name: "Заміна свічок запалювання", price: null },
    ],
  },
  {
    id: "diagnostyka",
    title: "Діагностика",
    note: "Не знаєте, що саме зламалося? Опишіть симптом у Viber або Telegram, підкажемо, яка діагностика потрібна.",
    items: [
      { name: "Комп'ютерна діагностика", price: 500 },
      { name: "Діагностика ходової", price: 800 },
      { name: "Передпродажна діагностика", price: 1400 },
      { name: "Ендоскопія двигуна", price: null },
    ],
  },
  {
    id: "remont",
    title: "Ремонт",
    items: [
      { name: "Заміна амортизаторів", price: 780 },
      { name: "Розвал-сходження", price: 980 },
      { name: "Гальмівні колодки та диски", price: 1200 },
      { name: "Заміна ременя ГРМ", price: 2800 },
      { name: "Заміна зчеплення", price: 4500 },
      { name: "Ремонт двигуна", price: 15000 },
      { name: "Прошивка електрообладнання", price: null },
    ],
  },
];

/** 15000 → «15 000» with a narrow no-break space, as Ukrainian typography writes it. */
export const money = (n: number) => n.toLocaleString("uk-UA").replace(/\s/g, " ");
