import fs from 'fs'; 
import { ProfanityEngine } from '@coffeeandfun/google-profanity-words';

// Pass the 'language' parameter to specify the language (optional).
// Defaults to 'en' if no valid language code is provided.
const profanity = new ProfanityEngine();

// profanity.search('shit').then(response => console.log("is shit profane?", response ))
// profanity.all().then(response => {console.log("profanity.all.length is ", response.length)})

const newBadWords = ["kkk", "jew", "shlong", "schlong",
"scrot","gag","throb", "yid"]

  
function commaSeparatedMaker(newlineSeparatedText){
    return newlineSeparatedText.replace(/\n/g, '","');
}

function removeStars(text){
    return text.replace(/\*/g, '');
}

function removeMultiWordPhrases(array){
  return array.filter((item) => !item.includes(" "))
}

function removeHyphenatedPhrases(array){
  return array.filter((item) => !item.includes("-"))
}

function removePunctuatedPhrases(array){
  return array.filter((item) => !containsPunctuation(item))
}

function containsPunctuation(text){
  const punct = /[!#$%&*+,-.:;<=>?@^_~]/;
  return punct.test(text); 
}


function removeNumericalHybrids(array){
  return array.filter((item) => !containsNumerical(item))
}

function containsNumerical(text){
  const nums = /\d/;
  return nums.test(text); 
}

function removeSuperStrings(array){
  return array.filter((item) => {
    return !array.some(element => isSuperStringedBy(element,item))
  })
}

function isSuperStringedBy(string1,string2){
  if (string1 === string2) return false; 
  else return string2.includes(string1); 
}

function removeDuplicates(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}


function removeIrrelevant(array){
  console.log("length of array before removeMultiWordPhrases is ", array.length)
  let output = removeMultiWordPhrases(array);
  console.log("length of output before removeHyphenatedPhrases is ", output.length)

  output = removeHyphenatedPhrases(output); 
  console.log("length of output before removePunctuatedPhrases is ", output.length)

  output = removePunctuatedPhrases(output); 
  console.log("length of output before removeNumericalHybrids is ", output.length)

  output = removeNumericalHybrids(output); 
  // console.log("length of output before removeSuperStrings is ", output.length)
  output = removeEmpty(output); 
  output = removeCommonMorphemes(output); 
  output = removeEmojis(output); 
  output = removeAssStarters(output); 
  console.log("words = 4: ", JSON.stringify(getAllWordsEqualToFour(output)))
 console.log("shortest element is ", getShortest(output))
  output = removeSuperStrings(output); 
  console.log("length of output before removeDuplicates is ", output.length)
  output = removeDuplicates(output); 
  console.log("length of output after removeDuplicates is ", output.length)
  return output; 
}

function containsEmojis(text){
  const emojiRegex = /(?:[\u2700-\u27BF]|(?:\uD83C[\uDC00-\uDFFF])|(?:\uD83D[\uDC00-\uDFFF])|(?:\uD83E[\uDC00-\uDFFF]|[\u{1F595}\u{1F595}\u{1F596}\u{1F918}\u{1F92F}\u{1F644}\u{1F975}\u{1F92A}\u{1F92C}\u{1F92F}\u{1F9D0}\u{1F615}]))/g;
  return emojiRegex.test(text); 
}

function removeEmojis(array){
  return array.filter((item) => !containsEmojis(item))
}

function removeCommonMorphemes(array){
  return array.filter((current) => !["ho","ass", "gag", "feg", "yed", "ekto","cipa","hell","merd", "dink","feck","pron"].includes(current))
}

function getShortest(array){
  return array.reduce((acc,current) => current.length < acc.length? current : acc, array[0])
}

function getAllWordsLessThanFour(array){
  return array.filter((current) => current.length < 4)
}

function getAllWordsEqualToFour(array){
  return array.filter((current) => current.length === 4)
}

function removeEmpty(array){
  return array.filter((current) => current.length > 0)
}

//just about anything starting with 'ass...' sounds bad, but not everything containing 'ass' sounds bad (e.g. bass)
// so these are handled separately and they can be removed from the list for the sake of efficiency
function isAssStarter(string){
    const pattern = /^ass/;
    if (pattern.test(string)) return true; 
}

function removeAssStarters(array){
  return array.filter((current) => !isAssStarter(current))
}

async function makeBadWordsArray(){
    const badText = `ahole
anus
ash0le
ash0les
asholes
ass
Ass Monkey
Assface
assh0le
assh0lez
asshole
assholes
assholz
asswipe
azzhole
bassterds
bastard
bastards
bastardz
basterds
basterdz
Biatch
bitch
bitches
Blow Job
boffing
butthole
buttwipe
c0ck
c0cks
c0k
Carpet Muncher
cawk
cawks
Clit
cnts
cntz
cock
cockhead
cock-head
cocks
CockSucker
cock-sucker
crap
cum
cunt
cunts
cuntz
dick
dild0
dild0s
dildo
dildos
dilld0
dilld0s
dominatricks
dominatrics
dominatrix
dyke
enema
f u c k
f u c k e r
fag
fagg
fag1t
faget
fagg1t
faggit
faggot
fagit
fags
fagz
faig
faigs
fart
flipping the bird
fuck
fucker
fuckin
fucking
fucks
Fudge Packer
fuk
Fukah
Fuken
fuker
Fukin
Fukk
Fukkah
Fukken
Fukker
Fukkin
g00k
gay
gayboy
gaygirl
gays
gayz
God-damned
h00r
h0ar
h0re
hells
hoar
hoor
hoore
jackoff
jap
japs
jerk-off
jisim
jiss
jizm
jizz
knob
knobs
knobz
kunt
kunts
kuntz
Lesbian
Lezzian
Lipshits
Lipshitz
masochist
masokist
massterbait
masstrbait
masstrbate
masterbaiter
masterbate
masterbates
Motha Fucker
Motha Fuker
Motha Fukkah
Motha Fukker
Mother Fucker
Mother Fukah
Mother Fuker
Mother Fukkah
Mother Fukker
mother-fucker
Mutha Fucker
Mutha Fukah
Mutha Fuker
Mutha Fukkah
Mutha Fukker
n1gr
nastt
nigger;
nigur;
niiger;
niigr;
orafis
orgasim;
orgasm
orgasum
oriface
orifice
orifiss
packi
packie
packy
paki
pakie
paky
pecker
peeenus
peeenusss
peenus
peinus
pen1s
penas
penis
penis-breath
penus
penuus
Phuc
Phuck
Phuk
Phuker
Phukker
polac
polack
polak
Poonani
pr1c
pr1ck
pr1k
pusse
pussee
pussy
puuke
puuker
queer
queers
queerz
qweers
qweerz
qweir
recktum
rectum
retard
sadist
scank
schlong
screwing
semen
sex
sexy
Sh!t
sh1t
sh1ter
sh1ts
sh1tter
sh1tz
shit
shits
shitter
Shitty
Shity
shitz
Shyt
Shyte
Shytty
Shyty
skanck
skank
skankee
skankey
skanks
Skanky
slut
sluts
Slutty
slutz
son-of-a-bitch
tit
turd
va1jina
vag1na
vagiina
vagina
vaj1na
vajina
vullva
vulva
w0p
wh00r
wh0re
whore
xrated
xxx
b!+ch
bitch
blowjob
clit
arschloch
fuck
shit
ass
asshole
b!tch
b17ch
b1tch
bastard
bi+ch
boiolas
buceta
c0ck
cawk
chink
cipa
clits
cock
cum
cunt
dildo
dirsa
ejakulate
fatass
fcuk
fuk
fux0r
hoer
hore
jism
kawk
l3itch
l3i+ch
lesbian
masturbate
masterbat*
masterbat3
motherfucker
s.o.b.
mofo
nazi
nigga
nigger
nutsack
phuck
pimpis
pusse
pussy
scrotum
sh!t
shemale
shi+
sh!+
slut
smut
teets
tits
boobs
b00bs
teez
testical
testicle
titt
w00se
jackoff
wank
whoar
whore
*damn
*dyke
*fuck*
*shit*
@$$
amcik
andskota
arse*
assrammer
ayir
bi7ch
bitch*
bollock*
breasts
butt-pirate
cabron
cazzo
chraa
chuj
Cock*
cunt*
d4mn
daygo
dego
dick*
dike*
dupa
dziwka
ejackulate
Ekrem*
Ekto
enculer
faen
fag*
fanculo
fanny
feces
feg
Felcher
ficken
fitt*
Flikker
foreskin
Fotze
Fu(*
fuk*
futkretzn
gay
gook
guiena
h0r
h4x0r
hell
helvete
hoer*
honkey
Huevon
hui
injun
jizz
kanker*
kike
klootzak
kraut
knulle
kuk
kuksuger
Kurac
kurwa
kusi*
kyrpa*
lesbo
mamhoon
masturbat*
merd*
mibun
monkleigh
mouliewop
muie
mulkku
muschi
nazis
nepesaurio
nigger*
orospu
paska*
perse
picka
pierdol*
pillu*
pimmel
piss*
pizda
poontsee
poop
porn
p0rn
pr0n
preteen
pula
pule
puta
puto
qahbeh
queef*
rautenberg
schaffer
scheiss*
schlampe
schmuck
screw
sh!t*
sharmuta
sharmute
shipal
shiz
skribz
skurwysyn
sphencter
spic
spierdalaj
splooge
suka
b00b*
testicle*
titt*
twat
vittu
wank*
wetback*
wichser
wop*
yed
zabourah`
  let badWords = `"` + commaSeparatedMaker(removeStars(badText)) + `"`
  let badArray = JSON.parse("[" + badWords + "]")
  return profanity.all().then(response => {
    badArray = [...newBadWords, ...badArray, ...response]
    console.log("length of badarray before removeIrrelevant is : ", badArray.length)
    if (typeof badArray[0] !== 'string') throw new Error("in makeBadWordsArray. Array elements are not strings.")
    badArray = removeIrrelevant(badArray); 
    console.log("length of badarray is : ", badArray.length)
    return badArray; 
  }
  )  
}

function consoleBadWords(){
  makeBadWordsArray().then((successResult) => {
    console.log('Success: length of bad words array is ' + successResult.length);
  }).catch((error) => {
    console.log('Error in consoleBadWords: ' + error.message);
  });}

  //consoleBadWords(); 

function writeBadWords(){
  const filePath = './badwords.js';
  makeBadWordsArray().then(
    (badArray) => {
      const badFileText = "export const badwords = [" + JSON.stringify(badArray) + "]"; 
      fs.writeFile(filePath, badFileText, (err) => {
        if (err) {
          console.error('An error occurred:', err);
        } else {
          console.log('Data has been written to the file successfully!');
        }
      });    }
  ).catch((error) => {
    console.log('Error in writeBadWords: ' + error.message);
  });}

writeBadWords()

// makeBadWordsArray().then(badFileText => {
//   const filePath = './badwords.js';
//   fs.writeFile(filePath, badFileText, (err) => {
//       if (err) {
//         console.error('An error occurred:', err);
//       } else {
//         console.log('Data has been written to the file successfully!');
//       }
//     });
// })


