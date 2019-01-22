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
            avatar_url: 'burak',
            password: 'burak',
            department: 'Müşteri',
            title: 'Kurucu Ortak',
            access: 'admin',
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
            title: 'Front-End Developer',
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
            password: 'nazim',
            department: 'Tasarım',
            title: 'Art Direktör',
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
            name: "Deniz Zengin",
            first_name: 'Deniz',
            last_name: 'Zengin',
            email: 'deniz.zengin@clockwork.com.tr',
            password: 'deniz',
            department: 'Müşteri',
            title: 'Müşteri Yöneticisi',
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
