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

// Mapped locations based on your text. 
// Note: You can refine these locations if you know the exact layout.
export const ARTWORKS: Artwork[] = [
  {
    id: 'E',
    title: 'Saint Benedict',
    location: 'Entrance',
    description: 'To the left of the entrance is an image of our monastic father, Saint Benedict. His whole life was centered on loving obedience to God. He teaches us: “Incline the ear of your heart and listen.”'
  },
  {
    id: 'F',
    title: 'The Baptismal Font',
    location: 'Entrance',
    description: 'To the right of the entrance is a font of flowing water. It symbolizes that Baptism is the true sacrament of entrance into the Church. The water in the font has been blessed, helping us renew our holy spiritual purification. When the faithful enter the church, they often dip the fingers of their right hand into the holy water and make the Sign of the Cross on their forehead, chest, left shoulder, and right shoulder, silently calling on the name of God: the Father, the Son, and the Holy Spirit.'
  },
  {
    id: 'G',
    title: 'Saint Joseph',
    location: 'Nave (Main Church)',
    description: 'In the southwest of the church stands a wooden statue of Saint Joseph. He is greatly venerated as the foster father of Jesus and the chaste spouse of the Virgin Mary. A carpenter by trade, he is known for silence, holiness, and humility, reflecting the image of God the Father. From the statue, moving further inside, you will find the confessional, where the Sacrament of Reconciliation is celebrated. In that holy place, the faithful can receive forgiveness and healing of sins through the sacrament established by Jesus.'
  },
  {
    id: 'H',
    title: 'The Annunciation',
    location: 'Nave (Main Church)',
    description: 'The Archangel Gabriel, holding a lily, announces to the Virgin Mary the mystery of God becoming man through her. Catholics often pray to the Blessed Virgin with the words: “Hail Mary, full of grace, the Lord is with thee.” For these words mark the beginning of our salvation and the source of our joy.'
  },
  {
    id: 'I',
    title: 'Saint John the Baptist',
    location: 'Nave (Main Church)',
    description: 'Saint John the Baptist, who prepared the way for Christ’s coming. He proclaimed the Savior and called everyone to a baptism of repentance. In the wilderness he cried out: “Prepare the way of the Lord!” When Jesus appeared, he declared: “Behold, the Lamb of God!”'
  },
  {
    id: 'J',
    title: 'The Patriarch Abraham',
    location: 'Nave (Main Church)',
    description: 'The patriarch Abraham, who was ready to offer his only son Isaac in sacrifice to God. With complete trust in God’s wisdom and goodness, he became the father of many nations, and the ancestor of Jesus Christ—the only-begotten Son whom God the Father offered for the redemption of humanity.'
  },
  {
    id: 'K',
    title: 'Saint Michael the Archangel',
    location: 'Nave (Main Church)',
    description: 'Saint Michael the Archangel, the courageous and faithful protector of God’s people. Satan once said: “I will not serve.” But Saint Michael the Archangel declared: “Who is like God?” Strong in power and obedient to God, he deeply loves humanity and defends us in our struggle against the devil.'
  },
  {
    id: 'L',
    title: 'Death of Saint Benedict',
    location: 'Nave (Main Church)',
    description: 'Saint Benedict, at the end of his life, supported by his disciples, peacefully returned to his heavenly home while standing in the church, hands raised toward heaven, praying and facing east. He teaches us that through humility we ascend to God, and through works of obedience we return to the One from whom we were separated by disobedience.'
  },
  {
    id: 'M',
    title: 'Saint Paul',
    location: 'Nave (Main Church)',
    description: 'Saint Paul, who preached to the Athenians. The Greeks were among the first non-Jews to receive the Good News. They revered all things beautiful and even built an altar “To the Unknown God.” Saint Paul revealed to them the one true God.'
  },
  {
    id: 'N',
    title: 'Saint Peter',
    location: 'Nave (Main Church)',
    description: 'Saint Peter, the first pope. Once a fisherman, Christ made him the “fisher of men.” His name means “rock.” Jesus said to him: “You are Peter, and on this rock I will build my Church.” In weakness he denied the Lord, but later, through repentance, penance, and love, he gave his life for Jesus.'
  },
  {
    id: 'O',
    title: 'Pope Saint Gregory the Great',
    location: 'Nave (Main Church)',
    description: 'Pope Saint Gregory the Great, who called himself “the servant of the servants of Christ.” This great pope longed to free slaves, sent missionaries to England, and wrote The Life of Saint Benedict.'
  },
  {
    id: 'P',
    title: 'Saint Thomas More',
    location: 'Nave (Main Church)',
    description: 'Saint Thomas More, Lord Chancellor of England under Henry VIII, who chose death rather than betray justice and truth. He declared: “I die the King’s good servant, but God’s first.”'
  },
  {
    id: 'Q',
    title: 'Saint John Brebeuf',
    location: 'Nave (Main Church)',
    description: 'Saint John Brebeuf, who journeyed as a missionary to North America to bring the Gospel to the Indigenous peoples, serving them and courageously giving his life for them as a witness to Christ.'
  },
  {
    id: 'R',
    title: 'Virgin Mary and Child',
    location: 'Nave (Main Church)',
    description: 'Hail to the Virgin Mary holding the Child Jesus. As Scripture says, God chose to become man through a Virgin most humble and pure. Adam and Eve were the first parents of the human race, while Jesus and Mary are the parents of the new humanity, showing the most beautiful image of woman/mother and child. Mary is the New Eve, the most faithful follower and beloved of Jesus. She is the glory of the Church and our Mother.'
  },
  {
    id: 'S',
    title: 'Saint Scholastica',
    location: 'Nave (Main Church)',
    description: 'Saint Scholastica, the dear sister of Saint Benedict. They shared not only a deep family bond but also a spiritual companionship. They often spoke together of the kingdom of heaven. Saint Benedict saw her pure soul ascend to heaven like a dove.'
  },
  {
    id: 'T',
    title: 'Saint Gertrude the Great',
    location: 'Nave (Main Church)',
    description: 'Saint Gertrude the Great. Through her, God revealed to us His burning divine love for each person, just as He gave everything to His Church.'
  },
  {
    id: 'U',
    title: 'Saint Martin of Tours',
    location: 'Nave (Main Church)',
    description: 'Saint Martin of Tours. Once a soldier, he later became a soldier of Christ. Even before baptism, he cut his cloak in two and gave half to a poor man to wear—who was Christ in disguise.'
  },
  {
    id: 'V',
    title: 'Saint Anselm and Saint Dunstan',
    location: 'Nave (Main Church)',
    description: 'Saint Anselm and Saint Dunstan. Saint Anselm teaches us that faith, through loyalty and love, leads to understanding—a teaching that remains very important for us today. Saint Dunstan was a great artist.'
  },
  {
    id: 'W',
    title: 'The Burial of Jesus',
    location: 'Nave (Main Church)',
    description: 'The Burial of Jesus. This scene shows the Lord’s body taken down from the cross, laid in the arms of His sorrowful mother, wrapped in a burial shroud, and placed in the tomb.'
  },
  {
    id: 'X',
    title: 'The Resurrection of Jesus',
    location: 'Nave (Main Church)',
    description: 'The Resurrection of Jesus. The King of eternal life broke the chains of death, while the guards at the tomb fell as though dead. Christ truly rose from the dead and triumphed over death. He descended to the abode of the just (the place of the righteous dead), granting them new life.'
  },
  {
    id: 'Y',
    title: 'Saint Ethelbert and Saint Augustine',
    location: 'Nave (Main Church)',
    description: 'Saint Ethelbert and Saint Augustine of Canterbury, who together showed true harmony between civil government and the holy Church.'
  },
  {
    id: 'Z',
    title: 'St. John Roberts',
    location: 'Nave (Main Church)',
    description: 'St. John Roberts, monk. He was later martyred for the faith and executed in England. He shows us that whether in times of peace or under persecution, happiness is found in God.'
  },
  {
    id: 'AA',
    title: 'St. Joseph with Child Jesus',
    location: 'Nave (Main Church)',
    description: 'St. Joseph with the Child Jesus. Even imperfect parents in this world reflect the love of the heavenly Father to their children. What an immense mystery, then, when the Son of God looked up with love to His earthly father! St. Joseph taught Jesus to work with human hands, even though through Him the whole universe was made.'
  },
  {
    id: 'BB',
    title: 'Pope St. Pius X',
    location: 'Nave (Main Church)',
    description: 'Pope St. Pius X. He allowed children to receive Holy Communion earlier than before, because he understood that the minds of children are often able to grasp the truth of this great mystery.'
  },
  {
    id: 'CC',
    title: 'The Eucharist',
    location: 'Sanctuary (Altar)',
    description: 'The Eucharist. Jesus gave His Body as the greatest gift of love to His Church. Through Jesus’ own teaching and countless signs and miracles through the ages, the Church believes that the Eucharist is truly the Body, Blood, Soul, and Divinity of Jesus. He instituted this sacrament so that He might be with us, and in us, and so that we might be one in Him. In the Eucharist, Jesus Himself comes within us, uniting us with Him. That is why in every Catholic church you will see a tabernacle, usually placed in a special, sacred place prepared for adoration and prayer, sometimes even in the very center of the church. This holy place is reserved for worship and prayer. The tabernacle recalls the Holy of Holies in the Jewish Temple of Jerusalem, showing that Christ desires to dwell within us. A sanctuary lamp burns nearby, symbolizing the Church’s loving vigil before the presence of the Lord. You are invited to come here and pray quietly before Jesus’ presence.'
  },
  {
    id: 'DD',
    title: 'St. Basil the Great',
    location: 'Nave (Main Church)',
    description: 'St. Basil the Great. This great Father of Monks taught many generations how to live in community while united in love with God.'
  },
  {
    id: 'EE',
    title: 'St. Frances of Rome',
    location: 'Nave (Main Church)',
    description: 'St. Frances of Rome. This courageous mother living in the world was a follower of St. Benedict.'
  }
];
