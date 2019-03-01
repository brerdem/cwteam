const router = require('express').Router();
const User = require('./../../../models/user');

const randomcolor = require('randomcolor');

router.get('/all', (req, res) => {

    User.find({}, (err, users) => {
        if (!err) {
            res.status(200).json(users);
        } else {
            res.status(400).send(err);
        }
    });

});

router.get('/makeusers', (req, res) => {

    const arr = [
        {
            name: "Burak Erdem",
            first_name: 'Burak',
            last_name: 'Erdem',
            email: 'burak.erdem@clockwork.com.tr',
            avatar_url: 'burak_erdem',
            password: 'burak.erdem',
            department: 'Yazılım',
            title: 'Kurucu Ortak',
            access: 'admin',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Burak Poyraz",
            first_name: 'Burak',
            last_name: 'Poyraz',
            email: 'burak.poyraz@clockwork.com.tr',
            avatar_url: 'burak_poyraz',
            password: 'burak.poyraz',
            department: 'Tasarım',
            title: 'Grafik Tasarımcı',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Zeynep Abdullahoğlu",
            first_name: 'Zeynep',
            last_name: 'Abdullahoğlu',
            email: 'zeynep.abdullahoglu@clockwork.com.tr',
            avatar_url: 'zeynep',
            password: 'zeynep',
            department: 'Tasarım',
            title: 'Grafik Tasarımcısı',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Büşra Bilmiş",
            first_name: 'Büşra',
            last_name: 'Bilmiş',
            email: 'busra.bilmis@clockwork.com.tr',
            avatar_url: 'busra',
            password: 'busra',
            department: 'Sosyal Medya',
            title: 'Sosyal Medya Uzmanı',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Gizem Günaydın",
            first_name: 'Gizem',
            last_name: 'Günaydın',
            email: 'gizem.gunaydin@clockwork.com.tr',
            avatar_url: 'gizem',
            password: 'gizem',
            department: 'Sosyal Medya',
            title: 'Sosyal Medya Uzmanı',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Buse Kuran",
            first_name: 'Buse',
            last_name: 'Kuran',
            email: 'buse.kuran@clockwork.com.tr',
            avatar_url: 'buse',
            password: 'buse',
            department: 'Sosyal Medya',
            title: 'Sosyal Medya Uzmanı',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Damla Baştürk",
            first_name: 'Damla',
            last_name: 'Baştürk',
            email: 'damla.basturk@clockwork.com.tr',
            password: 'damla',
            department: 'Sosyal Medya',
            title: 'Sosyal Medya Uzmanı',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Barış Karadereli",
            first_name: 'Barış',
            last_name: 'Karadereli',
            email: 'baris.karadereli@clockwork.com.tr',
            password: 'baris',
            department: 'Yazılım',
            title: 'Ara Yüz Geliştirici',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Hakan Tezcan",
            first_name: 'Hakan',
            last_name: 'Tezcan',
            email: 'hakan.tezcan@clockwork.com.tr',
            avatar_url: 'hakan',
            password: 'hakan',
            department: 'Yazılım',
            title: 'Ara Yüz Geliştirici',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Saied Khatibi",
            first_name: 'Saied',
            last_name: 'Khatibi',
            email: 'saied.khatibi@clockwork.com.tr',
            password: 'hakan',
            department: 'Yazılım',
            title: 'Ara Yüz Geliştirici',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Burcu Kanyılmaz",
            first_name: 'Burcu',
            last_name: 'Kanyılmaz',
            email: 'burcu.kanyilmaz@clockwork.com.tr',
            avatar_url: 'burcu',
            password: 'burcu',
            department: 'Müşteri',
            title: 'Finans Yöneticisi',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Serkan Arı",
            first_name: 'Serkan',
            last_name: 'Arı',
            email: 'serkan.ari@clockwork.com.tr',
            avatar_url: 'serkan',
            password: 'serkan',
            department: 'Müşteri',
            title: 'Kurucu',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Nazım Tunç",
            first_name: 'Nazım',
            last_name: 'Tunç',
            email: 'nazim.tunc@clockwork.com.tr',
            avatar_url: 'nazim',
            password: 'nazim',
            department: 'Tasarım',
            title: 'Kreatif Direktör',
            access: 'admin',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Aybüke Şahin",
            first_name: 'Aybüke',
            last_name: 'Şahin',
            email: 'aybuke.sahin@clockwork.com.tr',
            avatar_url: 'aybuke',
            password: 'aybuke',
            department: 'Sosyal Medya',
            title: 'Sosyal Medya Süpervizörü',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Hüseyin Ay",
            first_name: 'Hüseyin',
            last_name: 'Ay',
            email: 'huseyin.ay@clockwork.com.tr',
            avatar_url: 'huseyin',
            password: 'huseyin',
            department: 'Sosyal Medya',
            title: 'Sosyal Medya Yöneticisi',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Deniz Zengin",
            first_name: 'Deniz',
            last_name: 'Zengin',
            email: 'deniz.zengin@clockwork.com.tr',
            avatar_url: 'deniz',
            password: 'deniz',
            department: 'Müşteri',
            title: 'Müşteri Yöneticisi',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Özdemir Gümüş",
            first_name: 'Özdemir',
            last_name: 'Gümüş',
            email: 'ozdemir.gumus@clockwork.com.tr',
            avatar_url: 'ozdemir',
            password: 'ozdemir',
            department: 'Müşteri',
            title: 'Genel Müdür',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Devran Eroğul",
            first_name: 'Devran',
            last_name: 'Eroğul',
            email: 'devran.erogul@clockwork.com.tr',
            avatar_url: 'devran',
            password: 'devran',
            department: 'Yazılım',
            title: 'Yazılım Yöneticisi',
            access: 'admin',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Yağmur Kızıltan",
            first_name: 'Yağmur',
            last_name: 'Kızıltan',
            email: 'yagmur.kiziltan@clockwork.com.tr',
            avatar_url: 'yagmur',
            password: 'yagmur',
            department: 'Sosyal Medya',
            title: 'Metin Yazarı',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Gökhan Kaygısız",
            first_name: 'Gökhan',
            last_name: 'Kaygısız',
            email: 'gokhan.kaygisiz@clockwork.com.tr',
            avatar_url: 'gokhan',
            password: 'gokhan',
            department: 'Müşteri',
            title: 'Müşteri Yöneticisi',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Simge Yel",
            first_name: 'Simge',
            last_name: 'Yel',
            email: 'simge.yel@clockwork.com.tr',
            avatar_url: 'simge',
            password: 'simge',
            department: 'Müşteri',
            title: 'Müşteri Yöneticisi',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Çağla Küçük",
            first_name: 'Çağla',
            last_name: 'Küçük',
            email: 'cagla.kücük@clockwork.com.tr',
            avatar_url: 'cagla',
            password: 'cagla',
            department: 'Tasarım',
            title: 'Kıdemli Grafik Tasarımcısı',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Onur Yücedağ",
            first_name: 'Onur',
            last_name: 'Yücedağ',
            email: 'onur.yucedag@clockwork.com.tr',
            avatar_url: 'onur',
            password: 'onur',
            department: 'Yazılım',
            title: 'Arka Plan Geliştirici',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Saied Khatibi",
            first_name: 'Saied',
            last_name: 'Khatibi',
            email: 'saied.khatibi@clockwork.com.tr',
            password: 'saied',
            department: 'Yazılım',
            title: 'Arka Plan Geliştirici',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },
        {
            name: "Faruk Aydın",
            first_name: 'Faruk',
            last_name: 'Aydın',
            email: 'faruk.aydin@clockwork.com.tr',
            avatar_url: 'faruk',
            password: 'faruk',
            department: 'Yazılım',
            title: 'Arka Plan Geliştirici',
            access: 'user',
            avatar_bg: randomcolor({luminosity: 'dark'})
        },

    ];

    User.insertMany(arr, (err, docs) => {
        if (!err) {
            res.status(200).send("ok");
        } else {
            console.log(err);
            res.status(400).send(err);
        }
    })

});

module.exports = router;
