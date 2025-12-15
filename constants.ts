import { Artwork, LanguageCode, LanguageOption } from './types';

export const PRIMARY_LANGUAGES: LanguageOption[] = [
  { code: LanguageCode.ENGLISH, label: 'English', nativeLabel: 'English' },
  { code: LanguageCode.MANDARIN, label: 'Mandarin', nativeLabel: '普通话' },
  { code: LanguageCode.CANTONESE, label: 'Cantonese', nativeLabel: '廣東話' },
  { code: LanguageCode.PUNJABI, label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
];

export const OTHER_LANGUAGES: LanguageOption[] = [
  { code: LanguageCode.SPANISH, label: 'Spanish', nativeLabel: 'Español' },
  { code: LanguageCode.FRENCH, label: 'French', nativeLabel: 'Français' },
  { code: LanguageCode.ITALIAN, label: 'Italian', nativeLabel: 'Italiano' },
  { code: LanguageCode.GERMAN, label: 'German', nativeLabel: 'Deutsch' },
];

const INTRO_TEXT_ENGLISH = `Introduction to the Catholic Church

Next to the visitor reception area, you will find a church. We warmly welcome you to step inside and look around. To help you better understand what you see, we have prepared this brief guide.

Although there is a side entrance that visitors often use, we recommend that on your first visit you enter through the main doors (A).

The Catholic Church was founded by Jesus Christ two thousand years ago. However, its preparation reaches back four thousand years, to the time of Abraham. God said to Abraham: “Leave your country, your kindred, and your father’s house, and go to the land that I will show you.” Going even further back, the Church’s roots can be traced to the origins of humanity and the very beginning of creation. The word Catholic originally means “universal,” and the word Church means “assembly.” For this reason, you too are invited and welcomed into the Catholic Church.

Upon entering the church, you may walk down the central aisle and then turn either right or left (B).

The Symbolic Meaning of the Church

“My house shall be called a house of prayer.”

Through Christ, God comes to dwell among us, teaching not only by words but also by His actions and His life. He gave us the perfect example of obedience, so that we might truly become children of our Father. “I always do what pleases Him.” For this reason, Christ invites us to pray sincerely from the heart, just as Christians also pray for all who enter the church with faith, reverence, and awe before God.

“When you pray, go into your inner room, close the door, and pray to your Father who is in secret. And your Father who sees in secret will reward you.”

In fact, Jesus once said that His body is the true temple. Moreover, He desires to make us into His temple as well. As the Apostle Paul wrote: “Do you not know that you are God’s temple?”

Everything within the church building reflects these spiritual realities. The aisle (B) represents the human body; the sanctuary (C) symbolizes the soul; and the altar (D) represents the heart.

The aisle also signifies the path of holiness that purifies the human heart. The sanctuary at the altar symbolizes the beauty of heaven, which becomes clearer to us as we walk the path of God’s commandments. Finally, the altar at the center represents our union with God. When we advance in the path of the commandments—which can be summed up in the complete love of God and neighbor—we gaze upon Jesus on the Cross. At the same time, we also recognize our own irreverence, disobedience, inhumanity, and the sins that led Jesus to give His life for us. Yet the Lord Jesus stretches out His arms toward us—not to condemn, but to save, opening for us the gates of heaven.

During the Mass, the priest and ministers process solemnly up the central aisle toward the altar. The priest then reverently kisses the altar. This entrance rite symbolizes the life of Christ our High Priest—from His birth into the world to His sacrifice on the Cross.

“For God so loved the world that He gave His only Son, so that everyone who believes in Him may not perish but may have eternal life.”

For this reason, when Christians celebrate the Sacrament of Marriage in the church, the bride and groom walk together up the central aisle to the altar to receive the Church’s blessing. Marriage is created by God and symbolizes the holy wedding feast of heaven. Money, bodily pleasures, reputation, or even our own virtues cannot fully satisfy the human heart. Ultimately, we long for the love of God. And here is the Good News: God loves us and calls each one of us to Himself through Jesus Christ.

You may also notice that the interior of the church reflects the whole of visible creation. The brown tiles beneath your feet represent the earth, while the dome represents heaven. Traditionally, Catholic churches are oriented toward the east, for Christians turn to the rising sun—the holy sign of Christ—the true light that shines upon all nations.

The colors of the stained glass windows represent the four elements (air, fire, earth, water) and the four seasons (spring, summer, autumn, winter). The four corners at the center of the church are yellow, because Jesus, who is in our midst, is the Sun of Justice, the Light of the World, the true King who reigns over all. Just as Christ is the holy rising sun, so the Church is the holy assembly of the twelve-fold moon.

The shape of the church symbolizes the mysterious relationship between the Lord Christ and His bride, the Church. The structure of the cross represents Christ’s body and His love for us. The twelve sides of the cross symbolize the mystery of His holy Church and also the foundation He established—namely, the twelve Apostles.

Now, if you return to the entrance (A), we will guide you through the rest of the church.`;

export const UI_TRANSLATIONS: Record<string, any> = {
  [LanguageCode.ENGLISH]: {
    subtitle: "A Benedictine Monastery in Mission, BC",
    instructionsTitle: "Start the Audio Tour",
    introText: INTRO_TEXT_ENGLISH,
    instructions: "To begin, select your location in the church below, then tap 'Start Tour' to scan the artwork.",
    startBtn: "Start Tour",
    cameraLocationTitle: "Select Your Location",
    zones: {
      'All Locations': 'All Locations',
      'Entrance Area': 'Entrance Area',
      'Left Side (Pews)': 'Left Side (Pews)',
      'Right Side (Pews)': 'Right Side (Pews)',
      'Sanctuary / Altar': 'Sanctuary / Altar',
    }
  },
  [LanguageCode.MANDARIN]: {
    subtitle: "位于BC省米逊的本笃会修道院",
    instructionsTitle: "开始语音导览",
    introText: INTRO_TEXT_ENGLISH, // Fallback to English for long text
    instructions: "请在下方选择您在教堂中的位置，然后点击“开始参观”以扫描圣像。",
    startBtn: "开始参观",
    cameraLocationTitle: "选择您的位置",
    zones: {
      'All Locations': '所有位置',
      'Entrance Area': '入口区域',
      'Left Side (Pews)': '左侧 (长椅)',
      'Right Side (Pews)': '右侧 (长椅)',
      'Sanctuary / Altar': '圣所 / 祭坛',
    }
  },
  [LanguageCode.CANTONESE]: {
    subtitle: "位於BC省米遜的本篤會修道院",
    instructionsTitle: "開始語音導覽",
    introText: INTRO_TEXT_ENGLISH,
    instructions: "請在下方選擇您在教堂中的位置，然後點擊“開始參觀”以掃描聖像。",
    startBtn: "開始參觀",
    cameraLocationTitle: "選擇您的位置",
    zones: {
      'All Locations': '所有位置',
      'Entrance Area': '入口區域',
      'Left Side (Pews)': '左側 (長椅)',
      'Right Side (Pews)': '右側 (長椅)',
      'Sanctuary / Altar': '聖所 / 祭壇',
    }
  },
  [LanguageCode.PUNJABI]: {
    subtitle: "ਮਿਸ਼ਨ, ਬੀ.ਸੀ. ਵਿੱਚ ਇੱਕ ਬੈਨੇਡਿਕਟਾਈਨ ਮੱਠ",
    instructionsTitle: "ਆਡੀਓ ਟੂਰ ਸ਼ੁਰੂ ਕਰੋ",
    introText: INTRO_TEXT_ENGLISH,
    instructions: "ਸ਼ੁਰੂ ਕਰਨ ਲਈ, ਹੇਠਾਂ ਆਪਣਾ ਸਥਾਨ ਚੁਣੋ, ਫਿਰ 'ਟੂਰ ਸ਼ੁਰੂ ਕਰੋ' 'ਤੇ ਟੈਪ ਕਰੋ।",
    startBtn: "ਟੂਰ ਸ਼ੁਰੂ ਕਰੋ",
    cameraLocationTitle: "ਆਪਣਾ ਸਥਾਨ ਚੁਣੋ",
    zones: {
      'All Locations': 'ਸਾਰੇ ਸਥਾਨ',
      'Entrance Area': 'ਪ੍ਰਵੇਸ਼ ਖੇਤਰ',
      'Left Side (Pews)': 'ਖੱਬੇ ਪਾਸੇ',
      'Right Side (Pews)': 'ਸੱਜੇ ਪਾਸੇ',
      'Sanctuary / Altar': 'ਜਗਵੇਦੀ',
    }
  },
  [LanguageCode.SPANISH]: {
    subtitle: "Un Monasterio Benedictino en Mission, BC",
    instructionsTitle: "Iniciar el recorrido de audio",
    introText: INTRO_TEXT_ENGLISH,
    instructions: "Para comenzar, seleccione su ubicación a continuación, luego toque 'Iniciar Tour'.",
    startBtn: "Iniciar Tour",
    cameraLocationTitle: "Seleccione su ubicación",
    zones: {
      'All Locations': 'Todas las ubicaciones',
      'Entrance Area': 'Entrada',
      'Left Side (Pews)': 'Lado Izquierdo',
      'Right Side (Pews)': 'Lado Derecho',
      'Sanctuary / Altar': 'Santuario / Altar',
    }
  },
  [LanguageCode.FRENCH]: {
    subtitle: "Une abbaye bénédictine à Mission, C.-B.",
    instructionsTitle: "Commencer la visite audio",
    introText: INTRO_TEXT_ENGLISH,
    instructions: "Pour commencer, sélectionnez votre emplacement ci-dessous, puis appuyez sur 'Commencer'.",
    startBtn: "Commencer la visite",
    cameraLocationTitle: "Sélectionnez votre emplacement",
    zones: {
      'All Locations': 'Tous les lieux',
      'Entrance Area': 'Zone d\'entrée',
      'Left Side (Pews)': 'Côté Gauche',
      'Right Side (Pews)': 'Côté Droit',
      'Sanctuary / Altar': 'Sanctuaire / Autel',
    }
  },
  [LanguageCode.ITALIAN]: {
    subtitle: "Un monastero benedettino a Mission, BC",
    instructionsTitle: "Inizia il tour audio",
    introText: INTRO_TEXT_ENGLISH,
    instructions: "Per iniziare, seleziona la tua posizione qui sotto, poi tocca 'Inizia il tour'.",
    startBtn: "Inizia il tour",
    cameraLocationTitle: "Seleziona la tua posizione",
    zones: {
      'All Locations': 'Tutte le posizioni',
      'Entrance Area': 'Ingresso',
      'Left Side (Pews)': 'Lato Sinistro',
      'Right Side (Pews)': 'Lato Destro',
      'Sanctuary / Altar': 'Santuario / Altare',
    }
  },
  [LanguageCode.GERMAN]: {
    subtitle: "Ein Benediktinerkloster in Mission, BC",
    instructionsTitle: "Audiotour starten",
    introText: INTRO_TEXT_ENGLISH,
    instructions: "Wählen Sie unten Ihren Standort aus und tippen Sie dann auf 'Tour starten'.",
    startBtn: "Tour starten",
    cameraLocationTitle: "Wählen Sie Ihren Standort",
    zones: {
      'All Locations': 'Alle Standorte',
      'Entrance Area': 'Eingangsbereich',
      'Left Side (Pews)': 'Linke Seite',
      'Right Side (Pews)': 'Rechte Seite',
      'Sanctuary / Altar': 'Heiligtum / Altar',
    }
  }
};

// Mapped locations based on the church floor plan letters.
export const ARTWORKS: Artwork[] = [
  // --- ENTRANCE AREA (Letters E, F, G, H, I, J, K) ---
  {
    id: 'E',
    title: 'Saint Benedict',
    location: 'Entrance Area',
    description: 'To the left of the entrance is an image of our monastic father, Saint Benedict. His whole life was centered on loving obedience to God. He teaches us: “Incline the ear of your heart and listen.”'
  },
  {
    id: 'F',
    title: 'The Baptismal Font',
    location: 'Entrance Area',
    description: 'To the right of the entrance is a font of flowing water. It symbolizes that Baptism is the true sacrament of entrance into the Church. The water in the font has been blessed, helping us renew our holy spiritual purification. When the faithful enter the church, they often dip the fingers of their right hand into the holy water and make the Sign of the Cross on their forehead, chest, left shoulder, and right shoulder, silently calling on the name of God: the Father, the Son, and the Holy Spirit.'
  },
  {
    id: 'G',
    title: 'Saint Joseph',
    location: 'Entrance Area',
    description: 'In the southwest of the church stands a wooden statue of Saint Joseph. He is greatly venerated as the foster father of Jesus and the chaste spouse of the Virgin Mary. A carpenter by trade, he is known for silence, holiness, and humility, reflecting the image of God the Father. From the statue, moving further inside, you will find the confessional, where the Sacrament of Reconciliation is celebrated. In that holy place, the faithful can receive forgiveness and healing of sins through the sacrament established by Jesus.'
  },
  {
    id: 'H',
    title: 'The Annunciation',
    location: 'Entrance Area',
    description: 'The Archangel Gabriel, holding a lily, announces to the Virgin Mary the mystery of God becoming man through her. Catholics often pray to the Blessed Virgin with the words: “Hail Mary, full of grace, the Lord is with thee.” For these words mark the beginning of our salvation and the source of our joy.'
  },
  {
    id: 'I',
    title: 'Saint John the Baptist',
    location: 'Entrance Area',
    description: 'Saint John the Baptist, who prepared the way for Christ’s coming. He proclaimed the Savior and called everyone to a baptism of repentance. In the wilderness he cried out: “Prepare the way of the Lord!” When Jesus appeared, he declared: “Behold, the Lamb of God!”'
  },
  {
    id: 'J',
    title: 'The Patriarch Abraham',
    location: 'Entrance Area',
    description: 'The patriarch Abraham, who was ready to offer his only son Isaac in sacrifice to God. With complete trust in God’s wisdom and goodness, he became the father of many nations, and the ancestor of Jesus Christ—the only-begotten Son whom God the Father offered for the redemption of humanity.'
  },
  {
    id: 'K',
    title: 'Saint Michael the Archangel',
    location: 'Entrance Area',
    description: 'Saint Michael the Archangel, the courageous and faithful protector of God’s people. Satan once said: “I will not serve.” But Saint Michael the Archangel declared: “Who is like God?” Strong in power and obedient to God, he deeply loves humanity and defends us in our struggle against the devil.'
  },

  // --- LEFT SIDE (Letters L, M, DD, EE, Z, AA, BB, CC, Y) ---
  {
    id: 'L',
    title: 'Death of Saint Benedict',
    location: 'Left Side (Pews)',
    description: 'Saint Benedict, at the end of his life, supported by his disciples, peacefully returned to his heavenly home while standing in the church, hands raised toward heaven, praying and facing east. He teaches us that through humility we ascend to God, and through works of obedience we return to the One from whom we were separated by disobedience.'
  },
  {
    id: 'M',
    title: 'Saint Paul',
    location: 'Left Side (Pews)',
    description: 'Saint Paul, who preached to the Athenians. The Greeks were among the first non-Jews to receive the Good News. They revered all things beautiful and even built an altar “To the Unknown God.” Saint Paul revealed to them the one true God.'
  },
  {
    id: 'DD',
    title: 'St. Basil the Great',
    location: 'Left Side (Pews)',
    description: 'St. Basil the Great. This great Father of Monks taught many generations how to live in community while united in love with God.'
  },
  {
    id: 'EE',
    title: 'St. Frances of Rome',
    location: 'Left Side (Pews)',
    description: 'St. Frances of Rome. This courageous mother living in the world was a follower of St. Benedict.'
  },
  {
    id: 'Z',
    title: 'St. John Roberts',
    location: 'Left Side (Pews)',
    description: 'St. John Roberts, monk. He was later martyred for the faith and executed in England. He shows us that whether in times of peace or under persecution, happiness is found in God.'
  },
  {
    id: 'AA',
    title: 'St. Joseph with Child Jesus',
    location: 'Left Side (Pews)',
    description: 'St. Joseph with the Child Jesus. Even imperfect parents in this world reflect the love of the heavenly Father to their children. What an immense mystery, then, when the Son of God looked up with love to His earthly father! St. Joseph taught Jesus to work with human hands, even though through Him the whole universe was made.'
  },
  {
    id: 'Y',
    title: 'Saint Ethelbert and Saint Augustine',
    location: 'Left Side (Pews)',
    description: 'Saint Ethelbert and Saint Augustine of Canterbury, who together showed true harmony between civil government and the holy Church.'
  },
  {
    id: 'BB',
    title: 'Pope St. Pius X',
    location: 'Left Side (Pews)',
    description: 'Pope St. Pius X. He allowed children to receive Holy Communion earlier than before, because he understood that the minds of children are often able to grasp the truth of this great mystery.'
  },
  {
    id: 'CC',
    title: 'The Eucharist',
    location: 'Left Side (Pews)',
    description: 'The Eucharist. Jesus gave His Body as the greatest gift of love to His Church. Through Jesus’ own teaching and countless signs and miracles through the ages, the Church believes that the Eucharist is truly the Body, Blood, Soul, and Divinity of Jesus. He instituted this sacrament so that He might be with us, and in us, and so that we might be one in Him. In the Eucharist, Jesus Himself comes within us, uniting us with Him. That is why in every Catholic church you will see a tabernacle, usually placed in a special, sacred place prepared for adoration and prayer, sometimes even in the very center of the church. This holy place is reserved for worship and prayer. The tabernacle recalls the Holy of Holies in the Jewish Temple of Jerusalem, showing that Christ desires to dwell within us. A sanctuary lamp burns nearby, symbolizing the Church’s loving vigil before the presence of the Lord. You are invited to come here and pray quietly before Jesus’ presence.'
  },

  // --- RIGHT SIDE (Letters N, O, P, Q, R, S, T, U, V) ---
  {
    id: 'N',
    title: 'Saint Peter',
    location: 'Right Side (Pews)',
    description: 'Saint Peter, the first pope. Once a fisherman, Christ made him the “fisher of men.” His name means “rock.” Jesus said to him: “You are Peter, and on this rock I will build my Church.” In weakness he denied the Lord, but later, through repentance, penance, and love, he gave his life for Jesus.'
  },
  {
    id: 'O',
    title: 'Pope Saint Gregory the Great',
    location: 'Right Side (Pews)',
    description: 'Pope Saint Gregory the Great, who called himself “the servant of the servants of Christ.” This great pope longed to free slaves, sent missionaries to England, and wrote The Life of Saint Benedict.'
  },
  {
    id: 'P',
    title: 'Saint Thomas More',
    location: 'Right Side (Pews)',
    description: 'Saint Thomas More, Lord Chancellor of England under Henry VIII, who chose death rather than betray justice and truth. He declared: “I die the King’s good servant, but God’s first.”'
  },
  {
    id: 'Q',
    title: 'Saint John Brebeuf',
    location: 'Right Side (Pews)',
    description: 'Saint John Brebeuf, who journeyed as a missionary to North America to bring the Gospel to the Indigenous peoples, serving them and courageously giving his life for them as a witness to Christ.'
  },
  {
    id: 'R',
    title: 'Virgin Mary and Child',
    location: 'Right Side (Pews)',
    description: 'Hail to the Virgin Mary holding the Child Jesus. As Scripture says, God chose to become man through a Virgin most humble and pure. Adam and Eve were the first parents of the human race, while Jesus and Mary are the parents of the new humanity, showing the most beautiful image of woman/mother and child. Mary is the New Eve, the most faithful follower and beloved of Jesus. She is the glory of the Church and our Mother.'
  },
  {
    id: 'S',
    title: 'Saint Scholastica',
    location: 'Right Side (Pews)',
    description: 'Saint Scholastica, the dear sister of Saint Benedict. They shared not only a deep family bond but also a spiritual companionship. They often spoke together of the kingdom of heaven. Saint Benedict saw her pure soul ascend to heaven like a dove.'
  },
  {
    id: 'T',
    title: 'Saint Gertrude the Great',
    location: 'Right Side (Pews)',
    description: 'Saint Gertrude the Great. Through her, God revealed to us His burning divine love for each person, just as He gave everything to His Church.'
  },
  {
    id: 'U',
    title: 'Saint Martin of Tours',
    location: 'Right Side (Pews)',
    description: 'Saint Martin of Tours. Once a soldier, he later became a soldier of Christ. Even before baptism, he cut his cloak in two and gave half to a poor man to wear—who was Christ in disguise.'
  },
  {
    id: 'V',
    title: 'Saint Anselm and Saint Dunstan',
    location: 'Right Side (Pews)',
    description: 'Saint Anselm and Saint Dunstan. Saint Anselm teaches us that faith, through loyalty and love, leads to understanding—a teaching that remains very important for us today. Saint Dunstan was a great artist.'
  },

  // --- SANCTUARY (Letters W, X) ---
  {
    id: 'W',
    title: 'The Burial of Jesus',
    location: 'Sanctuary / Altar',
    description: 'The Burial of Jesus. This scene shows the Lord’s body taken down from the cross, laid in the arms of His sorrowful mother, wrapped in a burial shroud, and placed in the tomb.'
  },
  {
    id: 'X',
    title: 'The Resurrection of Jesus',
    location: 'Sanctuary / Altar',
    description: 'The Resurrection of Jesus. The King of eternal life broke the chains of death, while the guards at the tomb fell as though dead. Christ truly rose from the dead and triumphed over death. He descended to the abode of the just (the place of the righteous dead), granting them new life.'
  }
];
