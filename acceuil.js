// 1. Tous les quiz : un par thème
const quiz = {
  comprendre: [
    {
      texte: "Que se passe-t-il quand tu tapes une adresse dans ton navigateur ?",
      choix: ["Le site s’installe sur ton ordinateur",
              "Ton navigateur demande la page à un serveur",
              "Ton opérateur écrit la page pour toi"],
      bonne: 1,
      explication: "Un serveur héberge le site et envoie la page à ton navigateur."
    },
    {
      texte: "À quoi sert un cookie ?",
      choix: ["C’est un virus", "Un fichier qui permet à un site de se souvenir de toi"],
      bonne: 1,
      explication: "Il garde ta connexion ou ton panier."
    }
  ],
  arnaques: [
    {
      texte: "Ta banque t’envoie un mail qui demande ton mot de passe. Que fais-tu ?",
      choix: ["Je réponds", "Je ne clique pas et je contacte ma banque par son appli"],
      bonne: 1,
      explication: "Une banque ne demande jamais ton mot de passe par mail."
    },
    {
      texte: "« Colis bloqué, payez 1,99 € sur ce lien. » C’est…",
      choix: ["Un vrai message", "Une arnaque"],
      bonne: 1,
      explication: "Urgence, petit paiement, lien étrange : c’est le piège classique."
    }
  ],
  reflexes: [
    {
      texte: "Quelle protection ajoute une 2e étape de connexion ?",
      choix: ["Le mode privé", "La double authentification"],
      bonne: 1,
      explication: "Même avec ton mot de passe volé, il manque le code."
    },
    {
      texte: "Peut-on utiliser le même mot de passe partout ?",
      choix: ["Oui", "Non"],
      bonne: 1,
      explication: "Si un site est piraté, tous tes comptes sont en danger."
    }
  ],
  ia: [
    {
      texte: "Qu’est-ce qu’un deepfake ?",
      choix: ["Un virus", "Une vidéo ou une voix truquée par IA"],
      bonne: 1,
      explication: "L’IA peut imiter un visage ou une voix de façon réaliste."
    },
    {
      texte: "Un post choquant circule partout. Que faire d’abord ?",
      choix: ["Le partager", "Vérifier la source"],
      bonne: 1,
      explication: "Les fausses infos se propagent quand on partage avant de vérifier."
    }
  ],
  vieprivee: [
    {
      texte: "Quelle information ne faut-il pas poster publiquement ?",
      choix: ["Une photo de ton chat", "Tes dates de vacances et ton adresse"],
      bonne: 1,
      explication: "Annoncer ses vacances indique que la maison est vide."
    },
    {
      texte: "Une photo supprimée est-elle effacée partout ?",
      choix: ["Oui", "Non, elle a pu être copiée"],
      bonne: 1,
      explication: "Sur internet, rien n’est sûr d’être vraiment effacé."
    }
  ]
};

// 2. Les variables et éléments
let questions = [];
let numero = 0;
let score = 0;
let dejaRepondu = false;

const support = document.querySelector(".support");
const elNumero = document.getElementById("numero");
const elScore = document.getElementById("score");
const elQuestion = document.getElementById("question");
const elReponses = document.getElementById("reponses");
const elExplication = document.getElementById("explication");
const elSuivant = document.getElementById("suivant");
const elProgression = document.getElementById("progression");

// 3. Lancer le quiz d'un thème
function lancer(theme) {
  questions = quiz[theme];
  numero = 0;
  score = 0;
  support.hidden = false;                       // montre la carte
  afficher();
  support.scrollIntoView({ behavior: "smooth" });
}

// 4. Afficher la question en cours
function afficher() {
  dejaRepondu = false;
  const q = questions[numero];

  elNumero.textContent = "Question " + (numero + 1) + " sur " + questions.length;
  elScore.textContent = "Score : " + score;
  elProgression.style.width = (numero / questions.length * 100) + "%";
  elQuestion.textContent = q.texte;
  elExplication.textContent = "";
  elSuivant.style.display = "none";
  elReponses.innerHTML = "";

  q.choix.forEach(function (texte, i) {
    const bouton = document.createElement("button");
    bouton.className = "reponse";
    bouton.textContent = texte;
    bouton.onclick = function () { repondre(i, bouton); };
    elReponses.appendChild(bouton);
  });
}

// 5. Quand on clique sur une réponse
function repondre(i, bouton) {
  if (dejaRepondu) return;
  dejaRepondu = true;

  const q = questions[numero];
  elReponses.children[q.bonne].classList.add("bonne");

  if (i === q.bonne) {
    score = score + 1;
  } else {
    bouton.classList.add("fausse");
  }

  elScore.textContent = "Score : " + score;
  elExplication.textContent = q.explication;
  elSuivant.style.display = "inline-block";
}

// 6. Bouton « Suivant »
elSuivant.onclick = function () {
  numero = numero + 1;
  if (numero < questions.length) {
    afficher();
  } else {
    fin();
  }
};

// 7. Écran de fin
function fin() {
  elProgression.style.width = "100%";
  elNumero.textContent = "Terminé !";
  elQuestion.textContent = "Ton score : " + score + " / " + questions.length;
  elReponses.innerHTML = "";
  elExplication.textContent = "";
  elSuivant.style.display = "none";
}

// 8. Relier les boutons du menu aux quiz
document.querySelectorAll(".liste a").forEach(function (lien) {
  lien.onclick = function (e) {
    e.preventDefault();                                 // pas de saut dans la page
    const theme = lien.getAttribute("href").slice(1);   // "#arnaques" devient "arnaques"
    lancer(theme);
  };
});