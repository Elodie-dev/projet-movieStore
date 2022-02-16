import XMLHttpRequest from "xhr2";
const URL = "http://localhost:3080/user/register";

function create_request (user) {
  return new Promise((resolve, reject)=> {
    const data = JSON.stringify(user);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", URL);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(user);
    console.log(`Requête pour ${user.firstname} ${user.lastname}`);
  })
}
 function generate_users(Users){
const request = []

for (const user in Users) {
  Users[user].password = `${Users[user].firstname}Password`;
  request.push(create_request(JSON.stringify(Users[user])))
}

Promise.all(request).then(()=> {
  console.log('Touts les users sont envoyés !')
})
}

const Users = [
{"firstname":"Mayor","lastname":"Casini","email":"mcasini0@google.es","adresse":"7187 Forest Parkway","city":"Chonglou"},
{"firstname":"Pebrook","lastname":"Alvares","email":"palvares1@microsoft.com","zipcode":"63-702","adresse":"251 3rd Crossing","city":"Krotoszyn"},
{"firstname":"Atlanta","lastname":"Daubney","email":"adaubney2@ning.com","adresse":"635 Lakewood Plaza","city":"Shucheng Chengguanzhen"},
{"firstname":"Merrie","lastname":"Castillou","email":"mcastillou3@mozilla.org","zipcode":"399240","adresse":"9606 Stephen Terrace","city":"Donskoye"},
{"firstname":"Carolyne","lastname":"Roddam","email":"croddam4@timesonline.co.uk","adresse":"72069 Sloan Road","city":"Seraya"},
{"firstname":"Lenna","lastname":"Buckner","email":"lbuckner5@whitehouse.gov","adresse":"5297 Maple Wood Center","city":"Xindu"},
{"firstname":"Wat","lastname":"Crossfield","email":"wcrossfield6@bigcartel.com","adresse":"368 Bobwhite Lane","city":"Namangan Shahri"},
{"firstname":"Davidde","lastname":"Essam","email":"dessam7@nyu.edu","adresse":"9 3rd Drive","city":"Tarīm"},
{"firstname":"Cheston","lastname":"Delves","email":"cdelves8@webs.com","zipcode":"4615-131","adresse":"3 Banding Lane","city":"Vinha"},
{"firstname":"Auguste","lastname":"Dewing","email":"adewing9@networksolutions.com","zipcode":"2635-012","adresse":"8147 Debra Plaza","city":"Albarraque"},
{"firstname":"Jill","lastname":"Lansdown","email":"jlansdowna@usatoday.com","adresse":"829 Cherokee Road","city":"Baitashan"},
{"firstname":"Killy","lastname":"Godfray","email":"kgodfrayb@infoseek.co.jp","adresse":"482 Golden Leaf Junction","city":"Bački Breg"},
{"firstname":"Regine","lastname":"Robken","email":"rrobkenc@merriam-webster.com","adresse":"56 Fuller Place","city":"Moroni"},
{"firstname":"Mellicent","lastname":"Dolley","email":"mdolleyd@java.com","zipcode":"E5L","adresse":"6 Everett Park","city":"Oliver"},
{"firstname":"Reggie","lastname":"Van der Velden","email":"rvanderveldene@sciencedirect.com","zipcode":"42349","adresse":"25 Reindahl Place","city":"Wuppertal"},
{"firstname":"Lew","lastname":"Bradbeer","email":"lbradbeerf@ucoz.com","adresse":"785 Canary Drive","city":"Tawangsari"},
{"firstname":"Papageno","lastname":"Yes","email":"pyesg@bloomberg.com","adresse":"59 Springs Center","city":"Puunage"},
{"firstname":"Jimmy","lastname":"Turney","email":"jturneyh@blogtalkradio.com","zipcode":"423 43","adresse":"93453 Cordelia Road","city":"Torslanda"},
{"firstname":"Leontyne","lastname":"Margach","email":"lmargachi@admin.ch","adresse":"14 Bay Park","city":"Cikondang"},
{"firstname":"Guthry","lastname":"Loines","email":"gloinesj@wunderground.com","zipcode":"721 37","adresse":"1 Dovetail Street","city":"Västerås"},
{"firstname":"Chanda","lastname":"Rathe","email":"crathek@w3.org","zipcode":"3040-426","adresse":"5 Fremont Parkway","city":"Almalaguês"},
{"firstname":"Diane-marie","lastname":"Top","email":"dtopl@narod.ru","adresse":"38720 Chinook Place","city":"Qusar"},
{"firstname":"Samara","lastname":"Watkins","email":"swatkinsm@pbs.org","adresse":"23 Barby Place","city":"Drakhtik"},
{"firstname":"Orel","lastname":"Knightsbridge","email":"oknightsbridgen@spotify.com","adresse":"493 Daystar Junction","city":"Dagui"},
{"firstname":"Pren","lastname":"Leborgne","email":"pleborgneo@hp.com","adresse":"23 Lukken Pass","city":"Cikadu"},
{"firstname":"Corrina","lastname":"Quilty","email":"cquiltyp@nymag.com","adresse":"14 Clyde Gallagher Lane","city":"Tuamese"},
{"firstname":"Fanya","lastname":"Speariett","email":"fspeariettq@slate.com","zipcode":"57-215","adresse":"9 American Ash Crossing","city":"Stoszowice"},
{"firstname":"Tanny","lastname":"Thireau","email":"tthireaur@fema.gov","zipcode":"783 22","adresse":"9 Mayer Trail","city":"Vilémov"},
{"firstname":"Lulita","lastname":"Loalday","email":"lloaldays@paginegialle.it","zipcode":"636132","adresse":"57388 Lien Crossing","city":"Mel’nikovo"},
{"firstname":"Jourdain","lastname":"Stoneham","email":"jstonehamt@twitter.com","adresse":"19231 Del Sol Trail","city":"Velyki Sorochyntsi"},
{"firstname":"Angelina","lastname":"Mazillius","email":"amazilliusu@ow.ly","adresse":"849 Nevada Plaza","city":"Dzyarzhynsk"},
{"firstname":"Rooney","lastname":"Braithwaite","email":"rbraithwaitev@sina.com.cn","adresse":"21 Fisk Trail","city":"Thị Trấn Hát Lót"},
{"firstname":"Derrek","lastname":"Mullany","email":"dmullanyw@redcross.org","zipcode":"2200-785","adresse":"10 Messerschmidt Alley","city":"Rio de Moinhos"},
{"firstname":"Michael","lastname":"Nowakowski","email":"mnowakowskix@whitehouse.gov","zipcode":"10140","adresse":"72 Jenna Alley","city":"Rat Burana"},
{"firstname":"Lucio","lastname":"Durrett","email":"ldurretty@statcounter.com","zipcode":"23605","adresse":"17255 Commercial Trail","city":"Newport News"},
{"firstname":"Irena","lastname":"Stang-Gjertsen","email":"istanggjertsenz@miibeian.gov.cn","zipcode":"5210-105","adresse":"26 David Plaza","city":"Ifanes"},
{"firstname":"Caty","lastname":"Mulvihill","email":"cmulvihill10@over-blog.com","zipcode":"607340","adresse":"2314 Hanover Crossing","city":"Voznesenskoye"},
{"firstname":"Dulcie","lastname":"Preon","email":"dpreon11@bbc.co.uk","adresse":"6 Bobwhite Alley","city":"Smederevska Palanka"},
{"firstname":"Adaline","lastname":"Wessing","email":"awessing12@prlog.org","adresse":"748 Raven Court","city":"Hucun"},
{"firstname":"Jeanna","lastname":"Ruller","email":"jruller13@netvibes.com","adresse":"86 Riverside Terrace","city":"Same"},
{"firstname":"Derward","lastname":"Brearley","email":"dbrearley14@webs.com","zipcode":"21209 CEDEX","adresse":"198 Summerview Junction","city":"Beaune"},
{"firstname":"Aeriel","lastname":"Vassie","email":"avassie15@tripod.com","zipcode":"20210","adresse":"0 Tomscot Trail","city":"Washington"},
{"firstname":"Ardene","lastname":"Daniely","email":"adaniely16@newyorker.com","adresse":"127 Armistice Point","city":"Yongheshi"},
{"firstname":"Bram","lastname":"Glowacz","email":"bglowacz17@creativecommons.org","adresse":"32079 Becker Parkway","city":"Taihe Chengguanzhen"},
{"firstname":"Trent","lastname":"Firpo","email":"tfirpo18@xrea.com","adresse":"298 Moland Lane","city":"Goulmima"},
{"firstname":"Heidie","lastname":"Beaston","email":"hbeaston19@drupal.org","adresse":"9 Lyons Drive","city":"Jiangtian"},
{"firstname":"Stacia","lastname":"Sikora","email":"ssikora1a@pagesperso-orange.fr","zipcode":"53100","adresse":"3 Acker Alley","city":"Kuala Lumpur"},
{"firstname":"Lanae","lastname":"Dunstall","email":"ldunstall1b@biglobe.ne.jp","adresse":"1003 Armistice Trail","city":"Melissochóri"},
{"firstname":"Lilith","lastname":"Pettus","email":"lpettus1c@wikimedia.org","zipcode":"R2J","adresse":"4421 Walton Junction","city":"Kamsack"},
{"firstname":"Ford","lastname":"Hallan","email":"fhallan1d@gravatar.com","zipcode":"6811","adresse":"3 Dovetail Plaza","city":"Manamrag"},
{"firstname":"Beau","lastname":"Brosio","email":"bbrosio1e@ezinearticles.com","adresse":"42969 Rutledge Lane","city":"Pecoro"},
{"firstname":"Zak","lastname":"Dumphries","email":"zdumphries1f@fda.gov","adresse":"017 Warner Park","city":"Minggang"},
{"firstname":"Giana","lastname":"Shooter","email":"gshooter1g@skyrock.com","zipcode":"63-430","adresse":"85492 Magdeline Point","city":"Odolanów"},
{"firstname":"Fenelia","lastname":"Hazard","email":"fhazard1h@bravesites.com","zipcode":"686 91","adresse":"00524 Shelley Point","city":"Sunne"},
{"firstname":"Herold","lastname":"Jellings","email":"hjellings1i@joomla.org","zipcode":"5005","adresse":"9647 Algoma Park","city":"Gibato"},
{"firstname":"Nevin","lastname":"Sumnall","email":"nsumnall1j@bizjournals.com","adresse":"537 Bonner Way","city":"Gonbad-e Kāvūs"},
{"firstname":"Timothy","lastname":"Thowless","email":"tthowless1k@domainmarket.com","adresse":"65278 Pankratz Trail","city":"Hwado"},
{"firstname":"Marcie","lastname":"Gaitley","email":"mgaitley1l@youtu.be","zipcode":"6583","adresse":"03258 Linden Court","city":"Knysna"},
{"firstname":"Fred","lastname":"Olenchikov","email":"folenchikov1m@europa.eu","adresse":"36 East Parkway","city":"Jinghai"},
{"firstname":"Sibeal","lastname":"Yedall","email":"syedall1n@businessweek.com","zipcode":"4332","adresse":"7 Green Ridge Center","city":"San Alejandro"},
{"firstname":"Normy","lastname":"Govini","email":"ngovini1o@opensource.org","adresse":"1 Sommers Lane","city":"Sampungu"},
{"firstname":"Jermayne","lastname":"Morratt","email":"jmorratt1p@uol.com.br","zipcode":"3090-469","adresse":"782 Oakridge Circle","city":"Maiorca"},
{"firstname":"Sandy","lastname":"Ives","email":"sives1q@shinystat.com","zipcode":"06-102","adresse":"71 Carioca Street","city":"Pułtusk"},
{"firstname":"Regina","lastname":"Shoutt","email":"rshoutt1r@g.co","adresse":"47799 Arrowood Place","city":"Su-dong"},
{"firstname":"Averell","lastname":"McKitterick","email":"amckitterick1s@bigcartel.com","adresse":"9 Anzinger Circle","city":"Lakbok"},
{"firstname":"Loren","lastname":"Baggelley","email":"lbaggelley1t@spotify.com","zipcode":"80190","adresse":"9 Bobwhite Lane","city":"Chian Yai"},
{"firstname":"Lanni","lastname":"Gierok","email":"lgierok1u@umn.edu","adresse":"9047 Service Hill","city":"Banqiao"},
{"firstname":"Dion","lastname":"Rearden","email":"drearden1v@icio.us","adresse":"293 Brickson Park Circle","city":"Penanggal"},
{"firstname":"Phebe","lastname":"McGunley","email":"pmcgunley1w@about.me","adresse":"406 Manley Junction","city":"Banjar Medura"},
{"firstname":"Matilde","lastname":"Patron","email":"mpatron1x@disqus.com","adresse":"5 Jana Road","city":"Patapan"},
{"firstname":"Montague","lastname":"Jeskin","email":"mjeskin1y@shutterfly.com","zipcode":"2360","adresse":"08910 Wayridge Road","city":"Radlje ob Dravi"},
{"firstname":"Wald","lastname":"Steenson","email":"wsteenson1z@wordpress.com","adresse":"0 Dixon Court","city":"Chang’an"},
{"firstname":"Darelle","lastname":"Rowet","email":"drowet20@yandex.ru","zipcode":"90451","adresse":"823 Grover Circle","city":"Kempele"},
{"firstname":"Caroljean","lastname":"LAbbet","email":"clabbet21@statcounter.com","adresse":"874 Mockingbird Street","city":"Ḩarastā"},
{"firstname":"Shaylynn","lastname":"Roelofsen","email":"sroelofsen22@si.edu","zipcode":"623287","adresse":"1 Granby Court","city":"Revda"},
{"firstname":"Portia","lastname":"Woolland","email":"pwoolland23@dell.com","zipcode":"5889","adresse":"2129 Tennyson Drive","city":"Mina Clavero"},
{"firstname":"Norine","lastname":"Hallgath","email":"nhallgath24@deviantart.com","zipcode":"173509","adresse":"15 Leroy Trail","city":"Novokuz’minki"},
{"firstname":"Fitz","lastname":"Giacobo","email":"fgiacobo25@ihg.com","adresse":"96828 Brickson Park Plaza","city":"Youfang"},
{"firstname":"Jory","lastname":"Bourgour","email":"jbourgour26@netvibes.com","adresse":"9525 Becker Place","city":"Beishan"},
{"firstname":"Kori","lastname":"Curnick","email":"kcurnick27@comcast.net","adresse":"28 Hoepker Parkway","city":"Punta de Bombón"},
{"firstname":"Guss","lastname":"Fellgatt","email":"gfellgatt28@twitter.com","zipcode":"9517","adresse":"767 Golden Leaf Terrace","city":"Glan"},
{"firstname":"Letty","lastname":"Westerman","email":"lwesterman29@squidoo.com","adresse":"238 Chinook Street","city":"Were Īlu"},
{"firstname":"Jacob","lastname":"Hofton","email":"jhofton2a@stumbleupon.com","zipcode":"682027","adresse":"7 Portage Center","city":"San José de Miranda"},
{"firstname":"Ignatius","lastname":"Stollery","email":"istollery2b@google.co.jp","adresse":"03967 Hallows Junction","city":"Ruma"},
{"firstname":"Joyce","lastname":"Nacey","email":"jnacey2c@t-online.de","zipcode":"507-0901","adresse":"14 Nelson Alley","city":"Tajimi"},
{"firstname":"Ely","lastname":"Cleiment","email":"ecleiment2d@usatoday.com","zipcode":"12300-000","adresse":"4 Debra Place","city":"Jacareí"},
{"firstname":"Iorgos","lastname":"Auton","email":"iauton2e@mail.ru","adresse":"362 Linden Park","city":"Sumberbening"},
{"firstname":"Ashly","lastname":"Imeson","email":"aimeson2f@discovery.com","zipcode":"VCT","adresse":"496 Morning Alley","city":"Victoria"},
{"firstname":"Ysabel","lastname":"Daldry","email":"ydaldry2g@dedecms.com","zipcode":"901-0241","adresse":"272 Debs Center","city":"Tomigusuku"},
{"firstname":"Kare","lastname":"Scarborough","email":"kscarborough2h@oakley.com","zipcode":"13281 CEDEX 06","adresse":"89765 Bay Street","city":"Marseille"},
{"firstname":"Erika","lastname":"Dat","email":"edat2i@moonfruit.com","zipcode":"6419","adresse":"4794 Oriole Court","city":"San Vicente"},
{"firstname":"Trish","lastname":"Fellnee","email":"tfellnee2j@usgs.gov","adresse":"109 Village Green Street","city":"Tân Sơn"},
{"firstname":"Joletta","lastname":"Rebeiro","email":"jrebeiro2k@sciencedaily.com","adresse":"9620 Laurel Pass","city":"Bentengjawa"},
{"firstname":"Bendicty","lastname":"Bartoshevich","email":"bbartoshevich2l@skyrock.com","zipcode":"32308","adresse":"96826 School Parkway","city":"Shanjeev Home"},
{"firstname":"Casi","lastname":"Brazier","email":"cbrazier2m@theguardian.com","adresse":"77 Garrison Park","city":"Tengrela"},
{"firstname":"Alanson","lastname":"Klewi","email":"aklewi2n@multiply.com","zipcode":"33405","adresse":"570 Red Cloud Circle","city":"West Palm Beach"},
{"firstname":"Donnajean","lastname":"Giamo","email":"dgiamo2o@google.pl","zipcode":"154667","adresse":"21 Hanover Pass","city":"Caldas"},
{"firstname":"Virgie","lastname":"Yerrall","email":"vyerrall2p@github.com","zipcode":"14300-000","adresse":"53 Crowley Hill","city":"Batatais"},
{"firstname":"Hunt","lastname":"Hintze","email":"hhintze2q@bigcartel.com","adresse":"87 Hudson Pass","city":"Fengzhou"},
{"firstname":"Caril","lastname":"Valentetti","email":"cvalentetti2r@who.int","adresse":"15 Alpine Place","city":"Santo Domingo"}
]

generate_users(Users)
